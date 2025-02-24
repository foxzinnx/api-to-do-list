export interface Task{
    id: string;
    about: string;
    data: string;
    status: 'completed' | 'in_progress';
}