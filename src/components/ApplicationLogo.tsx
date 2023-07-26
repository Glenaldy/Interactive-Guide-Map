import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentArticle} from "../redux/placeSlice";
import {RootState} from "../redux/store";

interface Props {
    full: boolean
}

const ApplicationLogo = ({full}: Props) => {
    const dispatch = useDispatch()
    return (
        <div className={"application-logo cursor-click"} onClick={() =>
            dispatch(setCurrentArticle(null))
        }>
            {full ?
                <img src={"logo-full.svg"} className={"logo"}/> :
                <img src={"logo.svg"} className={"logo"}/>
            }

        </div>
    )
}

export default ApplicationLogo