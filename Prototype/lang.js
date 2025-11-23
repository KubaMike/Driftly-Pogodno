// Obiekt z tłumaczeniami dla różnych kluczy (atrybut data-lang-key)
const translations = {
    'pl': {
        pageTitle: 'Driftly-Pogodno - Strona Główna',
        galleryPageTitle: 'Galeria - Driftly-Pogodno',
        heroSubtitle: 'Odkryj uroki Starego Pogodna.',
        trailsTitle: 'Szlaki',
        trailsContent: 'Sekcja w budowie. Wkrótce pojawią się opisy i trasy szlaków turystycznych.',
        menuHome: 'Strona Główna',
        menuGallery: 'Galeria',
        menuMaps: 'Mapy (Wkrótce)',
        selectLanguage: 'Wybierz Język:',
        galleryTitle: 'Galeria Zdjęć',
        galleryDescription: 'Przegląd najpiękniejszych miejsc w Pogodnie.'
    },
    'en': {
        pageTitle: 'Driftly-Pogodno - Home',
        galleryPageTitle: 'Gallery - Driftly-Pogodno',
        heroSubtitle: 'Discover the charm of Old Pogodno.',
        trailsTitle: 'Trails',
        trailsContent: 'Section under construction. Descriptions and routes of tourist trails will appear soon.',
        menuHome: 'Home',
        menuGallery: 'Gallery',
        menuMaps: 'Maps (Coming Soon)',
        selectLanguage: 'Select Language:',
        galleryTitle: 'Photo Gallery',
        galleryDescription: 'An overview of the most beautiful places in Pogodno.'
    },
    'de': {
        pageTitle: 'Driftly-Pogodno - Startseite',
        galleryPageTitle: 'Galerie - Driftly-Pogodno',
        heroSubtitle: 'Entdecken Sie den Charme von Alt-Pogodno.',
        trailsTitle: 'Wanderwege',
        trailsContent: 'Bereich im Aufbau. Beschreibungen und Routen der Wanderwege folgen in Kürze.',
        menuHome: 'Startseite',
        menuGallery: 'Galerie',
        menuMaps: 'Karten (Bald)',
        selectLanguage: 'Sprache wählen:',
        galleryTitle: 'Fotogalerie',
        galleryDescription: 'Ein Überblick über die schönsten Orte in Pogodno.'
    },
    'ua': {
        pageTitle: 'Driftly-Pogodno - Головна Сторінка',
        galleryPageTitle: 'Галерея - Driftly-Pogodno',
        heroSubtitle: 'Відкрийте для себе чарівність Старого Погодно.',
        trailsTitle: 'Маршрути',
        trailsContent: 'Розділ у розробці. Незабаром з\'являться описи та маршрути туристичних стежок.',
        menuHome: 'Головна',
        menuGallery: 'Галерея',
        menuMaps: 'Мапи (Незабаром)',
        selectLanguage: 'Вибрати Мову:',
        galleryTitle: 'Фотогалерея',
        galleryDescription: 'Огляд найгарніших місць у Погодно.'
    }
};

let currentLanguage = localStorage.getItem('siteLanguage') || 'pl'; // Domyślnie PL

/**
 * Ustawia i zmienia aktualny język strony.
 * @param {string} langCode - Kod języka (np. 'pl', 'en').
 */
function changeLanguage(langCode) {
    if (!translations[langCode]) return;

    currentLanguage = langCode;
    localStorage.setItem('siteLanguage', langCode);
    applyTranslations();
    
    // Ustawienie selektora na poprawną wartość
    const switcher = document.getElementById('language-switcher');
    if (switcher) {
        switcher.value = langCode;
    }

    // Ustawienie atrybutu lang na tagu HTML
    document.documentElement.lang = langCode;
}

/**
 * Aplikuje tłumaczenia na wszystkie elementy z atrybutem data-lang-key.
 */
function applyTranslations() {
    const elements = document.querySelectorAll('[data-lang-key]');
    const currentTrans = translations[currentLanguage];

    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (currentTrans[key]) {
            // Obsługa różnych typów elementów (np. title, p, h1)
            if (element.tagName === 'TITLE') {
                document.title = currentTrans[key];
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = currentTrans[key];
            } else {
                element.textContent = currentTrans[key];
            }
        }
    });
    
    // Konfiguracja Menu Bocznego po zmianie języka
    configureSidebarMenu();
}

// Inicjalizacja: aplikuj tłumaczenia przy ładowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage); // Użyj zapamiętanego lub domyślnego
});