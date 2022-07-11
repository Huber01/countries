//const axios = require('axios');
const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const getDbCountries = async()=>{
       
    return await Country.findAll({
        include:{
            model:Activity
        }}
    )
}
    
 const getCountryDetails = async(id)=>{
     return await Country.findByPk(id, {
         include:{
             model:Activity
            }
        
    })
}







module.exports ={
    getDbCountries,
    getCountryDetails,
}