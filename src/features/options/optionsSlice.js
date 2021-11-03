import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = "NONE";

const openOptionsPanelSlice = createSlice({
    name: 'openOptionsPanel',
    initialState,
    reducers: {
        viewToggled(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            if (state === "View-panel")
                state = "NONE"
            else
                state = "View-panel"
            return state;
        },
        compareToggled(state, action) {
            if (state === "Compare-panel")
                state = "NONE"
            else
                state = "Compare-panel"
            return state;
        },
        databaseToggled(state, action) {
            if (state === "Database-panel")
                state = "NONE"
            else
                state = "Database-panel"
            return state;
        }
    }
})

export const { viewToggled, compareToggled, databaseToggled } = openOptionsPanelSlice.actions

export default openOptionsPanelSlice.reducer

export const getOpenOptionsPanel = createSelector((state) => state.openOptionsPanel, (p) =>
    p
)