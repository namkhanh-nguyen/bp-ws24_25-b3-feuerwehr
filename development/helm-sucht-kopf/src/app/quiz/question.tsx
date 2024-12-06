// /src/app/quiz/Question.tsx
'use client';  // Add this line to mark this file as a Client Component

import { FC } from 'react';
import QuestionOption from './questionOption';
import QuestionImageOption from './questionImageOption';
import QuestionScaleOption from './questionScaleOption';


type QuestionProps = {
    question: any;
    onNext: (answer: any) => void;
    onBack: () => void;
};

const Question: FC<QuestionProps> = ({ question, onNext, onBack }) => {
    if (question.type === 'multiple-choice') {
        return (
            <div>
                {question.options.map((option: { prefix: string; text: string }, idx: number) => (
                    <QuestionOption
                        key={idx}
                        option={option}
                        onSelect={() => onNext(option)}
                    />
                ))}
            </div>
        );
    }

    if (question.type === 'image-choice') {
        return (
            <div>
                {question.options.map((option: string, idx: number) => (
                    <QuestionImageOption
                        key={idx}
                        image={option}
                        onSelect={() => onNext(option)}
                    />
                ))}
            </div>
        );
    }

    if (question.type === 'scale') {
        return (
            <div>
                <QuestionScaleOption
                    onSelect={onNext}
                />
            </div>
        );
    }

    return (
        <div>
            <button onClick={onBack}>Back</button>
            <button onClick={() => alert("Invalid Question Type")}>Next</button>
        </div>
    );
};

export default Question;
