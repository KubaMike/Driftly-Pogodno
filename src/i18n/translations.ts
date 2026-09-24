import type { Lang } from '../types';

export const LANGS: Lang[] = ['pl', 'de', 'en', 'ua'];

export const DEFAULT_LANG: Lang = 'pl';

const translations = {
    site_name: {
        pl: 'Driftly-Pogodno',
        de: 'Driftly-Pogodno',
        en: 'Driftly-Pogodno',
        ua: 'Driftly-Pogodno'
    },
    intro: {
        pl: 'Witamy na Driftly-Pogodno',
        de: 'Willkommen bei Driftly-Pogodno',
        en: 'Welcome to Driftly-Pogodno',
        ua: 'Ласкаво просимо до Driftly-Pogodno'
    },
    tab_trails: {
        pl: 'Szlaki',
        de: 'Wege',
        en: 'Trails',
        ua: 'Стежки'
    },
    trails_info: {
        pl: 'Wybierz szlak, aby zobaczyć go na mapie.',
        de: 'Wählen Sie einen Weg, um ihn auf der Karte anzusehen.',
        en: 'Choose a trail to see it on the map.',
        ua: 'Виберіть стежку, щоб побачити її на карті.'
    },
    trail_view_on_map: {
        pl: 'Zobacz na mapie',
        de: 'Auf der Karte ansehen',
        en: 'View on map',
        ua: 'Переглянути на карті'
    },
    trail_places: {
        pl: 'Miejsca na trasie',
        de: 'Orte auf dem Weg',
        en: 'Places it visits',
        ua: 'Місця на маршруті'
    },
    trail_back: {
        pl: 'Wróć do listy szlaków',
        de: 'Zurück zur Wegeliste',
        en: 'Back to trails',
        ua: 'Назад до списку стежок'
    },
    nav_gallery: {
        pl: 'Galeria',
        de: 'Galerie',
        en: 'Gallery',
        ua: 'Галерея'
    },
    nav_map: {
        pl: 'Mapy',
        de: 'Karten',
        en: 'Maps',
        ua: 'Карти'
    },
    btn_explore: {
        pl: 'Zobacz galerię',
        de: 'Galerie ansehen',
        en: 'View gallery',
        ua: 'Переглянути галерею'
    },
    sidebar_title: {
        pl: 'Menu',
        de: 'Menü',
        en: 'Menu',
        ua: 'Меню'
    },
    lang_label: {
        pl: 'Wybierz język',
        de: 'Sprache wählen',
        en: 'Choose language',
        ua: 'Виберіть мову'
    },
    gallery_caption_1: {
        pl: 'Przedwojenne plany Szczecina z ok. 1935 roku — w tym miejscu znajduje się dziś stadion Pogoni Szczecin.',
        de: 'Vorkriegspläne von Szczecin aus ca. 1935 — hier befindet sich heute das Stadion von Pogoń Szczecin.',
        en: 'Pre-war plans of Szczecin from around 1935 — today the stadium of Pogoń Szczecin is located here.',
        ua: 'Довоєнні плани Щецина приблизно 1935 року — на цьому місці сьогодні знаходиться стадіон Погоні Щецин.'
    },
    gallery_caption_2: {
        pl: 'Braunsfelde — dzisiejsza ul. Rostworowskiego, zdjęcie sprzed 1945 roku.',
        de: 'Braunsfelde — heutige ul. Rostworowskiego, Foto aus der Zeit vor 1945.',
        en: "Braunsfelde — today's ul. Rostworowskiego, photo from before 1945.",
        ua: 'Браунсфельде — сьогоднішня вул. Ростворовського, фото до 1945 року.'
    },
    gallery_caption_3: {
        pl: 'Widok na panoramę Pogodna z wieży kościoła przy ul. Wieniawskiego 4',
        de: 'Blick auf die Panorama von Pogodno vom Kirchturm an der ul. Wieniawskiego 4',
        en: 'View of the Pogodno panorama from the church tower at ul. Wieniawskiego 4',
        ua: 'Вид на панораму Погодна з вежі церкви на вул. Веняського 4'
    },
    gallery_caption_4: {
        pl: 'Przedwojenny płot na Pogodnie.',
        de: 'Vorkriegszaun in Pogodno.',
        en: 'Pre-war fence in Pogodno.',
        ua: 'Довоєнний паркан у Погодні.'
    },
    gallery_caption_5: {
        pl: 'Plan z 1979 roku - rosyjska jednostka wojskowa; dziś teren campusu ZUT.',
        de: 'Plan aus dem Jahr 1979 - russische Militäreinheit; heute Gelände des ZUT-Campus.',
        en: 'Plan from 1979 - Russian military unit; today the area of ZUT campus.',
        ua: 'План 1979 року - російська військова частина; сьогодні територія кампусу ЗУТ.'
    },
    gallery_caption_6: {
        pl: 'Zdobienia masońskie na kamienicy przy ulicy Konopnickiej 27',
        de: 'Freimaurerische Verzierungen auf dem Mietshaus an der ul. Konopnickiej 27',
        en: 'Masonic decorations on the tenement at ul. Konopnickiej 27',
        ua: "Масонські прикраси на кам'яниці на вулиці Конопницької 27"
    },
    gallery_alt_1: {
        pl: 'Przedwojenne plany Szczecina z ok. 1935 roku — w tym miejscu znajduje się dziś stadion Pogoni Szczecin.',
        de: 'Vorkriegspläne von Szczecin aus ca. 1935 — hier befindet sich heute das Stadion von Pogoń Szczecin.',
        en: 'Pre-war plans of Szczecin from around 1935 — today the stadium of Pogoń Szczecin is located here.',
        ua: 'Довоєнні плани Щецина приблизно 1935 року — на цьому місці сьогодні знаходиться стадіон Погоні Щецин.'
    },
    gallery_alt_2: {
        pl: 'Braunsfelde — dzisiejsza ul. Rostworowskiego, zdjęcie sprzed 1945 roku.',
        de: 'Braunsfelde — heutige ul. Rostworowskiego, Foto aus der Zeit vor 1945.',
        en: "Braunsfelde — today's ul. Rostworowskiego, photo from before 1945.",
        ua: 'Браунсфельде — сьогоднішня вул. Ростворовського, фото до 1945 року.'
    },
    gallery_alt_3: {
        pl: 'Widok na panoramę Pogodna z wieży kościoła przy ul. Wieniawskiego 4',
        de: 'Blick auf die Panorama von Pogodno vom Kirchturm an der ul. Wieniawskiego 4',
        en: 'View of the Pogodno panorama from the church tower at ul. Wieniawskiego 4',
        ua: 'Вид на панораму Погодна з вежі церкви на вул. Веняського 4'
    },
    gallery_alt_4: {
        pl: 'Przedwojenny płot na Pogodnie.',
        de: 'Vorkriegszaun in Pogodno.',
        en: 'Pre-war fence in Pogodno.',
        ua: 'Довоєнний паркан у Погодні.'
    },
    gallery_alt_5: {
        pl: 'Plan z 1979 roku - rosyjska jednostka wojskowa; dziś teren campusu ZUT.',
        de: 'Plan aus dem Jahr 1979 - russische Militäreinheit; heute Gelände des ZUT-Campus.',
        en: 'Plan from 1979 - Russian military unit; today the area of ZUT campus.',
        ua: 'План 1979 року - російська військова частина; сьогодні територія кампусу ЗУТ.'
    },
    gallery_alt_6: {
        pl: 'Zdobienia masońskie na kamienicy przy ulicy Konopnickiej 27',
        de: 'Freimaurerische Verzierungen auf dem Mietshaus an der ul. Konopnickiej 27',
        en: 'Masonic decorations on the tenement at ul. Konopnickiej 27',
        ua: "Масонські прикраси на кам'яниці на вулиці Конопницької 27"
    },
    map_link_text: {
        pl: 'Link do strony',
        de: 'Link zur Seite',
        en: 'Link to page',
        ua: 'Посилання на сторінку'
    },
    gallery_title: {
        pl: 'Galeria',
        de: 'Galerie',
        en: 'Gallery',
        ua: 'Галерея'
    },
    memories_title: {
        pl: 'Wspomnienia mieszkańców',
        de: 'Erinnerungen der Bewohner',
        en: "Residents' Memories",
        ua: 'Спогади мешканців'
    },
    audio_unsupported: {
        pl: 'Twoja przeglądarka nie obsługuje elementu audio.',
        de: 'Ihr Browser unterstützt das Audio-Element nicht.',
        en: 'Your browser does not support the audio element.',
        ua: 'Ваш браузер не підтримує аудіоелемент.'
    },
    audio_download: {
        pl: 'Pobierz plik audio',
        de: 'Audiodatei herunterladen',
        en: 'Download audio file',
        ua: 'Завантажити аудіофайл'
    }
} satisfies Record<string, Record<Lang, string>>;

export type TranslationKey = keyof typeof translations;

export function getTranslation(key: TranslationKey, lang: Lang): string {
    return translations[key][lang];
}

export { translations };