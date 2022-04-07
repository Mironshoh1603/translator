let swapBtn = document.querySelector(".swap_icon"),
  firstLang = document.querySelector(".lang1"),
  secondLang = document.querySelector(".lang2"),
  textArea1 = document.querySelector(".text__content1");
let textArea2 = document.querySelector(".text__content2");
const translateBtn = document.querySelector(".translate");
let areatext = "";
swapBtn.addEventListener("click", function () {
  [
    document.querySelector(".lang1").value,
    document.querySelector(".lang2").value,
  ] = [secondLang.value, firstLang.value];
});
const options = {
  method: "GET",
  headers: {
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    "X-RapidAPI-Key": "dc41fac8a7msh3be79e85a4f840ap194266jsn07c0d9d60196",
  },
};

fetch(
  "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let html;
    let languages = response.data.languages;
    languages = languages.flat(2);
    console.log(languages);
    languages.forEach((element, key) => {
      html = `<option value="${element.language}">${element.language}</option>`;
      firstLang.insertAdjacentHTML("beforeend", html);
      secondLang.insertAdjacentHTML("beforeend", html);
    });
  })
  .catch((err) => console.error(err));

translateBtn.addEventListener("click", function () {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", textArea1.value);
  encodedParams.append("target", secondLang.value);
  encodedParams.append("source", firstLang.value);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      "X-RapidAPI-Key": "dc41fac8a7msh3be79e85a4f840ap194266jsn07c0d9d60196",
    },
    body: encodedParams,
  };

  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data.translations);
      textArea2.value = response.data.translations[0].translatedText;
    })
    .catch((err) => console.error(err));
});
