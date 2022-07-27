const { Router } = require('express');
const router = Router();
//const axios = require('axios');
const {Country, Activity} = require('../db')
const {Op} = require ('sequelize');
const {activities} = require ('../controllers/getActivities')

router.get('/', async(req,res,next)=>{
    
    try{
        let allActivities = await activities();
        allActivities.length?res.status(200).json(allActivities):res.status(404).send('could not find the activities')
    }catch(e){
        next(e)
    }

})

router.delete('/delete/:id', async(req,res,next)=>{
	let {id} = req.params
	try {
		await Activity.destroy({where:{id}})

		res.send('activity deleted')
		
	} catch (error) {
		next(error)
	}

})


module.exports = router