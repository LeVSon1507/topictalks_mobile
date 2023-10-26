import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminController from './src/components/admin/AdminHome';
import LoginScreen from './src/components/authentication/Login';
import RegisterScreen from './src/components/authentication/Register';
import HomeScreen from './src/components/user/Home';
import { observer } from 'mobx-react';
import accountStore from './src/store/accountStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
import ChatProvider from './src/context/ChatProvider';
import { register } from '@videosdk.live/react-native-sdk';
import PostDetailScreen from './src/components/user/Home/PostDetail';
//ios 1076673518797-vpn80s98mv0461ifp4aesjc2o2apnp7q.apps.googleusercontent.com
//web 1076673518797-kaqm977mc6qeqpu7duqu115jqvt1n4ej.apps.googleusercontent.com
const Stack = createStackNavigator();
// Register the service video call
// register();
import { NativeBaseProvider } from 'native-base';

const App = observer(() => {
   return (
      // <GoogleOAuthProvider clientId='1076673518797-kaqm977mc6qeqpu7duqu115jqvt1n4ej.apps.googleusercontent.com'>
      <NativeBaseProvider>
         <FacebookProvider appId='1759450831238442'>
            <NavigationContainer>
               <Stack.Navigator
                  initialRouteName='PostDetail'
                  screenOptions={{ headerShown: false }}
               >
                  <Stack.Screen name='Login' component={LoginScreen} />
                  <Stack.Screen name='Register' component={RegisterScreen} />
                  <Stack.Screen name='PostDetail' component={PostDetailScreen} />
                  <Stack.Screen
                     name='Home'
                     component={HomeScreen}
                     options={{ headerShown: false }}
                  />
                  <Stack.Screen name='Admin' component={AdminController} />
               </Stack.Navigator>
            </NavigationContainer>
         </FacebookProvider>
      </NativeBaseProvider>
      // </GoogleOAuthProvider>
   );
});

export default App;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
