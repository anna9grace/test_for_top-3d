'use strict';

const page = document.querySelector(`body`);
const menu = page.querySelector(`.mobile__menu`);
const menuElements = menu.querySelectorAll(`.mobile__info, .mobile__nav`);
const menuToggle = menu.querySelector(`.mobile__menu-btn`);
const subMenuElement = menu.querySelector(`.mobile__products`);
const productMenuToggle = subMenuElement.querySelector(`.mobile__products-catalog`);
const productMenuList = subMenuElement.querySelector(`.header__product-list`);
const smallScreen = window.matchMedia(`(max-width: 1023px)`);
const mobileScreen = window.matchMedia(`(max-width: 767px)`);
let isMenuOpened = false;


if (menu || menuToggle || menuElements || subMenuElement || productMenuToggle || productMenuList) {

  const renderMobileMenu = () => {
    page.classList.add(`mobile`);
    menuToggle.classList.remove(`hidden`);
    productMenuToggle.classList.remove(`hidden`);
    productMenuList.classList.add(`hidden`);
    subMenuElement.classList.add(`hidden`);
    for (const element of menuElements) {
      element.classList.add(`hidden`);
    }
  };


  const renderDesktopMenu = () => {
    page.classList.remove(`mobile`);
    menuToggle.classList.add(`hidden`);
    subMenuElement.classList.remove(`hidden`);
    productMenuList.classList.remove(`hidden`);
    productMenuToggle.classList.add(`hidden`);
    for (const element of menuElements) {
      element.classList.remove(`hidden`);
    }
  };


  const onWindowWidthChange = (evt) => {
    if (evt.matches) {
      renderMobileMenu();
      if (menuToggle.classList.contains(`mobile__menu-btn--close`)) {
        for (const element of menuElements) {
          element.classList.remove(`hidden`);
        }
      }
    } else {
      renderDesktopMenu();
    }
  };

  renderDesktopMenu();

  if (smallScreen.matches) {
    renderMobileMenu();
  }
  smallScreen.addEventListener(`change`, onWindowWidthChange);


  const changePageState = () => {
    if (isMenuOpened && mobileScreen.matches) {
      page.classList.add(`mobile--page-inactive`);
    } else {
      page.classList.remove(`mobile--page-inactive`);
    }
  };


  const changeMenuOpenState = () => {
    if (!page.classList.contains(`mobile`)) {
      return;
    }
    for (const element of menuElements) {
      element.classList.toggle(`hidden`);
    }
    menuToggle.classList.toggle(`mobile__menu-btn--open`);
    menuToggle.classList.toggle(`mobile__menu-btn--close`);
    isMenuOpened = menuToggle.classList.contains(`mobile__menu-btn--close`) ? true : false;

    if (!productMenuList.classList.contains(`hidden`) && isMenuOpened) {
      productMenuList.classList.add(`hidden`);
    }
    subMenuElement.classList.toggle(`hidden`);
    changePageState();
  };


  menuToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    changeMenuOpenState();
  });


  productMenuToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    productMenuList.classList.toggle(`hidden`);
  });


  menu.addEventListener(`click`, (evt) => {
    if (evt.target.tagName !== `A` || evt.target === productMenuToggle) {
      return;
    }
    changeMenuOpenState();
  });
}
