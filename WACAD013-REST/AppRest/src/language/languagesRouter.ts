import { Router } from "express";
import changeCookieValue from "./languagesController";

const router = Router();

router.get("/", changeCookieValue);

export default router;
