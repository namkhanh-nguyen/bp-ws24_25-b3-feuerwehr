// /src/app/quiz/QuestionScaleOption.tsx
import { FC, useState } from 'react';

type QuestionScaleOptionProps = {
  onSelect: (value: number) => void;
};

const QuestionScaleOption: FC<QuestionScaleOptionProps> = ({ onSelect }) => {
  const [value, setValue] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
        onBlur={() => onSelect(value)}
      />
      <p>Selected value: {value}</p>
    </div>
  );
};

export default QuestionScaleOption;
