import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPost, getLatestPost } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const {user} = useGlobalContext(); 
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPost);
  const { data: latestPost } = useAppwrite(getLatestPost);

  const [refreshing, setrefreshing] = useState(false);

  const onRefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary" style={{ backgroundColor: "#222234", height: "100%" }}>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => 
        <VideoCard
          video={item}
        ></VideoCard>
      }
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100 mb-2">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} resizeMode="contain" className="w-9 h-10"></Image>
              </View>
            </View>
            <SearchInput initialQuery={undefined}></SearchInput>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <Trending posts={latestPost ?? []}></Trending>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="You Got No Videos LOLL! -Jules"></EmptyState>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      />
    </SafeAreaView>
  );
};

export default Home;
