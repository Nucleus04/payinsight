import { combineReducers } from "redux";
import { activityReducer } from "./activitiesReducer";

const rootReducer = combineReducers({
    activity: activityReducer,
})

export default rootReducer;