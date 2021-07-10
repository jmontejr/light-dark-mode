const localStorageService = {
  checkItemExist(key) {
    return localStorage.getItem(key) !== null;
  },

  setValueItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getValueItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
};

const themeService = {
  checkbox: document.querySelector("input[name=theme]"),

  init(myStorage) {
    this.startingThemeInPage(myStorage);
    this.listenerCheckbox(myStorage);
  },

  startingThemeInPage(myStorage) {
    const { checkItemExist, setValueItem, getValueItem } = myStorage;

    if (!checkItemExist("mode"))
      setValueItem("mode", "light");

    if (getValueItem("mode") === "light") {
      this.checkbox.removeAttribute("checked");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      this.checkbox.setAttribute("checked", "");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  },

  listenerCheckbox(myStorage) {
    const { setValueItem } = myStorage;

    this.checkbox.addEventListener("change", ({ target }) => {
      if (target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        setValueItem("mode", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        setValueItem("mode", "light");
      }
    });
  }
};

(function(theme, myStorage) {
  "use strict";

  theme.init(myStorage);
})(themeService, localStorageService);
