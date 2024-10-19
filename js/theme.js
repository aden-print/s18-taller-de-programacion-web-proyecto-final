const storageTheme = localStorage.getItem("theme");
const body = document.querySelector("body");
const systemColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
  .matches
  ? "dark-mode"
  : "light-mode";
const newTheme = storageTheme ?? systemColorScheme;
body.classList.add(newTheme);
if (body.classList.contains("dark-mode")) {
  document.querySelector(".circulo").classList.add("prendido");
}
