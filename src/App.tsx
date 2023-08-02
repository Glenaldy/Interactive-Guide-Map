import React, {useEffect, useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import MapApp from "./components/MapApp";
import GuideApp from "./components/GuideApp";
import SplitPane, {Pane} from "react-split-pane";
import useDatabase from "./hooks/useDatabase";
import {Place} from "./components/Place";
import {Article} from "./components/Article";
import {useDispatch, useSelector} from "react-redux";
import {setArticleDatabase, setPlaceDatabase, setSplitOrientation} from "./redux/placeSlice";
import {RootState} from "./redux/store";

function App() {
    const dispatch = useDispatch()
    /** State */
    const [placesDB, placesLoading] = useDatabase<Place>(`${process.env.REACT_APP_BACKEND_SERVER_URL}/places?api_key=${process.env.REACT_APP_BACKEND_SERVER_API_KEY}`, Place);
    const [articlesDB, articlesLoading] = useDatabase<Article>(`${process.env.REACT_APP_BACKEND_SERVER_URL}/articles?api_key=${process.env.REACT_APP_BACKEND_SERVER_API_KEY}`, Article);

    /** Windows Resize*/
    const splitOrientation = useSelector((state: RootState) => state.globalStates.splitOrientation)
    const minSizeVertical = 500
    const minSizeHorizontal = 230
    const [minPaneSize, setMinPaneSize] = useState<number>(minSizeHorizontal);
    const [paneSize, setPaneSize] = useState<number>(minPaneSize);


    useEffect(() => {
        dispatch(setPlaceDatabase(placesDB))
        dispatch(setArticleDatabase(articlesDB))
        const handleWindowResize = () => {
            switch (true) {
                case window.innerWidth / window.innerHeight < 0.8:
                    dispatch(setSplitOrientation("horizontal"));
                    setMinPaneSize(minSizeHorizontal)
                    setPaneSize(minSizeHorizontal)
                    break;
                default:
                    dispatch(setSplitOrientation("vertical"));
                    setMinPaneSize(minSizeVertical)
                    setPaneSize(minSizeVertical)
                    break;
            }
        };

        window.addEventListener('load', handleWindowResize);
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [dispatch, placesDB, articlesDB]);


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY!,
        language: "en"
    });



    /**
     * Functions
     * @param full
     */
    const handleResizerClick = (full: boolean) => {
        if (full) {
            if (splitOrientation === "vertical") setPaneSize(window.innerWidth)
            else setPaneSize(window.innerHeight)
        } else setPaneSize(minPaneSize)
    }

    if (!isLoaded || placesLoading || articlesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            {/* @ts-ignore */}
            <SplitPane
                maxSize={"100%"}
                minSize={minPaneSize}
                primary={"second"}
                split={splitOrientation}
                size={paneSize}
                onChange={(size) => {
                    setPaneSize(size)
                }}
            >
                {/* @ts-ignore */}
                <Pane className={"paneMap"}>
                    <MapApp
                        // places = {placesDB}
                        // articles = {articlesDB}
                    />
                </Pane>

                {/* @ts-ignore */}
                <Pane className={"paneGuide"}>
                    <GuideApp
                        onSplitView={() => handleResizerClick(false)}
                        onArticleOnly={() => handleResizerClick(true)}
                    />
                </Pane>
            </SplitPane>
        </main>
    );
}

export default App;
