import React, { useState } from 'react';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState('');

    // Function to handle the selection of an image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const openGallery = () => {
        const inputElement = document.getElementById('imageInput');
        if (inputElement) {
            inputElement.click();
        }
    };

    return (
        <div>
            {/* Hidden input field */}
            <input
                type="file"
                id="imageInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />

            {/* Button to trigger the file input field */}
            <button onClick={openGallery}>
                Open Gallery
            </button>

            {/* Display selected image */}
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected Image" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
