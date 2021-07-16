import { galleryItems } from './app.js';
// event - событие

const itemGalleryEl = document.querySelector('.js-gallery');
galleryItems.map(({ preview, original, description }, index) => {
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

  if (event.target.localName === 'img') {
    modalImgRef.src = event.target.dataset.source;
    modalImgRef.alt = event.target.alt;
    modalImgRef.dataset.index = event.target.dataset.index;

    modalRef.classList.add('is-open');
  }
};

const onCloseModalClick = event => {
  if (event.target.localName !== 'img') {
    clearClasslist();
  }
};

const onKeyboardClick = event => {
  if (event.key === 'Escape') {
    clearClasslist();
  }
};

function clearClasslist() {
  modalRef.classList.remove('is-open');
  modalImgRef.src = '';
  modalImgRef.alt = '';
}

itemGalleryEl.addEventListener('click', onOpenModalClick);
itemGalleryEl.addEventListener('keyup', onKeyboardClick);
modalRef.addEventListener('click', onCloseModalClick);

// navigation gallery in on place
const onFlippingClick = event => {
  if (event.key === 'ArrowLeft') {
    let index = +modalImgRef.dataset.index;

    if (index === 0) {
      newSrc(galleryItems.length - 1);
      return;
    }
    newSrc(index, -1);
  }

  if (event.key === 'ArrowRight') {
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
};

itemGalleryEl.addEventListener('keydown', onFlippingClick);

// ============================================================
