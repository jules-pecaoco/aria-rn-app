import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = (props: { icon: any; color: string; focused: boolean; name: string }) => {
  const { icon, color, focused, name } = props;
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="h-6 w-6"></Image>
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{color:color}}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle:{
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor:'#232533',
          height: 65,
        }
      }}
    >
      <Tabs.Screen
        name="home" //Actual File Route
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused}></TabIcon>,
        }}
      />
    
     <Tabs.Screen
        name="bookmark" //Actual File Route
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}></TabIcon>,
        }}
      />   
      
      <Tabs.Screen
        name="create" //Actual File Route
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}></TabIcon>,
        }}
      />
      <Tabs.Screen
        name="profile" //Actual File Route
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}></TabIcon>,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

