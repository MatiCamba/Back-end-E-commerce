import { usersModel } from "../../models/users.model.js";

export class UsersMongo {
    constructor(){
        this.model = usersModel;
    };

    // Metodo para guardar los usuarios
    async saveUser(user){
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error("Hubo un error al guardar el usuario", error.message);
        }
    };

    // Metodo para obtener usuario por Id
    async getUserById(id){
        try {
            const user = await this.model.findById(id);
            if(!user){
                throw new Error("El usuario no existe");
            }
            return user;
        } catch (error) {
            throw new Error("Hubo un error al obtener el usuario", error.message);
        }
    };

    // Metodo para obtener usuario por email
    async getUserByEmail(email){
        try {
            //console.log(email);
            const user = await this.model.findOne({email: email});
            //console.log(user);
            if(!user){
                return null;
            }
            return user;
        } catch (error) {
            throw new Error("Hubo un error al obtener el usuario", error.message);
        }
    };

};