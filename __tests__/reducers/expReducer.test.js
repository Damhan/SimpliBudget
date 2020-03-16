import reducer from './../../reducers/expReducer.js';
import {clearExp, setClear} from './../../actions/expActions.js';
import expect from 'expect';

describe('Expenditure reducer', () => {
    it('clearExp() should clear exp array', () => {
        expect(reducer(undefined, clearExp())).toEqual({exps:[], lastClear: expect.any(Number)})
    });
    it('setClear() should set the lastClear()', () => {
        expect(reducer(undefined, setClear(2))).toEqual({exps: expect.any(Array), lastClear:2})
    })
});