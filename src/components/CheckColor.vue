<template>
    <input type="checkbox" name="cb" value="true" :checked="jugador.visible" ref="check" @change="toggle"/>
</template>

<script setup>

// crear la acción en piniar  parametro (checked) ref 

import { ref } from 'vue';
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const { toggleVisible } = useStore();

const check = ref(null);

const props = defineProps({
  jugador: Object,

});


const toggle = () => {
  toggleVisible(props.jugador.id);
}

const color = props.jugador.color;

</script>

<style>

input {
  accent-color: v-bind(color);
  box-shadow:  0px 0px 1px 1px v-bind(color);

}



</style>