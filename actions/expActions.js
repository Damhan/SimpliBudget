import {GET_EXP, DEL_EXP, ADD_EXP} from './types';

export const getExp = () => {
    return {
        type: GET_EXP
    }
}

export const delExp = (id) => {
    return {
        type: DEL_EXP,
        payload: id
    }
}

export const addExp = (exp) => {
    return {
        type: ADD_EXP,
        payload: exp
    }
}