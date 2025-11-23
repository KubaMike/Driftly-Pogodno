/**
 * Konfiguruje pozycje w menu bocznym na podstawie aktualnego języka.
 */
function configureSidebarMenu() {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;

    // Pobierz bieżące tłumaczenia menu
    const trans = translations[currentLanguage];
    
    // Tworzenie struktury menu z dynamicznymi linkami
    const menuStructure = [
        { key: 'menuHome', href: 'index.html' },
        { key: 'menuGallery', href: 'galeria.html' },
        { key: 'menuMaps', href: '#' } // Mapy na razie nie prowadzą nigdzie
    ];
    
    let menuHTML = '';
    menuStructure.forEach(item => {
        const text = trans[item.key] || item.key;
        menuHTML += `<li><a href="${item.href}">${text}</a></li>`;
    });
    
    menuItemsContainer.innerHTML = menuHTML;
}


/**
 * Obsługa otwierania/zamykania menu bocznego (Hamburger).
 */
function setupSidebarToggle() {
    const toggleButton = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    toggleButton.addEventListener('click', () => {
        const isClosed = !sidebar.classList.contains('open');

        // Przełączanie klasy dla paska bocznego
        sidebar.classList.toggle('open');
        
        // Przełączanie klasy dla animacji hamburgera (X)
        toggleButton.classList.toggle('open');
        
        // Przesuń zawartość strony, żeby menu nie zasłaniało
        document.body.style.marginLeft = isClosed ? '250px' : '0';
    });
}

/**
 * Animacja pojawiania się elementów podczas przewijania (Scroll Reveal).
 */
function setupScrollAnimations() {
    const targets = document.querySelectorAll('.main-section h2, .image-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Przestań obserwować po animacji
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1 // 10% elementu widoczne
    });

    targets.forEach(target => {
        observer.observe(target);
    });
}


// Wywołanie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    setupSidebarToggle();
    setupScrollAnimations();
    // Konfiguracja menu musi być wywołana po załadowaniu tłumaczeń (w lang.js)
    // Jest też wywoływana w lang.js wewnątrz changeLanguage, aby działało po zmianie języka
});