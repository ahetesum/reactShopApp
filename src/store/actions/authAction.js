export const SIGN_UP ="SIGNUP";
export const LOG_IN ="LOG_IN";
export const LOG_OUT ="LOG_OUT";



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
        console.log(resData);

        dispatch({type:SIGN_UP,token:resData.idToken,userId:resData.localId});

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
            console.log(resData);
    
            dispatch({type:LOG_IN,token:resData.idToken,userId:resData.localId});
        }
    }
