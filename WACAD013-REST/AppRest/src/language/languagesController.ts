import { Request, Response } from "express";

const changeCookieValue = (req: Request, res: Response) => {
  const { lang } = req.body;
  res.cookie("lang", lang).json(lang);
};

export default changeCookieValue;
