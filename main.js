window.addEventListener("DOMContentLoaded", main);

/**
 * Main function that initializes the application
 * Loads items and the current scene from localStorage
 */
function main() {
  loadItemsFromLocalStorage();
  loadSceneFromLocalStorage();
  startOverButton.onclick = startOver;
}
startButton.onclick = loadFirstScene;

/**
 * Loads current scene from localStorage to return user to last saved state after reload
 */
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
    case "statue":
      loadStatueScene();
      break;
    case "inspectStatue":
      inspectStatue();
      break;
    case "unlockStatue":
      unlockStatue();
      break;
    case "inspectExit":
      inspectExit();
      break;
    case "exit":
      loadExitScene();
      break;
  }
}
/**
 * List containing items picked up by the user
 * @type {string[]}
 */
let carriedItems = [];

/**
 * List containing items placed at the end of the application
 * @type {string[]}
 */
let placedItems = [];

/**
 * Declaration of function that loads items that have been saved to localStorage
 */
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

/**
 * Declaration of function that clears localStorage for carriedItems and placedItems arrays
 * Returns user to loadWelcomeScene function
 */
function startOver() {
  localStorage.clear(carriedItems);
  localStorage.clear(placedItems);
  loadWelcomeScene();
}

/**
 * Function declaration to return user to start of the application
 */
function loadWelcomeScene() {
  localStorage.setItem("currentScene", "welcome");
}

/**
 * Initializes and displays the first scene in the game.
 *
 * This function sets up  HTML structure for the first scene,
 * including  description of the scene, an input field for selecting an item,
 * and buttons for progressing or changing the selected item. Selected items are stored in `carriedItems` array and saved to localStorage.
 *
 * Local storage is updated with the current scene and the selected item.
 */
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
/**
 * Initializes and displays the second scene in the game.
 *
 * This function sets up  HTML structure for the first scene, including  description of the scene, and buttons for inspecting various altars, as well as for backtracking
 */
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

/**
 * Initializes and displays the first altar scene in the game.
 *
 * This function sets up  HTML structure for the first altar scene, including  description of the scene, and button for unlocking the altar, as well as for backtracking
 */
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

/**
 * Handles the interaction logic for attempting to unlock the first altar
 * If the player has the "dolk" (dagger) in their carried items, the function updates the game scene in `localStorage`, clears and updates the UI with a description of unlocking the altar, and provides buttons to continue or go back. If the "dolk" is not present, the function informs the player that they need a sharp object and provides a button to return to the previous room.
 * saves the scene to localStorage
 */
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
    continueButton.onclick = loadStatueScene;

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

/**
 * Initializes and displays the second altar scene in the game.
 *
 * This function sets up  HTML structure for the second altar scene, including  description of the scene, and button for unlocking the altar, as well as for backtracking
 */
function inspectSecondAltar() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "secondAltar");

  const secondAltarP = document.createElement("p");
  secondAltarP.innerHTML =
    "Du står framför ett stenaltare. På altaret står en statyett av en tjock padda, prydd med dyra halsband, ringar och iklädd en krona. Paddans händer är utsträcka och kuperade som om den förväntar sig att du ska lägga någonting i dem.";
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

/**
 * Handles the interaction logic for attempting to unlock the first altar
 * If the player has the "amulett" (amulet) in their carried items, the function updates the game scene in `localStorage`, clears and updates the UI with a description of unlocking the altar, and provides buttons to continue or go back. If the "amulett" is not present, the function informs the player that they need a valuable object and provides a button to return to the previous room.
 * saves the scene to localStorage
 */
function unlockSecondAltar() {
  localStorage.setItem("currentScene", "unlockSecondAltar");
  if (carriedItems.includes("amulett")) {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML =
      "Du lyckas plocka ur rubinen ur amulettens mitt och placerar den försiktigt i paddans utsträckta händer. Allt är tyst i ett ögonblick innan kedjorna till dörren bredvid altaret vittrar sönder till aska som sakta singlar till marken. Dörren är nu olåst.";
    unlockedAltarP.className = "p-text";
    textContainer.append(unlockedAltarP);

    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Gå genom dörren";
    continueButton.className = "button";
    buttonContainer.append(continueButton);
    continueButton.onclick = loadStatueScene;

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

/**
 * Initializes and displays the third altar scene in the game.
 *
 * This function sets up  HTML structure for the third altar scene, including  description of the scene, and button for unlocking the altar, as well as for backtracking
 */
function inspectThirdAltar() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "thirdAltar");

  const thirdAltarP = document.createElement("p");
  thirdAltarP.innerHTML =
    "Du står framför ett stenaltare. På altaret står en stenrelief föreställande en folksamling som uppmärksamt lyssnar till en central figur som ser ur att läsa från en bok. Någonting säger dig att du behöver läsa upp någonting.";
  thirdAltarP.className = "p-text";
  textContainer.append(thirdAltarP);

  const firstButton = document.createElement("button");
  firstButton.innerHTML = "Recitera en passage.";
  firstButton.className = "button";
  buttonContainer.append(firstButton);
  firstButton.onclick = unlockThirdAltar;

  const secondButton = document.createElement("button");
  secondButton.innerHTML = "Tillbaka till rummet";
  secondButton.className = "button";
  buttonContainer.append(secondButton);
  secondButton.onclick = loadSecondScene;
}

/**
 * Handles the interaction logic for attempting to unlock the first altar
 * If the player has the "bok" (book) in their carried items, the function updates the game scene in `localStorage`, clears and updates the UI with a description of unlocking the altar, and provides buttons to continue or go back. If the "bok" is not present, the function informs the player that they need a valuable object and provides a button to return to the previous room.
 * saves the scene to localStorage
 */
function unlockThirdAltar() {
  localStorage.setItem("currentScene", "unlockThirdAltar");
  if (carriedItems.includes("bok")) {
    welcomeHeading.innerHTML = "";
    textContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    const unlockedAltarP = document.createElement("p");
    unlockedAltarP.innerHTML =
      "Du öppnar boken och bläddrar igenom de gamla sidorna. Även om boken ser uråldrig ut är pappret i gott skick.Boken verkar vara skriven på ett språk du inte kan förstå, men när du börjar läsa texten högt märker du hur du ditt uttal och tempo på något sätt är perfekt. Allt är tyst i ett ögonblick innan kedjorna till dörren bredvid altaret vittrar sönder till aska som sakta singlar till marken. Dörren är nu olåst.";
    unlockedAltarP.className = "p-text";
    textContainer.append(unlockedAltarP);

    const continueButton = document.createElement("button");
    continueButton.innerHTML = "Gå genom dörren";
    continueButton.className = "button";
    buttonContainer.append(continueButton);
    continueButton.onclick = loadStatueScene;

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

/**
 * Loads and renders statue scene
 * This function sets up  HTML structure for the first altar scene, including  description of the scene and interactive buttons.
 * Depending on which items are carried, different variations of the scene descriptions are changed and displayed.
 */
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
  backButton.onclick = loadSecondScene;

  if (
    placedItems.includes("dolk") &&
    placedItems.includes("amulett") &&
    placedItems.includes("bok")
  ) {
    statueSceneP.innerHTML =
      "Statyn har nu alla sina föremål och fällgallret har öppnat sig. Du har nu möjligheten att lämna salen.";
    inspectExitButton.innerHTML = "Lämna salen";
    inspectExitButton.onclick = loadExitScene;
  }
}

/**
 * Loads and renders a more detailed description of the statue. Contains logic for displaying various states of the statue, depending on which items the user places onto the statue.
 * Contains logic allowing the user to place an item onto statue, depending on which item they carry.
 */
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
    insertAmuletButton.innerHTML = "Placera amuletten runt statyns hals";
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

  if (placedItems.includes("dolk")) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. <strong>Dess högra hand är lyft och sluten runt dolken du har placerat där</strong>. Den vänstra handen hålls ut i midjehöjd med handflatan upp mot taket, och även här ser det ut som att statyn en gång har hållit i ett föremål, kanske något platt. Vid statyns hals ser du spår av rispor, som om någonting en gång har hängt runt statyns hals. Vad vill du göra?";
  }
  if (placedItems.includes("amulett")) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. Dess högra hand är lyft och sluten runt ett förmodligen cylindriskt föremål som inte längre finns i handen. Den vänstra handen hålls ut i midjehöjd med handflatan upp mot taket, och även här ser det ut som att statyn en gång har hållit i ett föremål, kanske något platt. <strong>Runt statyns hals hänger nu amuletten du placerat där</strong>. Vad vill du göra?";
  }
  if (placedItems.includes("bok")) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. Dess högra hand är lyft och sluten runt ett förmodligen cylindriskt föremål som inte längre finns i handen. <strong>I statyns vänstra hand ligger nu boken du har placerat där.</strong> Vid statyns hals ser du spår av rispor, som om någonting en gång har hängt runt statyns hals. Vad vill du göra?";
  }
  if (placedItems.includes("dolk") && placedItems.includes("amulett")) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. <strong>Dess högra hand är lyft och sluten runt dolken du har placerat där</strong>. Den vänstra handen hålls ut i midjehöjd med handflatan upp mot taket, och även här ser det ut som att statyn en gång har hållit i ett föremål, kanske något platt. <strong>Runt statyns hals hänger nu amuletten du placerat där</strong>. Vad vill du göra?";
  }
  if (placedItems.includes("dolk") && placedItems.includes("bok")) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. <strong>Dess högra hand är lyft och sluten runt dolken du har placerat där</strong>. <strong>I statyns vänstra hand ligger nu boken du har placerat där.</strong> Vid statyns hals ser du spår av rispor, som om någonting en gång har hängt runt statyns hals. Vad vill du göra?";
  }
  if (placedItems.includes("bok") && placedItems.includes("amulett")) {
    ("Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. Dess högra hand är lyft och sluten runt ett förmodligen cylindriskt föremål som inte längre finns i handen. <strong>I statyns vänstra hand ligger nu boken du har placerat där.</strong> <strong>Runt statyns hals hänger nu amuletten du placerat där</strong>. Vad vill du göra?");
  }
  if (
    placedItems.includes("dolk") &&
    placedItems.includes("amulett") &&
    placedItems.includes("bok")
  ) {
    statueSceneP.innerHTML =
      "Statyn framför dig föreställer en person iklädd en skrud med en luva uppdragen över huvudet. <strong>Dess högra hand är lyft och sluten runt dolken du har placerat där</strong>. <strong>I statyns vänstra hand ligger nu boken du har placerat där.</strong> <strong>Runt statyns hals hänger nu amuletten du placerat där.</strong> Gallret som blockerade gången är nu uppdraget. Vad vill du göra?";
  }
}

/**
 * Renders feedback to the user depending on which item they place upon the statue.
 * Contains logic moving items from carriedItems array to placedItems array and saving them to localStorage.
 */
function unlockStatue() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "unlockStatue");

  const movedItem = carriedItems.pop();
  if (movedItem) {
    placedItems.push(movedItem);
  }

  localStorage.setItem("carriedItems", JSON.stringify(carriedItems));
  localStorage.setItem("placedItems", JSON.stringify(placedItems));

  if (
    placedItems.includes("dolk") &&
    placedItems.includes("amulett") &&
    placedItems.includes("bok")
  ) {
    const statueSceneP = document.createElement("p");
    statueSceneP.innerHTML =
      "Ett rasslande av kedjor och vinchar ekar genom salen och fällgallret höjs sakta upp och försvinner upp igenom taket.";
    statueSceneP.className = "p-text";
    textContainer.append(statueSceneP);
  } else {
    const statueSceneP = document.createElement("p");
    statueSceneP.innerHTML =
      "Ett mekaniskt ljud hörs från fällgallret, som om ett lås öppnades. Gallret är dock fortfarande nedfällt.";
    statueSceneP.className = "p-text";
    textContainer.append(statueSceneP);
  }

  const backButton = document.createElement("button");
  backButton.innerHTML = "Tillbaka till statyn";
  backButton.className = "button";
  buttonContainer.append(backButton);
  backButton.onclick = inspectStatue;
}

/**
 * Renders scene to allow for inspection of a closed dates, including button to allow of backtracking
 * Contains logic for whether or not the gate is shut, depending on if all items have been placed on the statue.
 */
function inspectExit() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "inspectExit");

  if (
    placedItems.includes("dolk") &&
    placedItems.includes("amulett") &&
    placedItems.includes("bok")
  ) {
    const inspectExitP = document.createElement("p");
    inspectExitP.innerHTML =
      "Ett rasslande av kedjor och vinchar ekar genom salen och fällgallret höjs sakta upp och försvinner upp igenom taket.";
    inspectExitP.className = "p-text";
    textContainer.append(inspectExitP);

    const exitButton = document.createElement("button");
    exitButton.innerHTML = "Lämna salen";
    exitButton.className = "button";
    buttonContainer.append(exitButton);
    backButton.onclick = loadExitScene;

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  } else {
    const inspectExitP = document.createElement("p");
    inspectExitP.innerHTML = "Fällgallret är nedfällt och går inte att rubba";
    inspectExitP.className = "p-text";
    textContainer.append(inspectExitP);

    const backButton = document.createElement("button");
    backButton.innerHTML = "Tillbaka till rummet";
    backButton.className = "button";
    buttonContainer.append(backButton);
    backButton.onclick = loadStatueScene;
  }
}

/**Renders the exit scene, describing how the user manages to escape the catacomb */
function loadExitScene() {
  welcomeHeading.innerHTML = "";
  textContainer.innerHTML = "";
  buttonContainer.innerHTML = "";

  localStorage.setItem("currentScene", "exit");

  const exitSceneP = document.createElement("p");
  exitSceneP.innerHTML =
    "Du går upp för trappan och sätter axeln mot dörren och trycker till. Dörren går upp och du bländas av dagsljus. Efter ett par ögonblick vänjer sig dina ögon och du befinner dig ute i den friska luften. Du har kommit ut ur katakomben och är fri.";
  exitSceneP.className = "p-text";
  textContainer.append(exitSceneP);
}
