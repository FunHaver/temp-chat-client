import { ChatRoom } from "./chat-room";
import { Entity } from "./entity";
import { User } from "./user";
import { Moment } from "moment";
export interface Message extends Entity{
    user: User,
    chatRoom: ChatRoom,
    content: string,
    creationTime: Moment
}
