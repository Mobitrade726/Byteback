import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Section = ({ title, children, onPress }) => {
  return (
    <View style={{marginTop: 15, paddingHorizontal: 16}}>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignItems: 'center',
           marginBottom: moderateScale(15),
         }}>
         <Text style={{fontSize: moderateScale(20), fontWeight: 'bold', color: '#222'}}>
           {title}
         </Text>
         {title !== 'Shop by operating system' && title !== 'Shop by budget' && title !== 'More Features' ? (
           <TouchableOpacity onPress={onPress}>
             <Ionicons name="chevron-forward" size={moderateScale(18)} color="#333" />
           </TouchableOpacity>
         ) : null}
       </View>
       {children}
     </View>
  );
};

export default Section;
