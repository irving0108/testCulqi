export class Player {
    chips: number;
    name: String;
    id: number;
    hasChips:boolean;
    constructor(chips:number, id:number) {
        this.chips = chips;
        this.name = "Player ".concat(id.toString());
        this.id = id;
        this.hasChips = true;
    }
    addChip() {
        this.chips++;

    }
    removeChip() {
        if (this.chips <= 0) {
            this.hasChips = false;
        } else {
            this.chips--;
        }

    }
}