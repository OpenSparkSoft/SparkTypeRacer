

import {GameService} from "./services/game.service";
import {CONFIG} from "./config/config";
export class App {

    private gameService;

    constructor(options: any){

        for(let prop in CONFIG){
            if(!CONFIG.hasOwnProperty(prop) || !options.hasOwnProperty(prop) || options.hasOwnProperty(prop) === null){
                console.warn("Required parameteres missing.");
                return;
            }
        }

        this.gameService = new GameService(
            "let's make this a super long text and see if it works any better! :D let's make this a super long text and see if it works any better! :D let's make this a super long text and see if it works any better! :D", options.canvas);
    }
}