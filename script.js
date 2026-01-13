'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const products = [
    {
      id: 1,
      name: 'jacket-001',
      description:
        'A stylish jacket with a lightweight design, perfect for everyday wear.',
      price: 299,
      stock: 0,
      image: './assets/sirio-7_ZNLVlJchs-unsplash.jpg',
      accent: '#74c0fc',
      fontStyle: null,
    },
    {
      id: 2,
      name: 'jacket-002',
      description:
        'Bold red jacket made from premium materials, featuring a modern fit.',
      price: 299,
      stock: 0,
      image: './assets/julian-myles-1RbTWZmacKA-unsplash.jpg',
      accent: '#f03e3e',
      fontStyle: 'Orbitron',
    },
    {
      id: 3,
      name: 'jacket-003',
      description:
        'Sunny yellow casual jacket, perfect for spring and summer outings.',
      price: 299,
      stock: 0,
      image: './assets/molly-mears-4_90zmmdo_4-unsplash.jpg',
      accent: '#ffd43b',
      fontStyle: null,
    },
    {
      id: 4,
      name: 'leather-004',
      description:
        'Classic black leather with a comfortable fit for everyday use.',
      price: 199,
      stock: 0,
      image: './assets/dom-hill-JqZlSnI2ctA-unsplash.jpg',
      accent: '#74c0fc',
      fontStyle: null,
    },
    {
      id: 5,
      name: 'jacket-005',
      description:
        'Jacket that combines style and functionality for any occasion.',
      price: 299,
      stock: 0,
      image: './assets/jc-gellidon-xDsq3u3ZUqc-unsplash.jpg',
      accent: '#f03e3e',
      fontStyle: null,
    },
  ];

  function setActiveDot(index) {
    document
      .querySelectorAll('.dot')
      .forEach((dot) => dot.classList.remove('active'));

    document
      .querySelector(`.dot[data-index="${index}"]`)
      ?.classList.add('active');
  }

  function observeSlides() {
    const slides = document.querySelectorAll('.slide');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = [...slides].indexOf(entry.target);
            setActiveDot(index);
          }
        });
      },
      {
        root: document.querySelector('#slides'),
        threshold: 0.6,
      }
    );

    slides.forEach((slide) => observer.observe(slide));
  }

  function renderDots() {
    const dotsContainer = document.querySelector('.dots');
    dotsContainer.innerHTML = '';

    products.forEach((_, index) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="dot" data-index="${index}"></div>`
      );
    });

    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');

    dots.forEach((dot) =>
      // Trigger scroll towards the product
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index);
        const targetSlide = slides[index];

        targetSlide.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      })
    );
  }

  function render() {
    products.forEach((product) => {
      const formattedPrice = new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR',
      }).format(product.price);

      const html = `
      <div class="slide" data-product-id=${product.id}>
        <div class="text-container">
        <!-- Text Content -->
        <h2 class="title" >${product.name}</h2>
        <p class="description">${product.description}</p>
        <p class="price">${formattedPrice}</p>
      <button class="btn" disabled=${product.stock > 0}>
        <small class="stock">${
          product.stock > 0 ? 'In stock' : 'Out of stock'
        }</small>
      </button>
        </div>
          <div class="image-container">
          <!-- Image Content -->
          <img src="${product.image}" loading="lazy" class="image" />
        </div>
      </div>
      `;

      const slides = document.querySelector('#slides');
      slides.insertAdjacentHTML('beforeend', html);
    });
  }

  render();
  renderDots();
  setActiveDot(0);
  observeSlides();
});
