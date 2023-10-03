import images from './../images.ts';

export const initializeImages = () => {
    for (const imageKey in images) {
        const imageBase64 = images[imageKey];

        const imgElement = new Image();
        imgElement.src = imageBase64;
    }
};
