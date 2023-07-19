import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Article} from "../../Article";

interface Props {
    currentArticle: Article
}

const ArticleHeader = ({currentArticle}: Props) => {
    return (
        <div className={"article-header"}>
            <div className={"article-header-text"}>
                <div className={"article-title"}>{currentArticle.title}</div>
                <div className={"article-subtitle"}>{currentArticle.subtitle}</div>
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