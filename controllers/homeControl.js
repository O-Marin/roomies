import path from 'path';
import { addRoommateQuery,getRoommatesQuery } from '../queries/roommate.js';

const __dirname = import.meta.dirname

const home = async (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/index.html"));
}

export default home;