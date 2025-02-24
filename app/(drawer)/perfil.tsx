import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  // Obtener datos del usuario desde AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData({ name: user.name, email: user.email });
          setEditedName(user.name);
          setEditedEmail(user.email);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // Guardar los cambios en AsyncStorage
  const handleSave = async () => {
    if (!editedName || !editedEmail) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const updatedUser = { ...userData, name: editedName, email: editedEmail };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={require('../../assets/images/splash-icon.png')} // Avatar genérico
        style={styles.avatar}
      />

      {/* Información del Usuario */}
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          />
        </>
      ) : (
        <>
          <Text style={styles.name}>{userData?.name || 'Nombre de Usuario'}</Text>
          <Text style={styles.email}>{userData?.email || 'correo@ejemplo.com'}</Text>
        </>
      )}

      {/* Botón para editar o guardar */}
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      {/* Botón para cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  editButton: {
    backgroundColor: '#40BFBA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF4B5C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
