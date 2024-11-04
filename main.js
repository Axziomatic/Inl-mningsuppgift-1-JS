window.addEventListener("DOMContentLoaded", main);

function main() {
  loadingWelcomeScene();
}

function loadingWelcomeScene() {
  firstButton.onclick = loadingFirstScene;
}

const listOfItems = ["Dolk", "Amulett", "Bok"];

function loadingFirstScene() {
  welcomeHeading.innerHTML = "";
  const firstSceneP = document.createElement("p");
  firstSceneP.innerHTML =
    "Du vaknar upp i en mörk gång. Väggarna är gjorda av sten och längs med gången hänger facklor som brinner med ett märkligt turkost ljus. Du har ingen aning om hur du hamnade här. I gångens bortre ände är en gammal stängd träport, och framför dig på golvet ligger tre föremål; en <strong>DOLK</strong> som glimmar i det dunkla ljuset, en vacker <strong>AMULETT</strong> med en rubin i mitten och en dammig gammal <strong>BOK</strong>. Vilket av föremålen vill du plocka upp?";
  firstSceneP.className = "p-text";
  textContainer.append(firstSceneP);
  const itemInputElement = document.createElement("input");
  itemInputElement.className = "itemInputField";
  textContainer.append(itemInputElement);
  //   firstButton.innerHTML = "Dolk";
  //   const secondButton = document.createElement("button");
  //   secondButton.className = "button";
  //   secondButton.innerHTML = "Amulett";
  //   buttonContainer.append(secondButton);
  //   const thirdButton = document.createElement("button");
  //   thirdButton.className = "button";
  //   thirdButton.innerHTML = "Bok";
  //   buttonContainer.append(thirdButton);
}

function loadingSecondScene() {}
