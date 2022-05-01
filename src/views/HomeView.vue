

<template>
  <main>

    <!-- <label>
          <span>Número de jugadores</span>
          <input type="number">
    </label> -->
    <h1>Calculadora puntos, Viajeros al Tren</h1>

    <div class="jugadores">

      <ContadorJugador 
        v-for="(item, i) in jugadores" 
        :key="i"
        :color="colors[i]"
        :jugador="i" >
      </ContadorJugador>

    </div>


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
main{
  padding: 1rem;

  h1{
    text-align: center;
  }
  .jugadores{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}
</style>
