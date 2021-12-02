import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  data,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../components/context';
import Users from '../../../model/users';
const SignInScreen = () => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    signIn(foundUser);
  };

  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView style={styles.ojb} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

<CustomInput
          placeholder="Username"
          value={data.username}
          setValue={textInputChange}
          defaultValue={data.username}
          autoCapitalize="none"
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        {data.isValidUser ? null : (
          <Text style={styles.errorMsg}>
            Username must be 5 characters long
          </Text>
        )}
        <CustomInput
          placeholder="Password"
          value={data.password}
          setValue={handlePasswordChange}
          defaultValue={data.password}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
        />
        {data.isValidPassword ? null : (
          <Text style={styles.errorMsg}>
            Password must be 8 characters long
          </Text>
        )}

        <CustomButton
          text="Sign In"
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ojb: {
    backgroundColor: 'white',
  },
  root: {
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 400,
  },
  errorMsg: {
    color: 'red',
  },
});

export default SignInScreen;
