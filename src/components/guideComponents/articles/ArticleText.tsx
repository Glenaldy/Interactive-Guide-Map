import React from "react";
import {Article} from "../../Article";
import reactStringReplace from "react-string-replace";
import SpecialText from "./SpecialText";
import PlaceCard from "../../PlaceCard";

interface Props {
    currentArticle: Article
}

const ArticleText = ({currentArticle}: Props) => {
    const lines = currentArticle.content.split('\n');

    return (
        <div className={"article-text"}>
            <div className="current-article-body">
                {lines.map((line, index) => (
                    <p className={"current-article-text"} key={index}>
                        {reactStringReplace(line, /({place_[a-zA-Z_-]*})/g, (match, i) => {
                            const placeReference = currentArticle?.placeReferences.find(place => place.reference === match)
                            console.log(match)
                            return placeReference ?
                                <SpecialText
                                    key={`place-span-key_${placeReference.reference}`}
                                    reference={placeReference}/>
                                : ''
                        })}
                    </p>
                ))}


            </div>
        </div>
    )
}

export default ArticleText