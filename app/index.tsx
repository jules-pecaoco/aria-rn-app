import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import React from 'react'
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  
  
  if(!isLoading && isLoggedIn) return <Redirect href={"/home"}></Redirect>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }} className="bg-primary h-full">
        <View className="justify-center w-full items-center min-h-[90vh] px-4 bg-primary">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"></Image>
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain"></Image>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities {""}
              <Text className="text-secondary-200">Aria</Text>
            </Text>
            <Image source={images.path} className="absolute w-[136px] h-[15px] -bottom-2 -right-8" resizeMode="contain" />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-7">Where Imagination Meets Technology</Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => {
              router.push("/sign-in")
            }}
            containerStyles="w-full mt-7"
            isLoading={false}
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </SafeAreaView>
  );
}
