// NAV //
const toggleMenu = () => {
  const menu = document.querySelector(".menu");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
};
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", toggleMenu);
// NAV //




// FETCH
const url = "https://exam1.serialsnoozer.no/wp-json/wp/v2/posts?per_page=100";
const carousel = document.getElementById("carousel");
const carouselList = document.querySelector(".carousel-list");
const prevButton = document.querySelector(".btnPrev");
const nextButton = document.querySelector(".btnNext");
const loader = document.querySelector(".loader");
let currentIndex = 0;

const showSlide = (index) => {
  const carouselItems = document.querySelectorAll(".carousel-item");
  carouselItems.forEach((item) => {
    item.classList.remove("active");
  });

  carouselItems[index].classList.add("active");
};

const showNextSlide = () => {
  const carouselItems = document.querySelectorAll(".carousel-item");
  currentIndex++;
  if (currentIndex >= carouselItems.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
};

const showPrevSlide = () => {
  const carouselItems = document.querySelectorAll(".carousel-item");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselItems.length - 1;
  }
  showSlide(currentIndex);
};

prevButton.addEventListener("click", showPrevSlide);
nextButton.addEventListener("click", showNextSlide);

const getBlogs = () => {
  loader.style.display = "block";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderBlogs(data);
      loader.style.display = "none";
    })
    .catch((e) => {
      carousel.innerHTML = `Woops! Something went wrong... Please try again later.`;
      loader.style.display = "none";
    });
};

const renderBlogs = (data) => {
  carouselList.innerHTML = "";

  let numberOfPosts;

  if (window.innerWidth < 481) {
    numberOfPosts = 1;
  } else if (window.innerWidth < 1025) {
    numberOfPosts = 2;
  } else {
    numberOfPosts = 3;
  }

  for (let i = 0; i < data.length; i += numberOfPosts) {
    const blogPosts = data.slice(i, i + numberOfPosts);

    const carouselItem = document.createElement("li");
    carouselItem.classList.add("carousel-item");

    blogPosts.forEach((element) => {
      const { id, title, jetpack_featured_media_url } = element;

      const blogLink = document.createElement("a");
      blogLink.href = `./blog_specific.html?id=${id}`;
      blogLink.classList.add("sliderCard");

      const blogImage = document.createElement("img");
      blogImage.src = jetpack_featured_media_url;
      blogImage.alt = `Featured image: ${title.rendered}`;
      blogImage.classList.add("sliderImg");

      const blogTitle = document.createElement("h3");
      blogTitle.classList.add("sliderH3");
      blogTitle.textContent = title.rendered;

      blogLink.appendChild(blogImage);
      blogLink.appendChild(blogTitle);
      carouselItem.appendChild(blogLink);
    });

    carouselList.appendChild(carouselItem);
  }

  showSlide(0);
};

getBlogs();