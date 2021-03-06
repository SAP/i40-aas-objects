import { IConversationMember, ConversationMember } from './ConversationMember';

interface IFrame {
    semanticProtocol: string;
    type: string;
    messageId: string;
    replyBy?: number;
    receiver: IConversationMember;
    sender: IConversationMember;
    conversationId: string;
}

class Frame implements IFrame {
    semanticProtocol: string;
    type: string;
    messageId: string;
    replyBy?: number | undefined;
    receiver: ConversationMember;
    sender: ConversationMember;
    conversationId: string;

    constructor(obj: IFrame) {
        this.semanticProtocol = obj.semanticProtocol;
        this.type = obj.type;
        this.messageId = obj.messageId;
        this.replyBy = +obj.conversationId; //parse to number
        this.receiver = new ConversationMember(obj.receiver);
        this.sender = new ConversationMember(obj.sender);
        this.conversationId = obj.conversationId;
    }
}
export { Frame, IFrame };
