import { LOG_IN, LOG_OUT, SIGN_UP } from "../actions/authAction";


const initialState={
    token:null,
    userId:null,
};

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SIGN_UP:
            return {
                token: action.token,
                userId: action.userId,
            }
        case LOG_IN:
            return {
                token: action.token,
                userId: action.userId,
            }
        case LOG_OUT:
            return {
                token: null,
                userId: null,
            }
        default :
            return state;
    }

}



export default authReducer;