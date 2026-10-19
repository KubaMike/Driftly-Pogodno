import type { PointSiteConfig } from './types';

/**
 * Willa Zeitlera (Żółty Dom) przy ul. Wieniawskiego 28. Historyczne id 43
 * i ścieżka QR (c3bef7e932.html) są zachowane, żeby istniejące kody QR
 * nadal działały; stara ścieżka b8aa2a9f4c.html jest dodatkowo mapowana
 * w `pathAliases` w registry.ts.
 */
export const wieniawskiegoZeitler: PointSiteConfig = {
    id: 43,
    path: 'c3bef7e932.html',
    coords: [53.4392552, 14.5105634],
    pageTitle: { pl: 'Willa Zeitlera (Żółty Dom) – Wieniawskiego 28', de: 'Villa Zeitler (Gelbes Haus) – Wieniawskiego 28', en: 'Villa Zeitler (Yellow House) – Wieniawskiego 28', ua: 'Вілла Цайтлера (Жовтий будинок) – Венявського 28' },
    marker: {
        color: '#a6761d',
        title: { pl: 'Willa Zeitlera (Żółty Dom) – Wieniawskiego 28', de: 'Villa Zeitler (Gelbes Haus) – Wieniawskiego 28', en: 'Villa Zeitler (Yellow House) – Wieniawskiego 28', ua: 'Вілла Цайтлера (Жовтий будинок) – Венявського 28' },
        lockedTitle: {
            pl: 'Skanuj kod QR, aby dowiedzieć się więcej o: Willa Zeitlera (Żółty Dom) – Wieniawskiego 28.',
            de: 'Scannen Sie den QR-Code, um mehr zu erfahren über: Villa Zeitler (Gelbes Haus) – Wieniawskiego 28.',
            en: 'Scan the QR code to learn more about: Villa Zeitler (Yellow House) – Wieniawskiego 28.',
            ua: 'Скануйте QR-код, щоб дізнатися більше про: Вілла Цайтлера (Жовтий будинок) – Венявського 28.'
        }
    },
    hero: {
        image: 'Photos/wieniawskiego-zeitler/P1830775.webp',
        title: { pl: 'Willa Zeitlera (Żółty Dom) – Wieniawskiego 28', de: 'Villa Zeitler (Gelbes Haus) – Wieniawskiego 28', en: 'Villa Zeitler (Yellow House) – Wieniawskiego 28', ua: 'Вілла Цайтлера (Жовтий будинок) – Венявського 28' },
        intro: {
            pl: 'Wzniesiona w 1905 roku rezydencja szczecińskiego komornika Zeitlera, zaprojektowana przez architekta Carla Lutza — elegancki przykład klasycyzmu w ogrodowym Westendzie.',
            de: 'Die 1905 errichtete Residenz des Stettiner Gerichtsvollziehers Zeitler, entworfen vom Stettiner Architekten Carl Lutz – ein elegantes Beispiel für Klassizismus in der Gartenstadt Westend.',
            en: 'A residence built in 1905 for the Szczecin court bailiff Zeitler, designed by the Szczecin architect Carl Lutz — an elegant example of classicism in the garden district of Westend.',
            ua: 'Резиденція, зведена 1905 року для щецинського судового виконавця Цайтлера, за проєктом щецинського архітектора Карла Люца — елегантний приклад класицизму в садовому Westend.'
        }
    },
    historyHeadline: {
        pl: 'Willa Zeitlera – prywatna rezydencja szczecińskiego komornika',
        de: 'Villa Zeitler – private Residenz eines Stettiner Gerichtsvollziehers',
        en: 'Villa Zeitler – a private residence of a Szczecin court bailiff',
        ua: 'Вілла Цайтлера — приватна резиденція щецинського виконавця'
    },
    note: {
        pl: 'ul. Henryka Wieniawskiego 28, Szczecin (Pogodno / dawne Westend)',
        de: 'ul. Henryka Wieniawskiego 28, Stettin (Pogodno / früheres Westend)',
        en: 'ul. Henryka Wieniawskiego 28, Szczecin (Pogodno / former Westend)',
        ua: 'вул. Генріка Венявського, 28, Щецин (Погодно / колишнє Westend)'
    },
    sections: [
        {
            heading: {
                pl: 'Zamówienie szczecińskiego komornika',
                de: 'Der Auftrag eines Stettiner Gerichtsvollziehers',
                en: 'The commission of a Szczecin court bailiff',
                ua: 'Замовлення щецинського виконавця'
            },
            body: {
                pl: 'Wzniesiona w 1905 roku przy dzisiejszej ulicy Wieniawskiego 28 rezydencja powszechnie znana jest jako Willa Zeitlera. Budynek powstał na zamówienie Zeitlera – szczecińskiego komornika sądowego (Gerichtsvollzieher), który na miejsce swojego domu wybrał prestiżową, prężnie rozwijającą się dzielnicę Westend (dzisiejsze Pogodno).',
                de: 'Die 1905 an der heutigen Wieniawskiego-Straße 28 errichtete Residenz ist allgemein als Villa Zeitler bekannt. Das Gebäude entstand im Auftrag von Zeitler – einem Stettiner Gerichtsvollzieher, der für sein Haus das prestigeträchtige, schnell wachsende Westend (heute Pogodno) wählte.',
                en: 'The residence built in 1905 at today’s ul. Wieniawskiego 28 is widely known as Villa Zeitler. The house was commissioned by Zeitler — a Szczecin court bailiff (Gerichtsvollzieher) — who chose the prestigious, rapidly developing district of Westend (today’s Pogodno) as the place for his home.',
                ua: 'Резиденцію, зведену 1905 року на сьогоднішній вулиці Венявського, 28, загалом знають як Віллу Цайтлера. Будівлю звели на замовлення Цайтлера — щецинського судового виконавця (Gerichtsvollzieher), який обрав для свого будинку престижний, динамічний район Westend (сьогоднішнє Погодно).'
            }
        },
        {
            heading: {
                pl: 'Projekt Carla Lutza – klasycyzm w czystej formie',
                de: 'Entwurf von Carl Lutz – Klassizismus in reiner Form',
                en: 'Carl Lutz’s design — classicism in pure form',
                ua: 'Проєкт Карла Люца — класицизм у чистій формі'
            },
            body: {
                pl: 'Za projekt tej eleganckiej posiadłości odpowiadał znany szczeciński architekt Carl Lutz. W przeciwieństwie do wielu okolicznych domów o urozmaiconych, romantycznych kształtach i zdobieniach z „muru pruskiego”, dom komornika wyróżnia się stonowanym duchem klasycyzmu. Charakteryzuje go zwięzła, symetryczna bryła, surowa harmonia proporcji oraz reprezentacyjny charakter, odpowiadający statusowi i pozycji zawodowej inwestora.',
                de: 'Für den Entwurf dieses eleganten Anwesens verantwortlich war der bekannte Stettiner Architekt Carl Lutz. Im Gegensatz zu vielen umliegenden Häusern mit abwechslungsreichen, romantischen Formen und Verzierungen aus dem „Fachwerk“ hebt sich das Haus des Gerichtsvollziehers durch einen zurückhaltenden Geist des Klassizismus ab. Es zeichnet sich durch einen kompakten, symmetrischen Baukörper, strenge Harmonie der Proportionen und einen repräsentativen Charakter aus, der dem Status und der beruflichen Stellung des Auftraggebers entspricht.',
                en: 'The design of this elegant property is the work of the well-known Szczecin architect Carl Lutz. Unlike many neighbouring houses with varied, romantic shapes and “half-timbered” decoration, the bailiff’s house stands out in a restrained spirit of classicism. It is characterised by a compact, symmetrical volume, an austere harmony of proportions and a representative character befitting the status and professional standing of its patron.',
                ua: 'Проєкт цієї елегантної садиби створив відомий щецинський архітектор Карл Люц. На відміну від багатьох сусідніх будинків із різноманітними, романтичними формами та оздобленням із «фахверку», будинок виконавця вирізняється стриманим духом класицизму. Його характеризують лаконічна симетрична маса, сувора гармонія пропорцій та представницький характер, що відповідає статусу і професійному становищу замовника.'
            }
        },
        {
            heading: {
                pl: 'Przedwojenna zabudowa urzędnicza',
                de: 'Vorkriegsbebauung von Beamtenhäusern',
                en: 'Pre-war officials’ housing',
                ua: 'Довоєнна службова забудова'
            },
            body: {
                pl: 'Dziś zabytkowa Willa Zeitlera stanowi doskonały przykład przedwojennej, urzędniczej zabudowy rezydencjonalnej i jest ważnym punktem na architektonicznej mapie szczecińskiego Pogodna.',
                de: 'Die denkmalgeschützte Villa Zeitler ist heute ein ausgezeichnetes Beispiel für die vorkriegszeitliche, beamtische Residenzbebauung und ein wichtiger Punkt auf der architektonischen Karte des Stettiner Pogodno.',
                en: 'Today the listed Villa Zeitler stands as an excellent example of pre-war officials’ residential architecture and is an important point on the architectural map of Szczecin’s Pogodno.',
                ua: 'Сьогодні пам\'яткова Вілла Цайтлера — чудовий приклад довоєнної представницької забудови для службовців і важливий пункт на архітектурній мапі щецинського Погодно.'
            }
        }
    ],
    conclusion: {
        pl: 'Willa Zeitlera to jeden z najlepiej zachowanych przykładów przedwojennej, urzędniczej zabudowy rezydencjonalnej na Pogodnie — niewielka, symetryczna bryła, która wciąż reprezentuje status swojego pierwszego właściciela.',
        de: 'Die Villa Zeitler ist eines der besten erhaltenen Beispiele für die vorkriegszeitliche, beamtische Residenzbebauung in Pogodno – ein kleiner, symmetrischer Baukörper, der bis heute den Status seines ersten Besitzers verkörpert.',
        en: 'Villa Zeitler is one of the best-preserved examples of pre-war officials’ residential architecture in Pogodno — a compact, symmetrical volume that still embodies the status of its first owner.',
        ua: 'Вілла Цайтлера — один із найкраще збережених прикладів довоєнної представницької забудови в Погодно: компактна симетрична маса, що досі втілює статус свого першого власника.'
    },
    gallery: [
        {
            src: 'Photos/wieniawskiego-zeitler/P1830775.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830776.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830777.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830778.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830779.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830780.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830781.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830782.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830783.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        },
        {
            src: 'Photos/wieniawskiego-zeitler/P1830784.webp',
            caption: {
                pl: 'Zdjęcie — Willa Zeitlera – Wieniawskiego 28',
                de: 'Foto — Villa Zeitler – Wieniawskiego 28',
                en: 'Photo — Villa Zeitler – Wieniawskiego 28',
                ua: 'Фото — Вілла Цайтлера – Венявського 28'
            }
        }
    ]
};
