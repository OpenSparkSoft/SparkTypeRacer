/**
 * Created by Grimbode on 22/11/2017.
 */

export class KeyTime {

    //Make unmodifiable.
    readonly key: string;
    readonly time: Date;
    readonly correct: boolean;

    constructor(
        key: string, time: Date, correct: boolean
    ){
        this.key = key;
        this.time = time;
        this.correct = correct;
    }
}