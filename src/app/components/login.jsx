import { useEffect, useState } from "react";
import { View, TextInput, Text, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import icoderLogo from "../../../assets/icoder-2023.png";

export default function LoginScreen() {
  const [identification, setIdentification] = useState("707770777");
  const [password, setPassword] = useState("atleta@707770777");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing token when the component mounts
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.push("home");
        }
      } catch (error) {
        console.error("Failed to check token:", error);
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identification,
        password,
      });
      console.log(response.data);
      const { token } = response.data;
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("identificationAthlete", identification);
      setMessage(null);
      router.push("home");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
          setMessage("Error de conexión");
        }
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <View className="px-8 py-5">
      <View className="my-0 mx-auto ">
        <Image source={icoderLogo} />
      </View>
      <View className="">
        <TextInput
          placeholder="707770777"
          value={identification}
          onChangeText={setIdentification}
          disabled={isLoading}
          className="border border-slate-800 py-2 px-2 mb-2"
        />
        <TextInput
          placeholder="atleta@707770777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          disabled={isLoading}
          className="border border-slate-800 py-2 px-2 mb-2"
        />
        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          className={
            isLoading ? "bg-gray-500 py-2 px-1" : "bg-[#242558] py-2 px-1"
          }
        >
          <Text className="text-center text-slate-100 text-base">
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Text>
        </Pressable>
        {message ? (
          <Text className="text-red-700 text-center py-2">{message}</Text>
        ) : null}
      </View>
    </View>
  );
}
