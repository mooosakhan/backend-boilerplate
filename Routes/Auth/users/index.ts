import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

interface SearchUsersRequest extends Request {
  query: Record<string, any>;
}

interface UpdateUsersRequest extends Request {
  query: {
    id?: string;
  };
  body: Record<string, any>;
}

interface DeleteUsersRequest extends Request {
  query: {
    id?: string;
  };
}

export const getUsers = async (
  _req: SearchUsersRequest,
  res: Response
): Promise<void> => {
  try {
    // const { search } = req.query;
    // Build query object for search (commented for now)
    // const _query = search ? { email: { $regex: search, $options: "i" } } : {};
    
    // const users = await searchDocuments("user", _query);
    // Note: Uncomment when searchDocuments is available
    res.send({ status: 200, users: [] });
  } catch (err: any) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

export const updateUser = async (
  req: UpdateUsersRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(404).send({ status: 404, message: "User not found" });
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
    res.send({ status: 200, user: payload });
  } catch (err: any) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

export const deleteUser = async (
  req: DeleteUsersRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(404).send({ status: 404, message: "User not found" });
      return;
    }
    // await deleteDocument("user", { _id: id });
    // Note: Uncomment when deleteDocument is available
    res.send({ status: 200 });
  } catch (err: any) {
    res.status(400).send({ status: 400, message: err.message });
  }
};
