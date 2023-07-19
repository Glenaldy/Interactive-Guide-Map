import React from "react";
import {Article} from "../../Article";
import reactStringReplace from "react-string-replace";
import PlaceSpanReference from "./PlaceSpanReference";
import PlaceCard from "../../PlaceCard";

interface Props {
    currentArticle: Article
}

const ArticleText = ({currentArticle}: Props) => {

    return (
        <div className={"article-text"}>
            <div className="current-article-body">
                {reactStringReplace(currentArticle.content, /({[a-zA-Z0-9_]+})/g, (match, i) => {
                    const placeReference = currentArticle?.placeReferences.find(place => place.reference === match)
                    return placeReference ?
                        <PlaceSpanReference
                            key={`place-span-key_${placeReference.reference}`}
                            reference={placeReference}/>
                        : ''
                })}
            </div>
        </div>
    )
}

export default ArticleText