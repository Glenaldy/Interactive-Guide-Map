import React from "react";
import {setCurrentArticle} from "../../redux/placeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Place} from "../Place";

interface Props {
    placeId: number | null
}

const HistoryBar = () => {
    const dispatch = useDispatch()
    const currentArticle = useSelector((state: RootState) => state.globalStates.currentArticle)
    const placeDb = useSelector((state: RootState) => state.globalStates.placeDatabase)

    const HistoryNode = ({placeId}: Props) => {
        const place = placeDb.find(place => place.id === placeId)
        return (
            place ? (<div
                className={"guide-history-node"}
                onClick={() => dispatch(setCurrentArticle(place.article))}
            >{place.name}</div>) : <></>
        )

    }

    if (currentArticle && currentArticle.place) {
        console.log(currentArticle.place.region)
        console.log(currentArticle.place.prefecture)
        console.log(currentArticle.place.city)
    }
    return (
        <div className={"guide-history"}>
            {
                (currentArticle && currentArticle.place) && (
                    <>
                        <HistoryNode placeId={currentArticle.place.region}></HistoryNode>
                        <HistoryNode placeId={currentArticle.place.prefecture}></HistoryNode>
                        <HistoryNode placeId={currentArticle.place.city}></HistoryNode>
                    </>
                )
            }


        </div>
    )
}


export default HistoryBar