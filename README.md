# Driftly-Pogodno

Interaktywna strona o Pogodnie — szlaki, galeria, mapa i historia dawnego kąpieliska MKS Pogoń.

## Rozwój

```bash
npm install
npm run dev       # serwer deweloperski Vite
npm run build     # tsc + vite build
npm run preview   # podgląd zbudowanej aplikacji
```

## Stack

- React 18 + TypeScript (strict)
- React Router (SPA)
- react-leaflet / Leaflet
- Własny, lekki system tłumaczeń (pl / de / en / ua), język zapisywany w `localStorage.driftly_lang`

## Trasy

| Trasa               | Strona                              |
| ------------------- | ----------------------------------- |
| `/`                 | Strona główna                       |
| `/gallery`          | Galeria                             |
| `/map`              | Mapa z punktami                     |
| `/225e41a4ad.html`  | Strona Basenów Pogoni (odblokowywana kodem QR) |

## Wdrożenie (ważne)

Aplikacja to SPA — odwołania do `/225e41a4ad.html` (kody QR / linki w mapie) muszą trafiać do `index.html`. Na GitHub Pages wystarczy opublikować w katalogu `dist` również `404.html` będący kopią `index.html` (fallback dla SPA). Na Netlify/Vercel użyj reguły przepisywania (`/* /index.html 200`).

Jeśli strona ma być hostowana nie w katalogu głównym (np. GitHub Pages pod `/Driftly-Pogodno/`), ustaw `VITE_ROUTER_BASENAME=/Driftly-Pogodno` podczas budowania.