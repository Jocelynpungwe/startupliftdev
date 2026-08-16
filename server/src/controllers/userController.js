import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { ROLE_PERMISSIONS } from '../config/permissions.js'

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })

    res.json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    })
  }
}

// GET ONE USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    })
  }
}

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = 'salesperson',
      permissions,
      profilePicture = '',
    } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email and password are required',
      })
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      })
    }

    if (!ROLE_PERMISSIONS[role]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const userPermissions =
      role === 'admin'
        ? ROLE_PERMISSIONS.admin
        : permissions || ROLE_PERMISSIONS[role]

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      permissions: userPermissions,
      profilePicture,
      isActive: true,
    })

    const safeUser = await User.findById(user._id).select('-password')

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: safeUser,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, permissions, isActive } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (firstName !== undefined) user.firstName = firstName
    if (lastName !== undefined) user.lastName = lastName
    if (email !== undefined) user.email = email.toLowerCase()
    if (isActive !== undefined) user.isActive = isActive

    if (role !== undefined) {
      if (!ROLE_PERMISSIONS[role]) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role',
        })
      }

      user.role = role

      // Automatically apply role permissions
      user.permissions =
        role === 'admin'
          ? ROLE_PERMISSIONS.admin
          : permissions || ROLE_PERMISSIONS[role]
    }

    if (permissions !== undefined && role !== 'admin') {
      user.permissions = permissions
    }

    await user.save()

    const safeUser = await User.findById(user._id).select('-password')

    res.json({
      success: true,
      message: 'User updated successfully',
      user: safeUser,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update user',
    })
  }
}

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      })
    }

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    })
  }
}
