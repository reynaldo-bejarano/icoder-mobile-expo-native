import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Nutrition() {
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
    <View className="flex flex-1 ">
      <Content id={identificationAthlete} />
    </View>
  );
}

function Content({ id }) {
  const [nutritionInfo, setNutritionInfo] = useState([]);
  const [isMondayActive, setIsMondayActive] = useState(false);
  const [isTuesdayActive, setIsTuesdayActive] = useState(false);
  const [isWednesdayActive, setIsWednesdayActive] = useState(false);
  const [isThursdayActive, setIsThursdayActive] = useState(false);
  const [isFridayActive, setIsFridayActive] = useState(false);
  const [isSaturdayActive, setIsSaturdayActive] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(`http://localhost:5000/api/nutrition`, {
          id,
        });
        setNutritionInfo(res.data.nutritionData);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (id !== null) fetchData();
  }, [id]);

  return (
    <ScrollView className="flex-1 bg-slate-900">
      <View>
        {/* Segunda Pagina */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Plan nutricional</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.container}>
            {nutritionInfo.map((i) => (
              <View key={Math.random()}>
                {/* Lunes */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsMondayActive(!isMondayActive)}
                >
                  <Text style={styles.day}>Lunes</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isMondayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[1].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[1].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[1].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[1].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[1].dinner}</Text>
                  </View>
                </View>
                {/* Lunes */}

                {/* Martes */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsTuesdayActive(!isTuesdayActive)}
                >
                  <Text style={styles.day}>Martes</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isTuesdayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[2].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[2].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[2].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[2].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[2].dinner}</Text>
                  </View>
                </View>
                {/* Martes */}

                {/* Miercoles */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsWednesdayActive(!isWednesdayActive)}
                >
                  <Text style={styles.day}>Miércoles</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isWednesdayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[3].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[3].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[3].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[3].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[3].dinner}</Text>
                  </View>
                </View>
                {/* Miercoles */}

                {/* Jueves */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsThursdayActive(!isThursdayActive)}
                >
                  <Text style={styles.day}>Jueves</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isThursdayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[4].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[4].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[4].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[4].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[4].dinner}</Text>
                  </View>
                </View>
                {/* Jueves */}

                {/* Viernes */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsFridayActive(!isFridayActive)}
                >
                  <Text style={styles.day}>Viernes</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isFridayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[5].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[5].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[5].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[5].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[5].dinner}</Text>
                  </View>
                </View>
                {/* Viernes */}
                {/* Sabado */}
                <Pressable
                  style={styles.day}
                  onPress={() => setIsSaturdayActive(!isSaturdayActive)}
                >
                  <Text style={styles.day}>Sábado</Text>
                </Pressable>
                <View
                  style={styles.grid}
                  className={isSaturdayActive || "hidden"}
                >
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[6].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[6].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[6].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[6].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[6].dinner}</Text>
                  </View>
                </View>
                {/* Sabado */}
              </View>
            ))}
          </View>
        </View>

        {/* Segunda pagina */}
      </View>
    </ScrollView>
  );
}

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    fontSize: 8,
  },
  section: {
    backgroundColor: "#e2e8f0",
    margin: 10,
    padding: 10,
    borderRadius: 6,
  },
  header: {
    padding: 10,
    borderRadius: 0,
    marginBottom: 0,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  infoGrid: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  infoValue: {
    backgroundColor: "#f1f5f9",
    padding: 5,
    borderRadius: 4,
    fontSize: 12,
    textTransform: "capitalize",
    fontStyle: "italic",
  },
  morphologicalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  morphologicalBlock: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: "48%",
  },
  blockTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },

  grid: {},
  card: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  day: {
    backgroundColor: "#1e293b", //#e2e8f0
    color: "#ffffff",
    textAlign: "center",
    paddingVertical: 8,
    marginBottom: 5,
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 20,
  },
  mealContainer: {
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
  },
  mealTitle: {
    fontWeight: "bold",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    textTransform: "capitalize",
    backgroundColor: "#2596be",
    color: "white",
    paddingVertical: 3,
  },

  textArea: {
    borderRadius: 0,
    gap: 2,
    padding: 10,
    textAlignVertical: "top",
    fontStyle: "italic",
    backgroundColor: "#e2e8f0",
  },
});
