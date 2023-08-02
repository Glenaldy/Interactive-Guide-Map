import React from "react";
import {PlaceReference} from "../../Article";
import {useDispatch} from "react-redux";
import {setClickedPlace, setHoveredPlace, setMapCenter, setZoomLevel} from "../../../redux/placeSlice";

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
    }

    return (
        <span
            className="special-text cursor-context"
            id={`place-span-reference_${reference.reference}`}
            onMouseEnter={() => handleMouseEnter(reference.place.id)}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
            // onDoubleClick={()=>{dispatch(setZoomLevel(reference.place.zoom))}}
        >
            {reference.text}
        </span>
    )
}

export default SpecialText