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
        step="1" min="0" :max="max"
        
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
const { actualizarPuntuacionVagon, actualizarCantidadesVagon } = store;

const props = defineProps({
  id_vagon: Number,
  num_vagones: Number,
  puntos: Number,
  jugador_id: Number
});

const cantidad = ref(0);

const total = computed(() => {
  return props.puntos * cantidad.value;
});

const max = computed(() => {
  if (props.num_vagones === 8 ) {
    return 1
  }else{
    return 10
  }
});

const label = computed(() => {
  if (props.num_vagones <= 1) return "1 vagón";
  return props.num_vagones + " vagones";
});


const actualizarPuntos = () => {
  actualizarPuntuacionVagon(props.jugador_id, props.id_vagon, total.value)
  actualizarCantidadesVagon(props.jugador_id, props.id_vagon, props.num_vagones*cantidad.value)
  //emit('someEvent')
  emit('someEvent', "nada")
};


</script>

<style lang="scss" >
.label {
  display: flex;
  gap: 10px;

  input {
    width: 40px;
  }
  .info {
    width: 150px;
    display: flex;
    --flex-direction: column;
    
  }

  .total {
      width: 30px;
      text-align: right;
      //border: 1px solid red;
  }
}
</style>