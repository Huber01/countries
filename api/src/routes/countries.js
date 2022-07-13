const { Router } = require('express');
const router = Router();
//const axios = require('axios');
const {Country, Activity} = require('../db')
const {Op} = require ('sequelize');
const {getDbCountries, getCountryDetails} = require ('../controllers/getDbCountries')
const {alphabetOrder, alphabetDscOrder}= require ('../controllers/orderABC')
const {orderPopulation, orderPopulationDesc}= require ('../controllers/orderPopulation')

router.get('/', async(req, res, next)=>{
    let {name} = req.query
    let countries;
   
    try{
        if(name){

           
            let country = await Country.findAll({
                include:{
                    model:Activity,
                    through: {
                        attributes: []
                    },
                },
                    where:{
                        cName:{
                            [Op.iLike]:`%${name}%`
                     },
                    
                }}
                
            )
         
        res.status(200).json(country)/* :res.status().json(country) */        
       /*  }else if(orderPop) {
            countries = await orderPopulation(orderPop)
        } else if (orderABC){
            countries = await alphabetOrder(orderABC) */
        }else {
        countries = await getDbCountries();

    }
    let countryList = countries.map((c)=>{
        return{
            id: c.id,
            cName: c.cName,
            flag: c.flag,
            continent:  c.continent,
            capital: c.capital,
            subregion: c.subregion,
            area: c.area,
            population: c.population,
            populationVirtual: c.populationVirtual,
            unMember: c.unMember,
            location: c.location,
            timezones: c.timezones,
            activities: c.activities
    }})
    
    //console.log(countryList[id])
    countryList.length?res.status(200).json(countryList):res.status(404).send('conextion error')
    }catch(e){
        next(e)
    }
})

router.get('/countryNames', async(req,res,next)=>{
    try{
        let countries = await getDbCountries()
        let countryNames = countries.map(c=>c.cName)
        countryNames.length?res.status(200).json(countryNames):res.status(404).send('conextion error')
    }catch(e){
        next(e)
    }
})

 
router.get('/:id', async (req,res,next)=>{
    let { id } = req.params;
    //id = id.toLowerCase()
    try{
        let details = await getCountryDetails(id);
        details?res.status(200).json(details):res.status(404).send('an error has ocurred')
        

    }catch(e){
        next(e)
    }
})






module.exports = router