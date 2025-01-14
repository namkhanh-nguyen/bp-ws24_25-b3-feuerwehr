import { FC } from 'react';

type QuestionOptionProps = {
    option: { prefix: string; text: string };
    onSelect: () => void;
};

const QuestionOption: FC<QuestionOptionProps> = ({ option, onSelect }) => {
    const { prefix, text } = option;
    return (
        <button className="question-option" onClick={onSelect}>
            <span className="option-prefix">{prefix}</span>
            <span className="option-text">{text}</span>
        </button>
    );
};

export default QuestionOption;
