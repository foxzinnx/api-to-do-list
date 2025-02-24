import { Router, Request, Response, NextFunction } from "express";
import TaskController from "./controllers/TaskController";

const router = Router();
const taskController = new TaskController();

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization){

        next();
    }else{
        res.status(401).json({error: 'Unauthorized Access!'})
    }
}

router.get('/task', AuthMiddleware, taskController.get);
router.get('/task/:id_task', taskController.getID);
router.post('/task', taskController.add);
router.put('/task/:id_task', taskController.update);
router.delete('/task/:id_task', taskController.delete);

export default router;