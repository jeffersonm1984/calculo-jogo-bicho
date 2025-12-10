// tabela grupo → animal
const tabela = {
  1:"Avestruz",2:"Águia",3:"Burro",4:"Borboleta",5:"Cachorro",6:"Cabra",
  7:"Carneiro",8:"Camelo",9:"Cobra",10:"Coelho",11:"Cavalo",12:"Elefante",
  13:"Galo",14:"Gato",15:"Jacaré",16:"Leão",17:"Macaco",18:"Porco",
  19:"Pavão",20:"Peru",21:"Touro",22:"Tigre",23:"Urso",24:"Veado",25:"Vaca"
};

function grupoDe(milhar){
  return ((milhar % 100) % 25) || 25;
}

async function gerarPalpite(){
  const btn = document.getElementById('btn');
  btn.disabled = true;
  btn.textContent = 'Carregando...';

  try{
    // JSON atualizado diariamente pelo GitHub Action (mesmo repo)
    const rsp = await fetch('https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/resultado.json');
    if(!rsp.ok) throw new Error('JSON não encontrado');
    const data = await rsp.json();

    const animal = tabela[data.grupo];
    document.getElementById('animal').textContent = '🐾 ' + animal;
    document.getElementById('grupo').textContent = `Grupo ${data.grupo.toString().padStart(2,'0')}`;
    document.getElementById('detalhes').textContent = JSON.stringify(data, null, 2);
    document.getElementById('box').classList.remove('hidden');
  }catch(e){
    alert('Erro: ' + e.message);
  }finally{
    btn.disabled = false;
    btn.textContent = 'Gerar Palpite';
  }
}

document.getElementById('btn').addEventListener('click', gerarPalpite);