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
| `/trails`           | Wszystkie szlaki na mapie           |
| `/225e41a4ad.html`  | Strona Basenów Pogoni (odblokowywana kodem QR) |

## Wdrożenie (ważne)

Aplikacja to SPA — serwer musi przepisywać nieistniejące ścieżki do `index.html`
(fallback), inaczej otwarcie linku z poziomu zewnętrznego (udostępniony URL, kod QR)
kończy się stroną 404 zamiast aplikacji. Fallback musi obejmować też pliki, których
nie ma na dysku — np. `/225e41a4ad.html` (kody QR), mimo rozszerzenia `.html`.

```nginx
# nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

```apache
# Apache (.htaccess)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

Na GitHub Pages wystarczy opublikować w katalogu `dist` również `404.html` będący
kopią `index.html` (build robi to automatycznie). Na Netlify/Vercel użyj reguły
przepisywania (`/* /index.html 200`).

**Ścieżki assetów muszą być bezwzględne.** Vite buduje z bazą `/` (asset-y typu
`/assets/index-*.js`), żeby świeże otwarcie zagnieżdżonej trasy (np.
`/trail/<id>`) działało. Wcześniejszy base `'./'` powodował, że taki link
prosił o `/trail/assets/...` → 404 → pusty (biały) ekran, podczas gdy nawigacja
wewnątrz aplikacji działała. Dlatego nie ustawiaj bazowej ścieżki na `'./'`.

Jeśli strona ma być hostowana nie w katalogu głównym (np. GitHub Pages pod
`/Driftly-Pogodno/`), ustaw `VITE_ROUTER_BASENAME=/Driftly-Pogodno/` podczas
budowania — zmienia ono jednocześnie bazę Vite i basename routera w
`src/main.tsx`, więc obie wartości zawsze są zgodne.