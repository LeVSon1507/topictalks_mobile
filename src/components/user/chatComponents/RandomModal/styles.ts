import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   selectWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   selectTopicChild: {
      backgroundColor: 'gray',
      padding: 12,
      fontSize: 12,
      width: 100,
      textAlign: 'center',
      marginHorizontal: 10,
      color: 'white',
   },
   indicator: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   container: {
      position: 'absolute',
      zIndex: 99,
      top: '50%',
      left: '50%',
      backgroundColor: 'black',
      borderRadius: 12,
      width: 300,
      height: 300,
      color: 'white',
      transform: [{ translateX: -150 }, { translateY: -150 }],
   },

   header: {
      alignItems: 'center',
      borderRadius: 12,
      paddingVertical: 8,
   },
   headerText: {
      color: 'black',
      fontSize: 16,
   },
   headerSubText: {
      color: 'black',
      fontSize: 16,
   },
   wrapLoading: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
   },
   loadingText: {
      color: 'white',
      fontSize: 40,
      textAlign: 'center',
   },
   content: {},
   wrapTex: {},
   modalContent: {},
   text: {},
   modalText: {},
   chatNameBox: {},
   topicBox: {},
   selectedTopicItem: {},
   topicChild: {},
   topicItem: {},
});
