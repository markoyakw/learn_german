import { SUPPORTED_LANGUAGES } from "@/app/constants";
import { model, models, Schema } from "mongoose";
import { supportedLanguagesEnum } from "./common";

// types

export type TTextEntryToLanguage = {
    text: string,
    language: typeof SUPPORTED_LANGUAGES[number]
}

export type TWord = {
    translationToLanguageArr: TTextEntryToLanguage[]
    wordInGerman: string,
    IPAPronunciation?: string,
    generatedWithAI: boolean,
    examplesOfUse: TTextEntryToLanguage[]
}

// code

const textEntryToLanguageSchema = {
    text: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: supportedLanguagesEnum
    }
}

const Word: Schema<TWord> = new Schema({
    wordInGerman: {
        type: String,
        required: true
    },
    translationToLanguageArr: {
        type: [textEntryToLanguageSchema],
        required: true,
        validate: {
            validator: function (arr: []) {
                return arr.length > 0;
            },
            message: "WordToSourceLanguageArr must have at least one item."
        }
    },
    generatedWithAI: { type: Boolean, required: true },
    examplesOfUse: [textEntryToLanguageSchema]
})

export default models.Word || model("Word", Word)