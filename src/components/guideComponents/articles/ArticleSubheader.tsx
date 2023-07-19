import React from "react";
import {Article} from "../../Article";

interface Props {
    currentArticle: Article
}

const ArticleSubheader = ({currentArticle}: Props) => {
    return (
        <>
            {
                currentArticle.ranking ?
                    <div className={"article-subheader"}>
                        <div className={"article-ranking"}><b>Ranking #{currentArticle.ranking}</b> of Japan</div>
                    </div> :
                    <></>
            }
        </>
    )
}
export default ArticleSubheader