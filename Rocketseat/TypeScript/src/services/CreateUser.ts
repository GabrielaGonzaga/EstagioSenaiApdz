
// export default function createUser(name = '', email: string, password: number) {

//Detach the params
interface TechObject{
    title: string;
    rate: number;
}

interface CreateUserData{
    name?: string; // '?' indica que é opcional
    email: string;
    password: number | string;
    techs: Array<string | TechObject>;
}

export default function createUser({name, email, password}: CreateUserData) {
    
    const user = {
        name,
        email,
        password
    }

    return user;
}