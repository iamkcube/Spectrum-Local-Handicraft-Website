const slides = document.querySelectorAll(".slide");
let counter = 0;
console.log(slides);

const slideImage = () => {
    slides.forEach((slide) => {
        if (counter > 3) {
            counter = 0;
        } else if (counter < 0) {
            counter = 3;
        }
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

const goPrev = () => {
	counter--;
	slideImage();
};

const goNext = () => {
	counter++;
	slideImage();
};

