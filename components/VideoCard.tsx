import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = (props: { video: any }) => {
  const { title, thumbnail, video, users } = props.video;
  const { username, avatar } = users;
  const [play, setplay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="h-full w-full rounded-lg" resizeMode="cover"></Image>
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm " numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}{" "}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain"></Image>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          style={styles.container}
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setplay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setplay(true);
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image source={{ uri: thumbnail }} className="h-full w-full rounded-xl mt-3" resizeMode="cover"></Image>
          <Image source={icons.play} className="h-12 w-12 absolute" resizeMode="contain"></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: 240,
    borderRadius: 35,
    marginTop: 12,
  },
});
