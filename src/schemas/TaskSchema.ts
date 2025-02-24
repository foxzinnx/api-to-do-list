import {object, string} from 'yup';

export const GetSchema = object().shape({
    status: string().required().test('isValid', (status) => {
        if(status === 'in_progress' || status === 'completed'){
            return true;
        }else{
            return false;
        }
    })
});

export const getIDSchema = object().shape({

    id_task: string().required()

});

export const addSchema = object().shape({

    id: string().required(),
    about: string().required(),
    data: string().required(),
    status: string().required().test('addisValid', (status) => {  
        if(status === 'in_progress' || status === 'completed'){
            return true;
        }else{
            return false;
        }
    })

});

export const updateSchema = object().shape({

    id: string().required(),
    about: string().required(),
    data: string().required(),
    status: string().required().test('updateisValid', (status) => {
        if(status === 'in_progress' || status === 'completed'){
            return true;
        }else{
            return false;
        }
    })
    
});

export const deleteSchema = string().required();