import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";
import { StyleSheet } from "nativewind";

const FormField = (props: {
  keyboardType?: any;
  title: string;
  value: any;
  placeholder: string;
  handleChangeText: any;
  otherStyles: string;
}) => {
  const { keyboardType, title, value, placeholder, handleChangeText, otherStyles } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base  text-gray-100 ">{title}</Text>
      <View 
          
      className={`w-full h-16 px-5 bg-black-100 border-2 border-black-200 rounded-2xl items-center flex-row ${isFocused ? "border-secondary" : ""}`}>
        <TextInput
          onFocus={() => {setIsFocused(true)}}
          onBlur={() => {setIsFocused(false)}}
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setshowPassword(!showPassword);
            }}
          >
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
