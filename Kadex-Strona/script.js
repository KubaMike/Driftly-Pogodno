const translations = {
    // Fixed corrupted characters
    pl: {
        site_name: 'Driftly-Pogodno',
        intro: 'Witamy na Driftly-Pogodno — krótki opis projektu.',
        tab_trails: 'Szlaki',
        trails_info: 'Wkrótce pojawią się nasze trasy — zapraszamy do śledzenia!',
        nav_gallery: 'Galeria',
        nav_map: 'Mapy (wkrótce)',
        btn_explore: 'Zobacz galerię',
        sidebar_title: 'Menu',
        lang_label: 'Wybierz język'
    },
    de: {
        site_name: 'Driftly-Pogodno',
        intro: 'Willkommen bei Driftly-Pogodno — kurzer Projekttext.',
        tab_trails: 'Wege',
        trails_info: 'Bald werden unsere Routen verfügbar sein — bleiben Sie dran!',
        nav_gallery: 'Galerie',
        nav_map: 'Karten (bald)',
        btn_explore: 'Galerie ansehen',
        sidebar_title: 'Menü',
        lang_label: 'Sprache wählen'
    },
    en: {
        site_name: 'Driftly-Pogodno',
        intro: 'Welcome to Driftly-Pogodno — short project description.',
        tab_trails: 'Trails',
        trails_info: 'Our trails will be available soon — stay tuned!',
        nav_gallery: 'Gallery',
        nav_map: 'Maps (coming soon)',
        btn_explore: 'View gallery',
        sidebar_title: 'Menu',
        lang_label: 'Choose language'
    },
    // Fixed corrupted characters
    ua: {
        site_name: 'Driftly-Pogodno',
        intro: 'Ласкаво просимо до Driftly-Pogodno — короткий опис проекту.',
        tab_trails: 'Стежки',
        trails_info: 'Наші маршрути незабаром будуть доступні — слідкуйте за оновленнями!',
        nav_gallery: 'Галерея',
        nav_map: 'Карти (незабаром)',
        btn_explore: 'Переглянути галерею',
        sidebar_title: 'Меню',
        lang_label: 'Виберіть мову'
    }
};

// Funkcja ustawiająca język
function setLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n];
    });

    // FIX: Correctly constructs the property name for reading data-caption-XX attributes
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Example: 'pl' -> 'Pl'
        const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        // Example: 'captionPl'. This matches item.dataset property for data-caption-pl
        const propertyName = 'caption' + capitalizedLang;

        // Sets the current caption for the lightbox to use
        item.dataset.currentCaption = item.dataset[propertyName] || '';
    });

    localStorage.setItem('driftly_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('close-btn');
    const langSelect = document.getElementById('lang-select');
    const mapLink = document.getElementById('map-link');
    const mapLinkTop = document.getElementById('map-link-top');

    // Sidebar toggle
    hamburger.onclick = () => sidebar.classList.toggle('open');
    closeBtn.onclick = () => sidebar.classList.remove('open');

    // Zmiana języka
    langSelect.onchange = e => setLanguage(e.target.value);

    // Mapy alert (Fixed corrupted text)
    const mapAlert = e => {
        e.preventDefault();
        alert('Mapy w budowie');
    };

    if (mapLink) mapLink.addEventListener('click', mapAlert);
    if (mapLinkTop) mapLinkTop.addEventListener('click', mapAlert);

    // Galeria - Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('caption'); // Corrected from lightbox-caption
    const closeLightbox = document.querySelector('.close-button'); // Corrected from close-lightbox

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let galleryImages = [];
    let currentImageIndex = 0;

    // Populate galleryImages array
    galleryItems.forEach((item, index) => {
        galleryImages.push({
            src: item.querySelector('img').src,
            caption: item.dataset.currentCaption || ''
        });

        item.onclick = () => {
            currentImageIndex = index;
            showImage(currentImageIndex);
            lightbox.style.display = 'flex';
        };
    });

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
    }

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

    // Domyślny język
    const storedLang = localStorage.getItem('driftly_lang') || 'pl';
    langSelect.value = storedLang;
    setLanguage(storedLang);
});