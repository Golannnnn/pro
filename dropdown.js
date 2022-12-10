const dropDown = document.querySelector(".header__dropdown");
const dropDownBtn = dropDown.querySelector(".header__dropdown__btn");
const dropDownOptions = dropDown.querySelectorAll(
  ".header__dropdown__options__item"
);

dropDownBtn.addEventListener("click", () =>
  dropDown.classList.toggle("active")
);

dropDownOptions.forEach((option) => {
  option.addEventListener("click", () => {
    dropDown.classList.remove("active");
  });
});
