const search = document.getElementById("search");
const results = document.getElementById("results");

search.addEventListener("input", async () => {
  const q = search.value.trim();
  results.innerHTML = "";

  if (q.length < 2) return;

  const res = await fetch(
    `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(q)}`
  );
  const data = await res.json();

  for (const name of data.data || []) {
    const li = document.createElement("li");
    li.textContent = name;
    results.appendChild(li);
  }
});