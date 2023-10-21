// To achieve progressive enchancement

// Adding the slides progressively
const headerSlide = document.querySelector(".header-slides");
const newSlides = [
  {
    h1: "Organic Growth For Your Bussiness.",
  },

  {
    h1: "Happy Customer For Your Bussiness.",
  },
];

// Visible slide on the document;
const visibleSlide = document.querySelector(".slide");

// Now to add the buttons on the documents;
visibleSlide
  .querySelector(".slider-right i")
  .classList.add("ri-arrow-right-s-line");

visibleSlide
  .querySelector(".slider-left i")
  .classList.add("ri-arrow-left-s-line");

newSlides.forEach((slide) => {
  const clonnedSlide = visibleSlide.cloneNode(true);
  clonnedSlide.querySelector("h1").textContent = slide.h1;
  headerSlide.appendChild(clonnedSlide);
});

// Give position to each slide;
const slides = document.querySelectorAll(".slide");
slides.forEach((slide, index) => {
  slide.style = `left:${index * 100}%`;
});

// Keep track of the current slide;

let currentSlide = 0;

// Attaching event handlers to the buttons
slides.forEach((slide) => {
  slide.querySelector(".slider-left").addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < slides.length) {
      onChangeSlideHandler();
    } else {
      currentSlide++;
    }
  });

  slide.querySelector(".slider-right").addEventListener("click", () => {
    currentSlide++;
    if (currentSlide < slides.length) {
      onChangeSlideHandler();
    } else {
      currentSlide--;
    }
  });
});

// Function to chnage the slide;
const onChangeSlideHandler = () => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(-${currentSlide * 100}%)`;
  });
};

// Portflio Filtering ###################################################;

const mainPortfolio = document.querySelector(".portfolio");
const portfolio = document.querySelector(".portfolio-images");
const portfolioImages = document.querySelectorAll(".portfolio img");

let width, height;

mainPortfolio.style.height = `${
  portfolioImages[portfolioImages.length - 1].getBoundingClientRect().bottom -
  portfolioImages[0].getBoundingClientRect().top +
  300
}px`;
// Get the properties of its; container;
let container = portfolio.getBoundingClientRect();
let containerLeft = container.left;
let containerTop = container.top;

let lastElemPos;
let defaultPositions = [];

portfolioImages.forEach((image, index) => {
  // Getting the position properties of the required image
  imgPosition = image.getBoundingClientRect();

  //   To store the position
  if (index == portfolioImages.length - 1) {
    // Getting the width and height of the image;
    width = image.width;
    height = image.height;
  }

  // Creating a new object;
  const newObj = {
    left: imgPosition.left,
    top: imgPosition.top,
  };

  // Appending the object
  defaultPositions.push(newObj);
});

const defaultFiltering = (opacity = 1) => {
  portfolioImages.forEach((image, index) => {
    image.style = `opacity:${opacity};position:absolute; left: ${
      defaultPositions[index].left - containerLeft
    }px; top: ${
      defaultPositions[index].top - containerTop
    }px; width:${width}px; height: ${height}px`;
  });
};

defaultFiltering();

const buttonContainer = document.querySelector(".portfolio-buttons");

// Filtering the images and chnaging there positions;
const filteringMethod = (dataType) => {
  const filteredImages = Array.from(portfolioImages).filter((image) => {
    // dataType = ;
    defaultFiltering(0);
    if (image.classList.contains(dataType)) {
      image.style.opacity = `1`;
      return true;
    }
  });

  filteredImages.forEach((image, index) => {
    image.style = `position: absolute; width: ${width}px; height: ${height}px; left:${
      defaultPositions[index].left - containerLeft
    }px;top:${defaultPositions[index].top - containerTop}px;z-index:10000`;
  });
};

// from active class from all the buttons;
const removeActiveButton = () => {
  Array.from(buttonContainer.children).forEach((button) => {
    button.classList.remove("active");
  });
};

// Iterate over the buttons and attach an event listener
Array.from(buttonContainer.children).forEach((btn) => {
  btn.addEventListener("click", function () {
    removeActiveButton();
    this.classList.add("active");
    if (this.classList.contains("branding")) {
      filteringMethod("branding");
    } else if (this.classList.contains("marketing")) {
      filteringMethod("marketing");
    } else if (this.classList.contains("planning")) {
      filteringMethod("planning");
    } else {
      defaultFiltering();
    }
  });
});

// testimonal slider code starts from here ######################
let tCounter = 0;
const testimonalsSlides = document.querySelectorAll(".testimonal-slide");

// This function actually chnage the slide;
const onTestimonalChangeHandler = (counter, side) => {
  console.log(counter);
  testimonalsSlides.forEach((slide) => {
    if (side == "left") {
      if (counter > 0) {
        tCounter = 0;
        return;
      }
      slide.style.transform = `translate(${counter * 100}%, -50%)`;
    } else {
      if (Math.abs(counter) > testimonalsSlides.length - 1) {
        tCounter = -(testimonalsSlides.length - 1);
        return;
      }
      slide.style.transform = `translate(${counter * 100}%, -50%)`;
    }
  });
};

// Attaching events to the buttons & cdihange the counter;
testimonalsSlides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});



// Attaching the events;
const testimonalRightBtn = document.querySelector(".testimonal-right");
testimonalRightBtn.addEventListener("click", function () {
  onTestimonalChangeHandler(--tCounter, "right");
});



document
  .querySelector(".testimonal-left")
  .addEventListener("click", function () {
    // alert();
    onTestimonalChangeHandler(++tCounter, "left");
  });

// Dont break the rules;
