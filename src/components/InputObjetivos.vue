<template>
  <div>
    <label class="label">
      <div class="info">
        <span>{{ label }}</span>
      </div>

      <input
        type="number"
        v-model="puntos" 
        step="1" min="0" max="100"
        @change="actualizarPuntos"
        />
      <!-- <div class="total">{{ total }}</div> -->
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
const { addObjetivo } = store;


const puntos = ref(0)
 const props = defineProps({
   num_objetivo:{
     type:Number,
     default: 1,
   },
   vagon_id: Number,
   jugador_id: Number
 });

const label = computed(() => {
  return "objetivo" + (props.num_objetivo + 1);
});


const decirhola = (nose) =>{
  console.log("decir hla", nose)
}

const actualizarPuntos = () => {
  addObjetivo(props.jugador_id, props.num_objetivo,  puntos.value)
  //console.log("puntos", puntos.value)
  emit('someEvent')
};









</script>

<style lang="scss"  scoped>

input{
  width: 50px ;
}
</style>