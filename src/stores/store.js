import { defineStore } from "pinia";

const crearVagones = (mode) => {
	const vagones = [
		{ id: 0, num_vagones: 1, puntos: 1, cantidad: 0, puntosTotales: 0 },
		{ id: 1, num_vagones: 2, puntos: 2, cantidad: 0, puntosTotales: 0 },
		{ id: 2, num_vagones: 3, puntos: 4, cantidad: 0, puntosTotales: 0 },
		{ id: 3, num_vagones: 4, puntos: 7, cantidad: 0, puntosTotales: 0 },
		{ id: 4, num_vagones: 5, puntos: 10, cantidad: 0, puntosTotales: 0 },
		{ id: 5, num_vagones: 6, puntos: 15, cantidad: 0, puntosTotales: 0 },
		{ id: 6, num_vagones: 8, puntos: 21, cantidad: 0, puntosTotales: 0 },
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
		puntosVagones: 0,
		vagonesUsados: 0,
		cantidadEstaciones: 0,
		puntosEstaciones: 0,
		objetivos: Array(3).fill(0),
		puntosTotales: 0,
	}));
};

export const useStore = defineStore({
	id: "main",
	state: () => ({
		gameMode: "europe",
		jugadores: crearJugadores("europe"),
	}),

	getters: {
		calcularTotal: (state) => {
			return (jugadorId) => {
				const jugador = state.jugadores[jugadorId];

				if (!jugador) return 0;

				const puntosTotalesObjetivos = jugador.objetivos.reduce(
					(total, objetivo) => total + (objetivo || 0),
					0,
				);

				const puntosEstaciones = state.gameMode === "europe" ? jugador.puntosEstaciones : 0;

				return jugador.puntosVagones + puntosEstaciones + puntosTotalesObjetivos;
			};
		},
	},
	actions: {
		setGameMode(mode) {
			this.gameMode = mode;
			this.jugadores = crearJugadores(mode);
		},

		quitarVagon(jugadorId, vagonId) {
			const jugador = this.jugadores[jugadorId];
			const vagon = jugador.vagones[vagonId];
			vagon.puntosTotales -= vagon.puntos;
			vagon.cantidad -= 1;
			jugador.vagonesUsados -= vagon.num_vagones;
			jugador.puntosVagones -= vagon.puntos;
			//jugador.puntosTotales -= vagon.puntos;
		},

		addVagon(jugadorId, vagonId) {
			const jugador = this.jugadores[jugadorId];
			const vagon = jugador.vagones[vagonId];
			vagon.puntosTotales += vagon.puntos;
			vagon.cantidad += 1;
			jugador.vagonesUsados += vagon.num_vagones;

			jugador.puntosVagones += vagon.puntos;
			//jugador.puntosTotales += vagon.puntos;
		},

		disminuirEstaciones(jugadorId) {
			const jugador = this.jugadores[jugadorId];
			jugador.cantidadEstaciones -= 1;
			jugador.puntosEstaciones -= 4;
			//jugador.puntosTotales -= 4;
		},

		aumentarEstaciones(jugadorId) {
			const jugador = this.jugadores[jugadorId];
			jugador.cantidadEstaciones += 1;
			jugador.puntosEstaciones += 4;
			//jugador.puntosTotales += 4;
		},

		addObjetivos(jugadorId) {
			const jugador = this.jugadores[jugadorId];
			jugador.objetivos.push(0);
		},

		actualizarPuntosObjetivo(jugadorId, objetivoId, puntos) {
			const jugador = this.jugadores[jugadorId];
			jugador.objetivos[objetivoId] = puntos;
		},

		addObjetivo(jugadorId, num_objetivo, cantidad) {
			const objetivos = this.jugadores[jugadorId].objetivos;
			objetivos[num_objetivo] = cantidad;
		},

		actualizarNombre(jugadorId, nombre) {
			this.jugadores[jugadorId].nombre = nombre;
		},

		toggleVisible(jugadorId) {
			this.jugadores[jugadorId].visible = !this.jugadores[jugadorId].visible;
		},
	}, //fin actions
});
