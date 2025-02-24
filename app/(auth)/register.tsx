import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto'; // Importando expo-crypto

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setErrorMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Obtener los usuarios existentes
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verificar si el correo ya está registrado
      const userExists = users.find((user: any) => user.email === email);

      if (userExists) {
        setErrorMessage('El correo ya está registrado.');
        return;
      }

      // Hashear la contraseña usando expo-crypto con SHA-256
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      // Crear el nuevo usuario
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      // Guardar el nuevo usuario en AsyncStorage
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      console.log('Usuario registrado:', newUser);

      // Mostrar alerta de éxito y redirigir al login
      Alert.alert('Éxito', 'Usuario registrado exitosamente');
      router.replace('/(auth)/login');
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      setErrorMessage(error.message || 'Error al registrar usuario');
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con imagen */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/images/splash-icon.png')} style={styles.logo} />
      </View>

      {/* Texto de bienvenida */}
      <Text style={styles.title}>Bienvenido a <Text style={{ fontWeight: 'bold' }}>AgroStock 🌾</Text></Text>
      <Text style={styles.subtitle}>Permítanos ayudarle con su inventario</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Crea una Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Mostrar mensaje de error en pantalla */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  backArrow: {
    fontSize: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4BC9C5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
