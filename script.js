let map; // Declare map globally

// Funkcja ustawiająca język

function setLanguage(lang) {
    console.log('setLanguage called with:', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (translations[el.dataset.i18n] && translations[el.dataset.i18n][lang]) {
            el.textContent = translations[el.dataset.i18n][lang];
            console.log(`Translated element ${el.dataset.i18n} to ${translations[el.dataset.i18n][lang]}`);
        } else {
            console.warn(`Translation missing for key: ${el.dataset.i18n} in language: ${lang}`);
        }
    });

    // FIX: Correctly constructs the property name for reading data-caption-XX attributes
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Example: 'pl' -> 'Pl'
        const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        // Example: 'captionPl'. This matches item.dataset property for data-caption-pl
        const propertyName = 'caption' + capitalizedLang;

        // Sets the current caption for the lightbox to use
        item.dataset.currentCaption = item.dataset[propertyName] || '';
        console.log(`Gallery item caption set for ${item.dataset.currentCaption}`);
    });

    populateGalleryImages();
    localStorage.setItem('driftly_lang', lang);
    console.log('Language stored in localStorage:', lang);
}

let galleryImages = [];

let currentImageIndex = 0;

let lightbox;

let lightboxImg;

let lightboxCaption;

let closeLightbox;

let prevButton;

let nextButton;

function populateGalleryImages() {
    console.log('populateGalleryImages called');

    const galleryItems = document.querySelectorAll('.gallery-item'); // Re-query galleryItems here

    galleryImages = []; // Clear existing images

    galleryItems.forEach((item, index) => {
        galleryImages.push({
            src: item.querySelector('img').src,
            caption: item.dataset.currentCaption || ''
        });

        // Re-attaching the onclick handler
        item.onclick = () => {
            console.log('Gallery item clicked:', index);
            currentImageIndex = index;
            showImage(currentImageIndex);
            lightbox.style.display = 'flex';
        };
    });
    console.log('Gallery images populated.');
}

function showImage(index) {
    if (index < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    console.log(`Showing image ${currentImageIndex} with caption: ${lightboxCaption.textContent}`);
}



document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');

    if (hamburger) {
        console.log('Hamburger element found.');
        hamburger.onclick = () => {
            console.log('Hamburger clicked.');
            sidebar.classList.toggle('open');
        };
    } else {
        console.error('Hamburger element not found.');
    }
    const closeBtn = document.getElementById('close-btn');

    if (closeBtn) {
        console.log('Close button element found.');
        closeBtn.onclick = () => {
            console.log('Close button clicked.');
            sidebar.classList.remove('open');
        };
    } else {
        console.error('Close button element not found.');
    }

    // Close sidebar on click outside
    document.addEventListener('click', e => {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    const langSelect = document.getElementById('lang-select');

    // Zmiana języka
    if (langSelect) { // Ensure langSelect exists on the page
        langSelect.onchange = e => {
            console.log('Language selector changed to:', e.target.value);
            setLanguage(e.target.value);
        };
    }

    // Galeria - Lightbox
    if (document.getElementById('lightbox')) {
        lightbox = document.getElementById('lightbox');
        lightboxImg = document.getElementById('lightbox-img');
        lightboxCaption = document.getElementById('caption');
        closeLightbox = document.querySelector('.close-button');

        prevButton = document.getElementById('prevButton');
        nextButton = document.getElementById('nextButton');

        // Navigation buttons
        if (prevButton) { // Check if buttons exist (important if not on gallery.html)
            prevButton.onclick = () => {
                showImage(currentImageIndex - 1);
            };
        }
        if (nextButton) { // Check if buttons exist
            nextButton.onclick = () => {
                showImage(currentImageIndex + 1);
            };
        }

        closeLightbox.onclick = () => lightbox.style.display = 'none';
        lightbox.onclick = e => { if (e.target === lightbox) lightbox.style.display = 'none'; };

        // Close lightbox with Escape key and navigate with arrow keys
        document.addEventListener('keydown', e => {
            if (lightbox.style.display === 'flex') { // Only navigate if lightbox is open
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                } else if (e.key === 'ArrowLeft') {
                    showImage(currentImageIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    showImage(currentImageIndex + 1);
                }
            }
        });
    }

    // Domyślny język
    const storedLang = localStorage.getItem('driftly_lang') || 'pl';
    if (langSelect) {
        langSelect.value = storedLang;
        console.log('Language selector set to storedLang:', storedLang);
    }
    setLanguage(storedLang);

    // Map initialization for map.html
    console.log('Checking for map element...');
    if (document.getElementById('map')) {
        console.log('Map element found. Initializing map...');

        // Define custom control for geolocation
        L.Control.Locate = L.Control.extend({
            options: {
                position: 'bottomright' // Default position
            },

            onAdd: function (map) {
                this._map = map; // Store map instance
                this._watchId = null;
                this._userMarker = null;
                this._button = null; // Initialize _button here

                // Create the button container
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                this._button = L.DomUtil.create('a', 'leaflet-bar-part', container);
                this._button.href = '#';
                this._button.title = 'Locate Me'; // Add a title for accessibility
                this._button.innerHTML = '<i class="fas fa-crosshairs"></i>'; // Font Awesome icon

                L.DomEvent.on(this._button, 'click', this._onButtonClick, this); // Attach click handler
                L.DomEvent.disableClickPropagation(container); // Prevent map clicks from triggering

                return container;
            },

            onRemove: function (map) {
                L.DomEvent.off(this._button, 'click', this._onButtonClick, this);
                if (this._watchId) {
                    navigator.geolocation.clearWatch(this._watchId);
                }
                if (this._userMarker) {
                    map.removeLayer(this._userMarker);
                }
            },

            _onButtonClick: function (e) {
                e.preventDefault();

                if (this._watchId && this._userMarker) { // If already watching and location is known, do nothing to allow free exploration
                    return;
                }

                if (this._watchId) { // If watching but no marker yet, do nothing (wait for first position)
                    return;
                }

                // If not watching, start watching
                if ('geolocation' in navigator) {
                    this._watchId = navigator.geolocation.watchPosition(position => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        if (this._userMarker) {
                            this._userMarker.setLatLng([lat, lng]);
                } else {
                    this._userMarker = L.circleMarker([lat, lng], {
                        radius: 8,
                        fillColor: '#3388ff',
                        color: '#fff',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(this._map);
                }
                // Removed panTo to allow free exploration

                    }, error => {
                        console.error('Error getting location:', error);
                        alert('Could not get your location.');
                        // Stop watching if an error occurs
                        if (this._watchId) {
                            navigator.geolocation.clearWatch(this._watchId);
                            this._watchId = null;
                            if (this._userMarker) {
                                this._map.removeLayer(this._userMarker);
                                this._userMarker = null;
                            }
                        }
                    }, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    });
                } else {
                    alert('Geolocation is not supported by your browser.');
                }
            }
        });

        // Factory function for convenience
        L.control.locate = function (options) {
            return new L.Control.Locate(options);
        };

        // Define approximate bounding box for Szczecin (Pogodno, Zawadzkiego, Niebuszewo-Bolinko)
        // Southwest corner (lat, lng), Northeast corner (lat, lng)
        const szczecinBounds = [
            [53.36, 14.40], // Roughly southwest of Szczecin
            [53.50, 14.65]  // Roughly northeast of Szczecin
        ];

        try {
            map = L.map('map', {
                center: [53.447, 14.536], // Centered around Szczecin/Pogodno
                zoom: 13,
                maxBounds: szczecinBounds, // Limit panning
                zoomControl: false // Disable default zoom control
            });
            console.log('Map object created:', map);

            // Add custom zoom control to bottomright
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxBounds: szczecinBounds // Apply maxBounds to tile layer as well for consistency
            }).addTo(map);
            console.log('Tile layer added.');
        } catch (error) {
            console.error('Map initialization error:', error);
        }

        const dropPoints = [
            {
                coords: [53.447, 14.536],
                titleKey: 'map_point_A_title',
                url: 'gallery.html'
            },
            {
                coords: [53.450, 14.540],
                titleKey: 'map_point_B_title',
                url: 'index.html'
            },
            {
                coords: [53.440, 14.530],
                titleKey: 'map_point_C_title',
                url: 'gallery.html'
            }
        ];

        dropPoints.forEach(point => {
            let marker;
            let popupTitle;
            let popupLink;
            let popupLinkText = (translations['map_link_text'] && translations['map_link_text'][storedLang]) || 'Link';

            if (point.titleKey === 'map_point_A_title' && localStorage.getItem('feature.unlocked') === 'true') {
                marker = L.circleMarker(point.coords, {
                    radius: 8,
                    fillColor: '#32cd32',
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);
                popupTitle = (translations[point.titleKey] && translations[point.titleKey][storedLang]) || point.titleKey;
                popupLink = 225e41a4ad.html;
            } else if (point.titleKey === 'map_point_A_title') {
                marker = L.marker(point.coords).addTo(map);
                popupTitle = (translations['map_unlock_instructions'] && translations['map_unlock_instructions'][storedLang]) || 'Scan QR code to unlock stadium details';
                popupLink = '';
            } else {
                marker = L.marker(point.coords).addTo(map);
                popupTitle = (translations[point.titleKey] && translations[point.titleKey][storedLang]) || point.titleKey;
                popupLink = point.url;
            }

            marker.bindPopup(`<b>${popupTitle}</b>${popupLink ? `<br><a href="${popupLink}">${popupLinkText}</a>` : ''}`);
        });
        console.log('DropPoints added.');

        // Add the custom locate control
        L.control.locate({position: 'bottomright'}).addTo(map);

    } else {
        console.log('Map element not found.');
    }

    // Unlock check for stadium.html
    if (window.location.pathname.includes(225e41a4ad.html) && !localStorage.getItem('feature.unlocked')) {
        localStorage.setItem('feature.unlocked', 'true');
    }
    
});
