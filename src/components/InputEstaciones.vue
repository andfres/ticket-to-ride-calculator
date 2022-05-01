<template>
  <div>
    <label class="label">
      <div class="info">
        <span>{{ label }}</span>
        <span>({{ puntos }} pts)</span>
      </div>


      <input type="number" 
        v-model="cantidad"
        @change="actualizarPuntos"
        step="1" min="0" max="3"
      />
      <div class="total">{{ total }}</div>
    </label>
  </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { ref } from "vue";
import { computed } from "vue";
import { useStore} from "@/stores/store";

const emit = defineEmits(['inFocus', 'submit'])

const store = useStore();
const { actualizarPuntuacionEstaciones } = store;


const props = defineProps({
  jugador_id: Number
});


const cantidad = ref(0);
const puntos = 4;

const total = computed(() => {
  return puntos * cantidad.value;
});



const actualizarPuntos = () => {
  actualizarPuntuacionEstaciones(props.jugador_id, total.value)
    emit('someEvent')

};

const label = "num estaciones";
</script>

<style lang="scss"  >


</style>