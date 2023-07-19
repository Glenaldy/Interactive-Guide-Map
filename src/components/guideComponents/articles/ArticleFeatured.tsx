import {Article} from "../../Article";
import reactStringReplace from "react-string-replace";
import PlaceSpanReference from "./PlaceSpanReference";
import PlaceCard from "../../PlaceCard";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

interface Props {
    currentArticle: Article
}

const ArticleReference = ({currentArticle}: Props) => {
    const articleDb = useSelector((state: RootState) => state.globalStates.articleDatabase)
    return (
        currentArticle.placeReferences.length > 0 ?
            <div className={"article-reference"}>
                <div className={"article-reference-title"}>Featured Places</div>
                <div className={"article-reference-info-boxes"}>
                    {
                        currentArticle?.placeReferences.map(reference => {
                                const asd = articleDb.find(article => article.id === reference.place.article)
                                console.log(reference.place)
                                return <PlaceCard place={reference.place} article={asd ?? null}/>
                            }
                        )
                    }
                </div>
            </div>
            : <></>
    )
}

export default ArticleReference