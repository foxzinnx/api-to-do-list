import { Request, Response } from "express";
import TaskService from "../services/TaskService";

const taskService = new TaskService();

class TaskController{

    constructor(){

    }

    get(req: Request, res: Response){
        const status = req.query.status;

        if(status && (status === 'in_progress' || status === 'completed')){

            const result = taskService.get(status);
            res.json(result);
            

        }else{
            res.status(400).json({error: 'invalid status parameter'});
        }
    }

    getID(req: Request, res: Response){
        const { id_task } = req.params;

        if(id_task){
            
            const result = taskService.getID(id_task);
            res.json(result);
        } else {
            res.status(400).json({error: 'invalid task id'})
        }
    }

    add(req: Request, res: Response){
        const {id, about, data, status} = req.body;
        const authorization = req.headers.authorization;

        if(!authorization){
            res.status(401).json({error: 'Unauthorized Access!'})
        } else {
            if(id && about && data && status){
                if(status === 'completed' || status === 'in_progress'){
                    res.status(201).json({message: 'Task created with successful!'})
                } else {
                    res.status(400).json({error: 'Invalid Status!'});
                }
            } else {
                res.status(400).json({error: 'Bad Request!'})
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id, about, data, status } = req.body;
            const { id_task } = req.params;
    
            if (!id || !about || !data || !status || !id_task) {
                return res.status(400).json({ error: 'Invalid parameters' });
            }
    
            if (status !== 'in_progress' && status !== 'completed') {
                return res.status(400).json({ error: 'Invalid status' });
            }
    
            await taskService.update(req.body, id_task);
            return res.status(200).json({ message: 'Task updated successfully' });
    
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error'});
        }
    }

    delete(req: Request, res: Response){
        const { id_task } = req.params;

        if(id_task){

            try {
                const result = taskService.delete(id_task);
                res.status(200).send({message: 'OK!'}); 
            } catch (error) {
                res.status(404).json({ error: '404 Not Found' });
            }

        } else {
            res.status(400).json({error: 'please select a valid id'})
        }
    }
}

export default TaskController;