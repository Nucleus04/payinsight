const initialState = {
    totalRenderedHours: "0:00",
    salary: 0,
    usdRate: 0,
    activityList: [],
    totalDollar: 0,
    totalPeso: 0,
    showExplanation: false,
}


export const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOTAL_HOURS":
            return {
                ...state,
                totalRenderedHours: action.payload
            }
        case "SET_SALARY":
            return {
                ...state,
                salary: action.payload
            }
        case "SET_USD_RATE":
            return {
                ...state,
                usdRate: action.payload
            }
        case "SET_ACTIVITY":
            return {
                ...state,
                activityList: action.payload
            }
        case "SET_TOTAL_SALARY_DOLLAR":
            return {
                ...state,
                totalDollar: action.payload
            }
        case "SET_TOTAL_SALARY_PESO":
            return {
                ...state,
                totalPeso: action.payload
            }
        case "SHOW_EXPLANATION":
            console.log("Value", action.payload);
            return {
                ...state,
                showExplanation: action.payload
            }
        default:
            return state
    }
}