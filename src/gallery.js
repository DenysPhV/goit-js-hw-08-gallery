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

const onOpenModalClick = event => {
  event.preventDefault();
  console.log('я запистил модалку!!!');
  if (event.target.localName === 'img') {
    modalImgRef.src = event.target.dataset.source;
    modalImgRef.alt = event.target.alt;
    modalImgRef.dataset.index = event.target.dataset.index;

    modalRef.classList.add('is-open');
  }

  window.addEventListener('keyup', onKeyboardClick);
  window.addEventListener('click', onCloseModalClick);
};

const onCloseModalClick = event => {
  if (event.target.localName !== 'img') {
    clearAttributesClick();
  }
};

const onKeyboardClick = event => {
  if (event.key === 'Escape') {
    clearAttributesClick();
  }
};

function clearAttributesClick() {
  // console.log('убрал слушателя');
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';

  window.removeEventListener('keyup', onKeyboardClick);
  window.removeEventListener('click', onCloseModalClick);
}

itemGalleryEl.addEventListener('click', onOpenModalClick);

window.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft') {
    onArrowLeft();
  }

  if (event.code === 'ArrowRight') {
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

// ============================================================
