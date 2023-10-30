import { Router } from "express";
import create_project from "../controllers/projects/create_project";
import auth from "../middlewares/auth";

const projects = new Router();

projects.post("/create", auth, create_project);

export default projects;