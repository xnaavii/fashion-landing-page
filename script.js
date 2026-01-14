'use strict';

window.addEventListener('DOMContentLoaded', () => {
  /* ------------------ DATA ------------------ */
  const products = [
    {
      id: 1,
      name: 'jacket-001',
      description:
        'A stylish jacket with a lightweight design, perfect for everyday wear.',
      price: 299,
      stock: 0,
      image: './assets/images/sirio-7_ZNLVlJchs-unsplash.jpg',
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
      image: './assets/images/julian-myles-1RbTWZmacKA-unsplash.jpg',
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
      image: './assets/images/molly-mears-4_90zmmdo_4-unsplash.jpg',
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
      image: './assets/images/dom-hill-JqZlSnI2ctA-unsplash.jpg',
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
      image: './assets/images/jc-gellidon-xDsq3u3ZUqc-unsplash.jpg',
      accent: '#f03e3e',
      fontStyle: null,
    },
  ];

  /* ------------------ DOM CACHE ------------------ */
  const slidesContainer = document.querySelector('#slides');
  const dotsContainer = document.querySelector('.dots');

  /* ------------------ STATE ------------------ */
  let activeIndex = 0;

  /* ------------------ HELPERS ------------------ */
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

  const setActiveDot = (index) => {
    activeIndex = index;

    document.querySelectorAll('.dot').forEach((dot) => {
      dot.classList.toggle('active', Number(dot.dataset.index) === index);
      dot.setAttribute(
        'aria-current',
        Number(dot.dataset.index) === index ? 'true' : 'false'
      );
    });
  };

  /* ------------------ RENDERING ------------------ */
  const renderSlides = () => {
    products.forEach((product, index) => {
      const isInStock = product.stock > 0;
      const titleStyle = product.fontStyle
        ? `style="font-family: ${product.fontStyle};"`
        : '';

      const html = `
        <div class="slide" data-id="${product.id}" data-index="${index}">
          <div class="text-container">
            <h2 class="title" ${titleStyle}>${product.name}</h2>
            <p class="description">${product.description}</p>
            <p class="price">${formatPrice(product.price)}</p>

            <button class="btn" ${isInStock ? '' : 'disabled'}>
              <small class="stock">
                ${isInStock ? 'In stock' : 'Out of stock'}
              </small>
            </button>
          </div>

          <div class="image-container">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
              class="image"
            />
          </div>
        </div>
      `;

      slidesContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  const renderNewsletterSlide = () => {
    const html = `
      <div class="slide newsletter" data-index="${products.length}">
        <form id="newsletter-form">
          <header id="newsletter-header">
            <h3>Subscribe to our newsletter</h3>
            <p>Be the first to know when our products are in stock.</p>
          </header>

          <div class="input-group">
            <label for="email">Enter your email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              required
              autocomplete="email"
            />
          </div>

          <button type="submit" class="btn">Subscribe</button>
        </form>

        <video
          src="./assets/videos/newsletter-background-video.mp4"
          autoplay
          muted
          loop
          playsinline
        ></video>
      </div>
    `;

    slidesContainer.insertAdjacentHTML('beforeend', html);

    const form = document.querySelector('#newsletter-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.querySelector('.input-group').innerHTML =
        '<p class="success-message">Thank you for subscribing!</p>';

      form.querySelector('#newsletter-header').remove();
      form.querySelector('button').remove();
    });
  };

  const renderDots = () => {
    dotsContainer.innerHTML = '';

    const totalSlides = products.length + 1;

    for (let i = 0; i < totalSlides; i++) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dot" data-index="${i}" aria-label="Go to slide ${
          i + 1
        }"></button>`
      );
    }
  };

  /* ------------------ INTERACTION ------------------ */
  const observeSlides = () => {
    const slides = document.querySelectorAll('.slide');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveDot(index);
          }
        });
      },
      {
        root: slidesContainer,
        threshold: 0.3,
      }
    );

    slides.forEach((slide) => observer.observe(slide));
  };

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;

    const index = Number(dot.dataset.index);
    const targetSlide = document.querySelector(`.slide[data-index="${index}"]`);

    targetSlide?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    setActiveDot(index);
  });

  /* ------------------ INIT ------------------ */
  renderSlides();
  renderNewsletterSlide();
  renderDots();
  setActiveDot(activeIndex);
  observeSlides();
});
