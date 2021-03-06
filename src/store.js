import {configureStore} from '@reduxjs/toolkit'

import optionsReducer from './features/options/optionsSlice'
import settingsReducer from './features/settings/settingsFooterSlice'
import authReducer from './features/auth/authSlice'
import compareReducer from './features/compare/compareSlice'
import createReducer from './features/create/createSlice'
import searchReducer from './features/search/searchSlice'
import previewReducer from './features/preview/previewSlice'
import appReducer from './features/app/appSlice'
import viewReducer from './features/view/viewSlice'

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        openOptionsPanelSlice: optionsReducer,
        settingsModalSlice: settingsReducer,
        authSlice: authReducer,
        compareSlice: compareReducer,
        createModalSlice: createReducer,
        searchPanelSlice: searchReducer,
        previewSlice: previewReducer,
        appSlice: appReducer,
        viewSlice: viewReducer,
    }
})

export default store