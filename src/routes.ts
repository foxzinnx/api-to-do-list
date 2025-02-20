import { Router } from "express";
import TaskController from "./controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.get('/task', taskController.get);
router.get('/task/:id_task', taskController.getID);
router.post('/task', taskController.add);
router.put('/task/:id_task', taskController.update);
router.delete('/task/:id_task', taskController.delete);

export default router;