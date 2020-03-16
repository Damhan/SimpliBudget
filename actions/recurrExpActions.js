import {GET_REC_EXP, DEL_REC_EXP, ADD_REC_EXP} from './types';

export const getRecurrExp = () => {
    return {
        type: GET_REC_EXP
    }
}

export const delRecurrExp = (id) => {
    return {
        type: DEL_REC_EXP,
        payload: id
    }
}

export const addRecurrExp = (exp) => {
    return {
        type: ADD_REC_EXP,
        payload: exp
    }
}