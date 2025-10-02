const User = require('../schemas/user.schema');

const registerUser = async (data) => {
    const user = new User(data);
    return await user.save();
}

const getUserById = async (userId) => {
    return await User.findById(userId);
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
}

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
}

const validatePassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

const getAllUsers = async () => {
    return await User.find().sort({ createdAt: -1 });
}

module.exports = {
    registerUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    validatePassword,
    getAllUsers
};