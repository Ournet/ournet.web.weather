
import * as React from 'react';
import { Place } from "@ournet/api-client";
import { Component } from "react";
import { PlaceHelper } from "../../../data/places/place-helper";
import { IRootViewModel } from '../../../view-models/root-view-model';

export type PlacesListViewData = {
    root: IRootViewModel
    places: Place[]
}

export default class PlacesListComponent extends Component<PlacesListViewData> {
    render() {
        const { places, root } = this.props;
        const { links, lang } = root;
        const linkParams = { ul: lang };

        const items = places.map(place => {
            let link: JSX.Element
            let adm1: JSX.Element
            if (place.featureClass === 'A') {
                link = <a href={links.weather.places.byAdm1(place.admin1Code, linkParams)}>{PlaceHelper.getName(place, lang)}</a>
            } else {
                link = <a href={links.weather.place(place.id.toString(), linkParams)}>{PlaceHelper.getName(place, lang)}</a>
                if (place.admin1) {
                    adm1 = <div>{PlaceHelper.shortAdm1Name(place.admin1, lang)}</div>
                }
            }
            return (
                <div key={place.id} className='c-list-places__i o-layout__item u-1/2 u-1/3@tablet u-1/4@desktop'>
                    {link}
                    {adm1}
                </div>
            );
        })

        return (
            <div className='o-layout c-list-places'>
                {items}
            </div>
        )
    }
}
