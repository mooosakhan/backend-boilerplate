import mongoose from "mongoose";
export const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid ObjectId");
    }
    return value;
};
//# sourceMappingURL=index.js.map