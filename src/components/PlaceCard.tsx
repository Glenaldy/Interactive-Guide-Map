import React from "react";
import {setClickedPlace, setCurrentArticle, setMapCenter, setZoomLevel} from "../redux/placeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Place} from "./Place";
import {Article} from "./Article";
import {Carousel} from "react-bootstrap";
import PlaceCardHeader from "./PlaceCardHeader";

interface Props {
    place: Place
    article: Article | null
}

const PlaceCard = ({place, article}: Props) => {
    const dispatch = useDispatch()
    const hoveredPlace = useSelector((state: RootState) => state.globalStates.hoveredPlace)

    return (
        article &&
        <div
            id={"mapMarker" + place.id}
            className={`info-box card ${(hoveredPlace && hoveredPlace.id === place.id) ? "color-mark" : ""}`}
            onClick={() => {
                dispatch(setClickedPlace(place))
                dispatch(setMapCenter(place.pos))
            }}
        >
            <PlaceCardHeader place={place} showType={true}></PlaceCardHeader>

            <div className={"info-box-body card-body"}>
                <p className={"info-box-subtitle"}>{article && article.subtitle}</p>
                <button
                    className={"btn btn-primary placeInfoBoxButton"}
                    onClick={() => {
                        dispatch(setCurrentArticle(place.article))
                        dispatch(setZoomLevel(15))
                        dispatch(setMapCenter(place.pos))
                    }}
                >Read more
                </button>
                <br/>
            </div>
            {
                article.images.length > 0 ?
                    <Carousel className={"info-box-img card-img-bottom"}>
                        {
                            article.images.map(image =>
                                <Carousel.Item key={"article-image-" + image.identifier}>
                                    <img className="d-block w-100"
                                         src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/images/${image.identifier}?api_key=${process.env.REACT_APP_BACKEND_SERVER_API_KEY}`}
                                         alt={image.title}
                                    />
                                </Carousel.Item>
                            )
                        }
                    </Carousel> :
                    <Carousel className={"info-box-img card-img-bottom"}>
                        <Carousel.Item>
                            <img className="d-block w-100"
                                 src={"placeholder.jpg"}
                                 alt={"image"}
                            />
                        </Carousel.Item>
                    </Carousel>
            }
        </div>
    )
}

export default PlaceCard