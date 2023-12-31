import React from "react";
import FooterMenu from "../FooterMenu";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import ApplicationLogo from "../ApplicationLogo";
import {Place} from "../Place";

interface Props {
    menuFooterClicked: () => void
}

const GuideFooter = ({menuFooterClicked}: Props) => {
    const listOfPlaces: Array<Place> = useSelector((state: RootState) => state.globalStates.placeDatabase)
    const splitOrientation = useSelector((state: RootState) => state.globalStates.splitOrientation)

    const findPlace = (searchString: string): Array<Place> => {
        return listOfPlaces.filter(place =>
            place.type === searchString
        )
    }
    const regions = findPlace("Region")
    const prefecture = findPlace("Prefecture")
    const cities = findPlace("City")
    const places = listOfPlaces.filter(place => {
        return !regions?.includes(place)
            && !prefecture?.includes(place)
            && !cities?.includes(place)
            && place.article >= 0
    })

    return (
        <div className={"guide-footer max-width-section"}>
            <div className={"footer-menu-section"}>
                <FooterMenu key={"region-footer-menu"} title={"Regions"} listOfPlace={regions}
                            menuFooterClicked={menuFooterClicked}></FooterMenu>
                <FooterMenu key={"prefecture-footer-menu"} title={"Prefectures"} listOfPlace={prefecture}
                            menuFooterClicked={menuFooterClicked}></FooterMenu>
                <FooterMenu key={"city-footer-menu"} title={"Cities"} listOfPlace={cities}
                            menuFooterClicked={menuFooterClicked}></FooterMenu>
                <FooterMenu key={"place-footer-menu"} title={"Featured Place"} listOfPlace={places.slice(0, 5)}
                            menuFooterClicked={menuFooterClicked}></FooterMenu>
            </div>
            {splitOrientation === "vertical" &&
                <div className={"footer-logo"}>
                    <ApplicationLogo full={splitOrientation === "vertical"}></ApplicationLogo>
                </div>
            }
        </div>
    )
}

export default GuideFooter