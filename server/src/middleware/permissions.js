export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    // Admin automatically has every permission
    if (req.user.role === 'admin') {
      return next()
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Permission denied: ${permission}`,
      })
    }

    next()
  }
}
