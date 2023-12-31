import React from "react";
import {PlaceReference} from "../../Article";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import ApplicationLogo from "../../ApplicationLogo";
import {Carousel} from "react-bootstrap";
import {PlaceType} from "../../../PlaceType";
import PlaceCard from "../../PlaceCard";
import PlaceTypeLogo from "../../PlaceTypeLogo";
import SpecialText from "./SpecialText";
import {Place} from "../../Place";

interface Props {
    placeType: string
}

const ArticleDefault = ({}) => {
    const placeDB = useSelector((state: RootState) => state.globalStates.placeDatabase)
    const place1 = placeDB.find(place => place.identifier === "place_temple_kinkakuji")
    const placeQuote1 = new PlaceReference("", "Kinkaku-ji (Golden temple)", place1 ?? new Place())
    const place2 = placeDB.find(place => place.identifier === "place_temple_ginkakuji")
    const placeQuote2 = new PlaceReference("", "Ginkaku-ji (Silver temple)", place2 ?? new Place())
    const place3 = placeDB.find(place => place.identifier === "city_kyoto")
    const placeQuote3 = new PlaceReference("", "Kyoto City", place3 ?? new Place())
    return (
        <div className={"guide-home guide-article max-width-section"}>
            <h1 className="home-title article-header">
                <ApplicationLogo full={true}></ApplicationLogo>
            </h1>
            <Carousel className={"home-images article-images"}>
                <Carousel.Item>
                    <img className="d-block w-100"
                         src={`/images-static/home1.png`}
                         alt={"logo"}
                    />
                    <Carousel.Caption>
                        <p>Design logo of the application</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                         src={`/images-static/home2.png`}
                         alt={"design desktop"}
                    />
                    <Carousel.Caption>
                        <p>Desktop design on Figma</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                         src={`/images-static/home3.png`}
                         alt={"logo"}
                    />
                    <Carousel.Caption>
                        <p>Mobile design on Figma</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className={"home-text"}>
                <p>Welcome to Waymark Japan, a unique application that combines an interactive map and a guide to
                    demonstrate how spatial information can enrich the textual content of a travel guide.</p>
                <p>Try enhancing your exploration by interacting with the bolded text within the guide. Hover your mouse
                    over it to get a preview of the reference's location on the map. Click on the special text to reveal
                    additional spatial information directly on the interactive map.</p>
                <p className={"quote-text"}><SpecialText reference={placeQuote3}/> served as Japan's capital and the
                    emperor's residence from 794 until
                    1868. It is one of the country's ten largest cities with a population of 1.5 million people and a
                    modern face. One of the most famous temple is <SpecialText reference={placeQuote1}/>, not to be
                    mistaken for <SpecialText reference={placeQuote2}/>.</p>
                <p>With this innovative feature, you can seamlessly navigate between textual context and spatial
                    representation, providing a deeper understanding of each location you encounter. Enjoy the
                    convenience and richness of information brought to you by Waymark Japan's special text.</p>
                <p>You can also drag and resize the map to suit your preferences, you can effortlessly focus on the
                    content that captivates you.
                    Simply grab the button between the guide and the map and move it to adjust the sizes as you desire.
                    Alternatively, use the convenient buttons on the header to instantly resize the elements to your
                    liking.</p>
                <p>Please note that this application is purely a proof of concept, and the accuracy of the information
                    presented in the guide or the map cannot be guaranteed. Our aim is to explore new possibilities and
                    enhance the user experience for travelers visiting Japan.</p>
                <p>We invite you to embark on a journey of discovery with Waymark Japan, and we hope you find it both
                    informative and enjoyable.</p>
            </div>
            <div className={"home-featured"}>
                {
                    Object.values(PlaceType).map(e => (
                        <FeatureType key={`Home-feature-${e}`} placeType={e}></FeatureType>))
                }

            </div>
        </div>
    )
}

const FeatureType = ({placeType}: Props) => {
    const articlesDB = useSelector((state: RootState) => state.globalStates.articleDatabase)
    const articles = articlesDB.filter(article => article.place && article.place.type === placeType)
    return (
        articles.length > 0 ? (
            <div className={"article-reference"}>
                <h1 className={"article-reference-title"}>
                    <PlaceTypeLogo placeType={placeType}></PlaceTypeLogo>
                    {placeType}
                </h1>
                <div className={"article-reference-info-boxes"}>
                    {
                        articles.map(article => (
                            article.place &&
                            <PlaceCard key={`Place-Card-Featured-${article.place.identifier}`} place={article.place} article={article}></PlaceCard>)
                        )
                    }
                </div>
            </div>
        ) : <></>
    )
}

export default ArticleDefault;