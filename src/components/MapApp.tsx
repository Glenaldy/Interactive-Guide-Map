import {GoogleMap, InfoBoxF, InfoWindow, InfoWindowF, useLoadScript} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import {Article} from "./Article";
import {Place} from "./Place";
import CustomMarker from "./mapComponents/CustomMarker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setMap, setMapCenter, setZoomLevel} from "../redux/placeSlice";

interface Props {
    // places: Array<Place>;
    // articles: Array<Article>;
}

const Map = (({}: Props) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY!,
        language: "en"
    });
    const dispatch = useDispatch();
    const [mapReference, setMapReference] = React.useState<google.maps.Map>()
    const mapCenter = useSelector((state: RootState) => state.globalStates.mapCenter);
    const zoomLevel = useSelector((state: RootState) => state.globalStates.zoomLevel);
    const places = useSelector((state: RootState) => state.globalStates.placeDatabase);
    const articles = useSelector((state: RootState) => state.globalStates.articleDatabase);

    useEffect(() => {
        mapReference?.panTo(mapCenter)
    }, [mapCenter])
    const handleZoomChanged = () => {
        dispatch(setZoomLevel(mapReference?.getZoom() ?? 10))
    };
    const recordCurrentCenter = () => {
        dispatch(setMapCenter({
            lat: mapReference?.getCenter()?.lat() ?? mapCenter.lat,
            lng: mapReference?.getCenter()?.lng() ?? mapCenter.lng
        }))
    };

    if (!isLoaded || places.length === 0 || articles.length === 0) {
        return <div>Loading...</div>;
    }


    return (
        <GoogleMap
            onLoad={(mapRef) => {
                setMapReference(mapRef)
                dispatch(setMap(mapRef))
                mapRef.setCenter(new google.maps.LatLng({lat: 35.0116, lng: 135.7681}))
                mapRef.setZoom(6)
                dispatch(setZoomLevel(mapRef.getZoom() ?? zoomLevel))
                recordCurrentCenter()
            }}
            options={{center: mapCenter}}
            // center={mapCenter}
            zoom={zoomLevel}
            clickableIcons={false}
            mapContainerStyle={{height: "100%", width: "100%"}}
            onZoomChanged={handleZoomChanged}
            onDragEnd={recordCurrentCenter}
        >
            {
                places.map((place) => (
                    <CustomMarker
                        key={place.id}
                        place={place}
                        article={articles.find((article) => article.id === place.article) ?? null}
                    />
                ))
            }
        </GoogleMap>
    );
});

// options={{mapId: "bc882b6cfcc68bd6"}}

export default Map;