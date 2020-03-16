import {GET_EXP, DEL_EXP, ADD_EXP, CLEAR_EXP, SET_CLEAR, GET_CLEAR} from './types';

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

export const clearExp = () => {
    return {
        type: CLEAR_EXP
    }
}

export const setClear = (date) => {
    return {
        type: SET_CLEAR,
        payload: date
    }
}