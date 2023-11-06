import { Entity } from "./entity";

export interface Message extends Entity{
    author: string,
    content: string
}
