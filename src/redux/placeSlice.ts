import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Place} from "../components/Place";
import {Article} from "../components/Article";

interface GlobalStates {
    hoveredPlace: Place | null;
    placeMapOpen: Place | null;
    currentArticle: Article | null;
    mapCenter: { lat: number, lng: number }
    zoomLevel: number
    placeDatabase: Array<Place>
    articleDatabase: Array<Article>
    splitOrientation: "vertical" |"horizontal"
}

const initialState: GlobalStates = {
    hoveredPlace: null, placeMapOpen: null, currentArticle: null, mapCenter: {lat: 35.0116, lng: 135.7681},
    placeDatabase: [], articleDatabase: [], zoomLevel: 10, splitOrientation: "vertical"
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
            article?.place && (state.mapCenter = article.place.pos)
            article?.place && (state.zoomLevel = article.place.zoom)
        },
        setMapCenter: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.mapCenter = action.payload
        },
        setPlaceDatabase: (state, action: PayloadAction<Array<Place>>) => {
            state.placeDatabase = action.payload
        },
        setArticleDatabase: (state, action: PayloadAction<Array<Article>>) => {
            state.articleDatabase = action.payload
        },
        setZoomLevel: (state, action:PayloadAction<number>)=>{
            state.zoomLevel = action.payload
        },
        setSplitOrientation: (state, action:PayloadAction<"vertical" |"horizontal">)=>{
            state.splitOrientation = action.payload
        }
    }
})

export const {
    setHoveredPlace,
    setClickedPlace,
    setCurrentArticle,
    setMapCenter,
    setPlaceDatabase,
    setArticleDatabase,
    setZoomLevel,
    setSplitOrientation
} = placeSlice.actions;
export default placeSlice.reducer;