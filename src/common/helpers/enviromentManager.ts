/**
 * @copyright Palace Resorts
 * @description Helper que permite obtener la configuracion de una db desde una Variable de entorno.
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */

/**
 * Manejador de variable de entorno
 */
export class EnviromentManager {
  getValue(key: string): string {
    return process.env[key] ?? ''
  }
}
