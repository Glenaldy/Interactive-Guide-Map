import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Place} from "../components/Place";
import {Article} from "../components/Article";
import {stat} from "fs";

interface GlobalStates {
    hoveredPlace: Place | null;
    placeMapOpen: Place | null;
    currentArticle: Article | null;
    mapCenter: { lat: number, lng: number }
    zoomLevel: number
    placeDatabase: Array<Place>
    articleDatabase: Array<Article>
    splitOrientation: "vertical" | "horizontal"
    map: google.maps.Map | undefined
}

const initialState: GlobalStates = {
    hoveredPlace: null, placeMapOpen: null, currentArticle: null, mapCenter: {lat: 35.0116, lng: 135.7681},
    placeDatabase: [], articleDatabase: [], zoomLevel: 6, splitOrientation: "vertical", map: undefined
}

const centerOffset = (zoomLevel: number, latLng: { lat: number, lng: number }, map: google.maps.Map | undefined): { lat: number, lng: number } => {
    if (map != undefined && map.getProjection() != undefined) {
        const scale = Math.pow(2, zoomLevel);
        const worldCoordinateCenter = map.getProjection()?.fromLatLngToPoint(new google.maps.LatLng(latLng));
        const pixelOffset = new google.maps.Point((-80 / scale) || 0, (100 / scale) || 0);

        if (worldCoordinateCenter == undefined) return latLng
        const worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        const newCenter = map.getProjection()?.fromPointToLatLng(worldCoordinateNewCenter);
        if (newCenter == undefined || newCenter == null) return latLng
        return ({lat: newCenter.lat(), lng: newCenter.lng()})
    }
    return latLng
}

export const placeSlice = createSlice({
    name: "globalStates",
    initialState,
    reducers: {
        setHoveredPlace: (state, action: PayloadAction<number | null>) => {
            const place = state.placeDatabase.find(place => place.id === action.payload) ?? null
            state.hoveredPlace = place
        },
        setClickedPlace: (state, action: PayloadAction<Place | null>) => {
            state.placeMapOpen = action.payload
        },
        setCurrentArticle: (state, action: PayloadAction<number | null>) => {
            const article = state.articleDatabase.find(article => article.id === action.payload) ?? null
            state.currentArticle = article
            state.placeMapOpen = null
            state.hoveredPlace = null
            article?.place && (state.placeMapOpen = article.place)
            article?.place && (state.mapCenter = centerOffset(state.zoomLevel, article.place.pos, state.map))
        },
        setMapCenter: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.mapCenter = centerOffset(state.zoomLevel, action.payload, state.map)
        },
        setMapCenterNoOffset: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.mapCenter = action.payload
        },
        setPlaceDatabase: (state, action: PayloadAction<Array<Place>>) => {
            state.placeDatabase = action.payload
        },
        setArticleDatabase: (state, action: PayloadAction<Array<Article>>) => {
            state.articleDatabase = action.payload
        },
        setZoomLevel: (state, action: PayloadAction<number>) => {
            state.zoomLevel = action.payload
        },
        setSplitOrientation: (state, action: PayloadAction<"vertical" | "horizontal">) => {
            state.splitOrientation = action.payload
        },
        setMap: (state, action: PayloadAction<google.maps.Map>) => {
            state.map = action.payload
        }
    }
})

export const {
    setHoveredPlace,
    setClickedPlace,
    setCurrentArticle,
    setMapCenter,
    setMapCenterNoOffset,
    setPlaceDatabase,
    setArticleDatabase,
    setZoomLevel,
    setSplitOrientation,
    setMap
} = placeSlice.actions;
export default placeSlice.reducer;