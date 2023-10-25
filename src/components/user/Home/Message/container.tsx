import { StyleSheet } from 'react-native';
import React from 'react';
import ChatProvider from '../../../../context/ChatProvider';
import Message from '.';

const ContainerMessage = () => {
   return (
      <ChatProvider>
         <Message />
      </ChatProvider>
   );
};

export default ContainerMessage;
