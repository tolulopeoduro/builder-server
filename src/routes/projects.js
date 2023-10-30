import { Router } from "express";
import create_project from "../controllers/projects/create_project";
import auth from "../middlewares/auth";
import edit_project from "../controllers/projects/edit_project";

const projects = new Router();

projects.post("/create", auth, create_project);
projects.post("/update", auth, edit_project);

export default projects;