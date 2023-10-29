import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { API_KEY } from '../../../utils';
import uiStore from '../../../store/uiStore';
import { IUser } from '../../../types/account.types';
import RegisterForm from './RegisterForm';
import { Toast } from 'native-base';
import { styles } from './styles';
import SelectTopicModal from './ModalSelect';

const SignUpPage = observer(({}) => {
   const navigation = useNavigation();
   const [accountSignup, setAccountSignup] = useState<IUser>(null);
   const [openSelectTopic, setOpenSelectTopic] = useState<boolean>(false);
   const [formData, setData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const [errors, setErrors] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   let timeoutId;

   const handleSignUp = e => {
      e.preventDefault();
      const user = {
         username: formData.name,
         email: formData.email,
         password: formData.password,
      };

      axios
         .post(`${API_KEY}/auth/register`, user)
         .then(res => {
            uiStore?.setLoading(true);
            setAccountSignup(res.data);
            timeoutId = setTimeout(() => {
               Toast.show({ description: 'Register Successfully' });
               clearTimeout(timeoutId);
               uiStore?.setLoading(false);
               setOpenSelectTopic(true);
            }, 2000);
         })
         .catch(err => {
            Toast.show({ description: 'Something is wrong!!!' });
            alert(err.response.data.message);
         });
   };

   const goToLogin = () => {
      navigation.navigate('Login' as never);
   };

   const onClose = () => {
      setOpenSelectTopic(false);
   };

   return (
      <View
         style={{
            flex: 1,
            position: 'relative',
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
         <Text style={styles.textLogin}>Sign Up</Text>
         {/* <TextInput
            style={styles.textInput}
            onChangeText={handleChange}
            value={user.anonymousName}
            placeholder='Anonymous Name'
         />
         <TextInput
            style={styles.textInput}
            onChangeText={handleChange}
            value={user.email}
            placeholder='Email'
         />
         <TextInput
            style={styles.textInput}
            onChangeText={handleChange}
            value={user.password}
            placeholder='Password'
         />
         <TextInput
            style={styles.textInputPw}
            onChangeText={handleChange}
            value={user.cpassword}
            placeholder='Confirm password'
         />
         <View style={styles.buttonWrap}>
            <TouchableOpacity onPress={handleSignUp}>
               <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
         </View>
     */}
         <RegisterForm
            setData={setData}
            setErrors={setErrors}
            errors={errors}
            formData={formData}
            goToLogin={goToLogin}
            handleSignUp={handleSignUp}
         />
         <SelectTopicModal
            goToLogin={goToLogin}
            open={openSelectTopic}
            accountSignup={accountSignup}
            onClose={onClose}
         />
      </View>
   );
});

export default SignUpPage;
