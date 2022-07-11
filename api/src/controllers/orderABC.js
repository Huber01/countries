const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const alphabetOrder = async(name)=>{
    return await Country.findAll({
        order: [
            ['cName', `${name}`],
        ]
    })
}
/* 
const alphabetDscOrder= async()=>{
    return await Country.findAll({
        order: [
            ['cName', 'DESC'],
        ]
    })
} */

module.exports ={
    alphabetOrder,
   // alphabetDscOrder
}