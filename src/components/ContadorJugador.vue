<template>
  <div class="jugador">
    <input type="text" v-model="jugador.nombre" />

    <div>
      <InputVagon
        v-for="(ele, i) in vagones"
        :key="i"
        :vagon="ele"
        :jugadorId="jugador.id"
      >
      </InputVagon>
      <p class="vagonesSinUsar">{{ vagonesSinUsar }} vagones sin usar</p>
      <p>Puntos vagones {{ jugador.puntosVagones }}</p>
    </div>

    <hr />

    <InputEstaciones :jugador="jugador"></InputEstaciones>
    <hr />

    <InputObjetivo
      v-for="(obj, i) in props.jugador.objetivos"
      :key="i"
      :objetivoId="i"
      :objetivoPuntos="obj"
      :jugador="props.jugador"
    >
    </InputObjetivo>
    <button @click="aumentarNumeroObjetivos">Añadir objetivo</button>
    <hr />

    <!-- <button @click="handelCalcularTotal">{{total2}}</button>  -->
    
    <p>total {{ total }}</p>
    
  </div>
</template>

<script setup>

import InputVagon from "@/components/InputVagon.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
import InputObjetivo from "@/components/InputObjetivo.vue";

import { ref, computed , watch } from "vue";
import { useStore } from "@/stores/store";
import CheckColor from "./CheckColor.vue";

const { jugadores, addObjetivos , calcularTotal } = useStore();

const props = defineProps({
  jugador: Object,
});

const total2 = ref("calular total")
const total = ref(0)


const handelCalcularTotal = () => {
  total.value = calcularTotal(props.jugador.id);
}


watch(jugadores, () => {
  console.log("cambio")
  total.value = calcularTotal(props.jugador.id);
});

const vagones = props.jugador.vagones;
const color = props.jugador.color;


const vagonesSinUsar = computed(() => {
  return 45 - props.jugador.vagonesUsados;
});

const colorVagonesSinUsar = computed(() => {
  if (vagonesSinUsar.value < 0) {
    return "red";
  }
  return "black";
});

const aumentarNumeroObjetivos = () => {
  addObjetivos(props.jugador.id);
};
</script>

<style lang="scss">
.jugador {
  //border: 3px solid red;
  border: 3px solid v-bind(color);
  width: min(350px, 100%);
  padding: 1rem;
  border-radius: 15px;
}
.vagonesSinUsar {
  color: v-bind(colorVagonesSinUsar);
}
hr {
  margin: 0.5rem;
}
</style>
