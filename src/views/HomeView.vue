<template>
  <main>
    <h1>Calculadora</h1>
    <h1>¡Aventureros al Tren!</h1>

    <div  class="checks">
      <CheckColor
      v-for="(item, i) in jugadores"
      :key="i"
      :jugador="item"
    ></CheckColor>

    </div>



    <div class="jugadores">
      <ContadorJugador v-for="(item, i) in jugadores" :key="i" :jugador="item">
      </ContadorJugador>
    </div>

    <footer>
      <p>Andrés Fresno. 2022</p>
      <p>https://github.com/andfres</p>
    </footer>
  </main>
</template>

<script setup>
import CheckColor from "@/components/CheckColor.vue";
import ContadorJugador from "@/components/ContadorJugador.vue";
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const { jugadores } = useStore();
//const { jugadores } = storeToRefs(useStore());
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Neucha&display=swap");
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  padding: 5px;
  border: 10px;
  background-color: beige;
  border: 1px solid red;

  .checks{
    background-color: azure;
    padding: 1rem;
    border: 1rem;
    display: flex;
    gap: 2rem;
  }

  h1 {
    text-align: center;
    font-family: "Neucha", cursive;
  }
  .jugadores {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}
</style>
