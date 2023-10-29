import React, { useEffect, useState, useContext } from 'react';
import { createAxios, getDataAPI } from '../../../../utils';
import { observer } from 'mobx-react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import ChatContext from '../../../../context/ChatContext';
import { ListTopic, TopicChild } from '../../../../types/topic.type';
import accountStore from '../../../../store/accountStore';
import { Box, Button, CheckIcon, FormControl, Input, Modal, Select, Spinner } from 'native-base';

interface DialogProps {
   open: boolean;
}
const RandomDialog = observer((props: DialogProps) => {
   const { open } = props;
   const [selectTopic, setSelectTopic] = useState('1');
   const [listTopic, setListTopic] = useState<ListTopic[]>([]);
   const [topicChild, setTopicChild] = useState<TopicChild[]>([]);
   const [selected, setSelected] = useState<TopicChild>(null);

   const account = accountStore?.account;

   const { isBeingRandom, setIsBeingRandom, socket, setOpenRandom } = useContext(ChatContext);
   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   const onClose = () => {
      setOpenRandom(false);
   };

   useEffect(() => {
      getDataAPI(`/topic-parent/all`, account?.access_token, axiosJWT)
         .then(res => {
            setListTopic(res.data.data);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      return () => {
         if (selected !== null) {
            const topicChildren = {
               userId: account.id,
               targetName: 'null',
               username: account.username,
               timeAt: new Date().toISOString(),
               targetId: account.id,
               conversationId: 0,
               data: {
                  id: selected?.id,
               },
            };
            socket.emit('onLeaveChatRandom', topicChildren);
         }
      };
   }, [open]);

   useEffect(() => {
      getDataAPI(`/topic-children/topic-parent=${+selectTopic}`, account?.access_token, axiosJWT)
         .then(res => {
            setTopicChild(res.data.data);
            setSelected(null);
         })
         .catch(err => {
            console.log(err);
         });
   }, [selectTopic]);

   const handleSelect = (topicChild: TopicChild) => {
      if (selected?.id === topicChild.id) {
         setSelected(null);
      } else {
         setSelected(topicChild);
      }
   };

   const handleRandom = () => {
      if (selected !== null && socket) {
         setIsBeingRandom(true);
         const topicChildren = {
            userId: account.id,
            targetName: 'null',
            username: account.username,
            timeAt: new Date().toISOString(),
            targetId: account.id,
            conversationId: 0,
            data: {
               id: selected.id,
            },
         };
         socket.emit('onAccessChatRandom', topicChildren);
      }
   };

   const handleCancel = () => {
      setIsBeingRandom(false);
      setSelected(null);
      if (selected !== null && socket) {
         const topicChildren = {
            userId: account.id,
            targetName: 'null',
            username: account.username,
            timeAt: new Date().toISOString(),
            targetId: account.id,
            conversationId: 0,
            data: {
               id: selected?.id,
            },
         };
         socket.emit('onLeaveChatRandom', topicChildren);
      }
      onClose();
   };

   const renderFooter = () => {
      return (
         <Modal.Footer>
            <Button.Group space={2}>
               <Button variant='ghost' colorScheme='blueGray' onPress={handleCancel}>
                  Cancel
               </Button>
               <Button
                  disabled={isBeingRandom}
                  style={isBeingRandom && { opacity: 0.3 }}
                  onPress={handleRandom}
               >
                  Random
               </Button>
            </Button.Group>
         </Modal.Footer>
      );
   };

   const renderHeader = () => {
      return (
         <Modal.Header>
            <View style={styles.header}>
               <Text style={styles.headerText}>LOOKING FOR A PARTNER</Text>
               <Text style={styles.headerSubText}>New Conversation</Text>
            </View>
         </Modal.Header>
      );
   };

   return (
      <Modal isOpen={open} onClose={handleCancel} safeAreaTop={true}>
         <Modal.Content maxWidth='350'>
            <Modal.CloseButton />
            {isBeingRandom ? (
               <>
                  {renderHeader()}
                  <View style={styles.wrapLoading}>
                     <View style={styles.indicator}>
                        <ActivityIndicator size='large' color='#43C651' />
                        <Text style={{ fontSize: 20, paddingLeft: 12, fontWeight: 'bold' }}>
                           Looking...
                        </Text>
                     </View>
                  </View>
                  {renderFooter()}
               </>
            ) : (
               <>
                  {renderHeader()}
                  <Modal.Body>
                     <FormControl>
                        <FormControl.Label>Topic Parent</FormControl.Label>
                        <Box>
                           <Select
                              selectedValue={selectTopic}
                              minWidth='200'
                              accessibilityLabel='Choose Topic Parent'
                              placeholder='Choose Topic Parent'
                              _selectedItem={{
                                 bg: 'teal.600',
                                 endIcon: <CheckIcon size='5' />,
                              }}
                              mt={1}
                              onValueChange={itemValue => setSelectTopic(itemValue)}
                           >
                              {listTopic.length > 0 &&
                                 listTopic.map(item => (
                                    <Select.Item
                                       value={item?.id?.toString()}
                                       label={item?.topicParentName}
                                       key={item?.id}
                                    />
                                 ))}
                           </Select>
                        </Box>
                     </FormControl>
                     <FormControl mt='3' style={styles.selectWrap}>
                        {/* <FormControl.Label>Topic Child</FormControl.Label> */}
                        {topicChild.length > 0 &&
                           topicChild?.map(item => (
                              <TouchableOpacity key={item?.id} onPress={() => handleSelect(item)}>
                                 <Text
                                    style={[
                                       styles.selectTopicChild,
                                       selected?.id === item.id && {
                                          backgroundColor: '#C67C4E',
                                       },
                                    ]}
                                 >
                                    {item?.topicChildrenName}
                                 </Text>
                              </TouchableOpacity>
                           ))}
                     </FormControl>
                  </Modal.Body>
                  {renderFooter()}
               </>
            )}
         </Modal.Content>
      </Modal>
   );
});

export default RandomDialog;
