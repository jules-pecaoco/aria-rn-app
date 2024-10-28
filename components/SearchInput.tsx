import { View, Text, TextInput, TouchableOpacity, Image, Touchable, Alert } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = (props:{initialQuery:any}) => {
  const {initialQuery} = props
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery)
  return (
    <View
      className={`w-full h-16 px-5 bg-black-100 border-2
        space-x-4 border-black-200 rounded-2xl items-center flex-row ${isFocused ? "border-secondary" : ""}`}
    >
      <TextInput
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        className="flex-1 text-white font-pregular text-base mt-0.5 "
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
     <TouchableOpacity
      onPress={() => {
        if(!query){
          return Alert.alert("Missing Query", "Please input something to search results across database")
        }

        if(pathname.startsWith("/search")){
          router.setParams({ query })
        }else{
          router.push(`/search/${query}`)
        }
      }}
     >
      <Image
        source={icons.search}
        resizeMode="contain"
        className="w-5 h-5"
      ></Image>
     </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
