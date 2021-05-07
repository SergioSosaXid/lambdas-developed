/**
 * @copyright Palace Resorts
 * @description Entidad CommonResponse
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { Header } from './headers'

export type CommonResponse = {
  statusCode: number
  body: string
  headers: Header
}
