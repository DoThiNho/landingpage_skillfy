function $(selector) {
    return document.querySelector(selector)
}

//Declare variable
const closeBtn = $(".js-btn-close")
const menuBtn = $(".js-btn-menu")
const modal = $(".js-modal-menu")
const modalContent = $(".js-modal-menu__wrapper")

const cardWrappers = document.querySelectorAll(".js-cards")
const cardWrapper = document.querySelector(".js-cards")
const btnPrevs = document.querySelectorAll('.js-btn-prev');
const btnNexts = document.querySelectorAll('.js-btn-next');
const progress = $('.js-progress');
const progressBars = document.querySelectorAll('.js-progress__bar');

const scrollAmount = cardWrapper.clientWidth
const cardGap = 28 // Distance between two card

//Function
const getMaxScrollLeft = () => {
  const maxScrollLeft = cardWrapper.scrollWidth - cardWrapper.clientWidth
  return maxScrollLeft
}


const handleSliderButtons = ({ index }) => {
  const maxScrollLeft = getMaxScrollLeft()
  const scrollLeft = cardWrappers[index].scrollLeft;
  btnPrevs[index].disabled = scrollLeft <= 0;
  btnNexts[index].disabled = scrollLeft >= maxScrollLeft;
}


const updateScrollPosition = ({ progressBar, cardWrapper }) => {
  const maxScrollLeft = getMaxScrollLeft()
  const scrollPosition = cardWrapper.scrollLeft
  const thumbPosition = (scrollPosition / maxScrollLeft) * (progress.clientWidth - progressBar.offsetWidth)
  progressBar.style.left = `${thumbPosition}px`
}

// Event
menuBtn.addEventListener("click", () => {
  modal.classList.toggle("show")
  modalContent.classList.remove("fade-out-right")
  modalContent.classList.add("fade-in-right")
})

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show")
  modalContent.classList.remove("fade-in-right")
  modalContent.classList.add("fade-out-right")
})

cardWrappers.forEach(((cardWrapper, index) => {
  cardWrapper.addEventListener("scroll", () => {
    handleSliderButtons({ index })
    updateScrollPosition({ progressBar: progressBars[index], cardWrapper })
  })
}))

btnPrevs.forEach((btnPrev, index) => {
  btnPrev.addEventListener("click", () => {
    cardWrappers[index].scrollBy({ left: -scrollAmount - cardGap, behavior: "smooth" })
  })
})

btnNexts.forEach((btnNext, index) => {
  btnNext.addEventListener("click", () => {
    cardWrappers[index].scrollBy({ left: scrollAmount + cardGap, behavior: "smooth" })
  })
})
