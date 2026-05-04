const login = async (req, res) => {
    try {
        const { email } = req.body;
        res.status(200).json({
            userInformation: { email },
            token: "",
        });
    }
    catch (err) {
        console.error("Error in admin login:", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};
export default login;
//# sourceMappingURL=index.js.map