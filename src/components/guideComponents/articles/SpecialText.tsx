import React from "react";
import {PlaceReference} from "../../Article";
import {Place} from "../../Place";
import {useDispatch, useSelector} from "react-redux";
import {
    setClickedPlace,
    setCurrentArticle,
    setHoveredPlace,
    setMapCenter,
    setZoomLevel
} from "../../../redux/placeSlice";
import {RootState} from "../../../redux/store";

interface Props {
    reference: PlaceReference
}

const SpecialText = ({reference}: Props) => {
    const dispatch = useDispatch()
    const handleMouseEnter = (item: number) => {
        dispatch(setHoveredPlace(item))
    }
    const handleMouseLeave = () => {
        dispatch(setHoveredPlace(null))
    }
    const handleMouseClick = () => {
        // When mouse clicked, place should be opened, and map should be centered

        dispatch(setClickedPlace(reference.place))
        dispatch(setMapCenter(reference.place.pos))
        dispatch(setZoomLevel(reference.place.zoom))
    }

    return (
        <span
            className="special-text cursor-context"
            id={`place-span-reference_${reference.reference}`}
            onMouseEnter={() => handleMouseEnter(reference.place.id)}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
        >
            {reference.text}
        </span>
    )
}

export default SpecialText