// Para fazer o Javascript acessar um arquivo em algum lugar do computar
// E consiga trazer e conteúdo para mim (podendo não ser um arquivo '.js')

// fs = file system (biblioteca nativa do NodeJs, por isso não preciso do 'NPM instal') 
// Faz com que a linguagem de programação, consiga interagir com o sistema de arquivos do computador.

import fs from 'fs';
import chalk from 'chalk'; // colorir

// Função trataErro (erro) {
    // erro -> dados recebidos pelo readFile, caso de erro
    // throw -> 'lançar' para o terminal, para facilitr a leitura do erro
    // Error -> Objeto do javascript = ja existente para lidar com estes casos

function trataErro(erro) {
    console.log(erro) // Para visualizar por onde passou o objeto erro
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório')); 

    // erro.code -> todo objeto erro, tem uma propriedade que é o código do erro
}

// Essa função precisa encontrar um arquivo no computador, por isso passo como parâmetro (caminhoDoArquivo)

async function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';

// .readFile = leitura dos arquivos
    // parâmetros {

    //    1º o caminho que terá que percorrer
    //    2º encoding = 'utf-8' ** pesquisar mais depois **
    //    3º uma função callback, que tem dois parâmetros {

    //        1º erro = oque acontece caso houver um erro na busca do arquivo
    //        2º o proprio retorno, que podemos chamar de algum nome
    // }

    // O '_' no primeiro parâmetro da callback, é para o Javascrip não ler aquele, pq nao irei usar

    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if (erro) {
            trataErro(erro);
        }
        console.log(chalk.green(texto));
    } )
}

// O caminho do arquivo, passamos como string
pegaArquivo('./arquivos/texto.md');

// Para acessar a pasta correta para poder usar o código
// Use: node node/index.js


// Função assincrona

    function pegaArquivo(caminhoDoArquivo) {
        const encoding = 'utf-8';
        fs.promises // encadeadas
            .readFile(caminhoDoArquivo, encoding) // recebe apenas 2 parâmetros
            .then((texto) => console.log(chalk.green(texto))) // .then() => 'então', faz alguma outra coisa. Passo como parâmentro, oque quero receber
            .catch(trataErro) // 'pegar' o erro
            // por baixo dos panos, o Js, ja irá passar como parâmetro o "erro"
    }

    // usamos o then() e passamos como parâmetro aqueilo que quero como resultado, e em seguida, na função callback, falamos oque queremos que ele faça assim que recebe o valor da promise

    // Async / await

    async function pegaArquivo(caminhoDoArquivo) {
        try {
            const encoding = 'utf-8';
            const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
            console.log(chalk.green(texto));
        } catch (erro) {
            trataErro(erro)
        }
    }
    
    // Código mais traquilo para quem escreve em forma sincrona e troca para assincrona
    // Bemmmmm por cima.

// regEx

// \[[^[\]]*?\]

// Leitura: \[ [^[\]] *? \]
// Depois da barra invertida, le apenas o colchete
// ^ : sinal de exceto basicamente
// *? : tudo e sem limite

// \(https?:\/\/[^\s?#.].[^\s]*\)

function extraiLinks(texto) { // Precisa do parametro texto para ser lido
    const regEx = /[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; 
    // para poder usar a expressão, precisa estar entre // Ex: /xxx/
    // gm => g -> global, m -> multi-linha
    const capturas = regEx.exec(texto)
    console.log(texto)
}

// .match = fez a combinação e trouxe um array completo, porém temos grupos, para trabalharmos com elas mais facil

// .exec = traz o array separado em grupos pre setados

extraiLinks(textoTeste)

// ******************** //
// Usado no arquivo principal
// Leitura: 
// Função extrai links que recebe com parâmetro 'texto' para poder ser lida
// const regEx: código para poder pegar todos os itens de um links

function extraiLinks(texto) {
    const regEx = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regEx)];
    // crio uma variavel para receber os links que virão, dentro de uma string expandida "..." 
    // Uso o método 'matchAll' para combinar todas as ocorrencias do 'regEx'
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados
}

//******//

// Sempre pesquisar para saber, qual parâmetro a função ou método pedem
// e saber oque ele retorna
// matchAll = método de String e retorna um objeto iterável

// "..." permite que um array ou string(objeto iterável), seja expandida para dentro de um array '[]'

//******//

//.map -> passa por todo um array e retorna um novo array

function extraiLinks(texto) {
    const regEx = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regEx)];
    const links = [];

    for(const match of capturas) {
        const link = { name: match[1], url: match[2] };
        links.push(link);
    }
    return links.length !== 0 ? links : 'não há links no arquivo';
}
// Caso não tenha nenhum link, o array de resultado ser vazio
// Para leitura desse return
// Caso o retorno da lista for diferente de 0, retornamos com um operador ternario "?", se for true = links ":" = senã, retornamos uma string 'Não há links no arquivo'.