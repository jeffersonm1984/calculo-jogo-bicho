const tabela = {
  1:"Avestruz",2:"Águia",3:"Burro",4:"Borboleta",5:"Cachorro",6:"Cabra",
  7:"Carneiro",8:"Camelo",9:"Cobra",10:"Coelho",11:"Cavalo",12:"Elefante",
  13:"Galo",14:"Gato",15:"Jacaré",16:"Leão",17:"Macaco",18:"Porco",
  19:"Pavão",20:"Peru",21:"Touro",22:"Tigre",23:"Urso",24:"Veado",25:"Vaca"
};

const pad = n => n.toString().padStart(2,'0');
const grupoDe = m => ((m % 100) % 25) || 25;

// limita dias futuros
const hoje = new Date().toISOString().slice(0,10);
document.getElementById('dataSel').max = hoje;
document.getElementById('dataSel').value = hoje;

async function buscaPorData(yyyy,mm,dd){
  // formato do nome do JSON histórico: 2024-12-10.json
  const url = `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/historico/${yyyy}-${pad(mm)}-${pad(dd)}.json`;
  const rsp  = await fetch(url);
  if(!rsp.ok) return null;
  return rsp.json();
}

async function gerarPalpite(){
  const btn = document.getElementById('btn');
  btn.disabled = true;
  btn.textContent = 'Carregando...';

  const [yyyy,mm,dd] = document.getElementById('dataSel').value.split('-').map(Number);
  let data = await buscaPorData(yyyy,mm,dd);

  // fallback: tenta o mais recente (hoje)
  if(!data){
    data = await buscaPorData(...hoje.split('-').map(Number));
    if(!data){
      alert('Palpite ainda não disponível para esta data.');
      btn.disabled = false;
      btn.textContent = 'Gerar Palpite';
      return;
    }
  }

  const animal = tabela[data.grupo];
  document.getElementById('animal').textContent = '🐾 ' + animal;
  document.getElementById('grupo').textContent  = `Grupo ${pad(data.grupo)}`;
  document.getElementById('detalhes').textContent = JSON.stringify(data,null,2);
  document.getElementById('box').classList.remove('hidden');

  btn.disabled = false;
  btn.textContent = 'Gerar Palpite';
}

document.getElementById('btn').addEventListener('click', gerarPalpite);