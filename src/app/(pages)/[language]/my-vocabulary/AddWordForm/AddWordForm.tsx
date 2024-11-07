import MyButton from '@/app/_components/UI/MyButton/MyButton'
import MyCard from '@/app/_components/UI/MyCard/MyCard'
import MyInput from '@/app/_components/UI/MyInput/MyInput'
import { useAppLanguageContext } from '@/app/_hooks/useAppLanguageContext'
import { TAppLanguage } from '@/app/_types/types'
import { TWord, TTextEntryToLanguage } from '@/app/api/_models/Word'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import TranslationInputLabel from './TranslationInputLabel'
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

  const onSubmit: SubmitHandler<TWord> = async (newWord) => {
    const addLanguageToEntryToLanguageArray = (array: TTextEntryToLanguage[]) => {
      return array.map(item => {
        return { ...item, language: translationLanguage }
      })
    }
    const translationToLanguageArr = addLanguageToEntryToLanguageArray(newWord.translationToLanguageArr)
    const examplesOfUse = addLanguageToEntryToLanguageArray(newWord.examplesOfUse)
    const populatedNewWord = { ...newWord, translationToLanguageArr, examplesOfUse, generatedWithAI: false }
    // const newWordWithLanguageData: TAddWordReqData = {newWord: populatedNewWord, collectionName:}
    const res = await fetchAddWord(populatedNewWord)
    // console.log(res)
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
          label="IPA pronunciation:"
        />
        {examplesOfUse.map((_, useExampleId) =>
          <MyInput
            key={examplesOfUse.length}
            {...register(`examplesOfUse.${useExampleId}.text`)}
            id={`example-of-use-${useExampleId}-${translationLanguage}-language`}
            label={`Use example ${useExampleId + 1}`}
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