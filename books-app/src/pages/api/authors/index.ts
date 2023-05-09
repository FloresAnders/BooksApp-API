import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "@/root/api/responses/notAllowedResponse";
import { authorsProvider } from "@/database/providers/authors/authors.provider";

const getAll = async (res: NextApiResponse) => {
  try {
    const entities = await authorsProvider.getAll();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO: validate the format of the body
    const { name } = req.body;
    const entityCreated = await authorsProvider.create(name);
    res.status(201).json(entityCreated);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) => create(req, res);

export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}