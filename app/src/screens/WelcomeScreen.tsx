import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Imagen Ilustrativa */}
      <Image source={require('../assets/icons/wheat.png')} style={styles.illustration} />

      {/* Título */}
      <Text style={styles.title}>
        AgroStock <Text style={styles.icon}>🌾</Text>
      </Text>

      {/* Descripción */}
      <Text style={styles.subtitle}>
        Descubre AgroStock: La mejor forma de gestionar tu inventario agrícola de manera eficiente.
      </Text>

      {/* Botón Empezar */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.buttonText}>Empezar</Text>
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
  illustration: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#4BC9C5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
