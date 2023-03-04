const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unsplash api

const count = 30;
const apiKey = "v0-1LpKFyJqLVlcfz7JxcHGrKYFFEZ3nGM3Tae_C9Qk";
const urlApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all imaged were laoded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

//helper function to set atrubutes on DOM elements

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos and to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  // run function for each object in photosArray
  photoArray.forEach((photo) => {
    // create <a> t link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // setting atribute using function
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listner, check when each is finished laoding
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>,t hen put both inside image conatiner element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(urlApi);
    photoArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log("Error !", err);
  }
}

// check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// onload
getPhotos();
