import express from "express";
import { createStudents, 
    getAllStudents, 
    loginUser, 
    getUserById, 
    updateUser, 
    deleteUser } from "../controller/user.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router()
router.post('/register', createStudents)
router.get('/', authMiddleware, getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router