<template>
  <div>
    <div class="label">
      <div class="info">
        <span>{{ label }}</span>
        <span>({{ puntos }} pts)</span>
      </div>

      <button @click="disminuir">-</button>

      <input
       ref="input"
        type="number"
        v-model="cantidad"
        @change="actualizarPuntos"
        step="1"
        min="0"
        :max="max"
      />
      <button @click="aumentar">+</button>

      <div class="total">{{ total }}</div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "@/stores/store";


const store = useStore();
const { actualizarPuntuacionEstaciones } = store;

const props = defineProps({
  jugador_id: Number,
});

const cantidad = ref(0);
const puntos = 4;
const max = 3;

const total = computed(() => {
  return puntos * cantidad.value;
});

const actualizarPuntos = () => {
  actualizarPuntuacionEstaciones(props.jugador_id, total.value);
};

const input = ref(null);
const aumentar = () => {
  if (cantidad.value < max){
    cantidad.value ++
    actualizarPuntos()
  }
}
const disminuir = () => {
  if (cantidad.value >= 1){
    cantidad.value --
    actualizarPuntos()
  }
}

const label = "num estaciones";
</script>

<style lang="scss"  >
</style>