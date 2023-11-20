function checkAuthAdmin(req, res, next) {
    if (req.user !== undefined &&  req.user.role === 'Admin')
        next();
    else
        res.status(401).json();
}

module.exports = { checkAuthAdmin };
