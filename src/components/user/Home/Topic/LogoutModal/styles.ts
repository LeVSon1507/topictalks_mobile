import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   iconX: {
      alignSelf: 'flex-end',
   },
   profileOption: {
      padding: 10,
   },
   logoutOption: {
      padding: 10,
   },
   modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 18,
   },
});
