const { Router } = require('express');
const router = Router();
const {Activity, Country}= require ('../db')

router.post('/', async(req,res,next)=>{
	let { aName, difficulty, duration, season, country} = req.body;
    try{
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

module.exports = router;