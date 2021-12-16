import { Ionicons } from "@expo/vector-icons";
import React from "react";
// import { } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import COLORS from "../constants/Colors";


const CustomHeaderButton=props=>{

    return(
        <HeaderButton 
            {...props}
            IconComponent={Ionicons}
            iconSize={25}
            color={COLORS.whiteColor}
        />
    );
};

export default CustomHeaderButton;