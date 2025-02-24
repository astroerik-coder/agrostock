import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Las rutas hijas de (auth) se renderizarán aquí */}
    </Stack>
  );
}
