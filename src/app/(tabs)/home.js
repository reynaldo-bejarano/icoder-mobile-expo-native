// HomeScreen.js
import { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import converterIsoStringToDate from "../hooks/converterIsoStringToDate";
import { ScrollView } from "react-native-web";

export default function Home() {
  const [identificationAthlete, setIdentificationAthlete] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const identificationToken = await AsyncStorage.getItem(
          "identificationAthlete"
        );
        if (!authToken || !identificationToken) {
          router.push("/");
        }
        setIdentificationAthlete(identificationToken);
      } catch (error) {
        console.error("Failed to check token:", error);
      }
    };
    checkToken();
  }, []);

  return (
    <ScrollView className="flex flex-1">
      <Logout />
      <ContentMain id={identificationAthlete} />
    </ScrollView>
  );
}

function ContentMain({ id }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:5000/api/cita`, {
          id,
        });
        console.log(res.data.getDatesByAthlete);
        setDates(res.data.getDatesByAthlete);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (id !== null) fetchData();
  }, [id]);

  return (
    <View className="flex-1 py-2 px-4">
      <Text className="text-center mb-3 text-white bg-slate-800 py-1">
        Citas pendientes
      </Text>
      {dates.map((item) => {
        return (
          <View
            className="bg-slate-200 p-2 gap-2 border border-slate-400 mb-4 shadow-lg"
            key={item._id}
          >
            <View className="flex-row w-full">
              <View className="  w-[30%] gap-1 ">
                <Text className="bg-slate-300 px-1">Especialidad</Text>
                <Text className="capitalize italic px-1">
                  {item?.occupation ? item?.occupation : "Cargando..."}
                </Text>
              </View>
              <View className=" w-[70%] gap-1 px-2">
                <Text className="bg-slate-300 px-1">Especialista</Text>
                <Text className="italic capitalize px-1">
                  {item?.specialist}
                </Text>
              </View>
            </View>

            <View className="flex-row w-full">
              <View className="  w-[50%] gap-1 ">
                <Text className="bg-slate-300 px-1">Fecha</Text>
                <Text className="capitalize italic px-1">
                  {converterIsoStringToDate(item.date)}
                </Text>
              </View>
              <View className=" w-[50%] gap-1 px-2">
                <Text className="bg-slate-300 px-1">Horario</Text>
                <Text className="italic capitalize px-1">{item.time}</Text>
              </View>
            </View>
            <Pressable className="bg-red-700 py-1 mt-3">
              <Text className="text-slate-50 text-center">Cancelar</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

function Logout() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("identificationAthlete");
    router.push("/");
  };

  return (
    <View className=" justify-center items-center py-4 bg-red-700 mb-5">
      <Pressable onPress={handleLogout}>
        <Text className="text-slate-50 uppercase font-bold tracking-widest">
          Desconectarse
        </Text>
      </Pressable>
    </View>
  );
}
