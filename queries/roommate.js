import fs from 'fs';
import {v4 as uuidv4} from "uuid";
import axios from 'axios';


const urlApi = "https://randomuser.me/api"

const addRoommateQuery = async ()=>{
    try {
        const data = await axios.get(urlApi);

        const userData = data.data.results[0];
        
        const id = uuidv4().slice(0,5);

        const usuario ={
        id,
        nombre: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        debe:0,
        recibe:0  
        }  
        console.log(usuario)
        const roommatesJSON = JSON.parse(fs.readFileSync('data/roommates.json', 'utf-8'));
        
        roommatesJSON.roommates.push(usuario);
        fs.writeFileSync('data/roommates.json' , JSON.stringify(roommatesJSON));
    }catch(err){console.log(err.message)}
}

const getRoommatesQuery = async()=>{
    try {
        const roommatesJSON = JSON.parse(fs.readFileSync('./data/roommates.json', 'utf-8'));
    return roommatesJSON
    } catch (error) {
        console.log(error)
    }
    
}
const recalcularDeudasQuery = async () => {

    const roommatesData = fs.readFileSync("./data/roommates.json", "utf8");
    const gastosData = fs.readFileSync("./data/gastos.json", "utf8");
  
    const { roommates } = JSON.parse(roommatesData);
    const { gastos } = JSON.parse(gastosData);
  

    roommates.forEach((r) => {
      r.debe = 0;
      r.recibe = 0;
      r.total = 0;
    });
    
  gastos.forEach((g) => {
    const montoPorPersona = g.monto / roommates.length;
    roommates.forEach((r) => {
      if (g.roommate === r.nombre) {
        r.recibe += montoPorPersona * (roommates.length - 1);
      } else {
        r.debe -= montoPorPersona;
      }
      r.total = r.recibe - r.debe;
    });
  });

  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
}

export {addRoommateQuery, getRoommatesQuery,recalcularDeudasQuery}