const corpus = (window.LARGE_SENTENCE_CORPUS && window.LARGE_SENTENCE_CORPUS.sentences) || [];
const pageSize = 20;
const totalDays = Math.max(1, Math.ceil(corpus.length / pageSize));
let currentDay = getDayFromUrl();
let hiddenChinese = false;
let mastered = JSON.parse(localStorage.getItem("sentenceStudioDailyMastered") || "[]");

function getDayFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const day = Number(params.get("day") || localStorage.getItem("sentenceStudioLastDay") || 1);
  return clampDay(day);
}

function clampDay(day) {
  if (!Number.isFinite(day)) return 1;
  return Math.min(Math.max(Math.trunc(day), 1), totalDays);
}

function dayItems() {
  const start = (currentDay - 1) * pageSize;
  return corpus.slice(start, start + pageSize);
}

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function renderDay() {
  const items = dayItems();
  const startNumber = (currentDay - 1) * pageSize + 1;
  const endNumber = startNumber + items.length - 1;
  const doneCount = items.filter(item => mastered.includes(item.id)).length;

  document.querySelector("#dayTitle").textContent = `Day ${currentDay}`;
  document.querySelector("#dayMeta").textContent = `第 ${startNumber}-${endNumber} 句 / 共 ${corpus.length} 句 · 共 ${totalDays} 天`;
  document.querySelector("#dayInput").value = currentDay;
  document.querySelector("#dayInput").max = totalDays;
  document.querySelector("#dailyHeading").textContent = `Day ${currentDay} · ${items.length} 句`;
  document.querySelector("#dailyProgress").textContent = `今日已掌握 ${doneCount} / ${items.length} 句。`;
  document.body.classList.toggle("hidden-cn", hiddenChinese);

  document.querySelector("#dailyGrid").innerHTML = items.map((item, index) => {
    const done = mastered.includes(item.id);
    return `<article class="sentence-card ${done ? "daily-done" : ""}" data-id="${item.id}">
      <div class="card-top">
        <div class="badges"><span class="badge">#${startNumber + index}</span><span class="badge level-${item.level}">${levelLabel(item.level)}</span><span class="badge">${item.topic}</span></div>
        <button class="speak" type="button" data-speak="${escapeAttr(item.text)}">▶</button>
      </div>
      <p class="english">${item.text}</p>
      <p class="translation">${item.cn}</p>
      <p class="note">${item.note}</p>
      <div class="keywords">${item.keywords.map(([word, meaning]) => `<span class="keyword"><strong>${word}</strong>：${meaning}</span>`).join("")}</div>
      <button class="master ${done ? "done" : ""}" type="button" data-master="${item.id}">${done ? "已掌握" : "标记掌握"}</button>
    </article>`;
  }).join("");

  localStorage.setItem("sentenceStudioLastDay", String(currentDay));
  history.replaceState(null, "", `?day=${currentDay}`);
}

function levelLabel(level) {
  return { foundation: "奠基", bridge: "过渡", ielts: "雅思", band7: "冲 7" }[level] || level;
}

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

document.addEventListener("click", event => {
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) speak(speakButton.dataset.speak);

  const masterButton = event.target.closest("[data-master]");
  if (masterButton) {
    const id = masterButton.dataset.master;
    mastered = mastered.includes(id) ? mastered.filter(item => item !== id) : [...mastered, id];
    localStorage.setItem("sentenceStudioDailyMastered", JSON.stringify(mastered));
    renderDay();
  }
});

document.querySelector("#prevDay").addEventListener("click", () => {
  currentDay = clampDay(currentDay - 1);
  renderDay();
});

document.querySelector("#nextDay").addEventListener("click", () => {
  currentDay = clampDay(currentDay + 1);
  renderDay();
});

document.querySelector("#dayInput").addEventListener("change", event => {
  currentDay = clampDay(Number(event.target.value));
  renderDay();
});

document.querySelector("#readDay").addEventListener("click", () => speak(dayItems().map(item => item.text).join(". ")));
document.querySelector("#hideChinese").addEventListener("click", () => {
  hiddenChinese = !hiddenChinese;
  document.querySelector("#hideChinese").textContent = hiddenChinese ? "显示中文" : "隐藏中文";
  renderDay();
});
document.querySelector("#stopAudio").addEventListener("click", () => window.speechSynthesis.cancel());

renderDay();