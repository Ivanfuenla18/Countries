# 🌍 World Countries & Weather App

Este proyecto es parte del curso **Full Stack Open** de la Universidad de Helsinki. Es una aplicación interactiva desarrollada con **React** y **Vite** que permite explorar información de países de todo el mundo e integrar datos meteorológicos en tiempo real.

## 🚀 Demo
Puedes ver la aplicación funcionando aquí: [https://countries-rouge-two.vercel.app](https://countries-rouge-two.vercel.app)

## ✨ Características
- **Búsqueda inteligente**: Filtrado de países en tiempo real a medida que escribes.
- **Vistas dinámicas**: 
  - Si hay más de 10 coincidencias, pide ser más específico.
  - Si hay entre 2 y 10, muestra una lista con botones de "Show".
  - Si hay solo una, muestra toda la información detallada.
- **Clima en tiempo real**: Integración con la API de **OpenWeatherMap** para mostrar temperatura, viento e iconos climáticos de la capital del país seleccionado.
- **Seguridad**: Manejo de API Keys mediante variables de entorno (`.env`).

## 🛠️ Tecnologías utilizadas
- **React** (Hooks: `useState`, `useEffect`)
- **Vite** (Build tool)
- **Axios** (Peticiones HTTP)
- **OpenWeather API** (Datos climáticos)
- **Vercel** (Hosting y despliegue continuo)

## 📦 Instalación y configuración local

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/Ivanfuenla18/Countries.git](https://github.com/Ivanfuenla18/Countries.git)
Instala las dependencias:

Bash

npm install
Crea un archivo .env en la raíz y añade tu API Key:

Fragmento de código

VITE_WEATHER_KEY=tu_clave_aqui
Lanza el servidor de desarrollo:

Bash

npm run dev
Desarrollado por Iván Paniagua Sánchez 🚀
