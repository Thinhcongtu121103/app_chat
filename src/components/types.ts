// types.ts
export interface Message {
    text: string;
    sent: boolean;
}

export interface User {
    name: string;
    messages: Message[];
}
export interface PeopleChatMessage {
    // Define properties of PeopleChatMessage
    id: number;
    sender: string;
    content: string;
    timestamp: number;
}