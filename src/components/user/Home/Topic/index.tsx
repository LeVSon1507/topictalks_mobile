import {
   Image,
   Text,
   TouchableOpacity,
   View,
   ScrollView,
   TextInput,
   FlatList,
   KeyboardAvoidingView,
   Modal,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import memoizeOne from 'memoize-one';
import { MaterialIcons } from 'react-native-vector-icons';
import { styles } from './styles';
import { ListTopic, TopicChild } from '../../../../types/topic.type';
import accountStore from '../../../../store/accountStore';
import uiStore from '../../../../store/uiStore';
import { createAxios, getDataAPI } from '../../../../utils';
import LogoutModal from './LogoutModal';
import HeaderBar from '../../components/Header';
import { CardTopic } from '../../../common/card';
import { Icon, Input, Toast } from 'native-base';

const TopicView = observer(() => {
   const [listTopic, setListTopicParent] = useState<ListTopic[]>([]);
   const [topicChildMap, setTopicChildMap] = useState<Map<number, TopicChild[]>>(new Map());
   const [searchContent, setSearchContent] = useState<string>('');
   const [imageHeight, setImageHeight] = useState(150);
   const [headerHeight, setHeaderHeight] = useState(200);
   const [searchX, setSearchX] = useState(300);
   const [searchY, setSearchY] = useState(65);
   const [showImage, setShowImage] = useState(true);

   const account = accountStore?.account;

   const setAccount = () => {
      return accountStore?.setAccount;
   };

   const accountToken = account?.access_token;

   const accountJwt = account;
   const axiosJWT = createAxios(accountJwt, setAccount);

   useEffect(() => {
      uiStore?.setLoading(true);
      getDataAPI(`/topic-parent/all`, accountToken, axiosJWT)
         .then(res => {
            setListTopicParent(res.data.data);
            if (res.data.data.length > 0) {
               res.data.data.forEach(topicParent => {
                  const parentId = topicParent.id;
                  getTopicChildByParentId(parentId);
               });
            }
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   const getTopicChildByParentId = useMemo(
      () =>
         memoizeOne((parentId: number) => {
            if (topicChildMap.has(parentId)) {
               uiStore?.setLoading(false);
               return topicChildMap.get(parentId);
            }
            getDataAPI(`/topic-children/topic-parent=${parentId}`, accountToken, axiosJWT)
               .then(res => {
                  setTopicChildMap(prevMap => new Map(prevMap).set(parentId, res.data.data));
                  uiStore?.setLoading(false);
               })
               .catch(err => {
                  console.log(err);
               });
            return null;
         }),
      []
   );

   const handleScroll = event => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const scrollThreshold = 5;
      if (currentOffset > 100) {
         setShowImage(false);
      }

      if (currentOffset > scrollThreshold) {
         // const newHeight = 150 - (currentOffset - scrollThreshold);
         // const newHeaderHeight = 300 - (currentOffset - scrollThreshold);
         // const newSearchX = 300 - (currentOffset - scrollThreshold);
         // const newSearchY = 65 - (currentOffset - scrollThreshold);
         // setImageHeight(newHeight < 0 ? 0 : newHeight);
         // setHeaderHeight(newHeaderHeight < 0 ? 0 : newHeaderHeight);
         // setSearchX(searchX < 0 ? 0 : newSearchX);
         // setSearchY(searchY < 0 ? 0 : newSearchY);
      }
   };
   const navigateToDetailTopic = (id: number) => {
      // navigation.navigate(`/topic-detail`, id);
   };

   const renderItemParent = (item: ListTopic) => {
      return (
         <View key={item.id} style={{ marginBottom: 8 }}>
            <View style={styles.topicParentNameWrap}>
               <Text style={styles.topicParentName}>{item?.topicParentName}</Text>
            </View>
            <FlatList
               data={topicChildMap.get(item.id) || []}
               horizontal
               renderItem={({ item }) => renderItemChild(item)}
               keyExtractor={item => `${item?.id}`}
            />
         </View>
      );
   };

   const renderItemChild = (item: TopicChild) => {
      return (
         <>
            <CardTopic item={item} />
            {/* <TouchableOpacity key={item.id} onPress={() => navigateToDetailTopic(item.id)}>
               <View style={styles.itemChildrenWrap}>
                  <Image source={{ uri: item.image }} style={styles.imageStyle} />
                  <Text style={styles.itemChildTextName}>{item.topicChildrenName}</Text>
               </View>
            </TouchableOpacity> */}
         </>
      );
   };

   const listTopicParent =
      listTopic.filter(item =>
         item?.topicParentName?.toLowerCase().trim().includes(searchContent.toLowerCase().trim())
      ) || [];

   return (
      <>
         <KeyboardAvoidingView style={styles.topicPageContainer}>
            <View style={styles.headerWrap}>
               <HeaderBar account={account} />
               <View style={[styles.searchAndImageWrap]}>
                  <View style={[styles.searchInputWrap]}>
                     {/* <Ionicons name={'search-outline'} size={25} color={'white'} />
                     <TextInput
                        style={styles.searchInput}
                        placeholder={'Search Topic'}
                        onChangeText={text => setSearchContent(text)}
                     /> */}
                     {showImage && (
                        <Input
                           color={'white'}
                           onChangeText={text => setSearchContent(text)}
                           placeholder='Search'
                           width={searchX}
                           borderRadius='4'
                           py='1'
                           px='1'
                           // height={searchY}
                           fontSize='14'
                           InputLeftElement={
                              <Icon
                                 m='2'
                                 ml='3'
                                 size='6'
                                 color='gray.400'
                                 as={<MaterialIcons name='search' />}
                              />
                           }
                           InputRightElement={
                              <Icon
                                 onPress={() => Toast.show({ description: 'Implement later' })}
                                 m='2'
                                 mr='3'
                                 size='6'
                                 color='gray.400'
                                 as={<MaterialIcons name='mic' />}
                              />
                           }
                        />
                     )}
                  </View>

                  {showImage && (
                     <View style={styles.ImageHeaderBannerWrap}>
                        <Image
                           source={require('../../../../assets/images/image_community1.jpg')}
                           alt='banner'
                           style={[styles.imageHeaderBanner, { height: imageHeight }]}
                        />
                        <View
                           style={{
                              position: 'absolute',
                              top: 80,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: '#f2f2f2',
                              opacity: 1,
                           }}
                        />
                     </View>
                  )}

                  {!showImage && (
                     <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => setShowImage(true)}>
                           <Image
                              source={require('../../../../assets/images/image_community1.jpg')}
                              alt='banner'
                              style={[
                                 styles.imageHeaderBanner,
                                 { width: 100, height: 80, marginHorizontal: 8 },
                              ]}
                           />
                        </TouchableOpacity>

                        <Input
                           color={'white'}
                           onChangeText={text => setSearchContent(text)}
                           placeholder='Search'
                           borderRadius='4'
                           py='1'
                           width={250}
                           height={50}
                           px='1'
                           // height={searchY}
                           fontSize='14'
                           InputLeftElement={
                              <Icon
                                 m='2'
                                 ml='3'
                                 size='6'
                                 color='gray.400'
                                 as={<MaterialIcons name='search' />}
                              />
                           }
                           InputRightElement={
                              <Icon
                                 onPress={() => Toast.show({ description: 'Implement later' })}
                                 m='2'
                                 mr='3'
                                 size='6'
                                 color='gray.400'
                                 as={<MaterialIcons name='mic' />}
                              />
                           }
                        />
                     </View>
                  )}

                  {/* <View style={styles.ImageHeaderBannerWrap}>
                     <Image
                        source={require('../../../../assets/images/image_community1.jpg')}
                        alt='banner'
                        style={[styles.imageHeaderBanner, { height: imageHeight }]}
                     />
                  </View> */}
               </View>
            </View>

            <ScrollView style={{}} scrollEventThrottle={10} onScroll={handleScroll}>
               {listTopicParent.map(item => renderItemParent(item))}
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
});

export default TopicView;
