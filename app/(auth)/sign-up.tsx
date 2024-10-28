import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link, router } from "expo-router";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.username, form.password);

      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Sign Up", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#161622" }}>
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[135px] h-[35px]"></Image>
          <Text className="text-semibold text-2xl text-white mt-10  font-psemibold ">Sign Up To Aria</Text>

          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter Username"
            otherStyles="mt-10"
            handleChangeText={(e: any) => setform({ ...form, username: e })}
          ></FormField>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter Email"
            otherStyles="mt-7"
            keyboardType="email-address"
            handleChangeText={(e: any) => setform({ ...form, email: e })}
          ></FormField>

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter Password"
            otherStyles="mt-7"
            handleChangeText={(e: any) => setform({ ...form, password: e })}
          ></FormField>
          <CustomButton title="Sign-Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}></CustomButton>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href={"sign-in"} className="text-lg font-psemibold text-secondary-100">
              Sign-In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
