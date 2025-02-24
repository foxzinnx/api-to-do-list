import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import { addSchema, deleteSchema, getIDSchema, GetSchema, updateSchema } from "../schemas/TaskSchema";

const taskService = new TaskService();

class TaskController{

    constructor(){

    }

    async get(req: Request, res: Response){

        try {
            const status = req.query.status;
            await GetSchema.validate(req.query);

            const result = taskService.get(status as string);
            res.json(result);
        } catch (error) {
            res.status(400).json({error: error});
        }
            
    }

    async getID(req: Request, res: Response){
        const { id_task } = req.params;

        try {

            await getIDSchema.validate(req.params);

            const result = taskService.getID(id_task);
            res.json(result);
        } catch (error) {
            res.status(400).json({error: error})
        }

    }

    async add(req: Request, res: Response){

        try {

            await addSchema.validate(req.body);

            res.status(201).json({message: 'Task created with successful!'})
            await taskService.add(req.body);
        } catch (error) {
            res.status(400).json({error: error});
        }
    }

    async update(req: Request, res: Response) {
        const { id_task } = req.params;
        
        try {
            
            await updateSchema.validate(req.body, req.params);

            const update = await taskService.update(req.body, id_task);

            if(!update){
                res.status(400).json({error: 'task not found'});
            } else{
                return res.status(200).json({ message: 'Task updated successfully' });
            }
    
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    async delete(req: Request, res: Response){
        
        try {
            const { id_task } = req.params;
            
            await deleteSchema.validate(id_task);

            const result = await taskService.delete(id_task);

            if (result) {
                return res.status(200).send({ message: 'OK!' });
            } else {
                return res.status(404).json({ error: 'Task not found' });
            }

        } catch (error) {
            res.status(404).json({ error: error});
        }

        
    }
}

export default TaskController;