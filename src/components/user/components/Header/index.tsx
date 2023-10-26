import { StyleSheet, TouchableOpacity, Text, View, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoutModal from '../../Home/Topic/LogoutModal';
import { useNavigation } from '@react-navigation/native';
import { HamburgerIcon, Menu, Pressable } from 'native-base';

export const avatarUrlDemo =
   'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=';

const HeaderBar = ({ account }) => {
   const navigation = useNavigation();
   const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

   const goToProfile = () => {
      navigation.navigate('Home' as never);
   };

   const logout = () => {
      setIsOpenModal(true);
   };

   return (
      <>
         <View style={styles.blankHeaders}></View>
         <TouchableOpacity style={styles.userBarWrap} onPress={() => setModalVisible(true)}>
            <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
               <Image
                  source={require('../../../../assets/images/logo.png')}
                  resizeMode='contain'
                  style={styles.imageUserStyle}
               />
            </TouchableOpacity>
            <View style={styles.userNameWrap}>
               <Text style={styles.userName}>{account?.username}</Text>
               <Menu
                  trigger={triggerProps => {
                     return (
                        <Pressable accessibilityLabel='More options menu' {...triggerProps}>
                           <Image
                              source={{ uri: account?.url_img || avatarUrlDemo }}
                              alt='avatar'
                              style={[styles.imageUserStyle, { borderRadius: 50 }]}
                           />
                        </Pressable>
                     );
                  }}
               >
                  <Menu.Item onPress={goToProfile}>Profile</Menu.Item>
                  <Menu.Item onPress={logout}>Logout</Menu.Item>
               </Menu>
            </View>
         </TouchableOpacity>
         <LogoutModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </>
   );
};

export default HeaderBar;

const styles = StyleSheet.create({
   blankHeaders: {
      height: 50,
      position: 'relative',
      backgroundColor: 'black',
   },
   userBarWrap: {
      justifyContent: 'space-between',
      color: 'white',
      paddingTop: 10,
      backgroundColor: 'black',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 32,
   },
   userNameWrap: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   userName: {
      backgroundColor: '#C67C4E',
      color: 'white',
      marginRight: 8,
      borderRadius: 16,
      fontStyle: 'italic',
      fontWeight: 'bold',
      padding: 8,
      fontSize: 12,
   },
   imageUserStyle: {
      width: 50,
      height: 50,
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 8,
   },
   //modal styles
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      position: 'absolute',
      right: 75,
      top: 80,
   },
   modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   iconX: {
      position: 'absolute',
      top: 5,
      right: 8,
   },
   profileOption: {
      marginTop: 16,
      padding: 8,
      borderWidth: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
   },
   logoutOption: {
      marginTop: 8,
      padding: 8,
      borderWidth: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
   },
   modalText: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'center',
   },
});
