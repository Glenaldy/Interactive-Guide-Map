import React from "react";
import {PlaceType} from "../PlaceType";

interface Props {
    placeType: string
    className?: string
}

const PlaceTypeLogo = ({placeType, className}: Props) => {

    return (
        <img className={className ?? ""} src={`/logos/${placeType}.svg`}></img>
    )
}

export default PlaceTypeLogo