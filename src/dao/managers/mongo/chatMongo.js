import { chatModel } from "../../models/chat.model";

export class ChatMongo{
    
    async getMessages (){
        try {
            return await chatModel.find().lean().exec();
        } catch (error) {
            throw new Error("Hubo un error al obtener los mensajes", error.message);
        }
    };

    async createMessage(message){
        try {
            return await chatModel.create(message);
        } catch (error) {
            throw new Error("Hubo un error al crear el mensaje", error.message);
        }
    };
}