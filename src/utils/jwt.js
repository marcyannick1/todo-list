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

module.exports = {
    jwtSign,
    jwtVerify,
};
