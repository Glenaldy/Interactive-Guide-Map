import {Place} from "../Place";
import {InfoBoxF, MarkerF, Polygon, PolygonF} from "@react-google-maps/api";
import React from "react";
import {Article} from "../Article";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setClickedPlace, setCurrentArticle, setHoveredPlace} from "../../redux/placeSlice";
import CustomInfoBox from "../CustomInfoBox";
import {PlaceType} from "../../PlaceType";

interface Props {
    place: Place;
    article: Article;
}

const CustomMarker = ({place, article}: Props) => {
    const hoveredPlace = useSelector((state: RootState) => state.globalStates.hoveredPlace)
    const placeMapOpen = useSelector((state: RootState) => state.globalStates.placeMapOpen)
    const zoomLevel = useSelector((state: RootState) => state.globalStates.zoomLevel)

    let showOrNot: boolean
    switch (place.type) {
        case PlaceType.Region:
            showOrNot = zoomLevel <= 9;
            break;
        case PlaceType.Prefecture:
            showOrNot = zoomLevel > 7 && zoomLevel <= 10;
            break;
        case PlaceType.City:
            showOrNot = zoomLevel > 10 && zoomLevel <= 12;
            break;
        default:
            showOrNot = zoomLevel >= 13;
            break;
    }

    if ((placeMapOpen && placeMapOpen.id === place.id) || (hoveredPlace && hoveredPlace.id === place.id)) showOrNot = true


    return (
        <InfoBoxF
            key={"infobox" + place.id}
            options={{
                closeBoxURL: '',
                enableEventPropagation: true,
                pixelOffset: new window.google.maps.Size(-35, -10)
            }}
            position={new google.maps.LatLng(place.pos)}
            zIndex={
                (hoveredPlace && hoveredPlace.id === place.id) ? 999
                    : (placeMapOpen && placeMapOpen.id === place.id) ? 998 : 0
            }

        >
            {
                /** Show according to ZOOM for info-box*/
                showOrNot ?
                    <>
                        <div
                            className={"info-box-triangle"}>
                            <div className={(hoveredPlace && hoveredPlace.id === place.id) ? "color-mark" : ""}></div>
                        </div>
                        <CustomInfoBox place={place} article={article}/>
                        {
                            /**
                             * Show Polygon (Area) if it's hovered / open
                             * */
                            ((hoveredPlace && hoveredPlace.id === place.id)
                                || (placeMapOpen && placeMapOpen.id === place.id)) &&
                            <PolygonF paths={place.area}/>
                        }
                    </> :
                    <></>
            }
        </InfoBoxF>
    )

}

export default CustomMarker;