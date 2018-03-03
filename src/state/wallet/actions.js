import * as t from './actionTypes';

export const setSeed = (seed) => ({
    type: t.SET_SEED,
    payload: seed,
});

export const setAmount = (amount) => ({
    type: t.SET_AMOUNT,
    payload: amount,
});

export const reset = () => ({
    type: t.RESET,
});