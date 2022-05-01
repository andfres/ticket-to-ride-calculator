import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "main",
  state: () => ({
    clasificacion: jugadores,
  }),

  actions: {
    actualizarPuntuacionVagon(jugador, vagon, valor) {
      this.clasificacion[jugador].vagones[vagon].puntos = valor;
    },

    actualizarCantidadesVagon(jugador, vagon, valor) {
      this.clasificacion[jugador].vagones[vagon].cantidad = valor;
    },

    actualizarPuntuacionEstaciones(jugador, valor) {
      this.clasificacion[jugador].puntosEstaciones = valor;
    },

    sumarPuntosVagones(jugador) {
      const vagones = this.clasificacion[jugador].vagones;
      let total = 0;
      for (let vagon of vagones) {
        total += vagon.puntos;
      }
      return total;
    },

    sumarPuntosCantidades(jugador) {
      const vagones = this.clasificacion[jugador].vagones;
      let total = 0;
      for (let vagon of vagones) {
        total += vagon.cantidad;
      }
      return total;
    },

    decirhola() {
      console.log("hola");
    },

    sumarTotalPuntos(jugador) {
      let puntosTotales = 0;
      //this.decirhola();
      const puntosVagones = this.sumarPuntosVagones(jugador);
      const punEstaciones = this.clasificacion[jugador].puntosEstaciones;
      const punObjetivos = this.sumarObjetivos(jugador);
      puntosTotales = puntosVagones + punEstaciones + punObjetivos ;

      console.log(
        "puntosVagones",
        puntosVagones,
        "punEstaciones",
        punEstaciones,
        "punOjbetivos",
        punObjetivos
      );
      return puntosTotales;
    },

    addObjetivo(jugador, num_objetivo, cantidad){
      const objetivos = this.clasificacion[jugador].objetivos;
      console.log("jugador", jugador , "objetivos", objetivos , "cantidad", cantidad,)
      objetivos[num_objetivo] = cantidad;
    },

    sumarObjetivos(jugador){
      const objetivos = this.clasificacion[jugador].objetivos;
      let total = 0;
      for (let objetivo of objetivos) {
        total += objetivo;
      }
      return total;
    },

    getAll() {
      console.log(this.clasificacion);
    },
    getPuntuacionJugador(jugador) {
      return jugadores[jugador].puntos;
    },
  }, //fin actions
});

const crearVagones = () => {
  const array = [];
  for (let i = 0; i < 7; i++) {
    array.push({ puntos: 0, cantidad: 0 });
  }
  return array;
};
const vagones = crearVagones();

// const crearObjetivos = () => {
//   const array = [];
//   for (let i = 0; i < 10; i++) {
//     array.push(0);
//   }
//   return array;
// };
// const Objetivos = crearVagones();

const jugadores = [
  { nombre: "Jugador 1", vagones: vagones, puntosEstaciones: 0, objetivos: [] },
  { nombre: "Jugador 2", vagones: vagones, puntosEstaciones: 0, objetivos: [] },
  { nombre: "Jugador 3", vagones: vagones, puntosEstaciones: 0, objetivos: [] },
  { nombre: "Jugador 4", vagones: vagones, puntosEstaciones: 0, objetivos: [] },
  { nombre: "Jugador 5", vagones: vagones, puntosEstaciones: 0, objetivos: [] },
];

// const colors = ["#ff0000", "#0015ff", "#fbff00", "#00ff00", "#000000"];
// const coloresDisponibles = [];

// import { defineStore } from 'pinia'

// export const useCounterStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     counter: 0
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     increment() {
//       this.counter++
//     }
//   }
// })
