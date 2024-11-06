import mongoose, { model, models, Schema } from "mongoose";
import { supportedLanguagesEnum } from "./common";
import Word, { TWord } from "./Word";
import { TAppLanguage } from "@/app/_types/types";

export type TMyVocabularyCollections = Map<string, TWord[]>

export type TUser = {
    login: string,
    password: string,
    language: TAppLanguage,
    myVocabularyCollections: TMyVocabularyCollections
}

const User: Schema<TUser> = new Schema({
    login: {
        type: String,
        required: true,
        min: [5, "minimal login length is 5 symbols"],
        max: [15, "maximal login length is 15 symbols"],
    },
    password: {
        type: String,
        required: true
    },
    myVocabularyCollections: {
        type: Map,
        of: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Word" }],
        default: new Map()
    },
    language: {
        type: String,
        enum: supportedLanguagesEnum
    }
})

export default models.User || model("User", User)