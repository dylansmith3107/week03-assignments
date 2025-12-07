//=======================================================
//Local Storage

let stats = JSON.parse(localStorage.getItem("stats")) || {
  totalCookieCount: 0,
  cps: 0,
};

const cookieStats = document.getElementById("cookie-stats");

const cookieCountText = document.createElement("h2");
cookieCountText.textContent = `Cookie count: ${stats.totalCookieCount}`;
cookieStats.appendChild(cookieCountText);

const cpsText = document.createElement("h3");
cpsText.textContent = `Cookies per second (cps): ${stats.cps}`;
cookieStats.appendChild(cpsText);

const title = document.querySelector("title");
title.textContent = `${stats.totalCookieCount} - Cookie Clicker`;

setInterval(function () {
  stats.totalCookieCount = stats.totalCookieCount + stats.cps;
  localStorage.setItem("stats", JSON.stringify(stats));
  cookieCountText.textContent = `Cookie count: ${stats.totalCookieCount}`;
  cpsText.textContent = `Cookies per second (cps): ${stats.cps}`;
  title.textContent = `${stats.totalCookieCount} - Cookie Clicker`;
}, 1000);

//=======================================================
//Clickable cookie

const cookieImg = document.getElementById("cookie-img");

cookieImg.addEventListener("click", function () {
  stats.totalCookieCount = stats.totalCookieCount + 1;
  cookieCountText.textContent = `Cookie count: ${stats.totalCookieCount}`;
  title.textContent = `${stats.totalCookieCount} - Cookie Clicker`;
  localStorage.setItem("stats", JSON.stringify(stats));
});

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
    div.className = "shop-div";
    shopContainer.appendChild(div);

    const upgradeName = document.createElement("h3");
    upgradeName.textContent = shopData[i].name;
    div.appendChild(upgradeName);

    const upgradeCost = document.createElement("p");
    upgradeCost.textContent = `Cost: ${shopData[i].cost}`;
    div.appendChild(upgradeCost);

    const cpsIncrease = document.createElement("p");
    cpsIncrease.textContent = `Increase: ${shopData[i].increase} CPS`;
    div.appendChild(cpsIncrease);

    const purchaseBtn = document.createElement("button");
    purchaseBtn.textContent = "Purchase";
    purchaseBtn.className = "purchase-btn";
    div.appendChild(purchaseBtn);

    const notEnoughCookies = document.createElement("p");
    notEnoughCookies.textContent =
      "You do not have enough cookies to purchase this upgrade";
    notEnoughCookies.className = "not-enough-cookies";
    div.appendChild(notEnoughCookies);

    purchaseBtn.addEventListener("click", function () {
      purchaseUpgrade(i, shopData, notEnoughCookies);
    });
  }
}

function purchaseUpgrade(iValue, shopData, notEnoughCookies) {
  if (stats.totalCookieCount >= shopData[iValue].cost) {
    stats.totalCookieCount = stats.totalCookieCount - shopData[iValue].cost;
    stats.cps = stats.cps + shopData[iValue].increase;
    cookieCountText.textContent = `Cookie count: ${stats.totalCookieCount}`;
    cpsText.textContent = `Cookies per second (cps): ${stats.cps}`;
    title.textContent = `${stats.totalCookieCount} - Cookie Clicker`;
    localStorage.setItem("stats", JSON.stringify(stats));
  } else {
    notEnoughCookies.style.display = "flex";
    setTimeout(function () {
      notEnoughCookies.style.display = "none";
    }, 3000);
  }
}

async function renderShop() {
  const shopApi = await getShopApi();
  createShop(shopApi);
}

renderShop();
