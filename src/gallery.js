import { galleryItems } from './app.js';
// event - событие

const itemGalleryEl = document.querySelector('.js-gallery');
const gallery = galleryItems.map(({ preview, original, description }, index) => {
  itemGalleryEl.insertAdjacentHTML(
    'afterbegin',
    `<li class="gallery__item">
    <a class = "gallery__link" href = "${original}" >
    <img class="gallery__image" src = "${preview}" data-source = "${original}" alt = "${description}" data-index="${index}"/>
    </a>
    </li>`,
  );
});

const modalImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.lightbox');
const bodyRef = document.querySelector('body');

const onOpenModalClick = event => {
  event.preventDefault();

  if (event.target.localName === 'img') {
    modalImgRef.src = event.target.dataset.source;
    modalImgRef.alt = event.target.alt;
    modalImgRef.dataset.index = event.target.dataset.index;

    modalRef.classList.add('is-open');
  }

  bodyRef.addEventListener('click', onCloseModalClick);
  bodyRef.addEventListener('keyup', onKeyboardClick);
  bodyRef.addEventListener('keydown', onFlippingClick);
};

const onCloseModalClick = event => {
  if (event.target.localName !== 'img') {
    modalRef.classList.remove('is-open');
    onOpenModalClick(event);
  }
};

const onKeyboardClick = event => {
  if (event.keyCode !== 27) {
    return;
  }
  modalRef.classList.remove('is-open');
  onOpenModalClick(event);
};

itemGalleryEl.addEventListener('click', onOpenModalClick);

const onFlippingClick = event => {
  if (event.code === 'ArrowLeft') {
    onArrowLeft();
  }

  if (event.code === 'ArrowRight') {
    onArrowRight();
  }
};

function onArrowLeft() {
  let index = +modalImgRef.dataset.index;

  if (index === 0) {
    newSrc(galleryItems.length - 1);
    return;
  }
  newSrc(index, -1);
}

function onArrowRight() {
  let index = +modalImgRef.dataset.index;

  if (index === galleryItems.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  modalImgRef.dataset.index = `${index + step}`;
  modalImgRef.src = galleryItems[index + step].original;
}

// ============================================================
