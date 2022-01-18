import Order from "../../models/order";

export const ADD_ORDER='ADD_ORDER';
export const SET_ORDER='SET_ORDER';



export const setOrders=()=>{
    return async (dispatch,getState) =>{
        try{
            const userId = getState().auth.userId;
            const response= await fetch(
                `https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}/orders.json`
                );

            const resData= await response.json()

        let formattedOrders=[];
            for(let key in resData){
                console.log(resData[key])
                formattedOrders.push(new Order(key,resData[key].cartItems,resData[key].amount,resData[key].date));
            }
            dispatch({type:SET_ORDER,
                orders:formattedOrders
            })
        }catch(err)
        {
            throw err;
        }
 
    }
}


export const addOrder=(cartItems,totalAmount)=>{

    return async (dispatch,getState) =>{
        const userId = getState().auth.userId;

            const response= await fetch(
                `https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}/orders.json`,
                {
                    method : "POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        cartItems,
                        totalAmount,
                        date: new Date().toISOString(),
                    })
                }
            );

        const resData= await response.json();


        dispatch( {type:ADD_ORDER,id:resData.name,items:cartItems,amount:totalAmount,date:resData.date});
    }
}