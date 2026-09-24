import type { PointSiteConfig } from './types';
import { basenyPogoni } from './BasenyPogoni';
import { abramowskiego4 } from './Abramowskiego4';
import { domyMickiewicza } from './DomyMickiewicza';
import { dworzecPkp } from './DworzecPkp';
import { gieldaSamochodowa } from './GieldaSamochodowa';
import { glediczjaKarlowicza } from './GlediczjaKarlowicza';
import { korfantegoBoiska } from './KorfantegoBoiska';
import { korfantegoMalarz } from './KorfantegoMalarz';
import { koziejowskiego } from './Koziejowskiego';
import { lodyMickiewicza } from './LodyMickiewicza';
import { mickiewicza69 } from './Mickiewicza69';
import { mostAkademicki } from './MostAkademicki';
import { osMickiewicza } from './OsMickiewicza';
import { punktPrzesiedlenia } from './PunktPrzesiedlenia';
import { stadionPogoni } from './StadionPogoni';
import { szewc } from './Szewc';
import { uniwersytetMickiewicza } from './UniwersytetMickiewicza';
import { wydzialEkonomiczny } from './WydzialEkonomiczny';

export const pointSites: PointSiteConfig[] = [
    basenyPogoni,
    dworzecPkp,
    mostAkademicki,
    wydzialEkonomiczny,
    stadionPogoni,
    glediczjaKarlowicza,
    gieldaSamochodowa,
    abramowskiego4,
    koziejowskiego,
    osMickiewicza,
    lodyMickiewicza,
    szewc,
    domyMickiewicza,
    mickiewicza69,
    uniwersytetMickiewicza,
    punktPrzesiedlenia,
    korfantegoBoiska,
    korfantegoMalarz
];

export function getPointSiteByPath(path: string): PointSiteConfig | undefined {
    return pointSites.find((point) => point.path === path);
}

export function getPointSiteById(id: number): PointSiteConfig | undefined {
    return pointSites.find((point) => point.id === id);
}