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

    <!-- <p>total: {{ jugador.puntosTotales }}</p> -->

    <button @click="handelCalcularTotal">{{total}}</button>

    
  </div>
</template>

<script setup>
import InputVagon from "@/components/InputVagon.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
import InputObjetivo from "@/components/InputObjetivo.vue";

import { ref, computed } from "vue";
import { useStore } from "@/stores/store";

const { addObjetivos , calcularTotal } = useStore();

const total = ref("calular total")

const handelCalcularTotal = () => {
  total.value = calcularTotal(0);
}



const props = defineProps({
  jugador: Object,
});

const vagones = props.jugador.vagones;
const color = props.jugador.color;

console.log(vagones);

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
  addObjetivos(0);
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
