import React, { useState } from 'react';
import { VStack, FormControl, Input, Button, Text, NativeBaseProvider, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import SelectTopicModal from '../ModalSelect';

const RegisterForm = ({ goToLogin, handleSignUp, formData, setErrors, errors, setData }) => {
   const validate = () => {
      if (formData.name === undefined) {
         setErrors({ ...errors, name: 'Name is required' });
         return false;
      } else if (formData.name.length < 3) {
         setErrors({ ...errors, name: 'Name is too short' });
         return false;
      } else if (formData.email === undefined) {
         setErrors({ ...errors, email: 'Email is required' });
         return false;
      } else if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
         setErrors({ ...errors, email: 'Invalid email address' });
         return false;
      } else if (formData.password === undefined) {
         setErrors({ ...errors, password: 'Password is required' });
         return false;
      } else if (formData.password.length < 8) {
         setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
         return false;
      } else if (formData.password !== formData.confirmPassword) {
         setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
         return false;
      }

      return true;
   };

   const onSubmit = e => {
      validate() ? handleSignUp(e) : Toast.show({ description: 'Register Failed' });
   };

   return (
      <NativeBaseProvider>
         <VStack width='100%' mx={3} space={4}>
            <FormControl isRequired isInvalid={'name' in errors}>
               <FormControl.Label _text={{ bold: true }}>User Name</FormControl.Label>
               <Input
                  placeholder='User Name'
                  onChangeText={value => setData({ ...formData, name: value })}
               />
               {'name' in errors ? (
                  <Text color='red.500'>{errors.name}</Text>
               ) : (
                  <Text>Name should contain at least 3 characters.</Text>
               )}
            </FormControl>

            <FormControl isRequired isInvalid={'email' in errors}>
               <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
               <Input
                  placeholder='example@example.com'
                  onChangeText={value => setData({ ...formData, email: value })}
               />
               {'email' in errors && <Text color='red.500'>{errors.email}</Text>}
            </FormControl>

            <FormControl isRequired isInvalid={'password' in errors}>
               <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
               <Input
                  type='password'
                  onChangeText={value => setData({ ...formData, password: value })}
               />
               {'password' in errors && <Text color='red.500'>{errors.password}</Text>}
            </FormControl>

            <FormControl isRequired isInvalid={'confirmPassword' in errors}>
               <FormControl.Label _text={{ bold: true }}>Confirm Password</FormControl.Label>
               <Input
                  type='password'
                  onChangeText={value => setData({ ...formData, confirmPassword: value })}
               />
               {'confirmPassword' in errors && (
                  <Text color='red.500'>{errors.confirmPassword}</Text>
               )}
            </FormControl>

            <Button onPress={onSubmit} mt={5} colorScheme='cyan'>
               Sign Up
            </Button>

            <TouchableOpacity onPress={goToLogin}>
               <Text
                  style={{ marginTop: 16, fontSize: 24, fontStyle: 'italic', fontWeight: 'bold' }}
               >
                  I have a account!
               </Text>
            </TouchableOpacity>
         </VStack>
      </NativeBaseProvider>
   );
};

export default RegisterForm;
