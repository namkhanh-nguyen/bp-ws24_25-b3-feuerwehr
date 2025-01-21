import React, { useState, useEffect } from 'react';
import styles from '../../styles/quiz.module.css';

type Image = {
    src: string;
    category: string;
};

type QuestionImageOptionsProps = {
    images: Image[],
    onSelectionChange: (selectedImages: Image[]) => void,
    image?: string,
    onSelect?: () => void
};

const QuestionImageOptions: React.FC<QuestionImageOptionsProps> = ({images, onSelectionChange, image, onSelect}) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    // Handle the selection or deselection of images
    const handleSelect = (index: number) => {
        setSelectedIndexes((prev) => {
            if (prev.includes(index)) return prev.filter((i) => i !== index);
            if (prev.length < 2) return [...prev, index];
            return prev;
        });
    };

    // Notify parent when selection changes
    useEffect(() => {
        const selectedImages = selectedIndexes.map((idx) => images[idx]);
        onSelectionChange(selectedImages);
    }, [selectedIndexes, images, onSelectionChange]);

    return (
        <div className={styles.imageGridContainer}>
            <div className={styles.imageOptionsContainer}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.imageOption} ${
                            selectedIndexes.includes(index) ? styles.selectedImage : ''
                        }`}
                        onClick={() => handleSelect(index)}
                    >
                        <img
                            src={image.src || '/path/to/default-image.jpg'}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionImageOptions;
