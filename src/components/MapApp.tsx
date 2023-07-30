import {GoogleMap, Polygon, useGoogleMap} from "@react-google-maps/api";
import React, {useEffect, useRef, useState} from "react";
import {Article} from "./Article";
import {Place} from "./Place";
import CustomMarker from "./mapComponents/CustomMarker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setMapCenter, setZoomLevel} from "../redux/placeSlice";

interface Props {
    places: Array<Place>;
    articles: Array<Article>;
}

const Map: React.FC<Props> = React.memo(({places, articles}) => {
    const dispatch = useDispatch();
    const [mapReference, setMapReference] = React.useState<google.maps.Map>()
    const mapCenter = useSelector((state: RootState) => state.globalStates.mapCenter);
    const zoomLevel = useSelector((state: RootState) => state.globalStates.zoomLevel);

    useEffect(() => {
        mapReference?.panTo(mapCenter)
        console.log(mapCenter)
    }, [mapCenter])
    const handleZoomChanged = () => {
        dispatch(setZoomLevel(mapReference?.getZoom() ?? 10))
    };
    const handleCenterChanged = () => {
        dispatch(setMapCenter({
            lat: mapReference?.getCenter()?.lat() ?? mapCenter.lat,
            lng: mapReference?.getCenter()?.lng() ?? mapCenter.lng
        }))
    };


    return (
        <GoogleMap
            onLoad={(map) => {
                setMapReference(map)
                dispatch(setZoomLevel(map.getZoom() ?? zoomLevel))
            }}
            options={{center:mapCenter}}
            center={mapCenter}
            zoom={zoomLevel}
            clickableIcons={false}
            mapContainerStyle={{height: "100%", width: "100%"}}
            onZoomChanged={handleZoomChanged}
            onDragEnd={handleCenterChanged}
        >
            {places.map((place) => (
                <CustomMarker
                    key={place.id}
                    place={place}
                    article={articles.find((article) => article.id === place.article)!}
                />
            ))}
        </GoogleMap>
    );
});

// options={{mapId: "bc882b6cfcc68bd6"}}

export default Map;