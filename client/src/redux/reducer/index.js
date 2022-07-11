import { RENDER_ALL_COUNTRIES, FILTER_BY_CONTINENT, GET_ALL_CONTINENTS, GET_ACTIVITIES, FILTER_BY_ACTIVITY } from "../actions";

const initialState ={
    countries:[],
    allCountries:[],
    continents:[],
    activities:[],
    activity:'',
    continentFilter:false
};

const rootReducer = ( state = initialState, action)=>{
    switch(action.type){
        case RENDER_ALL_COUNTRIES:
            return{
                ...state,
                countries:action.payload,
                allCountries:action.payload
            }
        case FILTER_BY_CONTINENT:
            return{
                ...state,
                countries:action.payload[0],
                continentFilter:action.payload[1]
            }
            
          /*   const filteredCountries = state.allCountries
            const continentFilter = action.payload === 'All'?filteredCountries:filteredCountries.filter(c=>c.continent === action.payload)
            return{
                ...state,
                countries: continentFilter
            } */
        case GET_ALL_CONTINENTS:
            return{
                ...state,
                continents: action.payload
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case FILTER_BY_ACTIVITY:
            const allCountries = state.continentFilter?state.countries:state.allCountries
            const activityFilter = action.payload === 'All' ?allCountries:allCountries.filter(c=>c.activities.map(a=>a.aName).includes(action.payload))
            return{
                ...state,
                countries: activityFilter
            }
        default:
            return{...state}
    }
};

export default rootReducer;