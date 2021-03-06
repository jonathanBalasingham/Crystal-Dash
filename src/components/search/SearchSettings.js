import {useDispatch, useSelector} from "react-redux";
import {change, getCompType, getFacet, getK, getNorm, getResultSize} from "../../features/search/searchSlice";
import React from "react";
import {SearchFacetSettings} from "./SearchFacetSettings";

export function SearchSettings({}){
    let dispatch = useDispatch()
    let k = useSelector(getK)
    let resSize = useSelector(getResultSize)
    let n = useSelector(getNorm)
    let compType = useSelector(getCompType)


    return (
        <div id="search-panel-settings">
            <p>{`Result Size: ${resSize}`}</p>
            <input type="range" id="search-result-size" name="search-result-size" onChange={e => dispatch(change({"resultSize": e.target.value}))}
                   min="10" max="500" value={resSize} step="10" className={"range-style"}  />
            <br/>
            <h6>Distance</h6>
            <p>{`Nearest Neighbors (Distance Only): ${k}`}</p>
            <input type="range" id="search-k" name="search-k" onChange={e => dispatch(change({"k": e.target.value}))}
                   min="1" max="100" value={k} step="1" className={"range-style"}  />
            <p>{`Norm (Distance Only): ${n}`}</p>
            <input type="range" id="search-n" name="search-n" onChange={e => dispatch(change({"n": e.target.value}))}
                   min="0" max="10" value={n} step="1" className={"range-style"}  />
            <br/>
            <h6>Composition</h6>
            <select name="Form:" id="composition-facet" value={compType}
                    onChange={ e => dispatch(change({"compType": e.target.value}))}>
                <option value="standard">Standard</option>
                <option value="coprime">Prime</option>
            </select>
        </div>
    )
}