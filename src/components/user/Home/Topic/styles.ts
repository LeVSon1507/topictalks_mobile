import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   topicPageContainer: {
      height: '100%',
   },

   flatListContainer: {
      flexDirection: 'row',
   },
   imageStyle: {
      width: 100,
      height: 100,
   },

   topicParentWrap: {
      width: '100%',
      flexDirection: 'row',
   },
   topicChildrenText: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      padding: 10,
   },
   searchAndImageWrap: {},
   imageHeaderBanner: {
      width: 316,
      height: 150,
      borderRadius: 8,
   },
   ImageHeaderBannerWrap: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
   },
   searchInputWrap: {
      backgroundColor: '#313131',
      borderRadius: 8,
      marginHorizontal: 30,
      paddingLeft: 16,
      marginVertical: 16,
      paddingVertical: 8,
      alignItems: 'center',
      flexDirection: 'row',
   },
   searchInput: {
      borderColor: 'none',
      borderWidth: 0,
      color: 'white',
      paddingVertical: 4,
      width: '100%',
      paddingLeft: 4,
   },
   headerWrap: {
      height: '35%',
      backgroundColor: 'black',
   },

   topicChildWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#EAEAEA',
   },
   itemChildrenWrap: {
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      margin: 5,
      backgroundColor: 'black',
      padding: 8,
      borderBottomLeftRadius: 16,
      borderTopRightRadius: 16,
   },
   itemChildTextName: {
      fontWeight: '600',
      fontSize: 12,
      color: '#ffff',
   },
   topicParentNameWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
      width: '100%',
      backgroundColor: '#C67C4E',
   },
   topicParentName: {
      fontSize: 18,
      fontWeight: '700',
      fontStyle: 'italic',
      color: 'white',
      paddingHorizontal: 16,
      paddingVertical: 8,
      textAlign: 'center',
      paddingLeft: 12,
   },
});
