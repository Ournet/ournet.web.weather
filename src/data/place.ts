export type PlaceFeatureClassType = 'A' | 'H' | 'L' | 'P' | 'R' | 'S' | 'T' | 'U' | 'V';

export interface Place {
    id: number
    name?: string
    asciiname?: string
    names?: string
    latitude?: number
    longitude?: number
    featureClass?: PlaceFeatureClassType
    featureCode?: string
    countryCode?: string
    admin1Code?: string
    admin2Code?: string
    admin3Code?: string
    population?: number
    timezone?: string

    wikiId?: string
    // wiki?: IPlaceWiki
    admin1?: Place
}
