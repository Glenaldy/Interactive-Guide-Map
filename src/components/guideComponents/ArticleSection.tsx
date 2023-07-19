import React, {LegacyRef} from "react";
import ArticleSubheader from "./articles/ArticleSubheader";
import ArticleHeader from "./articles/ArticleHeader";
import ArticleImages from "./articles/ArticleImages";
import ArticleText from "./articles/ArticleText";
import {Article} from "../Article";
import ArticleFeatured from "./articles/ArticleFeatured";

interface Props {
    currentArticle: Article
}

const ArticleSection = ({currentArticle}: Props) => {
    return (
        <div className={"guide-article max-width-section"}>
            <ArticleHeader currentArticle={currentArticle}></ArticleHeader>
            <ArticleSubheader currentArticle={currentArticle}></ArticleSubheader>
            <ArticleImages currentArticle={currentArticle}></ArticleImages>
            <ArticleText currentArticle={currentArticle}></ArticleText>
            <ArticleFeatured currentArticle={currentArticle}></ArticleFeatured>
        </div>

    )
}

export default ArticleSection