import axios from 'axios';

export const RENDER_ALL_COUNTRIES ='RENDER_ALL_COUNTRIES'
export const GET_ALL_CONTINENTS= 'GET_ALL_CONTINENTS'
export const FILTER_BY_CONTINENT= 'FILTER_BY_CONTINENT'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const ORDER_BY_ALPHABET = 'ORDER_BY_ALPHABET'
export const GET_COUNTRY_BY_NAME ='GET_COUNTRY_BY_NAME'
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS'
export const GET_COUNTRY_NAMES = 'GET_COUNTRY_NAMES'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'

export const renderAllCountries = ()=>{
    return async (dispatch)=>{
            try{

            let countries =  await axios.get(`http://localhost:3001/countries`)
    
            return dispatch({
                type: 'RENDER_ALL_COUNTRIES',
                payload: countries.data
            })
        }catch(e){
            console.log(e)
    }
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

export const getActivities = ()=>{
    return async(dispatch)=>{
        let activities = await axios.get(`http://localhost:3001/activities`)

        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: activities.data
        })
    }
}

export const filteredByContinent= (payload)=>{
   
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
    
}


export const filteredByActivity = (payload)=>{
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
        
    }
}

export const orderByAlphabet = (payload)=>{
    return{
        type: 'ORDER_BY_ALPHABET',
        payload
        
    }
}

export const orderByPopulation = (payload)=>{
    return{
        type: 'ORDER_BY_POPULATION',
        payload
        
    }
}

export const getCountryByName = (country)=> {
    return async function (dispatch) {
        try{
        var countryByName= await axios.get(`http://localhost:3001/countries?name=${country}`) //hago el pedido a mi back =======>conexion con el back<=======
     
        return dispatch ({
        type: 'GET_COUNTRY_BY_NAME',
        payload: countryByName.data // el axios devuelve el.data
    })} catch(e){
        console.log(e)
        }
    };
}

export const getCountryDetails = (id)=>{
    return async function (dispatch){
        try{
            let countryDetails = await axios.get (`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: 'GET_COUNTRY_DETAILS',
                payload: countryDetails.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export const getCountryNames = ()=>{
    return async function(dispatch){
        try{
            let countryNames = await axios.get(`http://localhost:3001/countries/countryNames`)
            return dispatch({
                type:'GET_COUNTRY_NAMES',
                payload: countryNames.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export const createActivity = (payload)=>{
    return async function(dispatch){
        try{
            let activity = await axios.post(`http://localhost:3001/postActivity`, payload)
            
            return activity
        }catch(e){
            console.log('post' + e)
        }
    }
}

export const resetDropdown = (payload)=>{
    return{
        type: 'ORDER_BY_POPULATION',
        payload
        
    }
}