export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('GET ME ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to get current user',
    })
  }
}
