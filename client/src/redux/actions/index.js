import axios from 'axios';

export const RENDER_ALL_COUNTRIES ='RENDER_ALL_COUNTRIES'
export const GET_ALL_CONTINENTS= 'GET_ALL_CONTINENTS'
export const FILTER_BY_CONTINENT= 'FILTER_BY_CONTINENT'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'



export const renderAllCountries = (string)=>{
    return async (dispatch)=>{
        let countries =  await axios.get(`http://localhost:3001/countries?${string}`)

        return dispatch({
            type: 'RENDER_ALL_COUNTRIES',
            payload: countries.data
        })
    };
};

export const getContinents = ()=>{
    return async(dispatch)=>{
        let continents = await axios.get (`http://localhost:3001/continents`)

        return dispatch({
            type: 'GET_ALL_CONTINENTS',
            payload: continents.data
        })
    }
};

/* export const filteredByContinent = (payload)=>{
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
        
    }
} */

export const filteredByContinent= (continent, order, activity)=>{
    return async(dispatch)=>{
        let filteredByContinent = await axios.get (`http://localhost:3001/continents/filter?continentName=${continent}&${order}&${activity}`)

        return dispatch({
            type: 'FILTER_BY_CONTINENT',
            payload: [filteredByContinent.data, true]
        })
    }
}

export const getActivities = ()=>{
    return async(dispatch)=>{
        let activities = await axios.get(`http://localhost:3001/activities`)

        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: activities.data
        })
    }
}

export const filteredByActivity = (payload)=>{
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
        
    }
}

