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

export const updateUserProfile = async (req, res) => {
    const { id } = req.user; 
    const { first_name, last_name, bio } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (bio) user.bio = bio;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                bio: user.bio,
                image: user.image,
            },
        });
    } catch (err) {
        console.error('Update User Profile Error:', err);
        return res.status(500).json({ message: 'Failed to update profile' });
    }
};
