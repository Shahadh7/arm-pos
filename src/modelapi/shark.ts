// todo this file provides an API to interact with the db shark table 
//todo table making it easier to work with
import { Shark } from "../database"
import moment from "moment"


type NewShark = {
    sharktype: string | null;
    name: string | null;
    length: number | null;
    id?: number | null;
}
/** 
 * Returns all Sharks
 * @method getAllSharks
 * @returns {Array<NewShark>} All Sharks belonging to Shark Model 
*/
const getAllSharks = async () => {
    const shark = await Shark.scope('withId').findAll()
    return shark
}

/** 
 * Returns all Sharks
 * @method createShark
 * @param {NewShark} shark the shark object
 * @returns {NewShark} the created shark Object
*/
const createShark = async (shark: NewShark) => {
    const retData = await Shark.create(shark)
    const addedShark: NewShark = {
        sharktype: retData.sharktype,
        name: retData.name,
        length: retData.length
    }
    return addedShark
}


const updateShark = async (shark: NewShark) => {
    const findShark = await Shark.scope('withId').findOne({
        where: {
            id: shark.id
        }
    })
    if (findShark) {
        findShark.sharktype = shark.sharktype
        findShark.name = shark.name
        findShark.length = shark.length
        await findShark.save()
        return findShark
    }
    return null

}

export { getAllSharks, createShark, updateShark }