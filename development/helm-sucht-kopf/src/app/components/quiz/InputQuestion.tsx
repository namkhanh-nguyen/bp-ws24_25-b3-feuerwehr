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
    onValidation?: (message: string) => void;
};

const InputQuestion: FC<InputQuestionProps> = ({ question, value, onChange, onValidation }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '' || !isNaN(Number(inputValue))) {
            onChange(inputValue);

            // Trigger validation logic
            if (onValidation) {
                const heightValue = parseFloat(inputValue);
                if (!isNaN(heightValue)) {
                    if (heightValue < question.minValue!) {
                        onValidation(`Für die Verbeamtung bei der Berliner Feuerwehr ist eine Mindestgröße von ${question.minValue} cm erforderlich. Du kannst jedoch ohne Verbeamtung einsteigen.`);
                    } else if (heightValue > question.maxValue!) {
                        onValidation(`Für die Verbeamtung bei der Berliner Feuerwehr darf die Größe ${question.maxValue} cm nicht überschreiten. Du kannst jedoch ohne Verbeamtung einsteigen.`);
                    } else {
                        onValidation("");
                    }
                }
            }
        }
    };

    return (
        <div className={styles.inputContainer}>
            <input
                id={`question-${question.id}`}
                type="text"
                placeholder="in cm"
                className={styles.inputField}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputQuestion;
