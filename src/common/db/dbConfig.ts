/**
 * @copyright Palace Resorts
 * @description Configura el logger Winston para el comportamiento en las lambdas
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { Base64Manager } from '../helpers/base64Manager'
import { Dictionary } from '../model/dictionary'
import { EnviromentManager } from '../helpers/enviromentManager'
import { enumConfigSource } from './enums'
import { SecretManager } from '../aws/secretsManager'

/**
 * Clase encargada de obtener la informacion para generar una cadena de conexion
 */
export class DbConfig {
  /**
   * Obtiene la informacion para generar una cadena de conexion
   * @param {string} key Nombre de la base de datos
   * @return {Dictionary} Diccionario que contiene las propiedades y valores de la cadena de conexion
   */
  getDbConfigValues(key: string): Dictionary {
    const config: Dictionary =
      Number(process.env.CONFIG_MODE ?? '1') == enumConfigSource.env
        ? this.getConfigFromEnv(key)
        : this.getConfigFromScrt()
    return config
  }
  /**
   * Obtiene informacion de una variable de entorno
   * @param {string} key Nombre de la base de datos
   * @return {Dictionary} Diccionario con la informacion de la bd indicada
   */
  private getConfigFromEnv(key: string): Dictionary {
    const envManager: EnviromentManager = new EnviromentManager()
    const dict: string = envManager.getValue('DB_CONFIG')
    const dcode: string = this.decodeConfigFromB64(dict)
    return JSON.parse(dcode).dbConfig[key]
  }

  /**
   * Obtiene informacion del servicio de aws secrets
   * @return  {Promise<Dictionary>} Diccionario con la informacion de la bd indicada
   */
  private getConfigFromScrt() {
    const scrtManager: SecretManager = new SecretManager()
    return scrtManager.getSecretValue() ?? ''
  }

  /**
   * Decodifica un texto en formato base64
   * @param {string} v Texto en formato base64
   * @return {string} Informacion de la variable de entorno decodificada
   */
  private decodeConfigFromB64(v: string): string {
    const base64Manager: Base64Manager = new Base64Manager()
    return base64Manager.decode(v)
  }
}
