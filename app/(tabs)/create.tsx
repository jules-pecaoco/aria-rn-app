import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as ImagePicker from 'expo-image-picker';


const Create = () => {
  const { user } = useGlobalContext(); 
  const [uploading, setUploading] = useState(false);
  interface FormState {
    title: string;
    video: any;
    thumbnail: any;
    prompt: string;
    userId:any;
  }

  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId:user
  });

  const openPicker = async (selectType: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } 
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      Alert.alert("Please fill in all the fields");
    }else{
      setUploading(true);
      try {
        await createVideo(form);
  
        Alert.alert("Success", "Post Uploaded Succesfully");
        
        router.push('/home')
      } catch (error:any) {
  
        Alert.alert("Error", error.message)
      } finally {
        setForm({
          title: "",
          video: null,
          thumbnail: null,
          prompt: "",
          userId: user
        });
    }      
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#222234", height: "100%" }}>
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title={"Video Title"}
          value={form.title}
          placeholder={"Give your video a catch title..."}
          handleChangeText={(e: any) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium mb-2">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video source={{ uri: form.video.uri }} resizeMode={ResizeMode.COVER} style={styles.container} />
            ) : (
              <View className="w-full  px-4 bg-black-100 rounded-2xl justify-center items-center" style={{ height: 256 }}>
                <View className="w-14 h-14 border border-secondary-100 justify-center items-center" style={{ borderStyle: "dashed" }}>
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2"></Image>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium mb-2">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} resizeMode="cover" style={styles.container} />
            ) : (
              <View
                className="w-full  px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2"
                style={{ height: 56 }}
              >
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5"></Image>
                <Text className="text-sm text-gray-100 font-pmedium" style={{ marginLeft: 8 }}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"The prompt you used to create this video"}
          handleChangeText={(e: any) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />
        <CustomButton title={"Submit & Publish"} handlePress={submit} containerStyles="mt-7" isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 256, // 64 * 4 = 256
    borderRadius: 32, // Assuming 2xl corresponds to 32
  },
});
