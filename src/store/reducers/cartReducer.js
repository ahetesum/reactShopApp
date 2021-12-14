import CartItem from "../../models/cartItem";
import { ADD_TO_CART } from "../actions/cartAction";

const initialState={
    items:[],
    totalAmount:0,
};

const cartReducer=(state=initialState,action)=>{

    switch(action.type)
    {
        case ADD_TO_CART:
            const addedProduct= action.product;
            let updatedCartItem;
            
            if(state.items[addedProduct.id])
            {
                 updatedCartItem= state.items[addedProduct.id];
                 console.log('Inside icrement prod count')
                 console.log(updatedCartItem);
                 updatedCartItem.addCartItem();


            }
            else
            {
                console.log('Inside first time add')
                updatedCartItem= new CartItem(addedProduct.id,addedProduct,1);
            }

            return{
                ...state,
                items:{ ...state.items,[addedProduct.id]:updatedCartItem},
                totalAmount: state.totalAmount+addedProduct.price
            };


           
    }
    return state;
};


export default cartReducer;