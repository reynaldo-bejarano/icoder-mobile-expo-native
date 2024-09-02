import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fcd34d", //amber-300
        tabBarInactiveTintColor: "#fef2f2", //slate-50
        tabBarStyle: {
          backgroundColor: "#0f172a", //slate-900
          borderTopWidth: 0,
          elevation: 0, // Para Android
          shadowOpacity: 0, // Para iOS
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: "#f8f8f8",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="dashboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="fitness" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="nutrition" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medical"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="medical-services" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
