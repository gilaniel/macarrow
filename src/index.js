import "./style.sass";

import IMask from 'imask';
import axios from "axios";

import { Modal } from 'bootstrap'

let modal = '';

const initAnchors = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

const sendMessage = () => {
  const obj = {}
  const elements = document.querySelectorAll('.input');

  for (let i = 0; i < elements.length; ++i) {
    const { name, value } = elements[i]
    if (name) {
      obj[name] = value
    }
  }

  axios.post('http://localhost:3000/message', obj)
    .then(() => {
      modal.show()
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector('.phone');
  const maskOptions = {
    mask: /^[\d ()+]+$/
  };

  initAnchors()

  IMask(element, maskOptions);

  modal = new Modal(document.querySelector('.modal'))
});

document.querySelector('.js-send-btn').addEventListener('click', () => {
  sendMessage();
});