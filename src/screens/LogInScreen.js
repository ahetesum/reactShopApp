import React, { useCallback, useReducer } from "react";
import { Button, KeyboardAvoidingView, StyleSheet,   ScrollView , View } from "react-native";
import InputEdit from "../components/InputEdit";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import { LinearGradient } from 'expo-linear-gradient';
import CardView from "../components/CardView";
import { useDispatch } from 'react-redux';
import { login, signUp } from "../store/actions/authAction";



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const LogInScreen= props=>{
   

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email: '',
        password: ''
      },
      inputValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    });
  
    const signupHandler = async() => {
         dispatch(
            signUp(
              formState.inputValues.email,
              formState.inputValues.password
            )
          );
        try{
              props.navigation.navigate('ShopDrawNav');
        }
        catch(err)
        {
            console.log(err.message)
        }

    };

    const signinHandler = async() => {
        try{
            await dispatch(
                login(
                  formState.inputValues.email,
                  formState.inputValues.password
                )
              );
              props.navigation.navigate('ShopDrawNav');
        }
        catch(err)
        {
            console.log(err.message)
        }
      };
  

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
   
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <CardView style={styles.authContainer}>
          <ScrollView>
            <InputEdit
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <InputEdit
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={COLORS.primaryColor}
                onPress={signinHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                color={COLORS.accentColor}
                onPress={() => {signupHandler}}
              />
            </View>
          </ScrollView>
        </CardView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

LogInScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,

  },
  buttonContainer: {
    marginTop: 10
  }
});


export default LogInScreen;