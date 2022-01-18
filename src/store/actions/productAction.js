import Product from "../../models/product";

export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const DELETE_PRODUCT='DELETE_PRODUCT';
export const SET_PRODUCT='SET_PRODUCT';


export const setProducts=()=>{
    return async (dispatch,getState) =>{
        try{
            const userId = getState().auth.userId;
            const response= await fetch('https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');


            if(!response.ok)
            {
                console.log("Error ")
                throw new Error("Error While Fetching");
            }

            const resData= await response.json()
            console.log(resData)
        let formattedProducts=[];
            for(let key in resData){
                console.log(resData[key])
                formattedProducts.push(
                    new Product(key,resData[key].title,
                        resData[key].description,
                        resData[key].price,
                        resData[key].imageUrl,
                        resData[key].ownerId)
                    );
            }
            dispatch({type:SET_PRODUCT,
                products:formattedProducts,
                userProducts: formattedProducts.filter(prod => prod.ownerId === userId)
            })
        }catch(err)
        {
            throw err;
        }
 
        }

}

export const createProduct=(title,description,imageUrl,price)=>{
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response= await fetch(
            `https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
            {
                method : "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId:userId
                })
            }
        );

        const resData= await response.json();

        console.log(resData)

        dispatch({type:CREATE_PRODUCT,
            productData:
            {
                id:resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    }

}

export const updateProduct=(id,title,description,imageUrl,price)=>{
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const response= await fetch(
            `https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
            {
                method : "PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            });
            const resData= await response.json();
            console.log(resData)
            dispatch ({type:UPDATE_PRODUCT,productData:{
                    id,
                    title,
                    description,
                    imageUrl,
                    price
                }
            });
    }
}

export const deleteProduct=(productId)=>{
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const response= await fetch(
            `https://thestore-b2497-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
            {
                method : "DELETE",
                headers:{
                    'Content-Type':'application/json'
                },
            });

        dispatch ({type:DELETE_PRODUCT,pid:productId});
    }
}