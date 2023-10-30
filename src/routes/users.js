import { Router } from "express";
import signup from "../controllers/users/signup";
import signin from "../controllers/users/signin";

const users = new Router();

users.post("/signup", signup);
users.post("/signin", signin)

export default users;