import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'
import { signToken } from '../utils/auth.js'

const router = Router()

router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'All required fields must be provided' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    const safeUser = user.toObject()
    delete safeUser.password

    res.status(201).json({
      token: signToken(user),
      user: safeUser,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const safeUser = user.toObject()
    delete safeUser.password

    res.json({
      token: signToken(user),
      user: safeUser,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user })
})

export default router
