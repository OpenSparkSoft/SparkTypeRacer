import {KeyTime} from "../entities/key_time.entity";
/**
 * Created by Grimbode on 22/11/2017.
 */

export class GameService {

    private position = 0;
    private error: boolean = false;
    private proof: KeyTime[] = [];
    private ctx: CanvasRenderingContext2D;

    constructor(
        private text: string,
        private canvas: HTMLCanvasElement
    ){
        this.ctx = canvas.getContext("2d");
        //TODO: Make size dynamic
        this.ctx.font = "30px Arial";
        this.bindKeys();
    }

    private bindKeys(){
        //Capturing event at the start for maximal precision
        window.addEventListener("keypress", this.gameKeyHandler, true);
    }

    private unbindKeys(){
        //Removing key events in case of cheating or game done.
        window.removeEventListener("keydown", this.gameKeyHandler, true);
    }

    private gameKeyHandler = (e: KeyboardEvent) => {
        //Get date of keypressed
        let time = new Date();
        let charCode = e.which;

        //TODO: Might need to handle special character codes. For now, no one cares.

        switch(true){
            case charCode === 8 || charCode === 46:
                //todo: delete a key
                console.warn("Delete key detected");
                break;
            case (charCode >= 48 && charCode <= 90) ||
                    (charCode >= 106 && charCode <= 111) ||
                        (charCode >= 187 || charCode <= 222):
                this.gameLogic(e.which, time);
                break;
            default:
                console.warn(`${charCode} not accepted.`);
        }



    };

    private gameLogic (charCode: number, time: Date){

        //COnvert code to character.
        let char = String.fromCharCode(charCode);

        //reset any previous variables
        this.error = false;

        //If the position isn't somewhere within the text.
        if (this.position > this.text.length -1 || this.position < 0){
            //TODO: Throw error.
            return;
        }

        //If the character pressed is not the character expected.
        if(this.text[this.position] !== char){
            //TODO: Throw error.
            this.proof.push(new KeyTime(char, time, false));
            this.error = true;
            this.predraw(10, 30, 30);
            console.log("Error detected", this.text[this.position], char);
            return;
        }

        //Here we assume the key pressed was correct.
        this.proof.push(new KeyTime(char, time, true));
        this.position++;

        this.predraw(10, 30, 30);

        if(this.isDone()){
            //TODO: Done with game, save results.
            console.log("Congratulations game is done");
            this.unbindKeys();
        }

    }

    private draw(line: string, x: number, y: number) {



        //Calculate what has already been written.
        let done = line.slice(0, this.position);
        //Calculate what is left to write
        let todo = line.slice(this.position);


        this.ctx.fillStyle = "green";
        this.ctx.fillText(done, x, y);

        if(this.error === true){
            this.ctx.fillStyle = "red";
            let wrongChar = line.slice(this.position, this.position+1);
            this.ctx.fillText(wrongChar, x+this.ctx.measureText(done).width, y);
            //recalculating todo
            todo = line.slice(this.position+1);
            done += wrongChar;
        }

        x += this.ctx.measureText(done).width;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(todo, x, y);
    }

    private predraw(x: number, y: number, lineHeight: number){
        //Clear whole rect.
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        let line = "";
        this.text.split(' ').forEach((value, index)=>{
            let temp = `${line} ${value}`.trim();
            //If the size of the text is bigger than the width of the canvas.
            if(this.ctx.measureText(temp).width >= this.canvas.width){
                this.draw(line, x, y);
                line = "";
                //Update y
                y += lineHeight;
            } else {
                line = temp;
            }
        });

        //When done, check to see if there isn't a few words left.
        if(line != ""){
            this.draw(line, x, y);
        }
    }

    private isDone(): boolean {
        return this.position === this.text.length;
    }
}