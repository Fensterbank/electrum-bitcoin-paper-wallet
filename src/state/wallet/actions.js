import * as t from './actionTypes';

export const setSeed = (seed) => ({
    type: t.SET_SEED,
    payload: seed.substring(0, 115),
});

export const setAmount = (amount) => ({
    type: t.SET_AMOUNT,
    payload: amount.substring(0, 14),
});

export const setAddress = (address) => ({
    type: t.SET_ADDRESS,
    payload: address.substring(0, 64),
});

export const reset = () => ({
    type: t.RESET,
});
