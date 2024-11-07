import { useEffect, useCallback, useState } from 'react';

const useSpeechSynthesis = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [speed, setSpeed] = useState<number>(1)

    useEffect(() => {
        const handleVoicesChanged = () => {
            setVoices(speechSynthesis.getVoices());
        };

        speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
        handleVoicesChanged();

        return () => {
            speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        };
    }, []);

    const setSpeechSpeed = (speed: number) => {
        const minSpeechSpeed = 0.3
        const maxSpeechSpeed = 10

        if (speed < minSpeechSpeed || speed > maxSpeechSpeed) {
            throw Error("SpeechSynthesis speed can't be < 0.3 or > 2")
        }
        setSpeed(speed)
    }

    const pronounceWord = useCallback(
        (textToSay: string) => {
            const utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'de';
            utterance.rate = speed;

            if (voices.length > 0) {
                utterance.voice = voices.find((voice) => voice.lang === 'de-DE') || voices[0];
            }

            utterance.text = textToSay;
            speechSynthesis.speak(utterance);
        },
        [voices, speed]
    );

    return {
        pronounceWord,
        voices,
        speechSpeed: speed,
        setSpeechSpeed
    };
};

export default useSpeechSynthesis;