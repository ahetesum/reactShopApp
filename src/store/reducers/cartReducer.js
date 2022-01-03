import CartItem from "../../models/cartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartAction";
import { ADD_ORDER } from "../actions/orderAction";
import { DELETE_PRODUCT } from "../actions/productAction";

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

        case REMOVE_FROM_CART:
            const productId= action.pid;
            console.log(productId)
            if(state.items[productId])
            {
              let  updatedCartItem= state.items[productId];

              console.log('from Reducer')

              console.log(updatedCartItem)

                if(updatedCartItem.quantity>1)
                {
                    updatedCartItem.removeCartItem();
                    return{
                        ...state,
                        items:{ ...state.items,[productId]:updatedCartItem},
                        totalAmount: state.totalAmount - updatedCartItem.item.price
                    };
                }
                else
                {
                    delete state.items[productId]

                    return{
                        ...state,
                        items:{ ...state.items},
                        totalAmount: state.totalAmount - updatedCartItem.item.price
                    };
                }

            }

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
                const pid= action.pid
                if(!state.items[pid])
                {
                    return state;
                }
                let updatedItems= state.items;
                let deductAmount= updatedItems[pid].price
                delete updatedItems[pid]


            return {
                ...state,
                items:updatedItems,
                totalAmount: state.totalAmount - deductAmount 
            }
           
    }
    return state;
};


export default cartReducer;