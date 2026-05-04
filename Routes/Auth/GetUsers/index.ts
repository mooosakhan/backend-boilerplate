import type { Request, Response } from "express";

interface GetUsersRequest extends Request {
  query: {
    search?: string;
  };
}

const getUsers = async (_req: GetUsersRequest, res: Response): Promise<void> => {
  try {
    // const { search } = req.query;
    // Build query object for search (commented for now)
    // const _query = search ? { email: { $regex: search, $options: "i" } } : {};

    // const users = await searchDocuments("user", _query);
    // Note: Uncomment when searchDocuments is available from Helpers
    // return res.status(200).json({ users });

    res.status(200).json({ users: [] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default getUsers;
