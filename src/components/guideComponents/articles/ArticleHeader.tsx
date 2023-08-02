import React from "react";
import {Article} from "../../Article";

interface Props {
    currentArticle: Article
}

const ArticleHeader = ({currentArticle}: Props) => {
    return (
        <div className={"article-header"}>
            <div className={"article-header-text"}>
                <span className={"article-title"}>{currentArticle.title}</span>
                <br/>
                <span className={"article-subtitle"}>{currentArticle.subtitle}</span>
            </div>
            <div className={"article-logo"}>
                {
                    currentArticle.place &&
                    <img src={`logos/${currentArticle.place.type}.svg`}
                         alt={"logos/alt.svg"}
                    ></img>
                }
            </div>
        </div>
    )
}

export default ArticleHeader