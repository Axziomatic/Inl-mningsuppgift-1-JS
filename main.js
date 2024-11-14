window.addEventListener("DOMContentLoaded", main);

function main() {
  loadItemsFromLocalStorage();
  loadSceneFromLocalStorage();
}
// loadingWelcomeScene();

function loadSceneFromLocalStorage() {
  const scene = localStorage.getItem("currentScene");
  switch (scene) {
    case "first":
      loadFirstScene();
      break;
    case "second":
      loadSecondScene();
      break;
    case "firstAltar":
      inspectFirstAltar();
      break;
    case "unlockFirstAltar":
      inspectFirstAltar();
      break;
    case "secondAltar":
      inspectSecondAltar();
      break;
    case "unlockSecondAltar":
      unlockSecondAltar();
      break;
    case "thirdAltar":
      inspectThirdAltar();
      break;
    case "unlockThirdAltar":
      unlockThirdAltar();
      break;
    case "daggerPath":
      loadingDaggerPath();
      break;
    case "statue":
      loadStatueScene();
      break;
    case "inspectStatue":
      inspectStatue();
      break;
    case "unlockStatue":
      unlockStatue();
      break;
  }
}

let carriedItems = [];
let placedItems = [];

startOverButton.onclick = startOver;
startButton.onclick = loadFirstScene;

function loadItemsFromLocalStorage() {
  const carriedItemsString = localStorage.getItem("carriedItems");
  const placedItemsString = localStorage.getItem("placedItems");
  if (carriedItemsString) {
    carriedItems = JSON.parse(carriedItemsString);
  }
  if (placedItemsString) {
    placedItems = JSON.parse(placedItemsString);
  }
}

function startOver() {
  localStorage.clear(carriedItems);
  localStorage.clear(placedItems);
  loadingWelcomeScene();
}

function loadingWelcomeScene() {
  localStorage.setItem("currentScene", "welcome");
}

function loadFirstScene() {
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
  continueButton.onclick = loadSecondScene;
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

function loadSecondScene() {
  welcomeHeading.innerHTML = "";
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
  fourthButton.onclick = loadFirstScene;
}

function inspectFirstAltar() {
  welcomeHeading.innerHTML = "";
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
  firstButton.onclick = unlockFirstAltar;

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Tillbaka till rummet";
  secondButton.className = "button";
  buttonContainer.append(secondButton);
  secondButton.onclick = loadSecondScene;
}

function unlockFirstAltar() {
  if (carriedItems.includes("dolk")) {
    localStorage.setItem("currentScene", "unlockFirstAltar");
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

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
    backButton.onclick = loadSecondScene;
  } else {
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML =
      "Du behöver någonting vasst för att offra ditt blod";
    unlockedAltarP.className = "p-text";
    textContainer.append(unlockedAltarP);

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadSecondScene;
  }
}

function inspectSecondAltar() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "secondAltar");

  const secondAltarP = document.createElement("p");
  secondAltarP.innerHTML = "ANDRA ALTARET";
  secondAltarP.className = "p-text";
  textContainer.append(secondAltarP);

  const firstButton = document.createElement("button");
  firstButton.innerHTML = "Skänk något dyrbart";
  firstButton.className = "button";
  buttonContainer.append(firstButton);
  firstButton.onclick = unlockSecondAltar;

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Tillbaka till rummet";
  secondButton.className = "button";
  buttonContainer.append(secondButton);
  secondButton.onclick = loadSecondScene;
}

function unlockSecondAltar() {
  localStorage.setItem("currentScene", "unlockSecondAltar");
  if (carriedItems.includes("amulett")) {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML = "RUBINEN LÅSER UPP";
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
    backButton.onclick = loadSecondScene;
  } else {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML = "Du behöver någonting dyrbart att skänka";
    unlockedAltarP.className = "p-text";
    textContainer.append(unlockedAltarP);

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadSecondScene;
  }
}

function inspectThirdAltar() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "thirdAltar");

  const thirdAltarP = document.createElement("p");
  thirdAltarP.innerHTML = "TREDJE ALTARET";
  thirdAltarP.className = "p-text";
  textContainer.append(thirdAltarP);

  const firstButton = document.createElement("button");
  firstButton.innerHTML = "Recitera en text";
  firstButton.className = "button";
  buttonContainer.append(firstButton);
  firstButton.onclick = unlockThirdAltar;

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Tillbaka till rummet";
  secondButton.className = "button";
  buttonContainer.append(secondButton);
  secondButton.onclick = loadSecondScene;
}

function unlockThirdAltar() {
  localStorage.setItem("currentScene", "unlockThirdAltar");
  if (carriedItems.includes("bok")) {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML = "BOKEN LÅSER UPP";
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
    backButton.onclick = loadSecondScene;
  } else {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML = "Du behöver en text att recitera";
    unlockedAltarP.className = "p-text";
    textContainer.append(unlockedAltarP);

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadSecondScene;
  }
}

function loadingDaggerPath() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "daggerPath");

  const daggerPathP = document.createElement("p");
  daggerPathP.innerHTML = "DAGGER PATH";
  daggerPathP.className = "p-text";
  textContainer.append(daggerPathP);

  const continueButton = document.createElement("button");
  continueButton.innerHTML = "Gå genom dörren";
  continueButton.className = "button";
  buttonContainer.append(continueButton);
  continueButton.onclick = loadStatueScene;

  const backButton = document.createElement("button");
  backButton.innerHTML = "Tillbaka till förra rummet";
  backButton.className = "button";
  buttonContainer.append(backButton);
  backButton.onclick = loadSecondScene;
}

function loadStatueScene() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "statue");

  const statueSceneP = document.createElement("p");
  statueSceneP.innerHTML =
    "Du kommer in i ett kupolformat rum med tre dörrar i ena den halvcirkeln du gör entré från. I mitten av rummet står en staty i granit och bakom statyn finns en utgång, täckt av ett fällgaller. Genom gallret kan du skymta en trappa som leder uppåt, och vid toppen av trappan ser du en dörr genom vilkens glipor strimmar dagsljus. Vad vill du göra?";
  statueSceneP.className = "p-text";
  textContainer.append(statueSceneP);

  const inspectStatueButton = document.createElement("button");
  inspectStatueButton.innerHTML = "Undersök statyn";
  inspectStatueButton.className = "button";
  buttonContainer.append(inspectStatueButton);
  inspectStatueButton.onclick = inspectStatue;

  const inspectExitButton = document.createElement("button");
  inspectExitButton.innerHTML = "Undersök fällgallret";
  inspectExitButton.className = "button";
  buttonContainer.append(inspectExitButton);
  inspectExitButton.onclick = inspectExit;

  const backButton = document.createElement("button");
  backButton.innerHTML = "Tillbaka till förra rummet";
  backButton.className = "button";
  buttonContainer.append(backButton);
  backButton.onclick = loadingDaggerPath;
}

function inspectStatue() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "inspectStatue");

  const statueSceneP = document.createElement("p");
  statueSceneP.innerHTML =
    "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. Dess högra hand är lyft och sluten runt ett förmodligen cylindriskt föremål som inte längre finns i handen. Den vänstra handen hålls ut i midjehöjd med handflatan upp mot taket, och även här ser det ut som att statyn en gång har hållit i ett föremål, kanske något platt. Vid statyns hals ser du spår av rispor, som om någonting en gång har hängt runt statyns hals. Vad vill du göra?";
  statueSceneP.className = "p-text";
  textContainer.append(statueSceneP);

  if (carriedItems.includes("dolk")) {
    const insertDaggerButton = document.createElement("button");
    insertDaggerButton.innerHTML = "Placera dolken i statyns högra hand";
    insertDaggerButton.className = "button";
    buttonContainer.append(insertDaggerButton);
    insertDaggerButton.onclick = unlockStatue;

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  } else if (carriedItems.includes("bok")) {
    const insertBookButton = document.createElement("button");
    insertBookButton.innerHTML = "Placera boken i statyns vänstra hand";
    insertBookButton.className = "button";
    buttonContainer.append(insertBookButton);
    insertBookButton.onclick = unlockStatue;

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  } else if (carriedItems.includes("amulett")) {
    const insertAmuletButton = document.createElement("button");
    insertAmuletButton.innerHTML = "Placera boken i statyns vänstra hand";
    insertAmuletButton.className = "button";
    buttonContainer.append(insertAmuletButton);
    insertAmuletButton.onclick = unlockStatue;

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  } else {
    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  }
}

function unlockStatue() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "unlockStatue");

  const statueSceneP = document.createElement("p");
  statueSceneP.innerHTML = "LÅS ÖPPET";
  statueSceneP.className = "p-text";
  textContainer.append(statueSceneP);

  const movedItem = carriedItems.pop();
  if (movedItem) {
    placedItems.push(movedItem);
  }

  localStorage.setItem("carriedItems", JSON.stringify(carriedItems));
  localStorage.setItem("placedItems", JSON.stringify(placedItems));

  const backButton = document.createElement("button");
  backButton.innerHTML = "Tillbaka till statyn";
  backButton.className = "button";
  buttonContainer.append(backButton);
  backButton.onclick = inspectStatue;
}

function inspectExit() {}
