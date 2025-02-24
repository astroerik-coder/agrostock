import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function InicioScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Fondo decorativo */}
      <View style={styles.backgroundShape} />

      {/* Logo de la app */}
      <Image
        source={require('../../assets/images/splash-icon.png')} // Asegúrate de tener esta imagen
        style={styles.logo}
      />

      {/* Título de bienvenida */}
      <Text style={styles.title}>Bienvenido a AgroStock 🌾</Text>
      <Text style={styles.subtitle}>Gestiona tu inventario agrícola de forma sencilla y eficiente.</Text>

      {/* Botones principales */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(drawer)/cultivos')}
      >
        <Text style={styles.buttonText}>Ver Cultivos y Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/(drawer)/insumos')}
      >
        <Text style={styles.buttonText}>Ver Insumos Agrícolas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tertiaryButton]}
        onPress={() => router.push('/(drawer)/maquinaria')}
      >
        <Text style={styles.buttonText}>Ver Maquinaria</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundShape: {
    position: 'absolute',
    top: -100,
    width: '150%',
    height: 400,
    backgroundColor: '#40BFBA',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    transform: [{ rotate: '-10deg' }],
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#4BC9C5',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#FFB74D',
  },
  tertiaryButton: {
    backgroundColor: '#81C784',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
