const bcrypt = require('bcrypt');

const saltRounds = 10; // 솔트를 생성하는데 사용할 라운드 수

const AUTHENTICATION_KEY = "C51G2E3D7AB2E6O70WF9Q5";
const PERMISSION_IDS = ["sean2684", "alsrb123"];

const hashPassword = async () => {
    try {
        const hashedPassword = await bcrypt.hash(AUTHENTICATION_KEY, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

module.exports = {
    AUTHENTICATION_KEY,
    PERMISSION_IDS,
    hashPassword
};