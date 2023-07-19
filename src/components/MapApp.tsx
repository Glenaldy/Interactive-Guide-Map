import {GoogleMap, Polygon, useGoogleMap} from "@react-google-maps/api";
import React, {useRef, useState} from "react";
import {Article} from "./Article";
import {Place} from "./Place";
import CustomMarker from "./mapComponents/CustomMarker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setZoomLevel} from "../redux/placeSlice";

interface Props {
    places: Array<Place>;
    articles: Array<Article>;
}

const Map: React.FC<Props> = React.memo(({places, articles}) => {
    const dispatch = useDispatch();
    const [map, setMap] = React.useState<google.maps.Map>()
    const mapCenter = useSelector((state: RootState) => state.globalStates.mapCenter);
    const zoomLevel = useSelector((state: RootState) => state.globalStates.zoomLevel);

    const handleZoomChanged = () => {
        dispatch(setZoomLevel(map?.getZoom() ?? 10))
    };

    return (
        <GoogleMap
            onLoad={(map) => {
                setMap(map)
            }}
            clickableIcons={false}
            center={mapCenter}
            zoom={zoomLevel}
            mapContainerStyle={{height: "100%", width: "100%"}}
            onZoomChanged={handleZoomChanged}
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