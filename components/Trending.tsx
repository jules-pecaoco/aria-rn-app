import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, StyleSheet } from "react-native";
import { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React from "react";

// Object Animation
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 208, 
    height: 208,
    borderRadius: 35,
    marginTop: 20,
    backgroundColor:"black"
  },
});

// Item Component
const TrendingItem = (props: { activeItem: any; item: any }) => {
  const { activeItem, item } = props;

  const [play, setplay] = useState(false);


  return (
    <Animatable.View className="mx-4" animation={activeItem == item.$id ? zoomIn : (zoomOut as any)} duration={500}>
      {play ? (
        <Video 
          source={{ uri: item.video }} 
          resizeMode={ResizeMode.CONTAIN} 
          useNativeControls 
          shouldPlay
          style={styles.container}
           onPlaybackStatusUpdate={(status: any) =>{
            if(status.didJustFinish){
              setplay(false);
            }
           }} 
          />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setplay(true)} className="relative justify-center items-center">
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          ></ImageBackground>
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain"></Image>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

// Item Wrapper
const Trending = (props: { posts: any }) => {
  const { posts } = props;
  const [activeItem, setactiveItem] = useState(posts[0]);

  const viewableItemsChanges = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setactiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item}></TrendingItem>}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
