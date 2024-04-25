import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const addGastoQuery = async (gasto) => {
  try {
    
    gasto.id = uuidv4().slice(0, 8);
    
    const gastosJSON = JSON.parse(fs.readFileSync("data/gastos.json", "utf-8"));

    gastosJSON.gastos.push(gasto);
    
    fs.writeFileSync("data/gastos.json", JSON.stringify(gastosJSON));
  } catch (err) {
    console.log(err.message);
  }
};

const getGastosQuery = async () => {
  try {
    const gastosJSON = JSON.parse(
      fs.readFileSync("./data/gastos.json", "utf-8")
    );
    return gastosJSON;
  } catch (error) {
    console.log(error);
  }
};

const editGastoQuery = async (id, gasto) => {
  try {
    const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
    let { gastos } = JSON.parse(gastosJSON);
    gastos = gastos.map((g) => {
      if (g.id == id) {
        const newData = gasto;
        newData.id = id;
        return newData;
      }
      return g;
    });
    fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {}
};

const deleteGastoQuery = async (id) => {
    try {
      const gastosJSON = fs.readFileSync("data/gastos.json", "utf8");
      let { gastos } = JSON.parse(gastosJSON);
      gastos = gastos.filter((g) => g.id !== id);
      console.log(id)
      console.log(gastos)
     fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
    } catch (error) {}
  };
  
export { addGastoQuery, getGastosQuery, editGastoQuery, deleteGastoQuery };
