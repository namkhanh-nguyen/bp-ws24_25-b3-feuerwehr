'use client';

import React, { useState } from 'react';
import styles from '../../styles/quiz.module.css';


const QuestionSlider = ({
                            question,
                            value = 50,
                            onChange,
                        }: {
    question: {
        id: number;
        title: string;
        type: string;
        minLabel?: string;
        maxLabel?: string;
        minValue?: number;
        maxValue?: number;
    };
    value: number;
    onChange: (value: number) => void;
}) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <div className={styles.sliderContainer}>
            {/* Slider Labels */}
            <div className={styles.sliderLabels}>
                <span>{question.minLabel}</span>
                <span>{question.maxLabel}</span>
            </div>
            <input
                type="range"
                min={question.minValue}
                max={question.maxValue}
                value={value}
                onChange={handleSliderChange}
                className={styles.slider}
            />
            <p className={styles.sliderValue}>{value} %</p>
        </div>
    );
};

export default QuestionSlider;
