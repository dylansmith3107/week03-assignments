//=======================================================
//Local Storage

let stats = {
  totalCookieCount: 0,
  cps: 0,
};

const stringifiedPreferences = JSON.stringify(stats);
localStorage.setItem("stats", stringifiedPreferences);

//=======================================================
//Shop upgrades

async function getShopApi() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  console.log(data);
  return data;
}
//getShopApi();

const shopContainer = document.getElementById("shop-container");

function createShop(shopData) {
  for (let i = 0; i < shopData.length; i++) {
    const div = document.createElement("div");
    div.className = "shopDiv";
    shopContainer.appendChild(div);
    const upgradeName = document.createElement("h3");
    upgradeName.textContent = shopData[i].name;
    div.appendChild(upgradeName);
    const upgradeCost = document.createElement("p");
    upgradeCost.textContent = shopData[i].cost;
    div.appendChild(upgradeCost);
    const cpsIncrease = document.createElement("p");
    cpsIncrease.textContent = shopData[i].increase;
    div.appendChild(cpsIncrease);
  }
}

async function renderShop() {
  const shopApi = await getShopApi();
  createShop(shopApi);
}

renderShop();
