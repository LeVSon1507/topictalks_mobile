import React, { useEffect, useState } from 'react';
import ChatContext from './ChatContext';
import { observer } from 'mobx-react';
import { io } from 'socket.io-client';
import accountStore from '../store/accountStore';
import chatStore from '../store/chatStore';
import { IMessage } from '../types';
import { ICallData, ListMesage } from '../types/chat.type';
import { View } from 'react-native';

interface ChatProviderProps {
   children: React.ReactNode;
}
var socket;
const ChatProvider: React.FC<ChatProviderProps> = observer(props => {
   const [message, setMessage] = useState<IMessage[]>([]);
   const account = accountStore?.account;
   const chat = chatStore?.selectedChat;

   //notification
   //tam thoi thong bao trc cho message
   const [notification, setNotification] = useState<IMessage[]>([]);
   const [isBeingRandom, setIsBeingRandom] = useState<boolean>(false);
   const [openRandom, setOpenRandom] = useState<boolean>(false);

   useEffect(() => {
      if (account !== null) {
         let isMounted = true;
         socket = io(`http://localhost:8085?uid=${account.id}`);
         socket.on('sendMessage', handleReceiveMessage);
         socket.on('partiAccess', (data: ListMesage) => {
            if (isMounted && data !== null) {
               setTimeout(() => {
                  const isMatch = chatStore?.chats.some(
                     item => item.conversationInfor.id !== data.conversationInfor.id
                  );
                  const isNewConversation = chatStore?.chats.length === 0 || isMatch;
                  if (isNewConversation) {
                     setIsBeingRandom(false);
                     chatStore?.setSelectedChat(data);
                     alert('You access random chat succesfully');
                     chatStore?.setChats([data, ...chatStore?.chats]);
                     setOpenRandom(false);
                  }
               }, 2000);
            }
         });
         return () => {
            isMounted = false;
            socket.disconnect();
         };
      }
   }, [chat, account]);

   const handleReceiveMessage = (receiveMessageDTO: IMessage) => {
      if (chat?.conversationInfor.id === receiveMessageDTO.conversationId) {
         setMessage(prevMessages => [...prevMessages, receiveMessageDTO]);
      } else {
         setNotification(prevNotification => [...prevNotification, receiveMessageDTO]);
      }
   };

   return (
      <View>
         <ChatContext.Provider
            value={{
               message,
               setMessage,
               socket,
               notification,
               setNotification,
               isBeingRandom,
               setIsBeingRandom,
               openRandom,
               setOpenRandom,
            }}
         >
            {props.children}
         </ChatContext.Provider>
      </View>
   );
});

export default ChatProvider;
