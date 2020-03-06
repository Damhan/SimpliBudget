import {GET_BAL, SUB_BAL, INC_BAL} from './types';

export const getBal = () => {
    return {
        type: GET_BAL
    }
}

export const subBal = (amount) => {
    return {
        type: SUB_BAL,
        payload: amount
    }
}

export const incBal = (amount) => {
    return {
        type: INC_BAL,
        payload: amount
    }
}