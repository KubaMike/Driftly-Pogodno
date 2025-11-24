const translations = {
    // Fixed corrupted characters
    pl: {
        site_name: 'Driftly-Pogodno',
        intro: 'Witamy na Driftly-Pogodno — krótki opis projektu.',
        tab_trails: 'Szlaki',
        trails_info: 'Wkrótce pojawią się nasze trasy — zapraszamy do śledzenia!',
        nav_gallery: 'Galeria',
        nav_map: 'Mapy', // Corrected (wkrótce removed)
        btn_explore: 'Zobacz galerię',
        sidebar_title: 'Menu',
        lang_label: 'Wybierz język',
        gallery_caption_1: 'Opis 1',
        gallery_caption_2: 'Opis 2',
        gallery_caption_3: 'Opis 3',
        gallery_caption_4: 'Opis 4'
    },
    de: {
        site_name: 'Driftly-Pogodno',
        intro: 'Willkommen bei Driftly-Pogodno — kurzer Projekttext.',
        tab_trails: 'Wege',
        trails_info: 'Bald werden unsere Routen verfügbar sein — bleiben Sie dran!',
        nav_gallery: 'Galerie',
        nav_map: 'Karten', // Corrected (bald removed)
        btn_explore: 'Galerie ansehen',
        sidebar_title: 'Menü',
        lang_label: 'Sprache wählen',
        gallery_caption_1: 'Beschreibung 1',
        gallery_caption_2: 'Beschreibung 2',
        gallery_caption_3: 'Beschreibung 3',
        gallery_caption_4: 'Beschreibung 4'
    },
    en: {
        site_name: 'Driftly-Pogodno',
        intro: 'Welcome to Driftly-Pogodno — short project description.',
        tab_trails: 'Trails',
        trails_info: 'Our trails will be available soon — stay tuned!',
        nav_gallery: 'Gallery',
        nav_map: 'Maps', // Corrected (coming soon removed)
        btn_explore: 'View gallery',
        sidebar_title: 'Menu',
        lang_label: 'Choose language',
        gallery_caption_1: 'Caption 1',
        gallery_caption_2: 'Caption 2',
        gallery_caption_3: 'Caption 3',
        gallery_caption_4: 'Caption 4'
    },
    // Fixed corrupted characters
    ua: {
        site_name: 'Driftly-Pogodno',
        intro: 'Ласкаво просимо до Driftly-Pogodno — короткий опис проекту.',
        tab_trails: 'Стежки',
        trails_info: 'Наші маршрути незабаром будуть доступні — слідкуйте за оновленнями!',
        nav_gallery: 'Галерея',
        nav_map: 'Карти', // Corrected (незабаром removed)
        btn_explore: 'Переглянути галерею',
        sidebar_title: 'Меню',
        lang_label: 'Виберіть мову',
        gallery_caption_1: 'Підпис 1',
        gallery_caption_2: 'Підпис 2',
        gallery_caption_3: 'Підпис 3',
        gallery_caption_4: 'Підпис 4'
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

    populateGalleryImages();

    localStorage.setItem('driftly_lang', lang);

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

    // Galeria - Lightbox
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

    // Domyślny język
    const storedLang = localStorage.getItem('driftly_lang') || 'pl';
    langSelect.value = storedLang;
    setLanguage(storedLang);

    // Map initialization for map.html
    console.log('Checking for map element...');
    if (document.getElementById('map')) {
        console.log('Map element found. Initializing map...');
        const map = L.map('map').setView([53.447, 14.536], 13); // Centered around Szczecin/Pogodno
        console.log('Map object created:', map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        console.log('Tile layer added.');

        const dropPoints = [
            {
                coords: [53.447, 14.536],
                title: 'Punkt A',
                url: 'gallery.html'
            },
            {
                coords: [53.450, 14.540],
                title: 'Punkt B',
                url: 'index.html'
            },
            {
                coords: [53.440, 14.530],
                title: 'Punkt C',
                url: 'gallery.html'
            }
        ];

        dropPoints.forEach(point => {
            const marker = L.marker(point.coords).addTo(map);
            marker.bindPopup(`<b>${point.title}</b><br><a href="${point.url}">Link do strony</a>`);
        });
        console.log('DropPoints added.');
    } else {
        console.log('Map element not found.');
    }
});
