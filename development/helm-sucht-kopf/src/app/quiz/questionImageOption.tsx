// /src/app/quiz/QuestionImageOption.tsx
import { FC } from 'react';

type QuestionImageOptionProps = {
  image: string;
  onSelect: () => void;
};

const QuestionImageOption: FC<QuestionImageOptionProps> = ({ image, onSelect }) => {
  return (
    <div className="question-image-option" onClick={onSelect}>
      <img src={image} alt="Choice" />
    </div>
  );
};

export default QuestionImageOption;
