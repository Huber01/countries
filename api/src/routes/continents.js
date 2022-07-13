const { Router } = require('express');
const router = Router();
//const axios = require('axios');
///const {Country, Activity} = require('../db')
//const {Op} = require ('sequelize');
const { continents, /* continentFilterAll, continentFilterPop, continentFilterABC */} = require ('../controllers/continentFilter')


router.get('/', async(req,res,next)=>{
    
    try{
        let continent =  await continents();

        continent.length?res.status(200).json(continent):res.status(404).send('an error has ocurred with the continents')

    }catch(e){
        next(e)
    }
})

/* router.get('/filter', async(req,res,next)=>{
    let { name, orderPop, orderABC, continentName, activity } = req.query;
    let countriesByContinent;
    try{
        if(orderPop){
            countriesByContinent = await   continentFilterPop(continentName, orderPop)
        }else if(orderABC){
            countriesByContinent = await  continentFilterABC(continentName, orderABC)
        }else{
            countriesByContinent = await continentFilterAll(continentName, activity)
        }

        if(name){
            let countryInContinent = countriesByContinent.map(c=>c.cName).includes(name)

            

            countryInContinent?countriesByContinent.map(c=>c.cName).filter(c=>c===name):res.status(404).send(`${name} is not in ${continentName}!`);

            res.status(200).json(name)
        }
        let countryList = countriesByContinent.map((c)=>{
            return{
                id: c.id,
                cName: c.cName,
                flag: c.flag,
                continent: c.continent,
                population:c.population,
                activities:c.activities
            }})    


            countryList.length?res.status(200).json(countryList):res.status(404).send('Your filtering options do not match')

    }catch(e){
        next(e)
    }

})  */
module.exports = router
