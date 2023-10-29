import { Router } from "express";
import signup from "../controllers/signup";

const users = new Router();

users.post("/signup", signup);

export default users;