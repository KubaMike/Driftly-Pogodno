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
import { fotografKonopnickiej } from './FotografKonopnickiej';
import { jakubaWujka } from './JakubaWujka';
import { kwiaciarniaLukasinskiego } from './KwiaciarniaLukasinskiego';
import { szkolaSiemiradzkiego } from './SzkolaSiemiradzkiego';
import { wzgorzeNapoleona } from './WzgorzeNapoleona';
import { biancafe } from './Biancafe';
import { budynekRadyOsiedla } from './BudynekRadyOsiedla';
import { dawneTerenyWojskoweJanickiego } from './DawneTerenyWojskoweJanickiego';
import { domGalczynskiego } from './DomGalczynskiego';
import { domHugoLemcke } from './DomHugoLemcke';
import { domWologoska } from './DomWologoska';
import { dyrekcjaBibliotek } from './DyrekcjaBibliotek';
import { stadionHitlerjugend } from './StadionHitlerjugend';
import { fryzjerWieniawskiego } from './FryzjerWieniawskiego';
import { gazowniaMickiewicza } from './GazowniaMickiewicza';
import { kosciolSwietegoKrzyza } from './KosciolSwietegoKrzyza';
import { lelewelaMakuszynskiego } from './LelewelaMakuszynskiego';
import { ochronaSrodowiskaJakubaWujka } from './OchronaSrodowiskaJakubaWujka';
import { osiedleSomosierry } from './OsiedleSomosierry';
import { ostrzalyLukasinskiego } from './OstrzalyLukasinskiego';
import { placPawlowskiego } from './PlacPawlowskiego';
import { somosierryLukasinskiego } from './SomosierryLukasinskiego';
import { sp3Reymonta } from './SP3Reymonta';
import { sp48Czorsztynska } from './SP48Czorsztynska';
import { terenJednostkiRadzieckiej } from './TerenJednostkiRadzieckiej';
import { wieniawskiegoZoltyDom } from './WieniawskiegoZoltyDom';
import { wieniawskiegoZameczek } from './WieniawskiegoZameczek';
import { wiezaSpadochronowa } from './WiezaSpadochronowa';
import { zdobieniaKonopnickiej27 } from './ZdobieniaKonopnickiej27';
import { tygodniowyZlobek } from './TygodniowyZlobek';

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
    korfantegoMalarz,
    fotografKonopnickiej,
    jakubaWujka,
    kwiaciarniaLukasinskiego,
    szkolaSiemiradzkiego,
    wzgorzeNapoleona,
    biancafe,
    budynekRadyOsiedla,
    dawneTerenyWojskoweJanickiego,
    domGalczynskiego,
    domHugoLemcke,
    domWologoska,
    dyrekcjaBibliotek,
    stadionHitlerjugend,
    fryzjerWieniawskiego,
    gazowniaMickiewicza,
    kosciolSwietegoKrzyza,
    lelewelaMakuszynskiego,
    ochronaSrodowiskaJakubaWujka,
    osiedleSomosierry,
    ostrzalyLukasinskiego,
    placPawlowskiego,
    somosierryLukasinskiego,
    sp3Reymonta,
    sp48Czorsztynska,
    terenJednostkiRadzieckiej,
    wieniawskiegoZoltyDom,
    wieniawskiegoZameczek,
    wiezaSpadochronowa,
    zdobieniaKonopnickiej27,
    tygodniowyZlobek
];

export function getPointSiteByPath(path: string): PointSiteConfig | undefined {
    return pointSites.find((point) => point.path === path);
}

export function getPointSiteById(id: number): PointSiteConfig | undefined {
    return pointSites.find((point) => point.id === id);
}