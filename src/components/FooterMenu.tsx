import React from "react";
import {Place} from "./Place";
import {forEach} from "react-bootstrap/ElementChildren";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentArticle, setMapCenter, setZoomLevel} from "../redux/placeSlice";
import {RootState} from "../redux/store";

interface Props {
    title: String
    listOfPlace: Array<Place>
    menuFooterClicked: () => void
}

const FooterMenu = ({title, listOfPlace, menuFooterClicked}: Props) => {
    const dispatch = useDispatch()
    const articleDb = useSelector((state: RootState) => state.globalStates.articleDatabase)

    const handleMenuClick = (articleId: number) => {
        const article = articleDb.find(found => found.id === articleId)
        article && article.place && dispatch(setZoomLevel(article.place.zoom))
        dispatch(setCurrentArticle(articleId))
    }

    return (
        <div className={"footer-menu"}>
            <div className={"footer-menu-title"}>{title}</div>
            <div className={"footer-menu-items"}>
                {
                    listOfPlace.map(place =>
                        place.article != -1 &&
                        <div
                            key={`footer-menu-item-${place.identifier}`}
                            className={"footer-menu-item cursor-click"}
                            onClick={() => {
                                handleMenuClick(place.article)
                                menuFooterClicked()
                            }}
                        >{place.name}</div>
                    )
                }
            </div>
        </div>
    )
}

export default FooterMenu