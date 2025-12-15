const animais = [
  "Avestruz","Águia","Burro","Borboleta","Cachorro",
  "Cabra","Carneiro","Camelo","Cobra","Coelho",
  "Cavalo","Elefante","Galo","Gato","Jacaré",
  "Leão","Macaco","Porco","Pavão","Peru",
  "Touro","Tigre","Urso","Veado","Vaca"
];

const grupoSelect  = document.getElementById('grupoSelect');
const grupoManual  = document.getElementById('grupoManual');
const btnGerar     = document.getElementById('btnGerar');
const resultado    = document.getElementById('resultado');
const animalNome   = document.getElementById('animalNome');
const milharesDiv  = document.getElementById('milhares');

// popula o <select>
animais.forEach((animal, i) => {
  const opt = document.createElement('option');
  opt.value = i + 1;
  opt.textContent = `${i + 1} - ${animal}`;
  grupoSelect.appendChild(opt);
});

// sincroniza select ↔ manual
grupoSelect.addEventListener('change', () => grupoManual.value = grupoSelect.value);
grupoManual.addEventListener('input', () => {
  const v = Math.max(1, Math.min(25, Number(grupoManual.value) || 1));
  grupoManual.value = v;
  grupoSelect.value = v;
});

// gera as milhares
btnGerar.addEventListener('click', () => {
  const grupo = Number(grupoSelect.value);
  const base  = (grupo - 1) * 4;           // 0, 4, 8,..., 96
  const dezenasFinais = [base, base + 1, base + 2, base + 3];

  const milhares = Array.from({length: 10}, () => {
    const centena = Math.floor(Math.random() * 100); // 00-99
    const dezenaFinal = dezenasFinais[Math.floor(Math.random() * 4)];
    return (centena * 100 + dezenaFinal).toString().padStart(4, '0');
  });

  animalNome.textContent = animais[grupo - 1];
  milharesDiv.innerHTML  = milhares.map(m => `<span>${m}</span>`).join('');
  resultado.classList.remove('hidden');
});