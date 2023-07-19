import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentArticle} from "../redux/placeSlice";
import {RootState} from "../redux/store";

interface Props {
}

const ApplicationLogo = ({}: Props) => {
    const dispatch = useDispatch()
    const splitOrientation = useSelector((state: RootState) => state.globalStates.splitOrientation)
    return (
        <div className={"application-logo cursor-click"} onClick={() =>
            dispatch(setCurrentArticle(null))
        }>
            {splitOrientation === "vertical" ?
                <img src={"logo-full.svg"} className={"logo"}/> :
                <img src={"logo.svg"} className={"logo"}/>
            }

        </div>
    )
}

export default ApplicationLogo