import { NumberSymbol } from '@angular/common';

export interface Item {
    id: number;
    title: string;
    value: string;
    modified: boolean;
    createdAt: string;
    msgFin: string;
    finishedAt: string;
    priority: number;
}