import {
   StyleSheet,
   Image,
   Button,
   TouchableOpacity,
   Text,
   View,
   SafeAreaView,
   ScrollView,
   ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';
import HeaderBar from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import ChatContext from '../../../../context/ChatContext';
import RandomDialog from '../../chatComponents/RandomModal';
import ChatProvider from '../../../../context/ChatProvider';

const Message = observer(() => {
   const {
      message,
      setMessage,
      socket,
      notification,
      setNotification,
      isBeingRandom,
      setIsBeingRandom,
      openRandom,
      setOpenRandom,
   } = useContext(ChatContext);

   const [isLoading, setIsLoading] = useState(false);
   const account = accountStore?.account;

   const handleRandom = () => {
      setOpenRandom(true);
   };

   return (
      <View style={{ flex: 1, backgroundColor: '' }}>
         <SafeAreaView style={styles.container}>
            <HeaderBar account={account} />
            <View style={{ backgroundColor: 'black', height: 20 }}></View>
            <View style={styles.titleMessageWrap}>
               <Text style={styles.primaryText}>Messages</Text>
               <View style={styles.iconGroup}>
                  <TouchableOpacity style={styles.chatIconWrap}>
                     <Ionicons name='people-outline' style={styles.chatIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatIconWrap}>
                     <Ionicons name='chatbox' style={styles.chatIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatIconWrap} onPress={handleRandom}>
                     <FontAwesome5 name='dice' style={styles.chatIcon} />
                  </TouchableOpacity>
               </View>
            </View>
            {isLoading ? (
               <View style={styles.indicator}>
                  <ActivityIndicator size='large' color='#43C651' />
               </View>
            ) : (
               <>
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
               </>
            )}
            <ScrollView style={{ paddingTop: 4, paddingHorizontal: 4, width: '100%' }}>
               <View style={{ width: '100%' }}>{/* content here */}</View>
            </ScrollView>
            <RandomDialog open={true} onClose={() => setIsBeingRandom(false)} />
         </SafeAreaView>
      </View>
   );
});

const MessageCard = () => {
   return (
      <TouchableOpacity style={styles.cardContainer}>
         {/* images */}
         <View style={styles.imageContainer}>
            <FontAwesome5 name='users' size={24} color='#555' />
         </View>
         {/* content */}
         <View style={styles.contentContainer}>
            <Text style={styles.messageTitle}>Message title</Text>
            <Text style={styles.messageContent}>
               Lorem ipsum dolor sit amet consec tetur adipis adip isicing icing elit....
            </Text>
         </View>
         {/* time text */}
         <Text style={styles.timeText}>27 min</Text>
      </TouchableOpacity>
   );
};

export default Message;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   flexRow: {
      flexDirection: 'row',
   },
   titleMessageWrap: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 2,
      paddingTop: 8,
   },
   imageStyle: {
      width: 48,
      height: 48,
   },
   roundBorder: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'red',
   },
   iconGroup: {
      flexDirection: 'row',
      paddingHorizontal: 10,
   },
   chatIconWrap: {
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 50,
      marginLeft: 10,
   },
   chatIcon: {
      fontSize: 28,
      color: '#555',
   },
   primaryText: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
      paddingBottom: 2,
   },
   indicator: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   // ===========================MessageCard==============================
   cardContainer: {
      width: '100%',
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 2,
   },
   imageContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
   },
   contentContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginLeft: 16,
   },
   messageTitle: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'capitalize',
   },
   messageContent: {
      color: 'blue', // Assuming 'primaryText' refers to a shade of blue
      fontSize: 14,
   },
   timeText: {
      color: 'red',
      paddingHorizontal: 12,
      fontSize: 16,
      fontWeight: 'bold',
   },
});
