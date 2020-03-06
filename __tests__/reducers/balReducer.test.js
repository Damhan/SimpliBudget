import reducer from './../../reducers/balReducer.js';
import {subBal, incBal} from './../../actions/balActions.js';
import expect from 'expect';

describe('Balance reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({"balance":0})
    });
    it('should decrease when expenditure added', () => {
        expect(reducer({balance:100}, subBal(50)).balance == 50)
    })
    it('should increase when expenditure deleted', () => {
        expect(reducer({balance:100}, incBal(50).balance == 150))
    })

});