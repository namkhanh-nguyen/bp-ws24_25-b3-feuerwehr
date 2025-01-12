// /src/app/quiz/Question.tsx
'use client';  // Add this line to mark this file as a Client Component

import { FC } from 'react';
import QuestionOption from './QuestionOption';
import QuestionImageOption from './QuestionImageOption';
import QuestionScaleOption from './QuestionScaleOption';


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
                        onSelect={() => onNext(option)} images={[]}
                        onSelectionChange={function (selectedImages: { src: string; category: string; }[]): void {
                            throw new Error('Function not implemented.');
                        }}                    />
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

    if (question.type === 'slider') {
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
