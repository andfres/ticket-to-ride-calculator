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


    <!--
    <p class="vagonesSinUsar">{{vagonesSinUsar}} vagones sin usar</p>
  <p class="vagonesSinUsar">{{vagonesFaltan}} vagones sin usar</p>

    <InputEstaciones 
      :jugador_id="jugador">
    </InputEstaciones>

    <InputObjetivos
      v-for="(item, i) in numObjetivos"
      :key="i"
      :num_objetivo="i"
      :vagon-id="i"
      :jugador_id="i">
    </InputObjetivos>

    <button @click="aumentarNumeroObjetivos">Añadir objetivo</button>
    <p>total: {{ puntosTotal }}</p>
    -->
    
  </div>
</template>

<script setup>

import InputVagon from "@/components/InputVagon.vue";
// import InputEstaciones from "@/components/InputEstaciones.vue";
// import InputObjetivos from "@/components/InputObjetivos.vue";

import { ref, computed } from "vue";
import { useStore } from "@/stores/store";



const props = defineProps({
  jugador: Object,
});

const vagones = props.jugador.vagones;
const color = props.jugador.color;

console.log(vagones);

// const vagonesSinUsar = computed(()=>{
//   return 45 - props.jugador.vagonesUsados;
// })

//const vagonesFaltan = ref(45);
// const numObjetivos = ref(3);

// const  colorVagonesSinUsar = computed(()=>{
//   if (vagonesFaltan.value < 0){
//     return "red";
//   }
//   return "black";
// })




// const mostrarTotal = () => {
//   puntosTotal.value = sumarTotalPuntos(props.jugador);
//   vagonesFaltan.value = 45 - sumarPuntosCantidades(props.jugador)
// };




</script> 

<style lang="scss">
.jugador {
  //border: 3px solid red;
  border: 3px solid v-bind(color);
  width: min(350px, 100%);
  padding: 1rem;
  border-radius: 15px;
}
// .vagonesSinUsar{
//    color: v-bind(colorVagonesSinUsar); 
// }
hr {
  margin: 0.5rem;
}
</style>