import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto) {
    const regEx = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regEx)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

function trataErro(erro) {
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro)
    }
}

export default pegaArquivo;
