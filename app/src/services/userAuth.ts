import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

interface User {
  name: string;
  email: string;
  password: string; // Almacenará el hash de la contraseña
}

// Leer usuarios desde AsyncStorage
export const getUsers = async (): Promise<User[]> => {
  try {
    const data = await AsyncStorage.getItem("users");
    return data ? (JSON.parse(data) as User[]) : [];
  } catch (error) {
    console.error("Error leyendo usuarios:", error);
    return [];
  }
};

// Guardar usuarios en AsyncStorage
export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error guardando usuarios:", error);
  }
};

// Validar email simple
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Hashear contraseña usando SHA-256
const hashPassword = async (password: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
};

// Registrar usuario
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (!isValidEmail(email)) {
    throw new Error("Correo electrónico inválido");
  }

  const users = await getUsers();
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    throw new Error("El correo ya está registrado");
  }

  // Hashear la contraseña
  const hashedPassword = await hashPassword(password);

  const newUser: User = { name, email, password: hashedPassword };
  users.push(newUser);

  await saveUsers(users);
  return newUser;
};

// Iniciar sesión
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  if (!email || !password) {
    throw new Error("Correo y contraseña son obligatorios");
  }

  const users = await getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Hashear la contraseña ingresada para compararla
  const hashedPassword = await hashPassword(password);

  if (hashedPassword !== user.password) {
    throw new Error("Contraseña incorrecta");
  }

  // Guardar sesión en AsyncStorage
  await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
  return user;
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("loggedInUser");
  } catch (error) {
    console.error("Error cerrando sesión:", error);
  }
};

// Obtener usuario logueado
export const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem("loggedInUser");
    return user ? (JSON.parse(user) as User) : null;
  } catch (error) {
    console.error("Error obteniendo usuario logueado:", error);
    return null;
  }
};
