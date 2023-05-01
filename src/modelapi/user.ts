import { User } from "../database"
import moment from "moment"
const bcrypt = require("bcrypt")
import {Sequelize} from "sequelize"


type NewUser = {
    id_user?: number | null,
    username: string | null,
    email: string | null,
    password?: string | null,
    oldPassword?: string | null,
    phone: string | null,
    full_name: string ,
    updated_at?: Date | null,
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


const updateUser = async (user: NewUser) => {
    
    const oldPassword = user.oldPassword
    const newPassword = user.password

    const userWithPass = await User.scope('withPassword').findOne({
        where: {
            id_user: user.id_user
        }
    })

    if (oldPassword && newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, userWithPass?.dataValues.password)
        if (!isMatch) {
            throw new Error('Old Password does not match')
        }
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        user.updated_at = Sequelize.literal('CURRENT_TIMESTAMP')
        const retData = await User.upsert(user)
        return retData
    }
    
    const findUSer = await User.findOne({
        where: {
            id_user: user.id_user
        }
    })

    if (!findUSer) {
        throw new Error('User not found')
    }

    findUSer.username = user.username
    findUSer.email = user.email
    findUSer.phone = user.phone
    findUSer.full_name = user.full_name
    findUSer.updated_at = Sequelize.literal('CURRENT_TIMESTAMP')
    const retData = await findUSer.save()
    return retData    
}

const deleteUser = async (id_user: number) => {
    const retData = await User.destroy({
        where: {
            id_user: id_user
        }
    })
    return retData
}

const findUserById = async (id_user: number) => {
    const retData = await User.findOne({
        where: {
            id_user: id_user
        }
    })
    return retData
}

export { getAllUsers, createUser, updateUser, deleteUser }