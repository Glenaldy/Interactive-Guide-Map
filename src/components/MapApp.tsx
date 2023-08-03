import {GoogleMap, InfoBoxF, InfoWindow, InfoWindowF, useLoadScript} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import {Article} from "./Article";
import {Place} from "./Place";
import CustomMarker from "./mapComponents/CustomMarker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setMapCenter, setZoomLevel} from "../redux/placeSlice";

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
            onLoad={(map) => {
                setMapReference(map)
                map.setCenter(new google.maps.LatLng({lat: 35.0116, lng: 135.7681}))
                map.setZoom(6)
                dispatch(setZoomLevel(map.getZoom() ?? zoomLevel))
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
            {/*{<>*/}
            {/*    <InfoWindowF*/}
            {/*        options={{}}*/}
            {/*        position={new google.maps.LatLng({lat: 40.0116, lng: 135.7681})}*/}
            {/*    >*/}

            {/*        <div>Try enhancing your exploration by interacting with the bolded text within the guide. Hover your*/}
            {/*            mouse over it to get a preview of the reference's location on the map. Click on the special text*/}
            {/*            to reveal additional spatial information directly on the interactive map.*/}
            {/*        </div>*/}
            {/*    </InfoWindowF>*/}
            {/*</>*/}
            {/*}*/}
        </GoogleMap>
    );
});

// options={{mapId: "bc882b6cfcc68bd6"}}

export default Map;