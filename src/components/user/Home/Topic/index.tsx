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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { ListTopic, TopicChild } from '../../../../types/topic.type';
import accountStore from '../../../../store/accountStore';
import uiStore from '../../../../store/uiStore';
import { createAxios, getDataAPI } from '../../../../utils';
import LogoutModal from './LogoutModal';
import HeaderBar from '../../components/Header';

const TopicView = observer(() => {
   const [listTopic, setListTopicParent] = useState<ListTopic[]>([]);
   const [topicChildMap, setTopicChildMap] = useState<Map<number, TopicChild[]>>(new Map());
   const [searchContent, setSearchContent] = useState<string>('');
   const [imageHeight, setImageHeight] = useState(150);
   const [marginTopicTop, setMarginTopicTop] = useState(120);

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
      const scrollThreshold = 2;

      if (currentOffset > scrollThreshold) {
         const newHeight = 150 - (currentOffset - scrollThreshold);
         const newMarginTop = 120 - (currentOffset - scrollThreshold);
         setImageHeight(newHeight < 0 ? 0 : newHeight);
         setMarginTopicTop(newMarginTop < 0 ? 0 : newMarginTop);
      }
   };
   const navigateToDetailTopic = (id: number) => {
      console.log('🚀 ~ file: index.tsx:64 ~ navigateToDetailTopic ~ id:', id);
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
         <TouchableOpacity key={item.id} onPress={() => navigateToDetailTopic(item.id)}>
            <View style={styles.itemChildrenWrap}>
               <Image source={{ uri: item.image }} style={styles.imageStyle} />
               <Text style={styles.itemChildTextName}>{item.topicChildrenName}</Text>
            </View>
         </TouchableOpacity>
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
               <View style={styles.searchAndImageWrap}>
                  <View style={styles.searchInputWrap}>
                     <Ionicons name={'search-outline'} size={25} color={'white'} />
                     <TextInput
                        style={styles.searchInput}
                        placeholder={'Search Topic'}
                        onChangeText={text => setSearchContent(text)}
                     />
                  </View>
                  <View style={styles.ImageHeaderBannerWrap}>
                     <Image
                        source={require('../../../../assets/images/image_community1.jpg')}
                        alt='banner'
                        style={[styles.imageHeaderBanner, { height: imageHeight }]}
                     />
                  </View>
               </View>
            </View>

            <ScrollView
               style={{ marginTop: marginTopicTop }}
               scrollEventThrottle={16}
               onScroll={handleScroll}
            >
               {listTopicParent.map(item => renderItemParent(item))}
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
});

export default TopicView;
