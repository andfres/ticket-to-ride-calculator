<template>
  <div>
    <!-- usando label da problemas
    clicar en el label es como apretar el boton - -->
    <div class="label">
      <div class="info">
        <span>{{ label }}</span>
      </div>

    
         <button @click="disminuir">-</button>


      <input
      ref="input"
        type="number"
        v-model="puntos"
        step="1"
        min="0"
        :max="max"
        @change="actualizarPuntos"
      />
      <button @click="aumentar">+</button>
      <!-- <div class="total">{{ total }}</div> -->
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "@/stores/store";


const store = useStore();
const { addObjetivo } = store;

const max = 50;
const puntos = ref(0);
const props = defineProps({
  num_objetivo: {
    type: Number,
    default: 1,
  },
  vagon_id: Number,
  jugador_id: Number,
});

const label = computed(() => {
  return "objetivo" + (props.num_objetivo + 1);
});

const actualizarPuntos = () => {
  addObjetivo(props.jugador_id, props.num_objetivo, puntos.value);
};

const input = ref(null);

const aumentar = () => {
  
  if (puntos.value < max){
    puntos.value ++
    actualizarPuntos()
  }
}
const disminuir = () => {
  console.log("??")
    puntos.value --
    actualizarPuntos()
}
</script>

<style lang="scss"  scoped>
input {
  width: 50px;
}

// button{
//   background-color:greenyellow;
// }
</style>