const imageContainer = document.querySelector("#image-container");
const images = imageContainer.querySelectorAll("img");
const circleContainer = document.querySelector("#circles-container");
const circles = circleContainer.children;
let counter = 0;

const circleFill = () => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].classList.contains("visible")) {
      for (let s = 0; s < circles.length; s++) {
        if (circles[s].dataset.index == i) {
          circles[s].style.backgroundColor = "rgb(35, 35, 35)";
        } else {
          circles[s].style.backgroundColor = "white";
        }
      }
    }
  }
};

circleContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    let dataIndex = e.target.dataset.index;
    for (let i = 0; i < images.length; i++) {
      if (i == dataIndex) {
        images[i].classList.add("visible");
      } else {
        images[i].classList.remove("visible");
      }
    }
    circleFill();
  }
});

previous.addEventListener("click", () => {
  let currentSibling = document.querySelector(".visible");
  let previousSibling = currentSibling.previousElementSibling;
  let lastSibling = currentSibling.parentNode.lastElementChild;

  if (previousSibling !== null) {
    currentSibling.classList.remove("visible");
    previousSibling.classList.add("visible");
  } else {
    currentSibling.classList.remove("visible");
    lastSibling.classList.add("visible");
  }

  circleFill();
});

next.addEventListener("click", () => {
  let currentSibling = document.querySelector(".visible");
  let nextSibling = currentSibling.nextElementSibling;
  let firstSibling = currentSibling.parentNode.firstElementChild;

  if (nextSibling !== null) {
    currentSibling.classList.remove("visible");
    nextSibling.classList.add("visible");
  } else {
    currentSibling.classList.remove("visible");
    firstSibling.classList.add("visible");
  }

  circleFill();
});

setInterval(() => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].classList.contains("visible")) {
      counter = i;
    }
  }

  images[counter].classList.remove("visible");
  counter = (counter + 1) % images.length;
  images[counter].classList.add("visible");

  circleFill();
}, 3000);

circleFill();
