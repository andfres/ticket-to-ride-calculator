<template>
  <div>
    <div class="label">
      <div class="info">
        <span>estaciones</span>
        <span>(4 pts)</span>
      </div>

      <button @click="disminuir">-</button>

      <input
        ref="input"
        type="number"
        :value="props.jugador.cantidadEstaciones"
      />
      <button @click="aumentar">+</button>

      <div class="total">{{ jugador.puntosEstaciones }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/store";

const store = useStore();
const { disminuirEstaciones, aumentarEstaciones } = store;

const props = defineProps({
  jugador: Object,
});

const max = 3;

const disminuir = () => {
  if (props.jugador.cantidadEstaciones >= 1) {
    disminuirEstaciones(props.jugador.id);
  }
};

const aumentar = () => {
  if (props.jugador.cantidadEstaciones < max) {
  
    aumentarEstaciones(props.jugador.id);
  }
};

// const aumentar = () => {
//   if (props.vagon.cantidad < max.value) {
//     addVagon(props.jugadorId, props.vagon.id);
//   }
// };

// const disminuir = () => {
//   if (props.vagon.cantidad >= 1) {
//     quitarVagon(props.jugadorId, props.vagon.id);
//   }
// };

const label = "num estaciones";
</script>

<style lang="scss"></style>
