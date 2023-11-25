import { Entity } from "./entity";
import { User } from "./user";
import { Message } from "./message";

export interface ChatRoom extends Entity{
    users: Array<User>,
    name: string,
    messages: Array<Message>,
    timeRemaining: Number
}
