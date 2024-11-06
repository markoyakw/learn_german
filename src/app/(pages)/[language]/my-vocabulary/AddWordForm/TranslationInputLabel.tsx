import MyLanguageSelector from "@/app/_components/UI/MyLanguageSelector/MyLanguageSelector"
import { TAppLanguage } from "@/app/_types/types"
import { ChangeEvent, FC } from "react"

type TTranslationInputLabelProps = {
  translationLanguage: TAppLanguage,
  handleTranslationLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const TranslationInputLabel: FC<TTranslationInputLabelProps> = ({ translationLanguage, handleTranslationLanguageChange }) => {

  const getLabelString = () => {
    const normalizedTranslationLanguage = translationLanguage.toLowerCase()
    switch (normalizedTranslationLanguage) {
      case "ru": {
        return "Перевод на "
      }
      case "en": {
        return "Translation to"
      }
      default: throw new Error(`${translationLanguage} language is not supported.`)
    }
  }

  return (
    <>
      {getLabelString()}
      <MyLanguageSelector language={translationLanguage} handleLanguageChange={handleTranslationLanguageChange} />
    </>
  )
}

export default TranslationInputLabel