import { Status } from '../database'


type NewStatus = {
    status: string | null;
    id?: number | null;
}

const getAllStatus = async () => {
    const status = await Status.findAll()
    return status
}

const createStatus = async (status: NewStatus) => {
    const returnData = await Status.create(status)
    const addedStatus: NewStatus = {
        id: returnData.dataValues.id,
        status: returnData.dataValues.status,
    }
    return addedStatus
}

const updateStatus = async (status: NewStatus) => {
    const findStatus = await Status.findOne({
        where: {
            id: status.id
        }
    })
    if (findStatus?.dataValues) {
        findStatus.dataValues.status = status.status
        await findStatus.save()
        return findStatus
    }
    return null

}

export { getAllStatus, createStatus, updateStatus }