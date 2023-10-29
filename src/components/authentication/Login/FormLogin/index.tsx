import React, { useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { Toast } from 'native-base';
import {
   Box,
   Button,
   Center,
   Image,
   FormControl,
   Text,
   HStack,
   Heading,
   Icon,
   Input,
   Link,
   Pressable,
   VStack,
   View,
} from 'native-base';
import { styles } from '../styles';

const FormLogin = ({ handleChangeUsername, handleChangePassword, goToRegister, handleSignIn }) => {
   const [show, setShow] = useState(false);
   return (
      <Center w='100%'>
         <Box safeArea p='2' py='8' w='90%' maxW='290'>
            <VStack
               style={styles.loginLogoWrap}
               pt={24}
               alignContent={'center'}
               justifyContent={'center'}
            >
               <Image style={styles.logo} source={require('../../../../assets/images/logo.png')} />
               <Text style={styles.textLogin}>Login</Text>
            </VStack>
            <VStack space={3} mt='5'>
               <FormControl>
                  <FormControl.Label>UserName</FormControl.Label>
                  <Input onChangeText={handleChangeUsername} />
               </FormControl>
               <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                     type={show ? 'text' : 'password'}
                     placeholder='Password'
                     onChangeText={handleChangePassword}
                     InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                           <Icon
                              as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                              size={5}
                              mr='2'
                              ml={2}
                           />
                        </Pressable>
                     }
                  />
                  <Link
                     _text={{
                        fontSize: 'xs',
                        fontWeight: '500',
                        color: 'indigo.500',
                     }}
                     alignSelf='flex-end'
                     mt='1'
                  >
                     Forget Password?
                  </Link>
               </FormControl>
               <Button mt='2' colorScheme='indigo' onPress={handleSignIn}>
                  Sign in
               </Button>
               <HStack mt='6' justifyContent='center'>
                  <Text
                     fontSize='sm'
                     color='coolGray.600'
                     _dark={{
                        color: 'warmGray.200',
                     }}
                  >
                     I'm a new user.
                  </Text>
                  <Link
                     _text={{
                        color: 'indigo.500',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                     }}
                     href='#'
                     onPress={goToRegister}
                  >
                     Sign Up
                  </Link>
               </HStack>
            </VStack>
         </Box>
      </Center>
   );
};

export default FormLogin;
