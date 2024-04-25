import { getGastosQuery,addGastoQuery, editGastoQuery,deleteGastoQuery } from "../queries/gasto.js";
import { recalcularDeudasQuery} from "../queries/roommate.js";

const getGastosControl = async(req,res)=>{
    try {
        const result = await getGastosQuery();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addGastoControl = async(req,res)=>{
    try {
        const {roommate,descripcion,monto} = req.body;
        const gasto = {roommate,descripcion,monto}
        
        const result = await addGastoQuery(gasto);
        await recalcularDeudasQuery();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const editGastoControl = async (req, res) => {
    try {
        const id = req.query.id
        const gasto = req.body
        await recalcularDeudasQuery();
        await editGastoQuery(id, gasto)
        
        res.send("Gasto editado")
    } catch (error) {
        console.log(error)
    }
}

const deleteGastoControl = async (req, res) => {
    try {
        const id = req.query.id
        
        await deleteGastoQuery(id)
        await recalcularDeudasQuery()
        res.send("Gasto eliminado")
    } catch (error) {
        console.log(error)
    }
}

export {
    getGastosControl,
    addGastoControl,
    deleteGastoControl,
    editGastoControl
}