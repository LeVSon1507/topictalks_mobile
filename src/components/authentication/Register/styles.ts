import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   modalContainer: {},
   container: {
      paddingTop: 50,
   },
   textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      width: 300,
   },
   textInputPw: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      width: 300,
   },
   textLogin: {
      fontSize: 24,
      // fontWeight: 500,
      marginBottom: 20,
   },
   logo: {
      width: 100,
      height: 100,
   },
   buttonWrap: {
      width: 300,
      height: 50,
      borderRadius: 10,
      verticalAlign: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      backgroundColor: 'black',
   },
   button: {
      fontSize: 16,
      color: 'white',
   },
});
