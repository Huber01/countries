const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const activities = async()=>{
    return await Activity.findAll({
        attributes: [`aName`],
        group:[`aName`]
    })
};

module.exports = {
    activities,
}