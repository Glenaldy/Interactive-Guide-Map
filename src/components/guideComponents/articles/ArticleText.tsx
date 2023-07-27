import React from "react";
import {Article} from "../../Article";
import reactStringReplace from "react-string-replace";
import SpecialText from "./SpecialText";
import PlaceCard from "../../PlaceCard";

interface Props {
    currentArticle: Article
}

const ArticleText = ({currentArticle}: Props) => {

    return (
        <div className={"article-text"}>
            <div className="current-article-body">
                {reactStringReplace(currentArticle.content, /({place_[a-zA-Z_-]*})/g, (match, i) => {
                    const placeReference = currentArticle?.placeReferences.find(place => place.reference === match)
                    console.log(match)
                    return placeReference ?
                        <SpecialText
                            key={`place-span-key_${placeReference.reference}`}
                            reference={placeReference}/>
                        : ''
                })}
            </div>
        </div>
    )
}

export default ArticleText