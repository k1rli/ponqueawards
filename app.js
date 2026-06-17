const supabaseUrl = "https://xbfxbmzcpnfhmshzrvea.supabase.co";
const supabaseKey = "TU_KEY_AQUI";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadCategories() {
  let { data, error } = await supabaseClient
    .from("categories")
    .select("*");

  const container = document.getElementById("categories");

  data.forEach(cat => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h2>${cat.name}</h2>
      <p>${cat.description}</p>
      <button onclick="vote(${cat.id})">Votar</button>
    `;
    container.appendChild(div);
  });
}

async function vote(categoryId) {
  alert("Voto registrado (base lista, siguiente paso lo mejoramos)");
}

loadCategories();
