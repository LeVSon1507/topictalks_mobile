import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import accountStore from '../../../../../store/accountStore';

const AddToChatScreen = observer(() => {
   const navigation = useNavigation();
   const user = accountStore?.account;
   const [addChat, setAddChat] = useState('');

   const createNewChat = async () => {
      let id = ''; // Specify the value of 'id'
   };

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <MaterialIcons name='chevron-left' size={32} color='#fbfbfb' />
            </TouchableOpacity>
            <View style={styles.middleSection}>
               <Image
                  source={{ uri: user?.url_img }}
                  style={styles.profileImage}
                  resizeMode='contain'
               />
            </View>
         </View>

         {/* Bottom section */}
         <View style={styles.bottomSection}>
            <View style={styles.inputContainer}>
               <Ionicons name='chatbubbles' size={24} color='#777' />
               <TextInput
                  style={styles.textInput}
                  placeholder='Create a chat'
                  placeholderTextColor='#999'
                  value={addChat}
                  onChangeText={text => setAddChat(text)}
               />
               <TouchableOpacity onPress={createNewChat}>
                  <FontAwesome name='send' size={24} color='#777' />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      width: '100%',
      backgroundColor: 'blue', // Set desired background color
      paddingHorizontal: 4,
      paddingVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   middleSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      spaceX: 3,
   },
   profileImage: {
      width: 48,
      height: 48,
   },
   bottomSection: {
      width: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 4,
      paddingVertical: 6,
      borderRadius: 50,
      marginTop: -10,
   },
   inputContainer: {
      width: '100%',
      paddingHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 3,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'gray',
   },
   textInput: {
      flex: 1,
      fontSize: 16,
      color: 'blue', // Set desired text color
      marginTop: -2,
      height: 48,
   },
});

export default AddToChatScreen;
