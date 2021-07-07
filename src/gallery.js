import { galleryItems } from './app.js';

const itemGalleryEl = document.querySelector('.js-gallery');
const gallery = galleryItems.map(({ preview, original, description }, index) => {
  //   console.log(element);
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

const onOpenModalClick = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    modalImgRef.src = e.target.dataset.source;
    modalImgRef.alt = e.target.alt;
    modalImgRef.dataset.index = e.target.dataset.index;

    modalRef.classList.add('is-open');
  }
};

const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    modalRef.classList.remove('is-open');
  }
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    modalRef.classList.remove('is-open');
    modalImgRef.src = '';
    modalImgRef.alt = '';
  }
};

itemGalleryEl.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

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
