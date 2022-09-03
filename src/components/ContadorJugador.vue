<template>
  <div class="jugador">

    <input type="text" v-model="jugador.nombre">
    
    <div>
    
      <InputVagon 
        v-for="(ele, i) in vagones"
        :key="i"
        :vagon="ele"
        :jugadorId = "jugador.id"
      >
      </InputVagon>
  
    </div>

    <p class="vagonesSinUsar">{{vagonesSinUsar}} vagones sin usar</p>
    <p> Puntos por vagones {{jugador.puntosVagones}}</p>

    <InputEstaciones :jugador = "jugador"></InputEstaciones>

    <p>total: {{ jugador.puntosTotales }}</p>

   


    <InputObjetivo
      v-for="(item, i) in numObjetivos"
      :key="i"
      :numObjetivo="i"
      :jugador="props.jugador">
    </InputObjetivo>

    <!-- <button @click="aumentarNumeroObjetivos">Añadir objetivo</button> -->
    

    
  </div>
</template>

<script setup>

import InputVagon from "@/components/InputVagon.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
// import InputObjetivo from "@/components/InputObjetivo.vue";

import { ref, computed } from "vue";
import { useStore } from "@/stores/store";



const props = defineProps({
  jugador: Object,
});

const vagones = props.jugador.vagones;
const color = props.jugador.color;

console.log(vagones);

const vagonesSinUsar = computed(()=>{
  return 45 - props.jugador.vagonesUsados;
})

const  colorVagonesSinUsar = computed(()=>{
  if (vagonesSinUsar.value < 0){
    return "red";
  }
  return "black";
})

const numObjetivos = ref(3);

// aumentarNumeroObjetivos = () => {
//   numObjetivos.value ++;
// }


</script> 

<style lang="scss">
.jugador {
  //border: 3px solid red;
  border: 3px solid v-bind(color);
  width: min(350px, 100%);
  padding: 1rem;
  border-radius: 15px;
}
.vagonesSinUsar{
   color: v-bind(colorVagonesSinUsar); 
}
hr {
  margin: 0.5rem;
}
</style>