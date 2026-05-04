import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
    country?: string;
    city?: string[];
    campus?: string[];
    role?: string;
    permissions?: Record<string, string[]>;
    status?: string;
  };
}

const signUpUser = async (req: SignupRequest, res: Response): Promise<void> => {
  const { email, password, country, city, campus, role, permissions, status } =
    req.body;
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

    // const SaveData = await insertNewDocument("user", User);
    // Note: Uncomment when insertNewDocument is available from Helpers
    // if (SaveData) {
    //   SaveData.password = undefined;
    //   const token = jwt.sign(
    //     { id: SaveData._id, email: SaveData.email },
    //     Config.ADMIN_SECRET || ""
    //   );

    //   res
    //     .status(200)
    //     .send({ status: 200, user: SaveData, token });
    // }

    res.status(200).send({ status: 200, user: User, token: "" });
  } catch (e: any) {
    res.status(500).send({ status: 500, message: e.message });
  }
};

export default signUpUser;
