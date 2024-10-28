import { View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import { getUserPost, searchPost, signOut } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants"; 
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";


const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext(); 
  const { data: posts } = useAppwrite(
    () => getUserPost(user.$id)
  );
  
  const logout = async() =>{
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary" style={{ backgroundColor: "#222234", height: "100%" }}>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
         <View
          className="w-full justify-center items-center mt-6 mb-12 px-4"
         >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              ></Image>
            </TouchableOpacity>
            <View
              className="w-16 h-16 border-secondary rounded-lg justify center items-center"
            >
              <Image
                source={{uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              ></Image>
            </View>
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View
              className="mt-5 flex-row "
            >
              <InfoBox
              title={posts?.length || 0}
              subtitle="Post"
              containerStyles='mr-10'
              titleStyles='text-xl'
            />
             <InfoBox
              title="1.2k"
              subtitle="Followers"
              titleStyles='text-xl'
            />
            </View>
         </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No Video Found for this Search Qeury"></EmptyState>}
      />
    </SafeAreaView>
  );
};

export default Profile;