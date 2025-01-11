'use client';

import React, { FC } from 'react';
import styles from '../../styles/quiz.module.css';

type InputQuestionProps = {
    question: {
        id: number;
        title: string;
        minValue?: number;
        maxValue?: number;
    };
    value: string | number;
    onChange: (value: string) => void;
    onBlur?: () => void;
};

const InputQuestion: FC<InputQuestionProps> = ({ question, value, onChange, onBlur }) => {

    return (
        <div className={styles.inputContainer}>
            <input
                id={`question-${question.id}`}
                type="text"
                placeholder="in cm"
                className={styles.inputField}
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (
                        inputValue === '' ||!isNaN(Number(inputValue)))
                    {
                        onChange(inputValue);
                    }
                }}
                onBlur={onBlur}
            />
        </div>
    );
};

export default InputQuestion;
