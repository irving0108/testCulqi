import { Nodo } from "../modules/nodo";
import { Player } from "../modules/player";
import { ListaCircularDoble } from "../utils/listaCircularDoble";
import DynamoDBUtil from "../utils/dynamoDBClient";
import { v4 as uuidv4 } from "uuid";

export class GameLCR {
    cantJugadores = 0;
    secuenciaDatos: String = "";
    constructor() {}

    setCantJugadores(cantJugadores) {
        if (!this.cantJugadores) {
            this.cantJugadores = cantJugadores
        }
    }

    setSecuenciaDatos(secuenciaDatos) {
        if (!this.secuenciaDatos) {
            this.secuenciaDatos = secuenciaDatos.trim()
        }
    }

    getJuego() {
        return {
            cantJugadores: this.cantJugadores,
            secuenciaDatos: this.secuenciaDatos
        };
    }



    async iniciarJuego() {
        let lista = new ListaCircularDoble();
        for (let cont = this.cantJugadores; cont > 0; cont--) {
            if (cont === this.cantJugadores) {
                lista.insertStartingPlayer(new Player(3, cont));
            } else {
                lista.insertPlayer(new Player(3, cont));
            }
        }

        lista.showPlayers();
 
        let cantLanzamiento = 3;
        let fichasCentro = 0;
        let jugadorActual: Nodo = lista.start;
        const totalFichas = 3 * this.cantJugadores;
        let idGanador=-1;
        let idSig=-1;
        for (let letter of this.secuenciaDatos.split("")) {
            idGanador=lista.getWinnerId(totalFichas - fichasCentro);
            if (idGanador != -1) {
                break;
            }

            if (cantLanzamiento == 0) {
                let nodoAuxiliar = jugadorActual;
                while (nodoAuxiliar.left != jugadorActual) {
                    if (nodoAuxiliar.left.player.hasChips) {
                        jugadorActual = nodoAuxiliar.left;
                        break;
                    }
                    nodoAuxiliar = nodoAuxiliar.left;
                }


                if (jugadorActual.player.chips >= 3 && jugadorActual.player.chips > 0) {
                    cantLanzamiento = 3;
                } else {
                    cantLanzamiento = jugadorActual.player.chips;
                }
            }


            switch (letter) {
                case "R":
                    jugadorActual.player.removeChip();
                    jugadorActual.right.player.addChip();
                    break;
                case "L":
                    jugadorActual.player.removeChip();
                    jugadorActual.left.player.addChip();
                    break;
                case "C":
                    jugadorActual.player.removeChip();
                    fichasCentro++;
                    break;
                case ".":
                    break;
                default:
                    console.log("exception")
            }
            console.log("-------------------------");
            lista.showChips(idGanador,idSig,fichasCentro);
            cantLanzamiento--;
        }
        
        if (cantLanzamiento == 0) {
            idSig=jugadorActual.left.player.id;
        }else{
            idSig=jugadorActual.player.id;
        }

        console.log("\n");
        const id = uuidv4();
        console.log(`===== RESULTADO =====: ${id}`);
        const response = lista.showChips(idGanador,idSig,fichasCentro);
        await DynamoDBUtil.putItem(
            process.env.CULQI_TEST_TABLENAME_DYNAMO,
            {
                id,
                data: JSON.stringify(response)
            }
        );
        return response;
    }
}