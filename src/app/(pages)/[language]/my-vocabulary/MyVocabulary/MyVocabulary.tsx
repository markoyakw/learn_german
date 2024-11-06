import { TMyVocabularyCollections } from '@/app/api/_models/User'
import React, { FC } from 'react'
import MyVocabularyCollection from './MyVocabularyCollection'

type TMyVocabularyProps = {
    myVocabularyCollections: TMyVocabularyCollections
}

const MyVocabulary: FC<TMyVocabularyProps> = ({ myVocabularyCollections }) => {
    myVocabularyCollections.entries().forEach((value, key)=>{
        console.log(key, value)
    })
    return (
        <div>
            {/* {myVocabularyCollections.entries().map((words, collectionName) => <MyVocabularyCollection name={collectionName} words={words}/>)} */}
        </div>
    )
}

export default MyVocabulary