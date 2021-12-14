import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import COLORS from '../constants/Colors';
import DetailScreen from '../screens/DetailScreen';
import ProductScreen from '../screens/ProductScreen';

const ProductNavigation = createStackNavigator({
    ProductScreenNav: ProductScreen,
    DetailScreenNav: DetailScreen,
},
{
    defaultNavigationOptions:{
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
}
);

export default createAppContainer(ProductNavigation) ;