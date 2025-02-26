import { Task } from "../models/Task";
import TaskRepository from "../repositories/TaskRepository";

const taskRepository = new TaskRepository();

class TaskService{

    constructor(){

    }

    get(status: string){
        const result = taskRepository.get();

        const tasks: Task[] = [];

        result.map((obj) => {
            if(obj.status === status){
                tasks.push(obj);
            }
        })

        return tasks;
    }

    getID(id_task: string): Task | {} {
        const result = taskRepository.get();

        let task = {};

        result.map((obj) => {
            if(obj.id === id_task){
                task = obj;
            }
        })
        
        return task;
    }

    async add(data: Task): Promise<Task>{
        return await taskRepository.add(data);
    }

    getIndex(id_task: string): number{
        const result = taskRepository.get();
        let position: number = -1;

        result.map((obj, index) => {
            if(obj.id === id_task){
                position = index;
            }
        });

        return position;
    }

    async update(data: Task, id_task: string) {

        const position = this.getIndex(id_task);

        if(position !== -1){
            return await taskRepository.update(data, position);
        }else{
            return {}
        }

    }

    async delete(id_task: string) {
        const position = this.getIndex(id_task);
    
        if (position !== -1) { 
            await taskRepository.delete(position);
            return true;
        } else {
            return false;
        }
    }
}

export default TaskService;