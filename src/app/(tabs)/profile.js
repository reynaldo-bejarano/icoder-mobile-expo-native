// HomeScreen.js
import { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import calcularEdad from "../hooks/calcularEdad";

export default function Profile() {
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
    <>
      {identificationAthlete ? (
        <ScrollView className="px-4 py-2 gap-3">
          <>
            <ContentPersonal id={identificationAthlete} />
            <ContentMorphological id={identificationAthlete} />
          </>
        </ScrollView>
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size={50} />
        </View>
      )}
    </>
  );
}

///////////////////////////////////////// Datos personales

function ContentPersonal({ id }) {
  const [athletaInfo, setAthleteInfo] = useState();
  const [sportInfo, setSportInfo] = useState();
  const [modalityInfo, setModalityInfo] = useState();
  const [cantonInfo, setCantonInfo] = useState();
  const [distritoInfo, setDistritoInfo] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:5000/api/profile/data`, {
          id,
        });
        setAthleteInfo(res.data.athleteData[0]);
        setSportInfo(res.data.sportData[0]);
        setModalityInfo(res.data.modalityData[0]);
        setCantonInfo(res.data.cantonData[0]);
        setDistritoInfo(res.data.distritoData[0]);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <View className="flex-1 py-2 gap-1 px-2 bg-slate-200 pb-0 mb-5">
      {/* datos personales */}
      <View className="bg-slate-900 px-2 ">
        <Text className="text-slate-50 ">Datos personales</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Identificación:</Text>
        <Text className="italic">
          {athletaInfo?.identification
            ? athletaInfo?.identification
            : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Género:</Text>
        <Text className="italic capitalize">
          {athletaInfo?.genre ? athletaInfo?.genre : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Nombre:</Text>
        <Text className="italic capitalize">
          {athletaInfo?.name ? athletaInfo?.name : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Primer Apellido:</Text>
        <Text className="italic capitalize">
          {athletaInfo?.lastname1 ? athletaInfo?.lastname1 : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Segundo apellido:</Text>
        <Text className="italic capitalize">
          {athletaInfo?.lastname2 ? athletaInfo?.lastname2 : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Edad:</Text>
        <Text className="italic capitalize">
          {athletaInfo?.birth ? calcularEdad(athletaInfo?.birth) : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Email:</Text>
        <Text className="italic">
          {athletaInfo?.email ? athletaInfo?.email : "Cargando.."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Teléfono:</Text>
        <Text className="italic">
          {athletaInfo?.phone ? athletaInfo?.phone : "Cargando.."}
        </Text>
      </View>

      {/* Datos demograficos */}
      <View className="bg-slate-900 px-2 my-2">
        <Text className="text-slate-50 ">Datos demograficos</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Provincia:</Text>
        <Text className="italic">Limón</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Cantón:</Text>
        <Text className="italic capitalize">
          {cantonInfo?.nombre ? cantonInfo?.nombre : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Distrito:</Text>
        <Text className="italic capitalize">
          {distritoInfo?.nombre ? distritoInfo?.nombre : "Cargando..."}
        </Text>
      </View>

      {/* Actividad fisica */}
      <View className="bg-slate-900 my-2 ">
        <Text className="text-slate-50 ">Actividad física</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Deporte:</Text>
        <Text className="italic">
          {sportInfo?.name ? sportInfo?.name : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Modalidad:</Text>
        <Text className="italic capitalize ">
          {modalityInfo?.name ? modalityInfo?.name : "Cargando..."}
        </Text>
      </View>
    </View>
  );
}

/////////////////////////////////////// Datos morfologicos

function ContentMorphological({ id }) {
  const [athletaMorphologicalData, setAthletaMorphologicalData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/profile/morphological`,
          {
            id,
          }
        );
        setAthletaMorphologicalData(res.data.morphologicalAthleteData[0]);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);
  return (
    <View className="flex-1 gap-1 px-2 bg-slate-200 mb-5 pt-2 pb-10">
      {/* datos personales */}
      <View className="bg-slate-900 px-2 mb-2">
        <Text className="text-slate-50 ">Datos morfologícos</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Estatura:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.basic?.height
            ? `${athletaMorphologicalData?.basic?.height} cm`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Peso:</Text>
        <Text className="italic capitalize">
          {athletaMorphologicalData?.basic?.weight
            ? `${athletaMorphologicalData?.basic?.weight} kg`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">IMC:</Text>
        <Text className="italic capitalize">
          {athletaMorphologicalData?.basic?.IMC
            ? athletaMorphologicalData?.basic?.IMC
            : "Cargando..."}
        </Text>
      </View>
      {/* porcentaje */}
      <View className="bg-slate-300 px-2 py-1 my-2">
        <Text className="text-slate-900">Porcentaje</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Grasa:</Text>
        <Text className="italic capitalize">
          {athletaMorphologicalData?.percentage?.fat
            ? `${athletaMorphologicalData?.percentage?.fat} %`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Musculo:</Text>
        <Text className="italic capitalize">
          {athletaMorphologicalData?.percentage?.muscle
            ? `${athletaMorphologicalData?.percentage?.muscle} %`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Agua:</Text>
        <Text className="italic capitalize">
          {athletaMorphologicalData?.percentage?.water
            ? `${athletaMorphologicalData?.percentage?.water} %`
            : "Cargando..."}
        </Text>
      </View>
      {/* circunferencia */}
      <View className="bg-slate-300 px-2 py-1 my-2">
        <Text className="text-slate-900">Circuncerencia</Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Cintura:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.circumference?.waist
            ? `${athletaMorphologicalData?.circumference?.waist} cm`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Cadera:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.circumference?.hip
            ? `${athletaMorphologicalData?.circumference?.hip} cm`
            : "Cargando..."}
        </Text>
      </View>
      {/* Brazo */}
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Brazo derecho:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.arms?.aright
            ? `${athletaMorphologicalData?.arms?.aright} cm`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Brazo izquierdo:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.arms?.aleft
            ? `${athletaMorphologicalData?.arms?.aleft} cm`
            : "Cargando..."}
        </Text>
      </View>
      {/* Pierna */}
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Pierna derecho:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.legs?.lright
            ? `${athletaMorphologicalData?.legs?.lright} cm`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Pierna izquierdo:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.legs?.lleft
            ? `${athletaMorphologicalData?.legs?.lleft} cm`
            : "Cargando..."}
        </Text>
      </View>
      {/* Gastrocnemio */}
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Gastrocnemio derecho:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.gastrocnemius?.gright
            ? `${athletaMorphologicalData?.gastrocnemius?.gright} cm`
            : "Cargando..."}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2 py-1 bg-slate-100">
        <Text className="text-slate-900 ">Gastrocnemio izquierdo:</Text>
        <Text className="italic">
          {athletaMorphologicalData?.gastrocnemius?.gleft
            ? `${athletaMorphologicalData?.gastrocnemius?.gleft} cm`
            : "Cargando..."}
        </Text>
      </View>
    </View>
  );
}
