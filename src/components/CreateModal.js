import {useDispatch, useSelector} from "react-redux";
import {
    closeCreateModal,
    getCreateModalOpened,
} from "../features/create/createSlice";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import ScienceIcon from '@mui/icons-material/Science';
import ListIcon from '@mui/icons-material/List';
import StorageIcon from '@mui/icons-material/Storage';


function CreateCrystalPanel(props) {
    return (
        <div id="create-crystal-panel">

        </div>
    )
}

function CreateSourcePanel(props) {
    return (
        <div id="create-source-panel">

        </div>
    )
}

function CreateSubsetPanel(props) {
    return (
        <div id="create-subset-panel">

        </div>
    )
}

function CreateModal({}) {
    let vis  = 'none'
    const dispatch = useDispatch()
    const modalOpened = useSelector(getCreateModalOpened)

    if (modalOpened)
        vis = 'block'

    const [tab, setTab] = useState('crystal')
    const getClass = (currentTab, thisTab) => {
        if (currentTab === thisTab)
            return "create-modal-tab-button-selected"
        else
            return "create-modal-tab-button"
    }

    const getTabContent = (currentTab) => {
        if (currentTab === "crystal")
            return <CreateCrystalPanel/>
        else if (currentTab === "source")
            return <CreateSourcePanel/>
        else if (currentTab === "subset")
            return <CreateSubsetPanel/>
    }

    return (
        <div className="create-modal" style={{'display': vis}}>
            <div className="create-modal-content">
                <div className="close-button-container">
                    <button onClick={() => dispatch(closeCreateModal(false))}>
                        <CloseIcon fontSize={"small"}/>
                    </button>
                </div>
                <div id="create-modal-tabs">
                    <button className={getClass("crystal", tab)} onClick={() => setTab("crystal")}>
                        <ScienceIcon fontSize={"small"}/>
                        Crystal
                    </button>
                    <button className={getClass("subset", tab)} onClick={() => setTab("subset")}>
                        <ListIcon fontSize={"small"}/>
                        Subset
                    </button>
                    <button className={getClass("source", tab)} onClick={() => setTab("source")}>
                        <StorageIcon fontSize={"small"}/>
                        Source
                    </button>
                </div>
                { getTabContent(tab) }
            </div>
        </div>
    )
}

export default CreateModal;