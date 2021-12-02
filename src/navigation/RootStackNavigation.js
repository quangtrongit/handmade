import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../components/context';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import OverviewTabNavigator from './OverviewTabNavigator';
import ProfileScreen from '../screens/HomeScreen/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const [isLoading , setIsLoading] = React.useState(true);
  // const [userToken , setUserToken] = React.useState(null);
  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...Pressable,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...Pressable,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...Pressable,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...Pressable,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = React.useMemo(() => ({
    signIn: async foundUser => {
      // setUserToken('acbd');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      console.log('userToken:', userToken);
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async () => {
      //   setUserToken('null');
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      setUserToken('acbd');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.setItem('userToken');
      } catch (e) {
        console.log(e);
      }
      console.log('userToken:');
      dispatch({type: 'REGISTER', token: userToken});
    }, 10);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.userToken === null ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen
                name="ConfirmEmail"
                component={ConfirmEmailScreen}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="OverView"
                component={OverviewTabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{headerShown: false}}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
