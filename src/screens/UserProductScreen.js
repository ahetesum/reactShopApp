import React from "react";
import {View,StyleSheet,FlatList,Button,Alert} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/Productitem";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import { deleteProduct } from "../store/actions/productAction";

const UserProductScreen=props=>{

    const userProducts= useSelector(state=>state.products.userProducts)
    const dispatchDelete= useDispatch();

    const onEditView=(productId)=>{
        props.navigation.navigate('EditProdScreenNav',{pid:productId,title:"Edit Product"})

    }

    const onDeleteProduct= (id)=>{
            Alert.alert('Are You Sure?','Do you really want to delete',
            {text:'No',style:'Default'},
            {text:'Yes',style:'Destructive',onPress: dispatchDelete(deleteProduct(id))    
        });
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={userProducts}
                renderItem={(itemData)=>
                        <ProductItem 
                            key={itemData.item.id} 
                            product={itemData.item}
                            onSelect= {()=>onEditView(itemData.item.id)} >
                            <Button 
                                style={styles.viewDetails} 
                                title="Edit" 
                                onPress={()=>{
                                    onEditView(itemData.item.id)
                            }}/>
                            <Button style={styles.addToCart} title="Delete" onPress={()=>{
                                console.log('Delete It')
                                onDeleteProduct(itemData.item.id)
                            }}/>
                        </ProductItem>
                }
            />
        </View>
    );
}


UserProductScreen.navigationOptions=navData=>{
    return{
        headerTitle: "My Products",
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            iconName="md-menu" 
            title="Menu" 
            onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>,
          headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
          iconName="md-create" 
          title="Create" 
          onPress={()=>navData.navigation.navigate('EditProdScreenNav',{title:"Add Product"})} />
      </HeaderButtons>,
    }
}


const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    viewDetails:{
        color:COLORS.primaryColor,
        marginStart:DIMENS.paddingStand,
    },
    addToCart:{
        backgrondColor:COLORS.dangerColor,
        marginRight:DIMENS.paddingStand,

    },
});

export default UserProductScreen;