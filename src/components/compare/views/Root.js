import "./styles.css";

import React, { useEffect, useState } from "react";
import {SigmaContainer, ZoomControl, FullScreenControl, ForceAtlasControl, useSigma} from "react-sigma-v2";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { omit, mapValues, keyBy, constant } from "lodash";
import {ForceAtlas2} from 'react-sigma';
import GraphSettingsController from "./GraphSettingsController";
import GraphEventsController from "./GraphEventsController";
import GraphDataController from "./GraphDataController";
import DescriptionPanel from "./DescriptionPanel";
import ClustersPanel from "./ClustersPanel";
import SearchField from "./SearchField";
import drawLabel from "../canvas-utils";

import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {
    getBox,
    getCamera,
    getComp,
    getGraphType,
    getK,
    getKx, getKy,
    getMeasure,
    getThreshold, setCamera,
    setMaxThreshold, setRendering
} from "../../../features/compare/compareSlice";
import {Loading} from "../../../Loading";


function XYAxis() {
    let box = useSelector(getBox)
    let dispatch = useDispatch()
    let sigma = useSigma()
    console.log("Box is")
    console.log(box)

    useEffect(() => {
        console.log("inside request animation frame")
        let point01 = sigma.viewportToGraph({x: 0, y: 0})
        let dims = sigma.getDimensions()
        let point00 = sigma.viewportToGraph({x: 0, y: dims.height})
        let point11 = sigma.viewportToGraph({x: dims.width, y: dims.height})

        let box = {"x0": point01.x,
            "y1": point01.y,
            "y0": point00.y,
            "x1": point11.x
        }
        console.log(box)
        dispatch(setCamera(box))
    });

    return (
        <div id="xy-axis-outer">
            <div id="xy-axis-inner">

            </div>
            <div id="tick-upper-left" className="tick">
                <p>{box["y1"].toFixed(2)}</p>
            </div>
            <div id="tick-lower-left" className="tick">
                <p>{`(${box["x0"].toFixed(2)}, ${box["y0"].toFixed(2)})`}</p>
            </div>
            <div id="tick-lower-right" className="tick">
                <p>{box["x1"].toFixed(2)}</p>
            </div>
        </div>
    )
}

const Root = () => {
    const dispatch = useDispatch()
    let names = useSelector(getComp)
    let graphType = useSelector(getGraphType)
    let k = useSelector(getK)
    let k_x = useSelector(getKx)
    let k_y = useSelector(getKy)
    let measure = useSelector(getMeasure)
    let threshold = useSelector(getThreshold)

    const [showContents, setShowContents] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dataset, setDataset] = useState(null);
    const [filtersState, setFiltersState] = useState({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = useState(null);

    // Load data on mount:
    useEffect(() => {
        console.log("Hitting Python API")
        setLoading(true)
        fetch('/api/compare/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            },
            body: JSON.stringify({"names": names})
        })
            .then((data) => data.json())
            .then((d) => {
                let url = `/api/compare/${graphType}/${measure}/${k}?threshold=${threshold}&names=${d["callback"]}`
                if (graphType === "amd"){
                    url = `/api/compare/${graphType}/${k_x}/${k_y}?names=${d["callback"]}`
                }
                return url
            })
            .then(url => {
                fetch(url)
                    .then((res) => res.json())
                    .then((dataset) => {
                        setDataset(dataset);
                        dispatch(setMaxThreshold(dataset.max))
                        setFiltersState({
                            clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
                            tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
                        });
                        requestAnimationFrame(() => {
                            setDataReady(true)
                            setLoading(false)
                        });
                    });
            })

    }, [dispatch, graphType, k, k_x, k_y, measure, names, threshold]);

    if (loading)
        return (
            <Loading style={{"display": "grid",
                             "justify-content": "center",
                             "align-content": "center",
                             "height": "100vh",
                             "background": "var(--defaultprimary)"}}/>
        )
    if (!dataReady)
        return null;

    return (
        <div id="app-root" className={showContents ? "show-contents" : ""}>
            <SigmaContainer
                graphOptions={{ type: "undirected" }}
                initialSettings={{
                    nodeProgramClasses: { image: getNodeProgramImage() },
                    labelRenderer: drawLabel,
                    defaultNodeType: "image",
                    defaultEdgeType: "line",
                    labelDensity: 0.07,
                    labelGridCellSize: 60,
                    labelRenderedSizeThreshold: 15,
                    labelFont: "Lato, sans-serif",
                    zIndex: false,
                    minCameraRatio: 0.1,
                    maxCameraRatio: 1,
                }}
                className="react-sigma"
            >
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController dataset={dataset} filters={filtersState} />
                <XYAxis/>
            </SigmaContainer>
        </div>
    );

};

export default Root;