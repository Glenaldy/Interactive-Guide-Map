import React from "react";
import ApplicationLogo from "../ApplicationLogo";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface Props {
    onArticleOnly: () => void;
    onSplitView: () => void;
    onArticleShowClick: () => void;
    onHomeClick: () => void;
}

const GuideHeader = ({onArticleOnly, onSplitView, onArticleShowClick, onHomeClick}: Props) => {
    const splitOrientation = useSelector((state: RootState) => state.globalStates.splitOrientation)
    return (
        <div className={"guide-header"}>
            <div className={"header-pane-controller"}>
                <div className={"pane-controller pane-control-split cursor-click"} onClick={onSplitView}>
                    <img src={"split-view.svg"}/>
                </div>
                <div className={"pane-controller pane-control-full cursor-click"} onClick={onArticleOnly}>
                    <img src={"full-view.svg"}/>
                </div>
            </div>
            <div  onClick={onHomeClick}>
            <ApplicationLogo></ApplicationLogo>
            </div>
            {splitOrientation === "horizontal" &&
                <div onClick={onArticleShowClick}>SHOW FOOTER</div>
            }
        </div>
    )
}

export default GuideHeader