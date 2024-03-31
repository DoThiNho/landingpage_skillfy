function $(selector) {
    return document.querySelector(selector)
}

//Declare variable
const closeBtn = $(".btn-close")
const menuBtn = $(".btn-menu")
const modal = $(".modal-menu")
const modalContent = $(".modal-menu__wrapper")


const cardWrappers = document.querySelectorAll(".js-cards")
const cardWrapper = document.querySelector(".js-cards")
const btnPrevs = document.querySelectorAll('.js-btn-prev');
const btnNexts = document.querySelectorAll('.js-btn-next');
const progress = $('.js-progress');
const progressBars = document.querySelectorAll('.js-progress__bar');

const maxScrollLeft = cardWrapper.scrollWidth - cardWrapper.clientWidth
const scrollAmount = cardWrapper.clientWidth

//Function
const handleSliderButtons = ({ index }) => {
  if(cardWrappers[index].scrollLeft <= 0) {
    btnPrevs[index].disabled = true
  } else {
    btnPrevs[index].disabled = false
  }
  if(cardWrapper.scrollLeft >= maxScrollLeft){
    btnNexts[index].disabled = true
  } else {
    btnNexts[index].disabled = false
  }
}

const updateScrollPosition = ({ progressBar, cardWrapper }) => {
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
    cardWrappers[index].scrollBy({ left: -scrollAmount, behavior: "smooth" })
  })
})

btnNexts.forEach((btnNext, index) => {
  btnNext.addEventListener("click", () => {
    cardWrappers[index].scrollBy({ left: scrollAmount, behavior: "smooth" })
  })
})
