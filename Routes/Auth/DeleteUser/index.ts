import type { Request, Response } from "express";

interface DeleteUserRequest extends Request {
  query: {
    id?: string;
  };
}

const deleteUser = async (
  req: DeleteUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // await deleteDocument("user", { _id: id });
    // Note: Uncomment when deleteDocument is available from Helpers
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteUser;
