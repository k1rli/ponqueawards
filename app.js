const supabaseUrl = "https://xbfxbmzcpnfhmshzrvea.supabase.co";
const supabaseKey = "sb_publishable__elCXTe-fGfjKCfWLBZZVQ_tby1OKMq";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let userId = localStorage.getItem("userId");

if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("userId", userId);
}

async function loadCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*");

  const container = document.getElementById("categories");
  container.innerHTML = "";

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

  // comprobar si ya votó
  const { data } = await supabaseClient
    .from("votes")
    .select("*")
    .eq("category_id", categoryId)
    .eq("voter_identifier", userId);

  if (data.length > 0) {
    alert("Ya has votado en esta categoría.");
    return;
  }

  await supabaseClient
    .from("votes")
    .insert([
      {
        category_id: categoryId,
        nominee_id: null,
        voter_identifier: userId
      }
    ]);

  alert("Tu voto ha sido registrado correctamente.");
}

loadCategories();
