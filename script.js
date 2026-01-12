'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const products = [
    {
      id: 1,
      name: 'jacket-001',
      description:
        'A stylish navy jacket with a lightweight design, perfect for everyday wear.',
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
      name: 'jeans-004',
      description:
        'Classic blue denim jeans with a comfortable fit for everyday use.',
      price: 299,
      stock: 0,
      image: './assets/dom-hill-JqZlSnI2ctA-unsplash.jpg',
      accent: '#74c0fc',
      fontStyle: null,
    },
    {
      id: 5,
      name: 'jacket-005',
      description:
        'Sleek black jacket that combines style and functionality for any occasion.',
      price: 299,
      stock: 0,
      image: './assets/jc-gellidon-xDsq3u3ZUqc-unsplash.jpg',
      accent: '#f03e3e',
      fontStyle: null,
    },
  ];

  let currentProductIndex = 0;

  function render() {
    const currentProduct = products[currentProductIndex];
    const activeEl = document.querySelector('.active');
    if (activeEl) {
      activeEl.style.backgroundColor = currentProduct.accent;
    }
    document.body.style.fontFamily = currentProduct.fontStyle || 'Inter';

    const image = document.querySelector('.image');
    image.src = currentProduct.image;

    const title = document.querySelector('.title');
    title.textContent = currentProduct.name;
    title.style.color = currentProduct?.accent;

    const description = document.querySelector('.description');
    description.textContent = currentProduct.description;

    const price = document.querySelector('.price');

    const formattedPrice = new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
    }).format(currentProduct.price);
    price.textContent = formattedPrice;
  }

  setInterval(() => {
    currentProductIndex++;
    if (currentProductIndex >= products.length) {
      currentProductIndex = 0;
    }
    render();
  }, 5000);

  render();
});
