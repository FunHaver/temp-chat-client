import { Entity } from "./entity";
import { Dayjs } from "dayjs";
import { User } from "./user";
import { ChatRoom } from "./chat-room";
export interface Message extends Entity{
    userId: string,
    user?: User,
    chatRoomId: string,
    chatRoom?: ChatRoom,
    content: string,
    creationTime: Dayjs
}
