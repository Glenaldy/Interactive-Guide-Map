import React from "react";
import {Article} from "../../Article";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentArticle, setMapCenter} from "../../../redux/placeSlice";
import {RootState} from "../../../redux/store";

interface Props {
}

const ArticleDefault = ({}: Props) => {
    const articles = useSelector((state: RootState) => state.globalStates.articleDatabase)

    const dispatch = useDispatch()
    return (
        <>
            <h1 className="current-article-title">Article List</h1>
            <ul>
                {articles.map(article => (
                    <li
                        onClick={() => {
                            dispatch(setCurrentArticle(article.id))
                            article.place && dispatch(setMapCenter(article.place.pos))
                        }}
                    >
                        {article.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ArticleDefault;