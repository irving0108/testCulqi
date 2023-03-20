import { Player } from "./player";

export class Nodo {
    player: Player;
    right: Nodo;
    left: Nodo;
    constructor(player: Player) {
        this.player = player;

    }

    setNode(right: Nodo, left: Nodo) {
        this.right = right;
        this.left = left;
    }

}