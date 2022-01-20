import { removeUserData, saveUserData } from "../../utils/storageHelper";

export const SIGN_UP ="SIGNUP";
export const LOG_IN ="LOG_IN";
export const LOG_OUT ="LOG_OUT";

export const autoLogin=(userId,token)=>{
    return  dispatch=>{
        console.log('autoLogin')
        console.log(userId)
        dispatch({type:LOG_IN,token:token,userId:userId});

    }
}

export const signUp=(username,password)=>{
    return async dispatch=>{
        const response=fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQi0yJg5pcXS7P5xubK9RKSYSq5Z25AIU',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:username,
                    password:password,
                    returnSecureToken:true
                }),
            },
        );

        let resData= await (await response).json();

        dispatch({type:SIGN_UP,token:resData.idToken,userId:resData.localId});
        saveUserData(resData.localId,resData.idToken)
    }
}

    export const login=(username,password)=>{
        return async dispatch=>{
            const response=fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQi0yJg5pcXS7P5xubK9RKSYSq5Z25AIU',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        email:username,
                        password:password,
                        returnSecureToken:true
                    }),
                },
            );
    
            let resData= await (await response).json();
    
            dispatch({type:LOG_IN,token:resData.idToken,userId:resData.localId});
            saveUserData(resData.localId,resData.idToken)

        }
    }

    export const logout=()=>{
        console.log('logout called')
        removeUserData();
        return   { type: LOG_OUT }

    }