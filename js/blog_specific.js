// NAVBAR //
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});
// NAVBAR //



// LOADER //
const loader = document.getElementById("loading");

function displayLoading() {
  loader.style.display = "block";
}
function hideLoading() {
  loader.style.display = "none";
}
// LOADER //



const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://exam1.serialsnoozer.no/wp-json/wp/v2/posts/${id}?_embed=wp:featuredmedia`;

const main = document.querySelector("main");
const head = document.querySelector("head");
const img = document.querySelector(".featuredImg");
const textContent = document.querySelector(".content");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");


function getBlogs() {
  displayLoading();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      const { date, title, content } = data;
      const media = data._embedded["wp:featuredmedia"][0].source_url;
      const d = new Date(date).toLocaleDateString("en-EU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // BLOG TITLE TO HEAD
      const BlogTitle = document.createElement("title");
      BlogTitle.innerHTML = `SerialSnoozer | ` + title.rendered;
      head.appendChild(BlogTitle);

      // BLOG CONTENT
      img.innerHTML = `<img src="${media}" alt="Featured image to ${title.rendered}" id="img" class="featuredImg" >`;
      textContent.innerHTML = `
      <a href="./blogs.html" class="backButton">← All blogs</a>
      <div class="blogContent">
            <h2 class="blogTitle">${title.rendered}</h2>
            <div class="blogText">
              <p class="publishedSpecific">${d}</p>
              <p">${content.rendered}</p>
            </div>
          </div>`;

      hideLoading();

      modal.innerHTML = `<img src="${media}" alt="Featured image to ${title.rendered}" class="modalImg"/>`
      
    })
    .catch((e) => {
      main.innerHTML = `Woops! Something went wrong... Please try again later.`;
      console.log(e);
    });
}

getBlogs();


// MODAL //
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
modal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
img.addEventListener("click", openModal);
