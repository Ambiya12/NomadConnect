import User from '../model/User.js'

export const getUserProfile = async (req, res) => {
    const {id} = req.user
    try {
        const userByID = await User.findById(id).select('-password')
        if(!userByID){
            return res.status(404).json(`User not found`)
        }
        return res.status(200).json(userByID)

    } catch (err) {
        return res.status(500).json(`Internal server error`, err)   
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users){
            return res.status(404).json({message : `Users not found`})
        }
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json(`Internal server error`, err)   
    }
}

export const getUsersByID = async (req, res) => {
    const {id} = req.params
    try {
        const userByID = await User.findById(id)
        if(!userByID){
            return res.status(404).json({message : `User not found`})
        }
        return res.status(200).json(userByID)
    } catch (err) {
        return res.status(500).json(`Internal server error`, err)   
    }
}