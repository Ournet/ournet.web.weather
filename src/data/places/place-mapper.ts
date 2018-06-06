import { IPlace } from "@ournet/places-domain";
import { Place } from "./place";

export class PlaceMapper {
    static fromDomainPlace(domainPlace: IPlace): Place {
        const {
            id,
            name,
            names,
            asciiname,
            admin1,
            admin1Code,
            featureClass,
            featureCode,
            countryCode,
            longitude,
            latitude,
            timezone,
        } = domainPlace;

        return {
            id,
            name,
            names,
            asciiname,
            admin1,
            admin1Code,
            featureClass,
            featureCode,
            countryCode,
            longitude,
            latitude,
            timezone,
        }
    }

    static fromDomainPlaces(domainPlaces: IPlace[]): Place[] {
        return domainPlaces.map(place => PlaceMapper.fromDomainPlace(place));
    }
}
