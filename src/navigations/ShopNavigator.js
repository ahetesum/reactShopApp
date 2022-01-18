import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import COLORS from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
import DetailScreen from '../screens/DetailScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductScreen from '../screens/ProductScreen';
import UserProductScreen from '../screens/UserProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import LogInScreen from '../screens/LogInScreen';



const defaultNavOptions= {
    headerTitleStyle:{
        fontFamily:'open-sans-bold',
        color:COLORS.whiteColor
    },
    headerBackTitle:{
        fontFamily:'open-sans',
        color:COLORS.whiteColor
    },
    headerStyle:{
        backgroundColor:COLORS.primaryDarkColor
    },
}

const ProductNavigation = createStackNavigator({
    ProductScreenNav: ProductScreen,
    DetailScreenNav: DetailScreen,
    CartScreenNav:CartScreen,
},
{
    navigationOptions:{
        drawerLabel:'Home',
        drawerIcon : drawerConfig=>{
            <Ionicons 
                name='md-cart'
                size={25}
                color={COLORS.primaryColor}
            />
        }
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrderNavigation = createStackNavigator({
    OrderScreenNav: OrderScreen,
},
{
    defaultNavigationOptions: defaultNavOptions
}
);

const UserProdNavigation = createStackNavigator({
    UserProdScreenNav: UserProductScreen,
    EditProdScreenNav:EditProductScreen,
},
{
    defaultNavigationOptions: defaultNavOptions
}
);

const AuthNavigation = createStackNavigator({
    AuthScreenNav: LogInScreen,
},
{
    defaultNavigationOptions: defaultNavOptions
}
);


const ShopDrawerNavigation = createDrawerNavigator({
    ProductFlowNav:{
        screen:ProductNavigation,

    },
    OrderFlowNav:{
        screen:OrderNavigation,navigationOptions:{
            drawerLabel:'My Orders',
            drawerIcon : drawerConfig=>{
                <Ionicons 
                    name='md-cart'
                    size={25}
                    color={COLORS.primaryColor}
                />
            }
        }},
        UserFlowNav:{
            screen: UserProdNavigation
            ,navigationOptions:{
                drawerLabel:'My Products',
                drawerIcon : drawerConfig=>{
                    <Ionicons 
                        name='md-cart'
                        size={25}
                        color={COLORS.primaryColor}
                    />
                }
            }
        },
        
},
{
    contentOptions: {
        activeTintColor:COLORS.primaryColor,
    }
}
);

const ShapMainNavigation = createSwitchNavigator({
    LoginNav: AuthNavigation,
    ShopDrawNav:ShopDrawerNavigation,
});

export default createAppContainer(ShapMainNavigation) ;