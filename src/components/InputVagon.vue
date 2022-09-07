<template>
  <div>
    <div class="label">
      <div class="info">
        <span>{{ label }}</span>
        <span>({{ vagon.puntos }} pts)</span>
      </div>

      <button class="button" @click="disminuir">-</button>
      <input class="smallInput" ref="input" type="number" v-model="vagon.cantidad" readonly />

      <button class="button" @click="aumentar">+</button>
      
      <div class="total">{{ vagon.puntosTotales }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/store";

const { addVagon, quitarVagon } = useStore();

const props = defineProps({
  vagon: Object,
  jugadorId: Number,
});

const max = computed(() => {
  if (props.vagon.num_vagones === 8) {
    return 1;
  } else {
    return 10;
  }
});

const label = computed(() => {
  if (props.vagon.num_vagones <= 1) return "1 vagón";
  return props.vagon.num_vagones + " vagones";
});

const aumentar = () => {
  if (props.vagon.cantidad < max.value) {
    addVagon(props.jugadorId, props.vagon.id);
  }
};

const disminuir = () => {
  if (props.vagon.cantidad >= 1) {
    quitarVagon(props.jugadorId, props.vagon.id);
  }
};
</script>

<style lang="scss">

.button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #000;
}

.smallInput{
  text-align: right; 

}

.label {
  display: flex;
  gap: 10px;

  input {
    width: 40px;

  }
  .info {
    width: 150px;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }


  .total {
    width: 30px;
    text-align: right;
  }
}
</style>
