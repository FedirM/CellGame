
export interface GameCellInput {
    id: number;
    isActive: boolean;
    duration: number;
}

export interface GameCellResultEvent {
    id: number;
    result: boolean;
}