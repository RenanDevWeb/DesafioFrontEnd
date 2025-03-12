<template>
    <div class="welcome-container">
      <h1>Bem-vindo!</h1>
      <p>{{ greetingMessage }}</p>
  
      <!-- Verificando se os dados do clima estão carregados corretamente -->
      <div v-if="weatherData && weatherData.current_weather">
        <h3>Clima Atual:</h3>
        <p>Temperatura: {{ weatherData.current_weather.temperature }}°C</p>
        
        <p>Vento: {{ weatherData.current_weather.windspeed }} km/h</p>
      </div>
  
      <!-- Mensagem quando os dados ainda estão carregando -->
      <p v-else>Carregando clima...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Variáveis de estado
  const greetingMessage = "Estamos felizes por tê-lo conosco!";
  const weatherData = ref(null);
  
  // Função para pegar a localização atual
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Erro ao obter a localização: ", error);
        }
      );
    } else {
      console.log("Geolocalização não é suportada pelo navegador.");
    }
  };
  
  // Função para buscar os dados do clima usando axios
  const fetchWeather = async (lat, lon) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&lang=pt`;
  
    try {
     
      const response = await axios.get(apiUrl);
        console.log(response.data);
      if (response.data && response.data.current_weather) {
        // Atualiza os dados do clima
        weatherData.value = response.data;
        console.log(weatherData.value);
      } else {
        console.error("Dados de clima não encontrados.");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados do clima:", error);
    }
  };
  
  // Carregar a localização e clima ao montar o componente
  onMounted(() => {
    getLocation();
  });
  </script>
  


  <style scoped>
  .welcome-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #FFF;
    font-family: Arial, sans-serif;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 10px;
  }
  
  h3 {
    margin-top: 20px;
    font-size: 24px;
  }
  
  p {
    font-size: 18px;
  }
  </style>