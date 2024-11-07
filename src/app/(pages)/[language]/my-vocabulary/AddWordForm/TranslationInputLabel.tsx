import MyLanguageSelector from "@/app/_components/UI/MyLanguageSelector/MyLanguageSelector"
import { TAppLanguage } from "@/app/_types/types"
import { ChangeEvent, FC } from "react"

type TTranslationInputLabelProps = {
  translationLanguage: TAppLanguage,
  handleTranslationLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const TranslationInputLabel: FC<TTranslationInputLabelProps> = ({ translationLanguage, handleTranslationLanguageChange }) => {
  return (
    <>
      Translation to
      <MyLanguageSelector language={translationLanguage} handleLanguageChange={handleTranslationLanguageChange} />
    </>
  )
}

export default TranslationInputLabel