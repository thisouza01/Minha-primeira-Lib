// Código para manipulação das informaçoes que passam pelo terminal, para o restante da aplicação

import chalk from 'chalk'; 
import fs from 'fs';
import pegaArquivo from './index.js'; // quando usamos moódulo, temos que escrever o caminho completo. Ex: index.js e não index apenas.

const caminho = process.argv;
// process = Objeto proprio do node
// argv = valores de argumento / argumento é o tipo de informação que passamos da linha de comando para dentro do programa
// o valor de retorno = um array contendo os argumentos passados / 1º caminho de execução / 2º caminho para o arquivo js.

function imprimeLista(resultado, identificador = '') { // identificador declarado com um valor inicial na variável
    console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador), // nome do link que vai chegar
        resultado);
}

// função responsável por mandar pra tela do terminal as informações que está recebendo do código
// Como usamos uma função async(pegaArquivo) nesta função, temos que "avisar" o progema que ele tambem tem que esperar a resposta vindo da outra função
// Por isso passamos essa função como async
async function processaTexto(argumentos) {
    const caminho = argumentos[2]; // caminho = argumentos[2] = para não termos que ficar passando o indice 2 e termos a possibilidade de esquecer

    // Sempre que usar um try, precisa sempre de um catch, para agirem em conjunto
    try {
        fs.lstatSync(caminho); // verifica se o caminho é incorreto ou não
    } catch (erro) { // caso aja um erro, ele é capturado
        if(erro.code === 'ENOENT') { // ENOENT = nome do erro no terminal
            console.log('Arquivo ou diretório não existe');
            return; // retorna apenas a string, sem a stack de erro
        }
    }

    if(fs.lstatSync(caminho).isFile()) { // is file = é um arquivo / true ou false
        const resultado = await pegaArquivo(argumentos[2]); // await por que está função tem código async nela
        imprimeLista(resultado)
    }   else if (fs.lstatSync(caminho).isDirectory()) { // é um diretório
            const arquivos = await fs.promises.readdir(caminho) //.readdir = leitor de diretório, por isso passamos o await anterior, podem ser muitos arquivos e demorar.
            arquivos.forEach(async (nomeDeArquivo) => { // async por que temos um função asincrona dentro do forEach
                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`) //a primeira parte sendo diretório, colocamos no primeiro place holder, já segunda parte, pega cada loop do arquivo, por que cada arquivo tem um nome diferente
                imprimeLista(lista, nomeDeArquivo); // ja tenho como pegar o nome do arquivo, e ja vem em string
            })
        }
    
}

processaTexto(caminho); // recebe a variavel caminho, que por si ja recebe oque está vindo do terminal

// fs.lstatSync( caminho, opçoes ) = true / false
// forEach, apenas percorre o array e precisa de uma callback para funcionar
