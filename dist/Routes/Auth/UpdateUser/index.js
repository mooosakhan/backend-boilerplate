import bcrypt from "bcryptjs";
const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const payload = req.body;
        if (payload.password) {
            payload.password = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10));
        }
        res.status(200).json({ user: payload });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default updateUser;
//# sourceMappingURL=index.js.map