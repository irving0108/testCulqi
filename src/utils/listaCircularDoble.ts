import { Nodo } from "../modules/nodo";
import { Player } from "../modules/player";

export class ListaCircularDoble {
    start: Nodo;
    contador = 0;

    insertStartingPlayer(player: Player) {
        if (this.start == null) { // cuando no se ha creado ningun nodo
            this.start = new Nodo(player);//Se crea un espacio en memoria para el nodo inicio
            this.start.setNode(this.start, this.start) // se inserta el dato
            this.contador++;
        } else {
            //ingresar al final
            let nuevo = new Nodo(player);//Se crea un espacio en memoria para el nodo inicio  
            this.start.setNode(this.start.right, this.start) // se inserta el dato            

            this.start.right = nuevo; //nuevo en su .ant apunta hacia nuestro nodo nuevo
            nuevo.right.left = nuevo; //nuevo en su nodo anterioir en su .next apunta hacia nuestro nodo nuevo
            this.start = nuevo; //ahora inicio apunta a nuestro nodo Nuevo
            this.contador++;
        }
    }



    insertPlayer(player: Player) {
        if (this.start != null) {
            let nuevo = new Nodo(player);//Se crea un espacio en memoria para el nodo inicio
            let aux = this.start.right;// creamos temportal para reposicionar la direccion de los nodos
            nuevo.right = aux;// enlazo el nuevo nodo con el ultimo nodo de la lista 
            aux.left = nuevo; //el ultimo nodo lo apunto en su siguiente al nuevo nodo
            this.start.right = nuevo;// el primer nodo lo enlazon en su anterio con el nuevo nodo
            nuevo.left = this.start;//el nuevo nodo en su siguiente lo enlazo con el primero
            this.start = nuevo;//ahora el nuevo nodo apunta al inicio   
            this.contador++;
        }
    }

    find(id: Number): Nodo {
        let estado = false;
        let aux = this.start;
        if (aux != null) {
            while (aux.left != this.start) {
                if (aux.player.id === id) {
                    estado = true;
                    break;
                }
                aux = aux.left;
            }


        }
        return aux;
    }


    getWinnerId(chipsTotales: number): number {

        let aux = this.start;
        let idGanador = -1;
        if (aux != null) {
            while (aux.left != this.start) {
                if (aux.player.chips === chipsTotales) {
                    idGanador = aux.player.id;
                    break;
                }
                aux = aux.left;
            }
            if (idGanador === -1) {
                if (aux.player.chips === chipsTotales) {
                    idGanador = aux.player.id;
                }
            }


        }

        return idGanador;
    }
    showPlayers() {
        let aux = this.start;
        if (aux != null) {
            console.log(" Player | Derecha | Izquierda");
            while (aux.left != this.start) {
                console.log(
                    aux.player.name + " | "
                    + aux.right.player.name + " | "
                    + aux.left.player.name);
                aux = aux.left;
            }
            console.log(
                aux.player.name + " | "
                + aux.right.player.name + " | "
                + aux.left.player.name);
        }

    }

    showChips(idGanador: number, idSig: number,fichasCentro:number) {
        let centro = 0;
        const arrayPlayers = [];
        let aux = this.start;
        if (aux != null) {
            while (aux.left != this.start) {
                let mensaje = this.obtenerMensaje(aux,idGanador,idSig);
                console.log(mensaje);
                aux = aux.left;
                arrayPlayers.push(mensaje);
            }
            let mensaje = this.obtenerMensaje(aux,idGanador,idSig);
            console.log(mensaje);
            arrayPlayers.push(mensaje);
            console.log("Centro: " + fichasCentro);
            centro = fichasCentro;
        }
        return {
            arrayPlayers,
            centro
        }
    }

    obtenerMensaje(nodoActual:Nodo,idGanador: number, idSig: number) {
        let mensaje = "";
        if (nodoActual.player.id === idGanador || nodoActual.player.id === idSig) {

            if (idGanador === idSig) {
                mensaje = mensaje.concat(
                    nodoActual.player.name.concat(" : ").concat(nodoActual.player.chips.toString()).concat(" (W) (*)"));
            }
            else if (nodoActual.player.id === idGanador) {
                mensaje = mensaje.concat(
                    nodoActual.player.name.concat(" : ").concat(nodoActual.player.chips.toString()).concat(" (W)"));
            }

            else {
                console.log(
                    nodoActual.player.name.concat(" : ").concat(nodoActual.player.chips.toString()).concat(" (*)"));
            }
        } else {
            mensaje = mensaje.concat(
                nodoActual.player.name.concat(" : ").concat(nodoActual.player.chips.toString()));
        }
        return mensaje;
    }

}