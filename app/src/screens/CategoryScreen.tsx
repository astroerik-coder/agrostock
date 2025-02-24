import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductItem } from '../../types';
import { categoryData as defaultData } from '../data/categoryData';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface CategoryScreenProps {
  category: keyof typeof defaultData;
}

export default function CategoryScreen({ category }: CategoryScreenProps) {
  const [items, setItems] = useState<ProductItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemStatus, setNewItemStatus] = useState('');

  const storageKey = `category_${category}`;

  // Cargar datos desde AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(storageKey);
        if (storedData) {
          setItems(JSON.parse(storedData));
        } else {
          // Si no hay datos en AsyncStorage, usar los datos por defecto
          setItems(defaultData[category] || []);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    loadData();
  }, [category]);

  // Guardar datos en AsyncStorage
  const saveData = async (data: ProductItem[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  };

  // Agregar nuevo producto
  const handleAddItem = () => {
    if (!newItemName || !newItemAmount || !newItemUnit || !newItemStatus) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const newItem: ProductItem = {
      id: Date.now().toString(),
      name: newItemName,
      amount: parseFloat(newItemAmount),
      unit: newItemUnit,
      status: newItemStatus,
      icon: '🌿', // Icono por defecto
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveData(updatedItems);

    // Limpiar campos y cerrar modal
    setNewItemName('');
    setNewItemAmount('');
    setNewItemUnit('');
    setNewItemStatus('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - {item.amount} {item.unit} ({item.status}) {item.icon}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Botón flotante "+" */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal para agregar nuevo producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agregar Nuevo Producto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={newItemAmount}
              onChangeText={setNewItemAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Unidad (kg, L, unidades)"
              value={newItemUnit}
              onChangeText={setNewItemUnit}
            />
            <Picker
              selectedValue={newItemStatus}
              onValueChange={(itemValue) => setNewItemStatus(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Selecciona el estado" value="" />
              <Picker.Item label="Disponible" value="disponible" />
              <Picker.Item label="En uso" value="en uso" />
              <Picker.Item label="En mantenimiento" value="en mantenimiento" />
              <Picker.Item label="Agotado" value="agotado" />
            </Picker>



            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddItem}
              >
                <Text style={styles.modalButtonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7F6',
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#40BFBA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },  
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#40BFBA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF4B5C',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
