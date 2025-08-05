// Начальные значения
let balance = parseInt(localStorage.getItem("vurn") || 0);
let vurnPerTap = parseInt(localStorage.getItem("vurnPerTap") || 1);
let autoClickerEnabled = localStorage.getItem("autoClicker") === "true";

// Отображаем баланс
document.getElementById("balance").innerText = "VURN: " + balance;

// Кнопка "Тап"
document.getElementById("tap-btn").addEventListener("click", () => {
  balance += vurnPerTap;
  saveProgress();
  updateUI();
});

// Сохранение прогресса
function saveProgress() {
  localStorage.setItem("vurn", balance);
  localStorage.setItem("vurnPerTap", vurnPerTap);
  localStorage.setItem("autoClicker", autoClickerEnabled);
}

// Обновление интерфейса
function updateUI() {
  document.getElementById("balance").innerText = "VURN: " + balance;
}

// Апгрейды
function openUpgrades() {
  showPopup(`
    <h3>🧬 Апгрейды</h3>
    <button onclick="buyUpgrade('x2', 50)">x2 кликов (50 VURN)</button><br><br>
    <button onclick="buyUpgrade('auto', 200)">Автокликер (200 VURN)</button>
  `);
}

function buyUpgrade(type, cost) {
  if (balance < cost) {
    showPopup("❌ Недостаточно VURN");
    return;
  }

  balance -= cost;

  if (type === "x2") {
    vurnPerTap *= 2;
    showPopup("✅ Теперь кликов в 2 раза больше!");
  }

  if (type === "auto" && !autoClickerEnabled) {
    autoClickerEnabled = true;
    startAutoClicker();
    showPopup("✅ Автокликер включен!");
  }

  saveProgress();
  updateUI();
}

// Автокликер (каждую секунду 1 тап)
function startAutoClicker() {
  if (autoClickerEnabled) {
    setInterval(() => {
      balance += vurnPerTap;
      saveProgress();
      updateUI();
    }, 1000);
  }
}

if (autoClickerEnabled) {
  startAutoClicker();
}

// Задания (пока фейковые)
function openQuests() {
  showPopup(`
    <h3>🎯 Задания</h3>
    <ul style="text-align:left;">
      <li>✔ Натапай 100 VURN</li>
      <li>⬜ Купи 1 апгрейд</li>
      <li>⬜ Получи 200 VURN</li>
    </ul>
  `);
}

// Рейтинг (в будущем — с сервером)
function openLeaderboard() {
  showPopup(`
    <h3>🏆 Рейтинг</h3>
    <p>Твой результат: <b>${balance} VURN</b></p>
    <p>Скоро будет общий рейтинг!</p>
  `);
}

// Popup окно
function showPopup(content) {
  const popup = document.getElementById("popup");
  popup.innerHTML = content;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 4000);
}
