import { User } from "../database"
import moment from "moment"
const bcrypt = require("bcrypt")


type NewUser = {
    id_user?: number | null,
    username: string | null,
    email: string | null,
    password?: string | null,
    phone: string | null,
    full_name: string ,
}

const getAllUsers = async () => {
    const user = await User.findAll()
    return user
}


const createUser = async (user: NewUser) => {

    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash

    const retData = await User.create(user)

    return retData
}


// const updateUser = async (user: NewUser) => {
//     const findUser = await User.findOne({
//         where: {
//             id: user.id_user
//         }
//     })
//     if (findUser) {
//         findUser.username = shark.username
//         findUser.full_name = shark.full_name
//         findUser.password = shark.password
//         findUser.phone = shark.phone
//         findUser.email = shark.email
//         await findUser.save()
//         return findUser
//     }
//     return null

// }

export { getAllUsers, createUser, updateUser }