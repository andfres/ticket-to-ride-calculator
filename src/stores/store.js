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
	];

	if (mode === "amsterdam") {
		return vagones.slice(0, 4);
	}

	return vagones;
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
	};

	return config[mode].map((j) => ({
		...j,
		vagones: crearVagones(mode),
		cantidadEstaciones: 0,
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

				const puntosObjetivos = jugador.objetivos.reduce((acc, obj) => acc + (obj || 0), 0);

				const puntosViaMasLarga = state.gameMode === "europe" && jugador.tieneViaMasLarga ? 10 : 0;

				const puntosTotales =
					puntosVagones + puntosEstaciones + puntosObjetivos + puntosViaMasLarga;

				return {
					...jugador,
					vagones: vagonesConPuntos,
					puntosVagones,
					vagonesUsados,
					puntosEstaciones,
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

		addObjetivos(jugadorId) {
			const jugador = this.jugadoresData[jugadorId];
			jugador.objetivos.push(0);
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
