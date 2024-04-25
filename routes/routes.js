import express from 'express';

import {addRoommateControl, getRoommatesControl} from '../controllers/roomController.js';
import { getGastosControl,addGastoControl, editGastoControl,deleteGastoControl} from '../controllers/gastoControl.js';
import home from '../controllers/homeControl.js'

const router = express.Router();


router.get('/', home)

router.post('/roommate', addRoommateControl);

router.get('/roommates', getRoommatesControl);

router.get('/gastos', getGastosControl);

router.post('/gasto', addGastoControl);

router.put('/gasto', editGastoControl)

router.delete('/gasto', deleteGastoControl)

export default router