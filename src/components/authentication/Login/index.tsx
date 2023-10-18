import React, { useState } from 'react';
import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Image,
   StyleSheet,
   Alert,
   Dimensions,
} from 'react-native';
import axios from 'axios';
import accountStore from '../../../store/accountStore';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { API_KEY } from '../../../utils';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react';

const LoginPage = observer(({}) => {
   const navigation = useNavigation();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [showPass, setShowPass] = useState(true);

   const handleSignIn = e => {
      e.preventDefault();
      const user = {
         username: username,
         password: password,
      };
      axios
         .post(`${API_KEY}/auth/authenticate`, user)
         .then(res => {
            // showToastShort('Login Success!');
            accountStore?.setAccount(res.data);
            res.data.roles.includes('ROLE_ADMIN')
               ? navigation.navigate('Admin' as never)
               : navigation.navigate('Home' as never);
         })
         .catch(err => {
            console.log(err);
            // Toast.error('Invalidate UserName or Password!');
            // alert('Invalidate UserName or Password!');
            Alert.alert('Invalidate UserName or Password!', '', [
               {
                  text: 'Try Again',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
               },
            ]);
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

   return (
      <View style={styles.container}>
         <Image
            style={[styles.logoBanner, { width: screenWidth }]}
            source={require('../../../assets/images/carousel1.png')}
         />
         <View style={styles.mainView}>
            <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
            <Text style={styles.textLogin}>Login</Text>

            <View style={[styles.passwordInputWrap]}>
               <MaterialIcons name='person' size={24} color={'#6c66d83'} />
               <TextInput
                  style={styles.textInput}
                  onChangeText={text => setUsername(text)}
                  value={username}
                  placeholder='User Name'
               />
            </View>
            <View style={[styles.passwordInputWrap, { marginBottom: 20 }]}>
               <MaterialIcons name='person' size={24} color={'#6c66d83'} />
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
               )}
            </View>
            <View style={styles.buttonWrap}>
               <TouchableOpacity onPress={handleSignIn}>
                  <Text style={styles.button}>Login</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.signup}>
               <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                  <Text style={styles.textRegister}>Register Now!</Text>
               </TouchableOpacity>
            </View>
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

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   mainView: {
      zIndex: 1,
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '70%',
      top: '30%',
      backgroundColor: 'white',
      borderTopLeftRadius: 50,
   },
   logoBanner: {
      zIndex: -1,
      resizeMode: 'cover',
      height: '100%',
   },
   textInput: {
      backgroundColor: 'none',
      padding: 10,
      width: 250,
      marginHorizontal: 6,
   },
   passwordInputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 12,
      width: 300,
   },
   textInputPw: {
      backgroundColor: 'none',
      padding: 10,
      width: 250,
      marginHorizontal: 6,
   },
   textLogin: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   logo: {
      width: 100,
      height: 100,
   },
   buttonWrap: {
      width: 300,
      height: 50,
      borderRadius: 10,
      verticalAlign: 'auto',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      backgroundColor: 'black',
   },
   button: {
      fontSize: 16,
      color: 'white',
   },
   signup: {
      width: 200,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
   },
   textRegister: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
   },
   logingg: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
