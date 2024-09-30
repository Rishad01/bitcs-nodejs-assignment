import express from 'express';
import {
  getAllCats,
  getCatById,
  searchCatsByAge,
  createCat,
  updateCat,
  deleteCat
} from '../controller/cat_controller.js';
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get('/', getAllCats);                          
router.get('/search', searchCatsByAge);               
router.get('/:id', getCatById);                       
router.post('/',authenticate,createCat);                          
router.put('/:id',authenticate,updateCat);                       
router.delete('/:id',authenticate,deleteCat);                     

export default router;
