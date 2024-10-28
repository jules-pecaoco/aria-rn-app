import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import { searchPost } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(
    () => searchPost(query)
  );
  
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary" style={{ backgroundColor: "#222234", height: "100%" }}>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query}></SearchInput>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No Video Found for this Search Qeury"></EmptyState>}
      />
    </SafeAreaView>
  );
};

export default Search;
