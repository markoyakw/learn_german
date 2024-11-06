import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import { useAppLanguageContext } from '@/app/_hooks/useAppLanguageContext'
import { TAppLanguage } from '@/app/_types/types'
import { TWord, TTextEntryToLanguage } from '@/app/api/_models/Word'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import TranslationInputLabel from './TranslationInputLabel'
import getNotSupportedLanguageError from '@/app/_utils/getError/getNotSupportedLanguageError'
import { fetchAddWord } from '@/app/_utils/apiCalls/myVocabulary/fetchAddWord'

const AddWordForm = () => {

  const { register, handleSubmit, watch, control, formState } = useForm<TWord>()
  const { fields: examplesOfUse, append: addExampleOfUse, remove: removeExampleOfUse } = useFieldArray({ control, name: "examplesOfUse" })

  const appLanguageContext = useAppLanguageContext()
  const appLanguage = appLanguageContext?.appLanguage as TAppLanguage
  const [translationLanguage, setTranslationLanguage] = useState(appLanguage)

  const handleTranslationLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as TAppLanguage
    setTranslationLanguage(newLanguage)
  }

  const handleAddExampleOfUse = () => {
    addExampleOfUse({ text: "", language: translationLanguage })
  }

  const getUseExampleLabel = (translationLanguage: TAppLanguage, id: number) => {
    const getLabelWithoutId = () => {
      const normalizedTranslationLanguage = translationLanguage.toLowerCase()
      switch (normalizedTranslationLanguage) {
        case "en": {
          return "Use example"
        }
        case "ru": {
          return "Пример использования"
        }
        default: {
          throw new Error(getNotSupportedLanguageError(translationLanguage))
        }
      }
    }
    return `${getLabelWithoutId()} ${id + 1}`
  }

  const getIPAInputLabel = (translationLanguage: TAppLanguage) => {
    const normalizedTranslationLanguage = translationLanguage.toLowerCase()
    switch (normalizedTranslationLanguage) {
      case "en": {
        return "IPA pronunciation:"
      }
      case "ru": {
        return "Транскрипция IPA:"
      }
      default: {
        throw new Error(getNotSupportedLanguageError(translationLanguage))
      }
    }
  }

  const onSubmit: SubmitHandler<TWord> = async (newWord) => {
    const addLanguageToEntryToLanguageArray = (array: TTextEntryToLanguage[]) => {
      return array.map(item => {
        return { ...item, language: translationLanguage }
      })
    }
    const translationToLanguageArr = addLanguageToEntryToLanguageArray(newWord.translationToLanguageArr)
    const examplesOfUse = addLanguageToEntryToLanguageArray(newWord.examplesOfUse)
    const newWordWithLanguageData: TWord = { ...newWord, translationToLanguageArr, examplesOfUse, generatedWithAI: false }
    fetchAddWord(newWordWithLanguageData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyCard>
        <MyInput
          {...register("wordInGerman")}
          id="word-in-german-input"
          label="Word in German"
        />
        <MyInput
          {...register("translationToLanguageArr.0.text")}
          id={`translation-to-${translationLanguage}`}
          label={<TranslationInputLabel translationLanguage={translationLanguage} handleTranslationLanguageChange={handleTranslationLanguageChange} />}
        />
        <MyInput
          {...register("IPAPronunciation")}
          id="IPA-pronunciation"
          label={getIPAInputLabel(translationLanguage)}
        />
        {examplesOfUse.map((_, useExampleId) =>
          <MyInput
            key={examplesOfUse.length}
            {...register(`examplesOfUse.${useExampleId}.text`)}
            id={`example-of-use-${useExampleId}-${translationLanguage}-language`}
            label={getUseExampleLabel(translationLanguage, useExampleId)}
          />)}
        <MyButton type='button' onClick={handleAddExampleOfUse}>
          Add use example
        </MyButton>
        {/* gifs */}
        <MyButton type='submit'>Add word</MyButton>
      </MyCard>
    </form>
  )
}

export default AddWordForm