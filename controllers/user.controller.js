const Users = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.getAllUsers();

        return res.status(200).json({
            code: 'OK',
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while fetching users'
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.getUserById(id);

        if (!user) {
            return res.status(404).json({
                code: 'NF',
                message: `User with id ${id} not found`
            });
        }

        return res.status(200).json({
            code: 'OK',
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Error in getUserById:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while fetching user'
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { fullName, email, age, password, role } = req.body;

        const newUser = await Users.registerUser({
            fullName,
            email,
            age,
            password,
            role
        });

        return res.status(201).json({
            code: 'OK',
            message: 'User created successfully!',
            data: newUser
        });
    } catch (error) {
        console.error('Error in createUser:', error);

        if (error.code === 11000) { // duplicate email
            return res.status(400).json({
                code: 'DUPLICATE',
                message: 'Email is already registered'
            });
        }

        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while creating user'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const existingUser = await Users.getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                code: 'NF',
                message: `User with id ${id} not found`
            });
        }

        const { fullName, email, age, password, role } = req.body;

        const updates = Object.fromEntries(
            Object.entries({ fullName, email, age, password, role })
                .filter(([_, value]) => value !== undefined)
        );

        const updatedUser = await Users.updateUser(id, updates);

        return res.status(200).json({
            code: 'OK',
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Error in updateUser:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while updating user'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const existingUser = await Users.getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                code: 'NF',
                message: `User with id ${id} not found`
            });
        }

        await Users.deleteUser(id);

        return res.status(200).json({
            code: 'OK',
            message: 'User deleted successfully',
            data: existingUser
        });

    } catch (error) {
        console.error('Error in deleteUser:', error);
        return res.status(500).json({
            code: 'ERR',
            message: 'Internal server error while deleting user'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};