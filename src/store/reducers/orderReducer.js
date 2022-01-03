import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orderAction";

const initialState={
    orders:[],
};

const orderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case ADD_ORDER:
            const items= action.items;
            const amount = action.amount;
            console.log(items)
            let newOrder= new Order(    
                                new Date().getMilliseconds().toString(),
                                items, amount, new Date());
                return{
                    ...state,
                    orders: state.orders.concat(newOrder)
                };

    }
    return state;
};

export default orderReducer;