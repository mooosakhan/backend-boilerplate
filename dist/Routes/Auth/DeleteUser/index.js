const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default deleteUser;
//# sourceMappingURL=index.js.map