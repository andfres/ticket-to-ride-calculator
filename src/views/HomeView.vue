

<template>
  <main>

    <!-- <label>
          <span>Número de jugadores</span>
          <input type="number">
    </label> -->
    <h1>Calculadora</h1>
    <h1>!Aventureros al Tren! Europa </h1>
    

    <div class="jugadores">

      <ContadorJugador 
        v-for="(item, i) in jugadores" 
        :key="i"
        :color="colors[i]"
        :jugador="i" >
      </ContadorJugador>

    </div>

    <footer>
      <p>Andrés Fresno. 2022</p>
      <p>https://github.com/andfres</p>
    </footer>


    <!-- <Clasificacion></Clasificacion> -->
  </main>

</template>

<script setup>
import ContadorJugador from '@/components/ContadorJugador.vue'
import Clasificacion from '@/components/Clasificacion.vue'
import { ref } from 'vue';

const jugadores = 5;

const colors = ["#ff0000", "#0015ff", "#fbff00", "#00ff00", "#000000" ]
//rojo , azul, amarillo, verde, negro

</script>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');
main{
  padding: 5px;

  h1{
    text-align: center;
    font-family: 'Neucha', cursive;

  }
  .jugadores{
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}
</style>
