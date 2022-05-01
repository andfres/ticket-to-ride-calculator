<template>
  <div class="jugador">
    <!-- <h3 class="nombre">Jugador {{ jugador }}</h3> -->

    <input type="text" v-model="nombreJugador">
    <hr />
    <div>
      <Input 
        @some-event="mostrarTotal"
        v-for="(item, i) in inputs"
        :key="i"
        v-bind="item"
        :jugador_id="jugador"
        :id_vagon="i"
      >
      </Input>

      <p>{{vagonesFaltan}} vagones sin usar</p>
    </div>

    <hr />
    <InputEstaciones 
      @some-event="mostrarTotal"
      :jugador_id="jugador">
    </InputEstaciones>

    <hr />
    <InputObjetivos
      @some-event="mostrarTotal"
      v-for="(item, i) in numObjetivos"
      :key="i"
      :num_objetivo="i"
      :vagon-id="i"
      :jugador_id="jugador">
    </InputObjetivos>

    <button @click="aumentarNumeroObjetivos">Añadir objetivo</button>

    <hr />

    <!-- <button @click="mostrarTotal">Mostrar total</button> -->
    <p>total: {{ puntosTotal }}</p>
  </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
import InputObjetivos from "@/components/InputObjetivos.vue";

import { ref } from "vue";
import { useStore } from "@/stores/store";

const store = useStore();
const { sumarTotalPuntos, sumarPuntosCantidades } = store;

const props = defineProps({
  jugador: Number,

  color: {
    type: String,
    default: "#ff0000",
  },
});

const nombreJugador = ref("Jugador " + (props.jugador + 1));
const puntosTotal = ref(0);
const vagonesFaltan = ref(45);
const numObjetivos = ref(3);



const mostrarTotal = () => {
  puntosTotal.value = sumarTotalPuntos(props.jugador);
  vagonesFaltan.value = 45 - sumarPuntosCantidades(props.jugador)
};

const inputs = [
  { num_vagones: 1, puntos: 1 },
  { num_vagones: 2, puntos: 2 },
  { num_vagones: 3, puntos: 4 },
  { num_vagones: 4, puntos: 7 },
  { num_vagones: 5, puntos: 10 },
  { num_vagones: 6, puntos: 15 },
  { num_vagones: 8, puntos: 21 },
];



const aumentarNumeroObjetivos =() => {
  numObjetivos.value ++
}
</script> 

<style lang="scss">
.jugador {
  border: 3px solid v-bind(color);
  width: min-content;
  padding: 1rem;
}

hr {
  margin: 0.5rem;
}
</style>