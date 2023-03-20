import { GameLCR } from "../service/gameLCRService";
import { HttpResponse } from "../shared/Response";

export const main = async(event) => {
    console.log("esto es una prueba");
    console.log(event);
    const game = new GameLCR();
    game.setCantJugadores(3);
    game.setSecuenciaDatos("LR.CCR.L.RLLLCLR.LL..R...CLR.");
    return HttpResponse._200(await game.iniciarJuego());
}