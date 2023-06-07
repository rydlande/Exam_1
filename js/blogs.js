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
};
hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)
// NAVBAR //



// LOADER //
const loader = document.getElementById("loading");
const moreBlogs = document.getElementById("moreBlogs");

function displayLoading() {
  loader.style.display = 'block';
  moreBlogs.style.display = 'none';

};
function hideLoading() {
  loader.style.display = 'none';
  moreBlogs.style.display = 'block'
}
// LOADER //



// MAIN //
const url = "https://exam1.serialsnoozer.no/wp-json/wp/v2/posts?per_page=100"

const loadMoreButton = document.getElementById('loadMore');
const overview = document.getElementById('overview');
const cardCount = document.getElementById('cardCount');
const cardTotal = document.getElementById('cardTotal');


const blogsPerPage = 6;
let startIndex = 0;
let allBlogs = [];

const getBlogs = () => {

  displayLoading();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      allBlogs = data;
      renderBlogs();
      hideLoading();
    });
};


function renderBlogs() {
  const showBlogs = allBlogs.slice(startIndex, startIndex + blogsPerPage);

  const blogHTML = showBlogs.map((element) => {
    const { id, date, title, jetpack_featured_media_url } = element;
    const d = new Date(date).toLocaleDateString('en-EU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const imgAlt = `Featured image: ${title.rendered}`;

    return `
    <div class="blogsContainer">
      <a href="./blog_specific.html?id=${id}" class="card">
        <img class="imgfitPage" src="${jetpack_featured_media_url}" alt="${imgAlt}" />
        <div class="cardText">
          <h3>${title.rendered}</h3>
          <p class="published">${d}</p>
        </div>
      </a>
    </div>`;
  }).join('');

  overview.insertAdjacentHTML('beforeend', blogHTML);       // show the next 6 posts under the existing ones



  const numShowBlogs = Math.min(startIndex + blogsPerPage, allBlogs.length);
  cardCount.textContent = numShowBlogs;
  cardTotal.textContent = allBlogs.length;

  if (numShowBlogs === allBlogs.length) {
    loadMoreButton.classList.add("disabled");
    loadMoreButton.disabled = true;
  } else {
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener('click', () => {
  startIndex += blogsPerPage;
  renderBlogs();
});

getBlogs();