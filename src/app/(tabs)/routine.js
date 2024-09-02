import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";

export default function Routine() {
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
  const [rutineInfo, setRutineInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:5000/api/rutine`, {
          id,
        });
        setRutineInfo(res.data.rutineData);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (id !== null) fetchData();
  }, [id]);

  return (
    <>
      <ScrollView className="flex-1">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Rutina de ejercicios</Text>
          </View>

          <View>
            <View style={styles.Subheader}>
              <Text style={styles.headerSubText}>Días de entrenamiento</Text>
            </View>
          </View>
          <View>
            {gruposMusculares.map((g) => (
              <View style={styles.groupDayContainer} key={g.grupo}>
                <View style={styles.groupDayTitle}>
                  <Text style={styles.groupTitleText}>
                    {g.grupo || "Cargando"}
                  </Text>
                </View>
                <View>
                  <View key={Math.random()}>
                    {rutineInfo.map((item) => {
                      return (
                        <View style={[styles.dayContainer]} key={Math.random()}>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].lunes ? "Lunes" : ""}
                            </Text>
                          </View>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].martes ? "Martes" : ""}
                            </Text>
                          </View>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].miercoles ? "Miércoles" : ""}
                            </Text>
                          </View>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].jueves ? "Jueves" : ""}
                            </Text>
                          </View>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].viernes ? "Viernes" : ""}
                            </Text>
                          </View>
                          <View style={styles.dayContent}>
                            <Text style={styles.dayText}>
                              {item[g.grupo].sabado ? "Sábado" : ""}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.Subheader} key={Math.random()}>
            <Text style={styles.headerSubText}>Plan de entrenamiento</Text>
          </View>
          {gruposMusculares.map((g) => (
            <View style={styles.groupContainer} key={Math.random()}>
              <View style={styles.groupTitle}>
                <Text style={styles.groupTitleText}>
                  {g.grupo || "Cargando"}
                </Text>
              </View>
              <View>
                {gruposIDS.map((i) => (
                  <View style={styles.exercisesContainer} key={Math.random()}>
                    {rutineInfo.map((item) => {
                      if (
                        g.grupo === item[i.id]?.musculo &&
                        item[i.id].active === true
                      ) {
                        return (
                          <View
                            style={[styles.exerciseContainer]}
                            key={Math.random()}
                          >
                            <View style={styles.exerciseContent}>
                              <Text style={styles.exerciseText}>
                                {item[i.id]?.ejercicio}
                              </Text>
                            </View>

                            <View style={styles.detailsContainer}>
                              <Text style={styles.detailsText}>
                                {item[i.id]?.serie} x {item[i.id]?.reps}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                      return null;
                    })}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const gruposMusculares = [
  {
    grupo: "pecho",
    id: "pecho",
  },
  {
    grupo: "brazos",
    id: "brazos",
  },
  {
    grupo: "piernas",
    id: "piernas",
  },
  {
    grupo: "espalda",
    id: "espalda",
  },
  {
    grupo: "hombros",
    id: "hombros",
  },
  {
    grupo: "abdomen",
    id: "abdomen",
  },
];

const gruposIDS = [
  {
    id: "pe1",
  },
  {
    id: "pe2",
  },
  {
    id: "pe3",
  },
  {
    id: "pe4",
  },
  {
    id: "pe5",
  },
  {
    id: "pe6",
  },
  {
    id: "pe7",
  },
  {
    id: "pe8",
  },
  {
    id: "pe9",
  },
  {
    id: "pe10",
  },
  {
    id: "b1",
  },
  {
    id: "b2",
  },
  {
    id: "b3",
  },
  {
    id: "b4",
  },
  {
    id: "b5",
  },
  {
    id: "b6",
  },
  {
    id: "b7",
  },
  {
    id: "b8",
  },
  {
    id: "b9",
  },
  {
    id: "b10",
  },
  {
    id: "h1",
  },
  {
    id: "h2",
  },
  {
    id: "h3",
  },
  {
    id: "h4",
  },
  {
    id: "h5",
  },
  {
    id: "h6",
  },
  {
    id: "h7",
  },
  {
    id: "h8",
  },
  {
    id: "h9",
  },
  {
    id: "h10",
  },
  {
    id: "a1",
  },
  {
    id: "a2",
  },
  {
    id: "a3",
  },
  {
    id: "a4",
  },
  {
    id: "a5",
  },
  {
    id: "a6",
  },
  {
    id: "a7",
  },
  {
    id: "a8",
  },
  {
    id: "a9",
  },
  {
    id: "a10",
  },
  {
    id: "pi1",
  },
  {
    id: "pi2",
  },
  {
    id: "pi3",
  },
  {
    id: "pi4",
  },
  {
    id: "pi5",
  },
  {
    id: "pi6",
  },
  {
    id: "pi7",
  },
  {
    id: "pi8",
  },
  {
    id: "pi9",
  },
  {
    id: "pi10",
  },
  {
    id: "e1",
  },
  {
    id: "e2",
  },
  {
    id: "e3",
  },
  {
    id: "e4",
  },
  {
    id: "e5",
  },
  {
    id: "e6",
  },
  {
    id: "e7",
  },
  {
    id: "e8",
  },
  {
    id: "e9",
  },
  {
    id: "e10",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // bg-slate-200
    padding: 16,
  },
  header: {
    backgroundColor: "#1e293b", // bg-slate-900
    padding: 5,
    marginBottom: 16,
  },
  Subheader: {
    marginVertical: 10,
  },
  headerText: {
    color: "#f1f5f9", // text-slate-100
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerSubText: {
    color: "black", // text-slate-100
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  groupContainer: {
    backgroundColor: "#e2e8f0", // bg-slate-300
    marginBottom: 10,
  },
  groupTitle: {
    backgroundColor: "#49566c", // bg-slate-700
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: "capitalize",
  },
  groupTitleText: {
    color: "#f1f5f9", // text-slate-100
    fontSize: 10,
  },
  exercisesContainer: {
    padding: 0,
  },
  exerciseContainer: {
    flexDirection: "row", // Alinea los elementos hijos en una fila
    alignItems: "center", // Alinea verticalmente los elementos al centro
    padding: 5, // Espacio interno alrededor del contenedor              // Espacio vertical entre los contenedores
    backgroundColor: "#e2e8f0", // Fondo del contenedor (puedes cambiar el color según tu diseño)
  },
  exerciseContent: {
    flex: 7,
    padding: 0,
    fontSize: 10,
  },
  exerciseText: {
    fontSize: 10,
    flex: 3,
    justifyContent: "flex-start",
  },
  detailsContainer: {
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 4,
  },
  detailsText: {
    fontSize: 10,
  },
  hidden: {
    display: "none",
  },
  activeDay: {
    backgroundColor: "green",
    height: 3,
    width: 3,
    color: "pink",
  },
  inactiveDay: {
    backgroundColor: "black",
    height: 3,
    width: 3,
  },
  groupDayContainer: {
    backgroundColor: "#e2e8f0", // bg-slate-300
    marginBottom: 1,
  },
  dayContainer: {
    flexDirection: "row", // Alinea los elementos hijos en una fila
    alignItems: "center", // Alinea verticalmente los elementos al centro
    padding: 0, // Espacio interno alrededor del contenedor              // Espacio vertical entre los contenedores
    backgroundColor: "#e2e8f0",
    marginBottom: 0,
    justifyContent: "space-between",
    gap: 2, // Fondo del contenedor (puedes cambiar el color según tu diseño)
  },
  dayContent: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 10,
    flex: 1,
  },
  dayText: {
    fontSize: 10,
    paddingVertical: 2,
  },
  groupDayTitle: {
    backgroundColor: "#49566c", // bg-slate-700
    paddingHorizontal: 8,
    paddingVertical: 2,
    textTransform: "capitalize",
  },
});
