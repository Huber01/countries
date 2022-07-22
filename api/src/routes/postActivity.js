const { Router } = require('express');
const router = Router();
const {Activity, Country}= require ('../db')

router.post('/', async(req,res,next)=>{
	let { aName, difficulty, duration, season, country} = req.body;
    try{
		if(!aName || !difficulty || !duration || !season || !country)
		return res.status(404).send('Must fill in all data')
      const activity = await Activity.create({
				aName,
				difficulty,
				duration,
				season,
        })

      let countries = await Country.findAll({ //buscar el pais que coincida con el nombre
					where: {
							cName: country
					}
			});

				await activity.addCountry(countries); //agregarle el país a la actividad
		return res.json({message: "Activity succesfully added"})
        
                    
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

module.exports = router;