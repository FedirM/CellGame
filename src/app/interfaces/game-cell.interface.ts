
export enum GameCellStatus {
    Inactive,
    Active,
    User,
    Computer
}

export interface GameCellInput {
    id: number;
    status: GameCellStatus;
    duration: number;
}

export interface GameCellResultEvent {
    id: number;
    result: boolean;
}