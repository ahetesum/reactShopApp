import Product from "../../models/product";
import PRODUCTS from "../../utils/dummy-data";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from "../actions/productAction";

const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(p=>p.ownerId==='u1')
};

const productReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_PRODUCT:
            return{ 
                ...state, 
                availableProducts: action.products,
                userProducts:action.products,
            }

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,                
                action.productData.title,
                action.productData.description,
                action.productData.price,
                action.productData.imageUrl,
                'u1'
            );

            return{ 
                ...state, 
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct)
            }

            case UPDATE_PRODUCT:

                const updatedProduct = new Product(
                    action.productData.id,                    
                    action.productData.title,
                    action.productData.description,
                    action.productData.price,
                    action.productData.imageUrl,
                    'u1'
                );
                const availableProductIndex= state.availableProducts.findIndex(p=>p.id===action.productData.id)
                const userProductIndex= state.userProducts.findIndex(p=>p.id===action.productData.id)
                const availableProductUpdated= [...state.availableProducts];
                const userProductUpdated= [...state.userProducts];
                availableProductUpdated[availableProductIndex] = updatedProduct;
                userProductUpdated[userProductIndex] = updatedProduct;
                
                return{ 
                    ...state, 
                    availableProducts: availableProductUpdated,
                    userProducts:userProductUpdated
                }

        case DELETE_PRODUCT:
            const pid= action.pid 
            return{ 
                ...state, 
                availableProducts:state.availableProducts.filter(p=>p.id!==pid),
                userProducts:state.userProducts.filter(p=>p.id!==pid)
            }
    }
    return state;
};

export default productReducer;