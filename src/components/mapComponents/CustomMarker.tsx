import {Place} from "../Place";
import {InfoBox, InfoBoxF, PolygonF} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import {Article} from "../Article";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import CustomInfoBox from "../CustomInfoBox";
import {PlaceType} from "../../PlaceType";

interface Props {
    place: Place;
    article: Article | null;
}

const CustomMarker = ({place, article}: Props) => {
    const hoveredPlace = useSelector((state: RootState) => state.globalStates.hoveredPlace)
    const placeMapOpen = useSelector((state: RootState) => state.globalStates.placeMapOpen)
    const zoomLevel = useSelector((state: RootState) => state.globalStates.zoomLevel)
    const currentArticle = useSelector((state: RootState) => state.globalStates.currentArticle)
    const showingCurrentArticlePlace = currentArticle && currentArticle.place ? currentArticle.place.id === place.id : false

    const [infoBoxVisible, setInfoBoxVisible] = useState(false);

    let showOrNot: boolean
    switch (place.type) {
        case PlaceType.Region:
            showOrNot = zoomLevel <= 7;
            break;
        case PlaceType.Prefecture:
            showOrNot = zoomLevel > 7 && zoomLevel <= 10;
            break;
        case PlaceType.City:
            showOrNot = zoomLevel > 10 && zoomLevel <= 12;
            break;
        default:
            showOrNot = zoomLevel >= 12;
            break;
    }
    if ((placeMapOpen && placeMapOpen.id === place.id) || (hoveredPlace && hoveredPlace.id === place.id)) showOrNot = true

    useEffect(() => {
        setInfoBoxVisible(true);
    }, [showOrNot]);


    return (
        // infoBoxVisible &&
        <InfoBox
            key={"infobox" + place.id}
            options={{
                closeBoxURL: '',
                enableEventPropagation: true,
                pixelOffset: new window.google.maps.Size(-35, -10),
                visible: (showOrNot || showingCurrentArticlePlace)
            }}
            position={new google.maps.LatLng(place.pos)}
            zIndex={
                showingCurrentArticlePlace ? 999
                    : (hoveredPlace && hoveredPlace.id === place.id) ? 999
                        : (placeMapOpen && placeMapOpen.id === place.id) ? 998
                            : (place.article >= 0) ? 997 : 0
            }

        >
            {/** Show according to ZOOM for info-box*/
                (showOrNot || showingCurrentArticlePlace) ?
                    <>
                        <div
                            className={"info-box-triangle"}>
                            <div className={`
                            ${(hoveredPlace && hoveredPlace.id === place.id) && "color-mark "}
                            ${(place.article == -1) && "no-article"}
                            ${showingCurrentArticlePlace && "current-article"}
                            `}
                            ></div>
                        </div>
                        <CustomInfoBox place={place} article={article}/>
                        {
                            /** Show Polygon (Area) if it's hovered / open */
                            ((hoveredPlace && hoveredPlace.id === place.id)
                                || (placeMapOpen && placeMapOpen.id === place.id)) &&
                            <PolygonF paths={place.area}/>
                        }
                    </>
                    :
                    <></>
            }
        </InfoBox>
        // <></>
    )

}

export default CustomMarker;