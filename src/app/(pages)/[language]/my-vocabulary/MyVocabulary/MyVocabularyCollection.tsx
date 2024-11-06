import { TWord } from '@/app/api/_models/Word'
import React, { FC } from 'react'
import Word from "./Word"

type TMyVocabularyCollectionProps = {
    name: string,
    words: TWord[]
}

const MyVocabularyCollection: FC<TMyVocabularyCollectionProps> = ({ name, words }) => {
    return (
        <div>
            <h3>{name}</h3>
            {words.map(word => <Word />)}
        </div>
    )
}

export default MyVocabularyCollection