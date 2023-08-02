import React from "react";
import {Place} from "./Place";
import {useDispatch, useSelector} from "react-redux";
import {setClickedPlace, setHoveredPlace} from "../redux/placeSlice";
import {RootState} from "../redux/store";
import PlaceTypeLogo from "./PlaceTypeLogo";

interface Props {
    place: Place;
    showType: boolean;
}

const PlaceCardHeader = ({place, showType}: Props) => {
    const dispatch = useDispatch()
    const hoveredPlace = useSelector((state: RootState) => state.globalStates.hoveredPlace)
    const currentArticle = useSelector((state: RootState) => state.globalStates.currentArticle)
    const showingCurrentArticlePlace = currentArticle && currentArticle.place ? currentArticle.place.id === place.id : false

    return (
        <div
            className={`info-box-header card-body 
            ${(hoveredPlace && hoveredPlace.id === place.id) ? "color-mark " : ""} 
            ${(place.article == -1) && "no-article "}
            ${showingCurrentArticlePlace && "current-article"}
            `}
            onClick={() => dispatch(setClickedPlace(place))}
            onMouseOver={() => dispatch(setHoveredPlace(place.id))}
            onMouseLeave={() => dispatch(setHoveredPlace(null))}>
            <div className={"info-box-title card-title"}>{place.name}</div>

            {
                (showingCurrentArticlePlace || showType || (hoveredPlace && hoveredPlace.id === place.id)) &&
                <div className={"info-box-information card-text"}>
                    <PlaceTypeLogo placeType={place.type}></PlaceTypeLogo>
                    <span>{place.type}</span>
                </div>
            }

        </div>
    )
}

export default PlaceCardHeader