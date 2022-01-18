import Order from "../../models/order";
import { ADD_ORDER, SET_ORDER } from "../actions/orderAction";

const initialState={
    orders:[],
};

const orderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_ORDER:
            return{ 
                ...state, 
                orders: action.orders,
            }
        case ADD_ORDER:
            const {items,amount,id,date}= action;

            console.log(items)
            let newOrder= new Order( id,items, amount, date);
                return{
                    ...state,
                    orders: state.orders.concat(newOrder)
                };

    }
    return state;
};

export default orderReducer;