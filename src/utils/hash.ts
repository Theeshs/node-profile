import { hash, compare } from "bcrypt";


const hashPassword = async (password: string) => {
    return await hash(password, 10)
}

const checkPasswordHash = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword)
}

export {
    hashPassword,
    checkPasswordHash
}