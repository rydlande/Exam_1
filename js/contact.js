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

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)
// NAVBAR //

// FORM //
const form = document.querySelector("form#contactForm");
form.addEventListener("submit", validateForm);

const fullName = document.querySelector("input#contactName");
const subject = document.querySelector("input#contactSubject");
const email = document.querySelector("input#contactEmail");
const content = document.getElementById("formContent");

const nameMessage = document.querySelector("#nameMessage");
const subjectMessage = document.querySelector("#subjectMessage");
const emailMessage = document.querySelector("#emailMessage");
const contentMessage = document.querySelector("#contentMessage");
const successMessage = document.querySelector("#successMessage");


function validateForm(e) {
  e.preventDefault();

  let subName = fullName.value.trim();
  nameMessage.innerHTML = "";
  if (subName.length == 0) {
    nameMessage.innerHTML = "Required";
  }

  let subSubject = subject.value.trim();
  subjectMessage.innerHTML = "";
  if (subSubject.length < 15) {
    subjectMessage.innerHTML = "Subject must be at least 15 characters long";
  }

  let subEmail = email.value.trim();
  emailMessage.innerHTML = "";
  let emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!emailPattern.test(subEmail)) {
    emailMessage.innerHTML = "Please enter a valid email";
  }

  let subContent = content.value.trim();
  contentMessage.innerHTML = "";
  if (subContent.length < 25) {
    contentMessage.innerHTML = "Please tell us a bit more (at least 25 characters)";
  }

  if (
    subName.length > 0 &&
    subSubject.length >= 15 &&
    emailPattern.test(subEmail) &&
    subContent.length >= 25
  ) {
    successMessage.innerHTML = "Form submitted successfully!";
    form.reset();
  }
}
// FORM //
