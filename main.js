window.addEventListener("DOMContentLoaded", main);

function main() {
  loadItemsFromLocalStorage();
  loadSceneFromLocalStorage();
}

function loadSceneFromLocalStorage() {
  const scene = localStorage.getItem("currentScene");
}

let carriedItems = [];
let placedItems = [];

function loadItemsFromLocalStorage() {
  const carriedItemsString = localStorage.getItem("carriedItems");
  if (carriedItemsString) {
    carriedItems = JSON.parse(carriedItemsString);
  }
}

function loadingWelcomeScene() {
  firstButton.onclick = loadingFirstScene;
}

function loadingFirstScene() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "first");

  const firstSceneP = document.createElement("p");
  firstSceneP.innerHTML =
    "Du vaknar upp i en mörk gång. Väggarna är gjorda av sten och längs med gången hänger facklor som brinner med ett märkligt turkost ljus. Du har ingen aning om hur du hamnade här. I gångens bortre ände står en gammal stängd träport, och framför dig på golvet ligger tre föremål; en <strong>DOLK</strong> som glimmar i det dunkla ljuset, en vacker <strong>AMULETT</strong> med en rubin i mitten och en dammig gammal <strong>BOK</strong>. Vilket av föremålen vill du plocka upp? Du kan bara välja ett föremål.";
  firstSceneP.className = "p-text";
  textContainer.append(firstSceneP);

  const itemInputElement = document.createElement("input");
  itemInputElement.className = "itemInputField";
  textContainer.append(itemInputElement);

  const inputButton = document.createElement("button");
  inputButton.innerHTML = "Välj";
  inputButton.className = "button";
  textContainer.append(inputButton);

  const continueButton = document.createElement("button");
  continueButton.textContent = "Gå genom porten";
  continueButton.className = "button";
  continueButton.onclick = loadingSecondScene;
  buttonContainer.append(continueButton);

  const listOfItems = ["Dolk", "Amulett", "Bok"];
  inputButton.onclick = choosingItem;

  function choosingItem() {
    const chosenItem = itemInputElement.value.toLowerCase();
    for (const starterItem of listOfItems) {
      if (chosenItem === "Dolk".toLowerCase()) {
        firstSceneP.innerHTML =
          "Du har plockat upp dolken. Vill du välja ett annat föremål?";
        itemInputElement.value = "";
        carriedItems.pop();
        carriedItems.push(chosenItem);
        inputButton.textContent = "Byt föremål";
        break;
      } else if (chosenItem === "Amulett".toLowerCase()) {
        firstSceneP.innerHTML =
          "Du har plockat upp amuletten. Vill du välja ett annat föremål?";
        itemInputElement.value = "";
        carriedItems.pop();
        carriedItems.push(chosenItem);
        inputButton.textContent = "Byt föremål";
        break;
      } else if (chosenItem === "Bok".toLowerCase()) {
        firstSceneP.innerHTML =
          "Du har plockat upp boken. Vill du välja ett annat föremål?";
        itemInputElement.value = "";
        carriedItems.pop();
        carriedItems.push(chosenItem);
        inputButton.textContent = "Byt föremål";
        break;
      } else {
        alert("Föremålet du har valt finns inte. Välj ett annat föremål.");
        itemInputElement.value = "";
        break;
      }
    }
    localStorage.carriedItems = JSON.stringify(carriedItems);
    // const carriedItems2 = JSON.parse(localStorage.savedItems);
  }
}

function loadingSecondScene() {
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "second");

  const secondSceneP = document.createElement("p");
  secondSceneP.innerHTML =
    "Du kommer in i ett en stor fyrkantig sal. I varje vägg finns en dörr, förseglad med rostiga kedjor. Vid var och en av dörrarna står ett altare. Interagera med ett altare för att undersöka det närmare.";
  secondSceneP.className = "p-text";
  textContainer.append(secondSceneP);

  const firstButton = document.createElement("button");
  firstButton.innerHTML = "Första altaret";
  firstButton.className = "button";
  buttonContainer.append(firstButton);

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Andra altaret";
  secondButton.className = "button";
  buttonContainer.append(secondButton);

  const thirdButton = document.createElement("button");
  thirdButton.innerHTML = "Tredje altaret";
  thirdButton.className = "button";
  buttonContainer.append(thirdButton);

  firstButton.onclick = inspectFirstAltar;
  secondButton.onclick = inspectSecondAltar;
  thirdButton.onclick = inspectThirdAltar;

  const fourthButton = document.createElement("button");
  fourthButton.innerHTML = "Tillbaka till förra rummet";
  fourthButton.className = "button";
  buttonContainer.append(fourthButton);
  fourthButton.onclick = loadingFirstScene;
}

function inspectFirstAltar() {
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "firstAltar");

  const firstAltarP = document.createElement("p");
  firstAltarP.innerHTML =
    "Du står framför ett stenaltare. På altaret står en tom järnskål. I botten av skålen kan du skymta vad som ser ut som torkat blod. Någonting säger dig att altaret kräver ett blodsoffer.";
  firstAltarP.className = "p-text";
  textContainer.append(firstAltarP);

  const firstButton = document.createElement("button");
  firstButton.innerHTML = "Offra ditt blod";
  firstButton.className = "button";
  buttonContainer.append(firstButton);
  firstButton.onclick = unlockingFirstAltar;

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Tillbaka till rummet";
  secondButton.className = "button";
  buttonContainer.append(secondButton);
  secondButton.onclick = loadingSecondScene;

  function unlockingFirstAltar() {
    if (carriedItems.includes("dolk")) {
      textContainer.innerHTML = "";
      buttonContainer.innerHTML = "";

      localStorage.setItem("currentScene", "unlockFirstSuccess");

      const unlockedAltarP = document.createElement("p");
      unlockedAltarP.innerHTML =
        "Du skär ett snitt i din handflata och flämtar till av smärta. Rubinrött blod droppar sakta ner i skålen. Allt är tyst i ett ögonblick innan kedjorna till dörren bredvid altaret vittrar sönder till aska som sakta singlar till marken. Dörren är nu olåst.";
      unlockedAltarP.className = "p-text";
      textContainer.append(unlockedAltarP);

      const continueButton = document.createElement("button");
      continueButton.innerHTML = "Gå genom dörren";
      continueButton.className = "button";
      buttonContainer.append(continueButton);
      continueButton.onclick = loadingDaggerPath;

      const backButton = document.createElement("button");
      backButton.innerHTML = "Tillbaka till rummet";
      backButton.className = "button";
      buttonContainer.append(backButton);
      backButton.onclick = loadingSecondScene;
    } else {
      textContainer.innerHTML = "";
      buttonContainer.innerHTML = "";

      localStorage.setItem("currentScene", "unlockFirstFail");

      const unlockedAltarP = document.createElement("p");
      unlockedAltarP.innerHTML =
        "Du behöver någonting vasst för att offra ditt blod";
      unlockedAltarP.className = "p-text";
      textContainer.append(unlockedAltarP);

      firstButton.remove;

      const backButton = document.createElement("button");
      backButton.innerHTML = "Tillbaka till rummet";
      backButton.className = "button";
      buttonContainer.append(backButton);
      backButton.onclick = loadingSecondScene;
    }
  }
}
function inspectSecondAltar() {
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "secondAltar");
}
function inspectThirdAltar() {
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "thirdAltar");
}

function loadingDaggerPath() {}
