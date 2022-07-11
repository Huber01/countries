const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const orderPopulation = async(orderPop)=>{
    return await Country.findAll({
        include:{
            model:Activity
        },
        order: [
            ['population', `${orderPop}`],
            
        ]
    })
}



module.exports={
    orderPopulation,
    //orderPopulationDesc
}