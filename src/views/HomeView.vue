<template>
  <main>

    <h1>Calculadora</h1>
    <h1>¡Aventureros al Tren!</h1>
    

    <div class="jugadores">

      <ContadorJugador 
        v-for="(item, i) in jugadores" 
        :key="i"
        :jugador= "item"
      >
      </ContadorJugador>

    </div>

    <footer>
      <p>Andrés Fresno. 2022</p>
      <p>https://github.com/andfres</p>
    </footer>

  </main>

</template>

<script setup>

import ContadorJugador from '@/components/ContadorJugador.vue'
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const { jugadores } = useStore();
//const { jugadores } = storeToRefs(useStore());

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
