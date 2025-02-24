import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      console.log("Intentando iniciar sesión con:", email, password);
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        setErrorMessage('Usuario no encontrado.');
        return;
      }

      // Generar hash del password ingresado
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      // Comparar contraseñas
      if (hashedPassword !== user.password) {
        setErrorMessage('Contraseña incorrecta.');
        return;
      }

      // Guardar la sesión en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      console.log('Usuario autenticado:', user);

      // Redirigir al drawer después del login
      router.replace('/(drawer)');
    } catch (error: any) {
      console.error("Error en handleLogin:", error);
      setErrorMessage(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Texto de bienvenida */}
      <Text style={styles.title}>Bienvenido de vuelta!</Text>

      {/* Imagen ilustrativa */}
      <Image source={require('../../assets/images/splash-icon.png')} style={styles.logo} />

      {/* Campos de entrada */}
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
        placeholder="Ingresa tu Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Mostrar mensaje de error en pantalla */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace a la pantalla de registro */}
      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  backArrow: {
    fontSize: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    color: '#00AEEF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
