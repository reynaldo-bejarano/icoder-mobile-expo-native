import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-web";
import converterIsoStringToDate from "../hooks/converterIsoStringToDate";

export default function Medical() {
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
    <View className="flex flex-1 px-2">
      <Content id={identificationAthlete} />
    </View>
  );
}

function Content({ id }) {
  const [medicalActiveData, setMedicalActiveData] = useState([]);
  const [medicalNoActiveData, setMedicalNoActiveData] = useState([]);
  const [medicalActiveButton, setMedicalActiveButton] = useState(false);
  const [medicalNoActiveButton, setMedicalNoActiveButton] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:5000/api/medical`, {
          id,
        });
        setMedicalActiveData(res.data.medicalDataActive);
        setMedicalNoActiveData(res.data.medicalDataNoActive);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (id !== null) fetchData();
  }, [id]);

  return (
    <ScrollView className="flex-1 px-3 py-6">
      <Pressable
        className="py-4 bg-green-700 mb-2"
        onPress={() => setMedicalActiveButton(!medicalActiveButton)}
      >
        <Text className="text-white text-center">Lesiones activas</Text>
      </Pressable>
      {medicalActiveData.map((item) => {
        return (
          <View
            key={item._id}
            className={medicalActiveButton ? "bg-slate-300 p-4 mb-5" : "hidden"}
          >
            <View className="mb-2">
              <Text className="mb-1">Estado</Text>
              <Text
                className={
                  item?.active
                    ? "bg-green-800 capitalize p-1 text-center text-slate-100 text-xs"
                    : "bg-red-800 text-slate-100 capitalize text-center p-1 text-xs"
                }
              >
                {item?.active ? "activa " : "recuperada"}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Fecha de registro</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {converterIsoStringToDate(item.createdAt)}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Médico</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.doctor?.name} {item?.doctor?.lastname1}{" "}
                {item?.doctor?.lastname2}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Área</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.area}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Tipo</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.tipo}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Grado</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.grado}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Tiempo de recuperación</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.recuperacion}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Anotaciones</Text>
              <TextInput
                className="bg-slate-200 py-1 px-2 italic capitalize"
                multiline={true}
                disabled={true}
                value={item?.lesion?.anotacion}
              />
            </View>
            <View className="mb-2">
              <Text className="mb-1">Recomendaciones</Text>
              <TextInput
                className="bg-slate-200 py-1 px-2 italic capitalize"
                multiline={true}
                disabled={true}
                value={item?.lesion?.recomendacion}
              />
            </View>
          </View>
        );
      })}

      <Pressable
        className="py-4 bg-red-700 mb-2"
        onPress={() => setMedicalNoActiveButton(!medicalNoActiveButton)}
      >
        <Text className="text-white text-center">Lesiones recuperadas</Text>
      </Pressable>

      {medicalNoActiveData.map((item) => {
        return (
          <View
            key={item._id}
            className={
              medicalNoActiveButton ? "bg-slate-300 p-4 mb-5" : "hidden"
            }
          >
            <View className="mb-2">
              <Text className="mb-1">Estado</Text>
              <Text
                className={
                  item?.active
                    ? "bg-green-800 capitalize p-1 text-center text-slate-100 text-xs"
                    : "bg-red-800 text-slate-100 capitalize text-center p-1 text-xs"
                }
              >
                {item?.active ? "activa " : "recuperada"}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Fecha de registro</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {converterIsoStringToDate(item.createdAt)}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Médico</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.doctor?.name} {item?.doctor?.lastname1}{" "}
                {item?.doctor?.lastname2}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Área</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.area}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Tipo</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.tipo}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Grado</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.grado}
              </Text>
            </View>
            <View className="mb-2">
              <Text className="mb-1">Tiempo de recuperación</Text>
              <Text className="bg-slate-200 py-1 px-2 italic capitalize">
                {item?.lesion?.recuperacion}
              </Text>
            </View>

            <View className="mb-2">
              <Text className="mb-1">Anotaciones</Text>
              <TextInput
                className="bg-slate-200 py-1 px-2 italic capitalize"
                multiline={true}
                disabled={true}
                value={item?.lesion?.anotacion}
              />
            </View>
            <View className="mb-2">
              <Text className="mb-1">Recomendaciones</Text>
              <TextInput
                className="bg-slate-200 py-1 px-2 italic capitalize"
                multiline={true}
                disabled={true}
                value={item?.lesion?.recomendacion}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
