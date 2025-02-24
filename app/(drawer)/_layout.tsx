import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Importa las pantallas desde tus archivos
import IndexScreen from "./index";
import InsumosScreen from "./insumos";
import MaquinariaScreen from "./maquinaria";
import CultivosPage from "./cultivos";
import PerfilScreen from "./perfil";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  // Obtener el nombre del usuario desde AsyncStorage
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name || "Usuario");
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUserName();
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente");
    router.replace("/(auth)/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName={userName}
          onLogout={handleLogout}
        />
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#E0F7F6",
          width: 280,
        },
        headerStyle: {
          backgroundColor: "#40BFBA",
        },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#40BFBA",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="inicio"
        component={IndexScreen}
        options={{
          title: "Inicio",
          drawerIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      {/* Cultivos y Productos apuntando a cultivos.tsx */}
      <Drawer.Screen
        name="cultivos"
        component={CultivosPage}
        options={{
          title: "Cultivos y Productos",
          drawerIcon: ({ color }) => (
            <Feather name="box" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="insumos"
        component={InsumosScreen}
        options={{
          title: "Insumos Agrícolas",
          drawerIcon: ({ color }) => (
            <Feather name="droplet" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="maquinaria"
        component={MaquinariaScreen}
        options={{
          title: "Maquinaria y Herramientas",
          drawerIcon: ({ color }) => (
            <Feather name="tool" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="perfil"
        component={PerfilScreen}
        options={{
          title: "Perfil",
          drawerIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Componente personalizado para el Drawer
function CustomDrawerContent(props: any) {
  const { userName, onLogout } = props;

  return (
    <DrawerContentScrollView {...props}>
      {/* Saludo personalizado */}
      <View style={styles.headerContainer}>
        <Feather name="user" size={40} color="#40BFBA" />
        <Text style={styles.greetingText}>Hola, {userName || "Usuario"}</Text>
      </View>

      {/* Lista de pantallas */}
      <DrawerItemList {...props} />

      {/* Botón de Cerrar Sesión */}
      <DrawerItem
        label="Cerrar Sesión"
        onPress={onLogout}
        icon={({ color, size }) => (
          <Feather name="log-out" size={size} color="#FF4B5C" />
        )}
        labelStyle={{ color: "#FF4B5C", fontWeight: "bold" }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#E0F7F6",
  },
  greetingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
