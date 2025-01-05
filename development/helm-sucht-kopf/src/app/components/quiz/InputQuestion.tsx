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
};

const InputQuestion: FC<InputQuestionProps> = ({ question, value, onChange }) => {
    return (
        <div className={styles.inputContainer}>
            <input
                id={`question-${question.id}`}
                type="number"
                min={question.minValue}
                max={question.maxValue}
                placeholder="in CM"
                className={styles.inputField}
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (
                        inputValue === '' ||
                        (parseInt(inputValue) >= (question.minValue || 0) &&
                            parseInt(inputValue) <= (question.maxValue || Infinity))
                    ) {
                        onChange(inputValue);
                    }
                }}
            />
        </div>
    );
};

export default InputQuestion;
