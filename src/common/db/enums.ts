/**
 * @copyright Palace Resorts
 * @description Archivo que almacena los enumerados que se utilizan en las lambdas
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
export enum enumDBEngine {
  mssql = 1,
  mysql,
  dynamoDB
}

export enum enumConfigSource {
  env = 1,
  scrt
}

export enum enumDB {
  im = 'IM',
  chb = 'CHB'
}
