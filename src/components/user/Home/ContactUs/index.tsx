import React, { useState } from 'react';
import { View, Button, Alert, TextInput } from 'react-native';
import HeaderBar from '../../components/Header';
import { observer } from 'mobx-react';
import accountStore from '../../../../store/accountStore';
import { Text, TextField } from 'native-base';

const ContactUs = observer(() => {
   const account = accountStore.account;
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');

   const handleSendMessage = () => {
      // Add your logic here for sending the message, like using an API call.
      Alert.alert('Message Sent', 'Your message has been sent successfully!');
   };

   return (
      <>
         <HeaderBar account={account} />
         <View style={{ backgroundColor: 'black', height: 20 }}></View>
         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
               style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 12,
                  marginBottom: 24,
               }}
            >
               <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Contact Us</Text>
            </View>
            <TextInput
               placeholder='Title'
               value={name}
               onChangeText={setName}
               style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: '80%' }}
            />
            <TextInput
               placeholder='Subject'
               value={email}
               onChangeText={setEmail}
               style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: '80%' }}
            />
            <TextInput
               placeholder='Message'
               value={message}
               onChangeText={setMessage}
               multiline
               numberOfLines={4}
               style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: '80%' }}
            />
            <Button title='Send Message' color={'black'} onPress={handleSendMessage} />
         </View>
      </>
   );
});

export default ContactUs;
