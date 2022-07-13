const {Activity, Country} = require ('../db')
const {Op}=require('sequelize')

const continents = async()=>{
    return await Country.findAll({
        attributes: [`continent`],
        group:[`continent`]
    })
};

/* const continentFilterAll = async(continentName, activity)=>{
    if (activity){
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
                where:{
                    aName:`${activity}`
                }
            },
            where:{
                continent: `${continentName}`
            }
        })
    }else{
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
            },
            where:{
                continent: `${continentName}`
            }
        })
    }
}

const continentFilterPop = async(continentName, orderPop, activity)=>{
    if (activity){
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
                where:{
                    aName:`${activity}`
                }
            },
            where:{
                continent: `${continentName}`
            },    order: [
                ['population', `${orderPop}`],
                
            ]
        })
    }else{
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
            },
            where:{
                continent: `${continentName}`
            },    order: [
                ['population', `${orderPop}`],
                
            ]
        })
    }
}


const continentFilterABC = async(continentName, orderABC, activity)=>{
    if (activity){
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
                where:{
                    aName:`${activity}`
                }
            },
            where:{
                continent: `${continentName}`
            },    order: [
                ['cName', `${orderABC}`],
                
            ]
        })
    }else{
        return await Country.findAll({
            include:{
                model:Activity,
                through: {
                    attributes: []
                },
            },
            where:{
                continent: `${continentName}`
            },    order: [
                ['cName', `${orderABC}`],
                
            ]
        })
    }
}
 */



module.exports = {
    continents,
    /* continentFilterAll,
    continentFilterPop,
    continentFilterABC */
}

