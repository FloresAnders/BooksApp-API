import { NextApiResponse } from "next";

export const notAllowedResponse = (res: NextApiResponse, method: string) => {
  res.status(405).end(`Method ${method} Not Allowed`);
};
