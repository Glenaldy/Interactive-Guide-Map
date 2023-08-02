import React from "react";
import {setClickedPlace, setHoveredPlace} from "../redux/placeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Place} from "./Place";
import {Article} from "./Article";
import PlaceCard from "./PlaceCard";
import PlaceCardHeader from "./PlaceCardHeader";

interface Props {
    place: Place,
    article: Article | null
}

const CustomInfoBox = ({place, article}: Props) => {
    const dispatch = useDispatch()
    const placeMapOpen = useSelector((state: RootState) => state.globalStates.placeMapOpen)

    return (
        <div
            id={"mapMarker" + place.id}
            className="info-box-marker"
            onMouseOver={() => dispatch(setHoveredPlace(place.id))}
            onMouseLeave={() => dispatch(setHoveredPlace(null))}
        >
            {
                (placeMapOpen && placeMapOpen.id === place.id) && place.article !== -1 ?
                    /**
                     * IF place = open, Show info-box
                     */
                    <>
                        <button type="button" className="info-box-close btn-close" aria-label="Close"
                                onClick={() => {
                                    dispatch(setClickedPlace(null))
                                    dispatch(setHoveredPlace(null))
                                }
                                }/>
                        <PlaceCard place={place} article={article}></PlaceCard>
                    </> :
                    /**
                     * IF place != open, Show only header
                     */
                    <div className={"info-box card"}>
                        <PlaceCardHeader place={place} showType={false}></PlaceCardHeader>
                    </div>
            }
        </div>
    )
}

export default CustomInfoBox