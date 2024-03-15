const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const jwtSign = async (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
    } catch (e) {
        return e.message;
    }
};

const jwtVerify = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.exp < Date.now() / 1000) {
            return false;
        }
        const user = await UserModel.findByPk(decoded.id);
        if (user.dataValues.token !== token) return false;

        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
};

const checkIsAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!await jwtVerify(token)){
            return res.status(401).json({msg: 'Unauthorized'})
        }
    
        next();
      } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
      }
}

module.exports = {
    jwtSign,
    jwtVerify,
    checkIsAuth
};
