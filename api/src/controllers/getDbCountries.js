//const axios = require('axios');
const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const getDbCountries = async()=>{
       
    return await Country.findAll({
        include:{
            model:Activity,
            through: {
                attributes: []
            },
        }}
    )
}
    
 const getCountryDetails = async(id)=>{
     return await Country.findByPk(id, {
         //attributes:{exclude:[`population`]},
        include:{
            model:Activity,
            through: {
                attributes: []
            },
        }
        
    })
}







module.exports ={
    getDbCountries,
    getCountryDetails,
}