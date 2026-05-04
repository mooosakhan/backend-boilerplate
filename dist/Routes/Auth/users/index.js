import bcrypt from "bcryptjs";
export const getUsers = async (_req, res) => {
    try {
        res.send({ status: 200, users: [] });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(404).send({ status: 404, message: "User not found" });
            return;
        }
        const payload = req.body;
        if (payload.password) {
            payload.password = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10));
        }
        res.send({ status: 200, user: payload });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(404).send({ status: 404, message: "User not found" });
            return;
        }
        res.send({ status: 200 });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
};
//# sourceMappingURL=index.js.map