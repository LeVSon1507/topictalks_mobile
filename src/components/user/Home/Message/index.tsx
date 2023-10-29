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
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';
import HeaderBar from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import ChatContext from '../../../../context/ChatContext';
import RandomDialog from '../../chatComponents/RandomModal';
import ChatProvider from '../../../../context/ChatProvider';
import chatStore from '../../../../store/chatStore';
import { createAxios, getDataAPI } from '../../../../utils';
import uiStore from '../../../../store/uiStore';
import { IPartnerDTO, ListMesage } from '../../../../types/chat.type';
import { SwapItem } from '../../chatComponents/SwapItem';

const tabs = [
   {
      iconName: 'chatbox-outline',
      name: 'Message',
   },
   {
      iconName: 'person-outline',
      name: 'Friends',
   },
   {
      iconName: 'people-outline',
      name: 'Groups',
   },
];

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
   const [sortChats, setSortChat] = useState<ListMesage[]>([]);
   const [tabView, setTabView] = useState(0);

   const handleChangeTab = tab => {
      setTabView(tab);
   };
   const listChats = chatStore?.chats;
   const account = accountStore?.account;
   const accountJwt = account;
   const setAccount = () => accountStore?.setAccount;
   const axiosJWT = createAxios(accountJwt, setAccount);

   const isActive = (chat: ListMesage) => {
      const result = chat.partnerDTO.some(item => item?.active);
      return result;
   };

   useEffect(() => {
      uiStore?.setLoading(true);
      getDataAPI(`/participant/${account?.id}/all`, account?.access_token, axiosJWT)
         .then(res => {
            chatStore?.setChats(res.data.data);
            setSortChat(res.data.data);
            uiStore?.setLoading(false);
         })
         .catch(err => {
            console.log(err);
         });
      return () => {
         chatStore?.setSelectedChat(null);
      };
   }, []);

   const setSelectedChat = (chat: ListMesage) => {
      const newNotifi = notification.filter(
         item => item.conversationId !== chat.conversationInfor.id
      );
      setNotification(newNotifi);
      getDataAPI(
         `/participant/uid=${account?.id}&&cid=${chat?.conversationInfor?.id}`,
         account?.access_token,
         axiosJWT
      )
         .then(res => {
            chatStore?.setSelectedChat(res.data.data);
         })
         .catch(err => {
            console.log(err);
         });
   };

   const imageUser = (partnerDTO: IPartnerDTO[]) => {
      const image = partnerDTO.filter(item => item.id !== account.id).map(item => item.image);
      return image.toString();
   };

   const partnerName = partner => {
      const usernames = partner.filter(item => item.id !== account.id).map(item => item.username);
      return usernames;
   };

   const handleRandom = () => {
      setOpenRandom(true);
   };

   return (
      <View style={{ flex: 1 }}>
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
            <View style={styles.tabViewWrap}>
               {tabs.map((tab, index) => (
                  <TouchableOpacity
                     key={index}
                     style={[styles.tabWrap, tabView === index && { backgroundColor: '#C67C4E' }]}
                     onPress={() => handleChangeTab(index)}
                  >
                     <Ionicons name={tab.iconName} size={20} color={'white'} />
                     <Text style={styles.tabText}>{tab.name}</Text>
                  </TouchableOpacity>
               ))}
            </View>
            {isLoading ? (
               <View style={styles.indicator}>
                  <ActivityIndicator size='large' color='#43C651' />
               </View>
            ) : (
               <>
                  {/* <MessageCard />
                  <MessageCard />
                  <MessageCard /> */}
                  <SwapItem
                     isGroupTab={tabView === 2}
                     listChats={listChats}
                     partnerName={partnerName}
                     imageUser={imageUser}
                     setSelectedChat={setSelectedChat}
                     isActive={isActive}
                  />
               </>
            )}
            <ScrollView style={{ paddingTop: 4, paddingHorizontal: 4, width: '100%' }}>
               <View style={{ width: '100%' }}>{/* content here */}</View>
            </ScrollView>
            <RandomDialog open={openRandom} />
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
   tabViewWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   tabWrap: {
      backgroundColor: '#313131',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 8,
      borderRadius: 12,
   },
   tabText: {
      color: 'white',
      fontWeight: '600',
   },
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
      color: 'black',
      fontSize: 24,
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
