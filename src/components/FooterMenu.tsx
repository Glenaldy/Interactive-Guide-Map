import React from "react";
import {Place} from "./Place";
import {forEach} from "react-bootstrap/ElementChildren";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentArticle} from "../redux/placeSlice";
import {RootState} from "../redux/store";

interface Props {
    title: String
    listOfPlace: Array<Place>

}

const FooterMenu = ({title, listOfPlace}: Props) => {
    const dispatch = useDispatch()

    const handleMenuClick = (placeId: number) => {
        dispatch(setCurrentArticle(placeId))
    }

    return (
        <div className={"footer-menu"}>
            <div className={"footer-menu-title"}>{title}</div>
            <div className={"footer-menu-items"}>
                {
                    listOfPlace.map(place =>
                        place.article != -1 &&
                        <div
                            className={"footer-menu-item cursor-click"}
                            onClick={() => handleMenuClick(place.article)}
                        >{place.name}</div>
                    )
                }
            </div>
        </div>
    )
}

export default FooterMenu