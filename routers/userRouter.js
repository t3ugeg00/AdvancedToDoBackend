import { pool } from "../helper/db.js";
import { Router } from "express";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { postLogin, postRegistration } from "../controllers/userController.js";

const router = Router();

router.post('/register', postRegistration);

router.post('/login', postLogin);

export { router };