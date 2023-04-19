const prompt = require('prompt-sync')();
const fs = require('fs');

async function incluirCarro() {
  let placa = prompt(`Placa:`);
  let nome = prompt(`Nome: `);
  let montadora = prompt(`Montadora: `);

  const carro = {
    placa: placa,
    nome: nome,
    montadora: montadora
  };

  try {
    let carros = await obterCarros();
    let lista = JSON.parse(carros).carros;

    adicionaCarro(lista, carro);

  } catch (erro) {
    console.log(erro);
  }


}

function adicionaCarro(lista, carro) {

  lista.push(carro);
  let json = JSON.stringify({ carros: lista });

  return new Promise((resolve, reject) => {
    fs.writeFile('./bd.json', json, (erro) => {

      if (erro) {
        reject(erro);
      }
      resolve('Carro adicionado com sucesso!');
    });
  })
}

function obterCarros() {
  return new Promise((resolve, reject) => {
    fs.readFile('./bd.json', 'utf-8', (erro, data) => {

      if (erro) {
        reject(erro);
      }
      resolve(data);

    })
  });

}

async function listarCarros() {

  const carros = await obterCarros();
  const listar_carros = JSON.parse(carros).carros;
  console.table(listar_carros);

}


async function main() {
  let op;

  do {
    console.log(`Sistema de cadastro de carros:
    
    1 - Listar Carros
    2 - Cadastrar Carros
    0 - Sair
    `);

    op = prompt(`Digite a Opção desejada: `);

    switch (op) {
      case '1':
        await listarCarros();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '2':
        await incluirCarro();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '0':
        console.log(`Obrigado por usar o sistema. Até mais!`);
        break;
      default:
        console.log(`Entrada inválida...`);
    }
  } while (op !== '0');
}

main();