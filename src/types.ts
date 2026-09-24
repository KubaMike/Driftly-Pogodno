export type Lang = 'pl' | 'de' | 'en' | 'ua';

export type TranslationKey =
  | 'site_name'
  | 'intro'
  | 'tab_trails'
  | 'trails_info'
  | 'nav_gallery'
  | 'nav_map'
  | 'btn_explore'
  | 'sidebar_title'
  | 'lang_label'
  | 'gallery_caption_1'
  | 'gallery_caption_2'
  | 'gallery_caption_3'
  | 'gallery_caption_4'
  | 'gallery_caption_5'
  | 'gallery_caption_6'
  | 'gallery_alt_1'
  | 'gallery_alt_2'
  | 'gallery_alt_3'
  | 'gallery_alt_4'
  | 'gallery_alt_5'
  | 'gallery_alt_6'
  | 'map_point_0_title'
  | 'map_point_0_unlock'
  | 'map_link_text'
  | 'basenyPogoni_title'
  | 'basenyPogoni_intro'
  | 'history_title'
  | 'historical_note'
  | 'forgotten_pearl'
  | 'forgotten_pearl_desc'
  | 'beginnings'
  | 'beginnings_desc'
  | 'infrastructure'
  | 'infrastructure_desc'
  | 'fate'
  | 'fate_desc'
  | 'conclusion'
  | 'basen_szczecin_alt'
  | 'basen_wejscie_alt'
  | 'basen_60s_alt'
  | 'basen_1965_alt'
  | 'stadium_title'
  | 'stadium_intro'
  | 'gallery_title'
  | 'memories_title'
  | 'basenyPogoni_memory_1'
  | 'basenyPogoni_memory_2'
  | 'basenyPogoni_memory_3'
  | 'basenyPogoni_memory_4'
  | 'basenyPogoni_memory_5'
  | 'basenyPogoni_memory_6'
  | 'basenyPogoni_memory_7'
  | 'basenyPogoni_memory_8';

export interface GalleryImage {
  src: string;
  altKey: TranslationKey;
  captionKey: TranslationKey;
}

export interface DropPoint {
  id: number;
  coords: [number, number];
  titleKey: TranslationKey;
  url: string;
}