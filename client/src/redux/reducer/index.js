import { RENDER_ALL_COUNTRIES, FILTER_BY_CONTINENT, GET_ALL_CONTINENTS, GET_ACTIVITIES, FILTER_BY_ACTIVITY, ORDER_BY_ALPHABET, ORDER_BY_POPULATION, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAILS} from "../actions";

const initialState ={
    countries:[],
    allCountries:[],
    continents:[],
    activities:[],
    activityFiltered:false,
    continentFiltered:false,
    filteredCountries:[],
    countryDetails:{}
    //activity:'',
    //continentFilter:false,
    
};

const rootReducer = ( state = initialState, action)=>{
    switch(action.type){
        case RENDER_ALL_COUNTRIES:
            return{
                ...state,
                countries:action.payload,
                allCountries:action.payload,
                filteredCountries:[],
                activityFiltered:false,
                continentFiltered:false

            }
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
            const activityCountries = state.continentFiltered?state.filteredCountries:state.allCountries
            let filteredByActivity
            if(action.payload === 'All'){
                filteredByActivity =state.allCountries
            }else{
                filteredByActivity = activityCountries.filter(c=>c.activities.map(a=>a.aName).includes(action.payload))}
            return{
                ...state,
                countries: filteredByActivity,
                filteredCountries: filteredByActivity,
                activityFiltered: true
                
            }
        case FILTER_BY_CONTINENT:
            const continentCountries = state.activityFiltered?state.filteredCountries:state.allCountries
            const filteredByContinent = action.payload === 'All' ?state.allCountries:continentCountries.filter(c=>c.continent.includes(action.payload))
            return{
                ...state,
                countries: filteredByContinent,
                filteredCountries: filteredByContinent,
                continentFiltered:true
            }
        case ORDER_BY_POPULATION: 
            const orderedByPopulation = 
            action.payload==='asc'?
            state.countries.sort((a, b) => {
                if (a.population > b.population) {
               return 1;
           }
           if (a.population < b.population) {
               return -1;
           }
           return 0
            }):state.countries.sort((a, b) => {
                if (a.population < b.population) {
                    return 1;
                }
                if (a.population > b.population) {
                    return -1;
                }
                return 0
                 })
            return{
                ...state,
                countries: orderedByPopulation
            }
        case ORDER_BY_ALPHABET:
            const orderByAlphabet = action.payload === 'a-z' ? state.countries.sort(function (a, b){
                if (a.cName.toLowerCase() > b.cName.toLowerCase()) {
                    return 1;
                }
                if (a.cName.toLowerCase() < b.cName.toLowerCase()) {
                    return -1;
                }
                return 0
                    }): state.countries.sort(function (a, b){
                if (a.cName.toLowerCase() < b.cName.toLowerCase()) {
                    return 1;
                }
                if (a.cName.toLowerCase() > b.cName.toLowerCase()) {
                return -1;
                }
                return 0
                    })
                                                                                                        
            return{
                ...state,
                countries: orderByAlphabet
            }
        case GET_COUNTRY_BY_NAME:
                
            return{
            ...state,
            countries: action.payload,
        
        }
        case GET_COUNTRY_DETAILS:
            return{
                ...state,
                countryDetails: action.payload,
            
            }
        default:
            return{...state}
    }
};

export default rootReducer;