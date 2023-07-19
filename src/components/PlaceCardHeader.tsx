import React from "react";
import {Place} from "./Place";
import {useDispatch, useSelector} from "react-redux";
import {setClickedPlace, setHoveredPlace} from "../redux/placeSlice";
import {RootState} from "../redux/store";

interface Props {
    place: Place;
    showType: boolean;
}

const PlaceCardHeader = ({place, showType}: Props) => {
    const dispatch = useDispatch()
    const hoveredPlace = useSelector((state: RootState) => state.globalStates.hoveredPlace)

    return (
        <div
            className={`info-box-header card-body ${(hoveredPlace && hoveredPlace.id === place.id) ? "color-mark" : ""}`}
            onClick={() => dispatch(setClickedPlace(place))}
            onMouseOver={() => dispatch(setHoveredPlace(place.id))}
            onMouseLeave={() => dispatch(setHoveredPlace(null))}>
            <div className={"info-box-title card-title"}>{place.name}</div>

            {
                (showType || (hoveredPlace && hoveredPlace.id === place.id)) &&
                <div className={"info-box-information card-text"}>
                    <img src={`logos/${place.type}.svg`}
                         alt={"logos/alt.svg"}></img>
                    <span>{place.type}</span>
                </div>
            }

        </div>
    )
}

export default PlaceCardHeader