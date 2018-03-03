import * as t from './actionTypes';

const initialState = {
    seed: 'enter your electrum wallet seed here',
    amount: '0.01 BTC',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;

        case t.SET_SEED:
            return { ...state, seed: action.payload };

        case t.SET_AMOUNT:
            return { ...state, amount: action.payload };

        case t.RESET:
            return initialState;
    }
}
