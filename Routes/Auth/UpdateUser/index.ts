import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

interface UpdateUserRequest extends Request {
  query: {
    id?: string;
  };
  body: {
    password?: string;
    [key: string]: any;
  };
}

const updateUser = async (
  req: UpdateUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const payload = req.body;
    if (payload.password) {
      payload.password = bcrypt.hashSync(
        payload.password,
        bcrypt.genSaltSync(10)
      );
    }
    // await updateDocument("user", { _id: id }, payload);
    // const user = await searchDocuments("user", { _id: id });
    // Note: Uncomment when updateDocument and searchDocuments are available

    res.status(200).json({ user: payload });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default updateUser;
