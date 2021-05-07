/**
 * @copyright Palace Resorts
 * @description Interfaz que define el contrato para crear un parametro de base de datos (MSSQL y MySQL)
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { TediousType } from 'tedious'

export interface DbParameter {
  columnName: string
  value: any
  type?: TediousType
}
