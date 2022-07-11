const axios = require('axios')
const { Country }= require ('../db')


const getCountries=async()=>{
    try{
        let countryInDb = await Country.findAll();
        if(!countryInDb.length){

            let url = await axios.get(`https://restcountries.com/v3.1/all`)
            let countries = url.data;
        
            let filteredCountries = countries.map((c)=>{
                return{
                    id: c.cca3.toLowerCase(),
                    cName: c.name.common,
                    flag: c.flags.svg,
                    continent:  c.continents[0],
                    capital: c.capital?c.capital[0]:'No capital',
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                    unMember: c.unMember,
                    location: c.maps.googleMaps,
                    timezones: c.timezones[0]
                }             
            })           
            return await Country.bulkCreate(filteredCountries)
        } else{
            return 'countries in db'
        }   
    }catch(e){
        console.log(e)
    }  
}

module.exports = {
    getCountries
};