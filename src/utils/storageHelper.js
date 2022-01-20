//import EncryptedStorage from 'react-native-encrypted-storage';

export const saveUserData= async (userId,token) => {
    try {
        await localStorage.setItem(
            "userData",
            JSON.stringify({
                token,
                userId
            })
        );

    } catch (error) {
        console.log(error.message)
    }
  };

  export const getUserData= async ()=>{
    try {   
        const userData = await localStorage.getItem("userData");
    
        if (userData !== undefined) {
            let userJson=JSON.parse(userData);
            return userJson;
        }
    } catch (error) {
        console.log(error.message)
    }
  }

  export const removeUserData= async ()=>{
    try {
        await localStorage.removeItem("userData");
    } catch (error) {
        console.log(error.message)
    }
  }