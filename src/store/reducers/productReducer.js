import PRODUCTS from "../../utils/dummy-data";

const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(p=>p.ownerId==='u1')
};

const productReducer=(state=initialState,action)=>{
    // switch(action.type)
    // {

    // }
    return state;
};

export default productReducer;