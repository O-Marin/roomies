
import { addRoommateQuery,getRoommatesQuery } from '../queries/roommate.js';

const addRoommateControl = async (req,res)=>{
    try {
        const result = addRoommateQuery();
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

const getRoommatesControl = async (req,res)=>{
    try{
        const results = await getRoommatesQuery();
        res.status(200).json(results)
    }catch(err){res.status(500).send(err.message)}
}

export {addRoommateControl, getRoommatesControl};