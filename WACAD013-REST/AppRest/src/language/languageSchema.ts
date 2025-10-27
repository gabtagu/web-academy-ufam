import Joi from "joi";
import { LanguageTypes } from "./language.constants";

const languageSchema = Joi.object({
  lang: Joi.string()
    .valid(...Object.values(LanguageTypes))
    .required(),
});

export default languageSchema;
