import { CategoryData } from "../../types";

export const categoryData: CategoryData = {
  'Cultivos y Productos': [
    { id: '1', name: 'Maíz', amount: 500, unit: 'kg', status: 'disponibles', icon: '🌽' },
    { id: '2', name: 'Trigo', amount: 1200, unit: 'kg', status: 'almacenados', icon: '🌾' },
  ],
  'Insumos Agrícolas': [
    { id: '1', name: 'Fertilizante', amount: 200, unit: 'L', status: 'en stock', icon: '💧' },
    { id: '2', name: 'Pesticida', amount: 150, unit: 'L', status: 'disponible', icon: '🧪' },
  ],
  'Maquinaria y Herramientas': [
    { id: '1', name: 'Tractor', amount: 2, unit: 'unidades', status: 'operativo', icon: '🚜' },
    { id: '2', name: 'Arado', amount: 3, unit: 'unidades', status: 'en uso', icon: '⚙️' },
  ],
};
