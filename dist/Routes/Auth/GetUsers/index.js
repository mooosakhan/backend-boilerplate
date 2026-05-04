const getUsers = async (_req, res) => {
    try {
        res.status(200).json({ users: [] });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default getUsers;
//# sourceMappingURL=index.js.map