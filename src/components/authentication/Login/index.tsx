import React, { useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import axios from 'axios';
import accountStore from '../../../store/accountStore';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { API_KEY } from '../../../utils';
import { observer } from 'mobx-react';
import { styles } from './styles';
import { Toast } from 'native-base';
import { Image, View } from 'native-base';
import FormLogin from './FormLogin';

const LoginPage = observer(({}) => {
   const navigation = useNavigation();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [show, setShow] = useState(false);

   const handleChangeUsername = text => setUsername(text);
   const handleChangePassword = text => setPassword(text);

   const handleSignIn = e => {
      e.preventDefault();
      const user = {
         username: username,
         password: password,
      };
      axios
         .post(`${API_KEY}/auth/authenticate`, user)
         .then(res => {
            accountStore?.setAccount(res.data);
            res.data.roles.includes('ROLE_ADMIN')
               ? navigation.navigate('Admin' as never)
               : navigation.navigate('Home' as never);
         })
         .catch(err => {
            console.log('🚀 ~ file: index.tsx:45 ~ handleSignIn ~ err:', err);
            Toast.show({ description: 'Wrong UserName or Password!' });
         });
   };

   const handleLoginFailed = () => {
      Alert.alert('Login Failed!', '', [
         {
            text: 'Try Again',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
         },
      ]);
   };

   const handleLoginGGSuccess = async credentialResponse => {
      try {
         const decode: { picture?: string; name?: string; email?: string } = jwtDecode(
            credentialResponse?.credential
         );

         const user = {
            fullName: decode.name,
            email: decode.email,
            urlImage: decode.picture,
         };

         axios
            .post(`${API_KEY}/auth/authenticate/google`, user)
            .then(res => {
               accountStore?.setAccount(res.data);
               res.data.roles.includes('ROLE_ADMIN')
                  ? navigation.navigate('Admin' as never)
                  : navigation.navigate('Home' as never);
            })
            .catch(err => {
               console.log(err);
               Alert.alert('Can not login with google!', '', [
                  {
                     text: 'Try Again',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                  },
               ]);
            });
      } catch (err) {
         console.log(err);
         alert('Login Failed');
      }
   };

   const screenWidth = Math.round(Dimensions.get('window').width);

   const goToRegister = () => {
      navigation.navigate('Register' as never);
   };

   return (
      <View style={styles.container}>
         <Image
            style={[styles.logoBanner, { width: screenWidth }]}
            source={require('../../../assets/images/carousel1.png')}
         />
         <View style={styles.mainView}>
            {/* 
            <View style={[styles.passwordInputWrap]}>
               <MaterialIcons name='person' size={24} color={'#6c66d83'} />
               <TextInput
                  style={styles.textInput}
                  onChangeText={text => setUsername(text)}
                  value={username}
                  placeholder='User Name'
               />
            </View> */}
            {/* <View style={[styles.passwordInputWrap, { marginBottom: 20 }]}> */}
            {/* <MaterialIcons name='person' size={24} color={'#6c66d83'} />
               <TextInput
                  style={styles.textInputPw}
                  onChangeText={text => setPassword(text)}
                  value={password}
                  placeholder='Password'
                  secureTextEntry={password && showPass}
               />
               {password && (
                  <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                     <Entypo
                        name={showPass ? 'eye' : 'eye-with-line'}
                        size={24}
                        color={'#6c66d83'}
                     />
                  </TouchableOpacity>
               )} */}
            {/* <View style={styles.buttonWrap}>
               <TouchableOpacity onPress={handleSignIn}>
                  <Text style={styles.button}>Login</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.signup}>
               <TouchableOpacity onPress={goToRegister}>
                  <Text style={styles.textRegister}>Register Now!</Text>
               </TouchableOpacity>
            </View> */}
            {/* </View> */}
            <FormLogin
               goToRegister={goToRegister}
               handleChangePassword={handleChangePassword}
               handleChangeUsername={handleChangeUsername}
               handleSignIn={handleSignIn}
            />
            <View style={styles.logingg}>
               {/* <GoogleLogin
               size='medium'
               shape='circle'
               text='signin_with'
               theme='outline'
               width={380}
               onSuccess={handleLoginGGSuccess}
               onError={handleLoginFailed}
            /> */}
            </View>
         </View>
      </View>
   );
});

export default LoginPage;
