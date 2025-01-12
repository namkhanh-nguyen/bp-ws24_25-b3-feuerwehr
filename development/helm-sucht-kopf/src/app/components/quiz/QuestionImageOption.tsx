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
            if (prev.includes(index)) return prev.filter((i) => i !== index); // Deselect if already selected
            if (prev.length < 2) return [...prev, index]; // Add selection if less than 2
            return prev; // Do nothing if 2 selections already made
        });
    };

    // Notify parent when selection changes
    useEffect(() => {
        const selectedImages = selectedIndexes.map((idx) => images[idx]);
        onSelectionChange(selectedImages);
    }, [selectedIndexes, images, onSelectionChange]); // Run when `selectedIndexes` or `images` changes

    return (
        <div>
            <div className={styles.imageOptionsContainer}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.imageOption} ${
                            selectedIndexes.includes(index) ? styles.selectedImage : ''
                        }`}
                        onClick={() => handleSelect(index)}
                    >
                        {/* Check if src is valid, if not display a fallback image */}
                        <img
                            src={image.src || '/path/to/default-image.jpg'} // Fallback image path

                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionImageOptions;
