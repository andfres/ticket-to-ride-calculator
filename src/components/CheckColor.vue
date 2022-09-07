<template>
    <input type="checkbox" name="checkbox" value="true" checked="true" ref="ref" @change="decirHola"/>
</template>

<script setup>

// crear la acción en piniar  parametro (checked) ref 

import { Ref } from 'vue';

const ref = Ref(null);

const props = defineProps({
  jugador: Object,

});

const decirHola = () => {
  alert("hola");
}


const ocultar = () => {

  ref.value.checked;

  alert("º  

}

const color = props.jugador.color;

</script>

<style>

input {
  accent-color: v-bind(color);
}


</style>