import { Router } from "express";
import {libro} from './controller.js';


export const router = Router()
//Solicitud para ver todos los archivos
router.get('/libros', libro.getAll);

//Tipo de solicitud para insertar usamos post
router.post('/libro',libro.add);

//Solicitud para eliminar un libro por su Id
router.delete('/libroId', libro.deleteId);

//Solicitud para modificar
router.put('/libro', libro.update);

//Solicitud a una Id 
router.get('/libro', libro.getOne);

//Solicitud para eliminar un libro por isbn
router.delete('/libroISBN', libro.deleteISBN);