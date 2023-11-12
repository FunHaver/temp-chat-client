import { Entity } from "./entity";
import { Moment } from "moment";
import { User } from "./user";
import { ChatRoom } from "./chat-room";
export interface Message extends Entity{
    userId: string,
    user?: User,
    chatRoomId: string,
    chatRoom?: ChatRoom,
    content: string,
    creationTime: Moment
}
