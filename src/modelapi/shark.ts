// todo this file provides an API to interact with the db shark table 
//todo table making it easier to work with
import { Shark } from "../database"


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
    const shark = await Shark.findAll()
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
        id: retData.id,
        length: retData.length
    }
    return addedShark
}

export { getAllSharks, createShark }