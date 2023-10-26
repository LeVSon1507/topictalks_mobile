import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 12,
      paddingVertical: 8,
   },
   headerText: {
      color: 'black',
      fontSize: 20,
   },
   headerSubText: {
      color: 'black',
      fontSize: 16,
   },
   wrapLoading: {
      justifyContent: 'center',
      alignItems: 'center',
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
