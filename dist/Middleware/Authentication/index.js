import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
export const Authentication = async (req, res, next) => {
    try {
        const username = req.headers["username"];
        const password = req.headers["password"];
        const user = {
            username: process.env.KUICKPAY_USERNAME,
            password: process.env.KUICKPAY_PASSWORD,
        };
        if (username !== user.username || password !== user.password) {
            res
                .status(401)
                .send({ status: 401, message: "Authentication failed" });
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: 500, err });
    }
};
const generateSHA256 = (input) => {
    return crypto.createHash("sha256").update(input).digest("hex");
};
const generateMD5 = (input) => {
    return crypto.createHash("md5").update(input).digest("hex");
};
const generateHashes = (invoiceNumber, callbackSecret) => {
    const concatenatedString = invoiceNumber + callbackSecret;
    const sha256Hash = generateSHA256(concatenatedString);
    const md5Hash = generateMD5(sha256Hash);
    return {
        sha256: sha256Hash,
        md5: md5Hash,
    };
};
export const blinqAuthentication = async (req, res, next) => {
    const clientSecret = process.env.BLINQ_CLIENT_SECRET;
    const { invoice_number, data_integrity } = req.body;
    const { md5 } = generateHashes(invoice_number, clientSecret || "");
    if (md5 !== data_integrity) {
        res
            .status(401)
            .send({ status: 401, message: "Authentication failed" });
        return;
    }
    next();
};
//# sourceMappingURL=index.js.map