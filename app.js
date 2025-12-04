//=======================================================
//Local Storage

let stats = {
  totalCookieCount: 0,
  cps: 0,
};

const stringifiedStats = JSON.stringify(stats);
localStorage.setItem("stats", stringifiedStats);

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
    const purchaseBtn = document.createElement("button");
    purchaseBtn.textContent = "Purchase";
    purchaseBtn.className = "purchase-btn";
    div.appendChild(purchaseBtn);
    purchaseBtn.addEventListener("click", function () {
      purchaseUpgrade(i, shopData);
    });
  }
}

async function renderShop() {
  const shopApi = await getShopApi();
  createShop(shopApi);
}

function purchaseUpgrade(iValue, shopData) {
  stats.totalCookieCount = stats.totalCookieCount - shopData[iValue].cost;
  stats.cps = stats.cps + shopData[iValue].increase;
  localStorage.setItem("stats", stringifiedStats);
}

renderShop();

setInterval(function () {
  stats.totalCookieCount += stats.cps;
  localStorage.setItem("stats", stringifiedStats);
}, 1000);
