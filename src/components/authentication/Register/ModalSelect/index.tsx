import React, { useState, useEffect } from 'react';
import {
   ScrollView,
   View,
   Text,
   Button,
   NativeBaseProvider,
   Toast,
   Modal,
   FormControl,
   Box,
   Select,
   CheckIcon,
   HStack,
   Checkbox,
} from 'native-base';
import axios from 'axios';
import { API_KEY } from '../../../../utils';
import { TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const SelectTopicModal = ({ goToLogin, open, accountSignup, onClose }) => {
   const [selectedTopic, setSelectedTopic] = useState([]);
   const [listTopic, setListTopic] = useState([
      //   {
      //      createdAt: '2023-10-27T21:10:31.220108',
      //      updatedAt: '2023-10-27T21:10:31.220108',
      //      id: 1,
      //      topicParentName: 'Good health and a healthy lifestyle',
      //   },
      //   {
      //      createdAt: '2023-10-27T21:10:35.452784',
      //      updatedAt: '2023-10-27T21:10:35.452784',
      //      id: 2,
      //      topicParentName: 'Financial planning and investment',
      //   },
   ]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      axios
         .get(`${API_KEY}/topic-parent/all`, {
            headers: { Authorization: `Bearer ${accountSignup?.access_token}` },
         })
         .then(res => {
            setIsLoading(false);

            if (res.data.data !== 'Not exist any children topic.') {
               setListTopic(res.data.data);
            }
         })
         .catch(err => {
            console.log(err);
            setIsLoading(false);
         });
   }, [accountSignup]);

   const handleSelectTopic = topicId => {
      if (selectedTopic.includes(topicId)) {
         const newSelectedTopic = selectedTopic.filter(itemId => itemId !== topicId);
         setSelectedTopic(newSelectedTopic);
      } else {
         setSelectedTopic([...selectedTopic, topicId]);
      }
   };

   const submitTopic = () => {
      if (selectedTopic !== null) {
         const listTopic = {
            parentTopicIdList: selectedTopic,
         };
         axios
            .post(`${API_KEY}/user-topic/${accountSignup?.id}/create`, listTopic, {
               headers: { Authorization: `Bearer ${accountSignup?.access_token}` },
            })
            .then(res => {
               Toast.show({ description: 'Let started enjoy' });
               onClose();
               goToLogin();
            })
            .catch(err => {
               console.log(err);
            });
      }
   };

   const renderModal = () => {
      return (
         <Modal isOpen={open} onClose={onClose} style={styles.modalContainer}>
            <Modal.Content>
               <Modal.Header>
                  <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                     Please select the topic you are interested in:
                  </Text>
               </Modal.Header>
               <Modal.Body>
                  <FormControl>
                     <FormControl.Label>Topic</FormControl.Label>
                     <Box>
                        <HStack space={1} flexDirection={'column'}>
                           {listTopic.length > 0 &&
                              listTopic.map(item => (
                                 //  <View
                                 //     style={{
                                 //        flexDirection: 'row',
                                 //        padding: 8,
                                 //        justifyContent: 'center',
                                 //        alignContent: 'center',
                                 //        alignItems: 'flex-start',
                                 //     }}
                                 //  >
                                 //     <Checkbox
                                 //        style={{ paddingRight: 8 }}
                                 //        value={item?.id?.toString()}
                                 //        accessibilityLabel={item?.topicParentName}
                                 //     />
                                 //     <Text
                                 //        style={{ marginLeft: 12, fontSize: 14, fontWeight: '500' }}
                                 //     >
                                 //        {item?.topicParentName}
                                 //     </Text>
                                 //  </View>
                                 <Checkbox.Group
                                    onChange={setSelectedTopic}
                                    value={selectedTopic}
                                    accessibilityLabel='choose topic'
                                 >
                                    <Checkbox value={item?.id?.toString()} my={2}>
                                       {item?.topicParentName}
                                    </Checkbox>
                                 </Checkbox.Group>
                              ))}
                        </HStack>
                     </Box>
                  </FormControl>
               </Modal.Body>
               <Modal.Footer>
                  <Button.Group space={2}>
                     <Button variant='ghost' colorScheme='blueGray' onPress={onClose}>
                        Cancel
                     </Button>
                     <Button
                        disabled={isLoading}
                        style={isLoading && { opacity: 0.3 }}
                        onPress={submitTopic}
                     >
                        Submit
                     </Button>
                  </Button.Group>
               </Modal.Footer>
            </Modal.Content>
         </Modal>
      );
   };

   return <>{renderModal()}</>;
};

export default SelectTopicModal;
