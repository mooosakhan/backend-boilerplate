import bcrypt from "bcryptjs";
const signUpUser = async (req, res) => {
    const { email, password, country, city, campus, role, permissions, status } = req.body;
    try {
        const User = {
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            country,
            city,
            campus,
            role,
            permissions,
            status,
        };
        res.status(200).send({ status: 200, user: User, token: "" });
    }
    catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};
export default signUpUser;
//# sourceMappingURL=index.js.map