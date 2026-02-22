import { defineStore } from "pinia";

const crearVagones = (mode) => {
	const vagones = [
		{ id: 0, num_vagones: 1, puntos: 1, cantidad: 0 },
		{ id: 1, num_vagones: 2, puntos: 2, cantidad: 0 },
		{ id: 2, num_vagones: 3, puntos: 4, cantidad: 0 },
		{ id: 3, num_vagones: 4, puntos: 7, cantidad: 0 },
		{ id: 4, num_vagones: 5, puntos: 10, cantidad: 0 },
		{ id: 5, num_vagones: 6, puntos: 15, cantidad: 0 },
		{ id: 6, num_vagones: 8, puntos: 21, cantidad: 0 },
		{ id: 7, num_vagones: 9, puntos: 27, cantidad: 0 },
	];

	if (mode === "amsterdam") {
		return vagones.slice(0, 4);
	}

	if (mode === "grandes-lagos") {
		return vagones;
	}

	return vagones.slice(0, 7);
};

const crearJugadores = (mode) => {
	const config = {
		europe: [
			{ id: 0, nombre: "Jugador 1", color: "#ff0000", visible: true },
			{ id: 1, nombre: "Jugador 2", color: "#0015ff", visible: false },
			{ id: 2, nombre: "Jugador 3", color: "#fbff00", visible: true },
			{ id: 3, nombre: "Jugador 4", color: "#00ff00", visible: true },
			{ id: 4, nombre: "Jugador 5", color: "#000000", visible: false },
		],
		amsterdam: [
			{ id: 0, nombre: "Jugador 1", color: "#ffffff", visible: true },
			{ id: 1, nombre: "Jugador 2", color: "#000000", visible: true },
			{ id: 2, nombre: "Jugador 3", color: "#e78f50ff", visible: true }, // Chocolate/Brown
			{ id: 3, nombre: "Jugador 4", color: "#8b2f13ff", visible: false }, // SaddleBrown/DarkBrown
		],
		"vuelta-del-mundo": [
			{ id: 0, nombre: "Jugador 1", color: "#ff0000", visible: true },
			{ id: 1, nombre: "Jugador 2", color: "#0015ff", visible: false },
			{ id: 2, nombre: "Jugador 3", color: "#fbff00", visible: true },
			{ id: 3, nombre: "Jugador 4", color: "#00ff00", visible: true },
			{ id: 4, nombre: "Jugador 5", color: "#000000", visible: false },
		],
		"grandes-lagos": [
			{ id: 0, nombre: "Jugador 1", color: "#ff0000", visible: true },
			{ id: 1, nombre: "Jugador 2", color: "#0015ff", visible: false },
			{ id: 2, nombre: "Jugador 3", color: "#fbff00", visible: true },
			{ id: 3, nombre: "Jugador 4", color: "#00ff00", visible: true },
			{ id: 4, nombre: "Jugador 5", color: "#000000", visible: false },
		],
	};

	return config[mode].map((j) => ({
		...j,
		vagones: crearVagones(mode),
		cantidadEstaciones: 0,
		puertos: [
			{ id: 0, construido: false, tickets: 0 },
			{ id: 1, construido: false, tickets: 0 },
			{ id: 2, construido: false, tickets: 0 },
		],
		objetivos: Array(3).fill(0),
		tieneViaMasLarga: false,
	}));
};

export const useStore = defineStore({
	id: "main",
	state: () => ({
		gameMode: "europe",
		jugadoresData: crearJugadores("europe"),
		historial: JSON.parse(localStorage.getItem("ttr-historial") || "[]"),
	}),

	getters: {
		maxPiezas: (state) => {
			if (state.gameMode === "amsterdam") return 15;
			if (state.gameMode === "vuelta-del-mundo" || state.gameMode === "grandes-lagos") return 60;
			return 45;
		},
		jugadores: (state) => {
			return state.jugadoresData.map((jugador) => {
				const vagonesConPuntos = jugador.vagones.map((vagon) => ({
					...vagon,
					puntosTotales: vagon.cantidad * vagon.puntos,
				}));

				const puntosVagones = vagonesConPuntos.reduce((acc, v) => acc + v.puntosTotales, 0);

				const vagonesUsados = vagonesConPuntos.reduce(
					(acc, v) => acc + v.cantidad * v.num_vagones,
					0,
				);

				const puntosEstaciones = state.gameMode === "europe" ? jugador.cantidadEstaciones * -4 : 0;

				let puntosPuertos = 0;
				if (state.gameMode === "vuelta-del-mundo" || state.gameMode === "grandes-lagos") {
					const scoring = state.gameMode === "vuelta-del-mundo" ? [0, 20, 30, 40] : [0, 10, 20, 30];
					jugador.puertos.forEach((puerto) => {
						if (puerto.construido) {
							const ticketPointsIdx = Math.min(puerto.tickets, 3);
							puntosPuertos += scoring[ticketPointsIdx];
						} else {
							puntosPuertos -= 4;
						}
					});
				}

				const puntosObjetivos = jugador.objetivos.reduce((acc, obj) => acc + (obj || 0), 0);

				const puntosViaMasLarga = state.gameMode === "europe" && jugador.tieneViaMasLarga ? 10 : 0;

				const puntosTotales =
					puntosVagones + puntosEstaciones + puntosPuertos + puntosObjetivos + puntosViaMasLarga;

				return {
					...jugador,
					vagones: vagonesConPuntos,
					puntosVagones,
					vagonesUsados,
					puntosEstaciones,
					puntosPuertos,
					puntosTotales,
				};
			});
		},
	},
	actions: {
		setGameMode(mode) {
			this.gameMode = mode;
			this.jugadoresData = crearJugadores(mode);
		},

		quitarVagon(jugadorId, vagonId) {
			const jugador = this.jugadoresData[jugadorId];
			const vagon = jugador.vagones[vagonId];
			vagon.cantidad -= 1;
		},

		addVagon(jugadorId, vagonId) {
			const jugador = this.jugadoresData[jugadorId];
			const vagon = jugador.vagones[vagonId];
			vagon.cantidad += 1;
		},

		disminuirEstaciones(jugadorId) {
			const jugador = this.jugadoresData[jugadorId];
			jugador.cantidadEstaciones -= 1;
		},

		aumentarEstaciones(jugadorId) {
			const jugador = this.jugadoresData[jugadorId];
			jugador.cantidadEstaciones += 1;
		},

		togglePortBuilt(jugadorId, puertoId) {
			const puerto = this.jugadoresData[jugadorId].puertos[puertoId];
			puerto.construido = !puerto.construido;
			if (puerto.construido && puerto.tickets === 0) {
				puerto.tickets = 1;
			}
		},

		updatePortTickets(jugadorId, puertoId, tickets) {
			const puerto = this.jugadoresData[jugadorId].puertos[puertoId];
			const min = puerto.construido ? 1 : 0;
			puerto.tickets = Math.max(min, tickets);
		},

		addObjetivos(jugadorId) {
			const jugador = this.jugadoresData[jugadorId];
			jugador.objetivos.push(0);
		},
		quitarObjetivo(jugadorId) {
			const jugador = this.jugadoresData[jugadorId];
			if (jugador.objetivos.length > 2) {
				jugador.objetivos.pop();
			}
		},

		actualizarPuntosObjetivo(jugadorId, objetivoId, puntos) {
			const jugador = this.jugadoresData[jugadorId];
			jugador.objetivos[objetivoId] = puntos;
		},

		addObjetivo(jugadorId, num_objetivo, cantidad) {
			const objetivos = this.jugadoresData[jugadorId].objetivos;
			objetivos[num_objetivo] = cantidad;
		},

		actualizarNombre(jugadorId, nombre) {
			this.jugadoresData[jugadorId].nombre = nombre;
		},

		toggleVisible(jugadorId) {
			this.jugadoresData[jugadorId].visible = !this.jugadoresData[jugadorId].visible;
		},

		toggleViaMasLarga(jugadorId) {
			const currentPlayerValue = this.jugadoresData[jugadorId].tieneViaMasLarga;

			// Desactivar en todos
			this.jugadoresData.forEach((j) => {
				j.tieneViaMasLarga = false;
			});

			// Poner el valor contrario al que tenía el jugador seleccionado
			// (Si estaba activo se desactiva, si estaba inactivo se activa y los demás se quedan desactivados)
			this.jugadoresData[jugadorId].tieneViaMasLarga = !currentPlayerValue;
		},

		guardarPartida() {
			const resumen = {
				fecha: new Date().toISOString(),
				modo: this.gameMode,
				jugadores: this.jugadores.map((j) => ({
					nombre: j.nombre,
					puntos: j.puntosTotales,
					visible: j.visible,
				})),
			};

			this.historial.unshift(resumen);
			localStorage.setItem("ttr-historial", JSON.stringify(this.historial));
		},

		resetGame() {
			this.jugadoresData = crearJugadores(this.gameMode);
		},

		eliminarPartida(index) {
			this.historial.splice(index, 1);
			localStorage.setItem("ttr-historial", JSON.stringify(this.historial));
		},
	}, //fin actions
});
