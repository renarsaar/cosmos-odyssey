"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCartFlights = exports.selectCartPath = exports.selectCart = exports.resetCart = exports.setCartItem = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    chosenPath: [],
    flights: {},
};
const cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState,
    reducers: {
        setCartItem: (state, action) => {
            const { chosenPath, flight } = action.payload;
            let newFlights = state.flights;
            if (chosenPath !== (0, toolkit_1.current)(state.chosenPath)) {
                newFlights = {};
            }
            // Delete the Flight on toggle
            if (JSON.stringify(state.flights[flight.index]) === JSON.stringify(flight)) {
                const copy = Object.assign({}, newFlights);
                delete copy[flight.index];
                newFlights = Object.assign({}, copy);
            }
            else {
                newFlights = Object.assign(Object.assign({}, newFlights), { [flight.index]: flight });
            }
            return {
                chosenPath,
                flights: newFlights,
            };
        },
        resetCart: () => initialState, // ? Is it needed
    },
});
_a = cartSlice.actions, exports.setCartItem = _a.setCartItem, exports.resetCart = _a.resetCart;
const selectCart = (state) => state.cart; // ? needed?
exports.selectCart = selectCart;
const selectCartPath = (state) => state.cart.chosenPath;
exports.selectCartPath = selectCartPath;
const selectCartFlights = (state) => state.cart.flights;
exports.selectCartFlights = selectCartFlights;
exports.default = cartSlice.reducer;
