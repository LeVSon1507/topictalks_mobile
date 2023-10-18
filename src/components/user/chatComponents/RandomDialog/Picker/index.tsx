import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomSelect = ({ selectTopic, setSelectTopic, listTopic }) => {
   const handleSelect = itemValue => {
      setSelectTopic(itemValue);
   };

   return (
      <View>
         {listTopic.length > 0 &&
            listTopic.map(item => (
               <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelect(item.id)}
                  style={{
                     padding: 10,
                     backgroundColor: selectTopic === item.id ? 'lightgray' : 'white',
                  }}
               >
                  <Text>{item.topicParentName}</Text>
               </TouchableOpacity>
            ))}
      </View>
   );
};

export default CustomSelect;
