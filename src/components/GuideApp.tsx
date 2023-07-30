import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import ArticleDefault from "./guideComponents/articles/ArticleDefault";
import GuideHeader from "./guideComponents/GuideHeader";
import HistoryBar from "./guideComponents/HistoryBar";
import ArticleSection from "./guideComponents/ArticleSection";
import GuideFooter from "./guideComponents/GuideFooter";

interface Props {
    onArticleOnly: () => void;
    onSplitView: () => void;
}

const GuideApp = ({onArticleOnly, onSplitView}: Props) => {
    const currentArticle = useSelector((state: RootState) => state.globalStates.currentArticle)
    const splitOrientation = useSelector((state: RootState) => state.globalStates.splitOrientation)
    const [showArticleList, setShowArticleList] = useState<boolean>(false);
    const articleRef = useRef<HTMLDivElement | null>(null);

    // Scroll to top on click
    useEffect(() => {
        if (articleRef.current) {
            articleRef.current.scrollTop = 0;
            articleRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [currentArticle]);

    const handleClickArticleShow = () => {
        setShowArticleList(!showArticleList)
    }
    const handleClickHome = () => {
        setShowArticleList(false)
    }
    return (
        splitOrientation === "vertical" ?
            <div ref={articleRef} className="guideApp scroll-to-top-div">
                <GuideHeader
                    onSplitView={onSplitView}
                    onArticleOnly={onArticleOnly}
                    onArticleShowClick={handleClickArticleShow}
                    onHomeClick={handleClickHome}
                />
                <HistoryBar></HistoryBar>
                {
                    currentArticle ?
                        <ArticleSection currentArticle={currentArticle}></ArticleSection> :
                        <ArticleDefault></ArticleDefault>
                }
                <GuideFooter></GuideFooter>

            </div> :
            (showArticleList ?
                <div className="guideApp">
                    <GuideHeader
                        onSplitView={onSplitView}
                        onArticleOnly={onArticleOnly}
                        onArticleShowClick={handleClickArticleShow}
                        onHomeClick={handleClickHome}
                    />
                    <GuideFooter></GuideFooter>
                </div> :
                <div className="guideApp">
                    <GuideHeader
                        onSplitView={onSplitView}
                        onArticleOnly={onArticleOnly}
                        onArticleShowClick={handleClickArticleShow}
                        onHomeClick={handleClickHome}
                    />
                    <HistoryBar></HistoryBar>
                    {
                        currentArticle ?
                            <ArticleSection currentArticle={currentArticle}></ArticleSection> :
                            <ArticleDefault></ArticleDefault>
                    }
                    {/*<GuideFooter></GuideFooter>*/}

                </div>)


    )
}

export default GuideApp;