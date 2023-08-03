import {Article} from "../../Article";
import PlaceCard from "../../PlaceCard";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

interface Props {
    currentArticle: Article
}

const ArticleFeatured = ({currentArticle}: Props) => {
    const articleDb = useSelector((state: RootState) => state.globalStates.articleDatabase)
    return (
        currentArticle.placeReferences.length > 0 ?
            <div className={"article-reference"}>
                <div className={"article-reference-title"}>Featured Places</div>
                <div className={"article-reference-info-boxes"}>
                    {
                        currentArticle?.placeReferences.map(reference => {
                                const findArticle = articleDb.find(article => article.id === reference.place.article)
                                return <PlaceCard key={`article-featured-place-card-${reference.place.identifier}`}
                                                  place={reference.place} article={findArticle ?? null}/>
                            }
                        )
                    }
                </div>
            </div>
            : <></>
    )
}

export default ArticleFeatured