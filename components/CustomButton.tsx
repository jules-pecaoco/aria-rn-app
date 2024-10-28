import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const CustomButton = (props: { title: string; handlePress: any; containerStyles?: string; textStyles?: string; isLoading?: boolean }) => {
  const { title, handlePress, containerStyles, textStyles, isLoading } = props;
  const [isFocused, setisFocused] = useState(false)

  return (
    <View
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
        ${isLoading ? 'opacity-50' : ''} ${isFocused ? 'bg-orange-100' : ''}
      `}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Text
        
        className={`text-primary font-psemibold text-lg w-[25rem] align-middle min-h-[62px] text-center rounded-xl justify-center ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
