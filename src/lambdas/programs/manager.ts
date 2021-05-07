/**
 * @copyright Palace Resorts
 * @description Logica de negocio del proceso programs
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { TYPES } from 'tedious'
import { DbConstants } from '../../common/db/dbConstants'
import { enumDB } from '../../common/db/enums'
import { MssqlManager } from '../../common/db/mssqlManager'
import { DbParameter } from '../../common/model/dbParameter'
import { Program } from '../../common/model/entities'
/**
 * Logica de negocios program
 */
export class ProgramManager {
  /**
   *
   * @return {Promise<Program[]>}
   */
  async getPrograms(): Promise<Program[]> {
    // Se inicializa el manejador de BD
    const mssqlManager = new MssqlManager(enumDB.im)
    // Se ejecuta el query
    return mssqlManager.executeQuery<Program>(DbConstants.CONST_DB_ALL_PROGRAM)
  }

  /**
   *
   * @param {string} pgId
   * @return {Promise<object[] | undefined>}
   */
  async getProgramById(pgId: string): Promise<Program> {
    // Se inicializa el manejador de BD
    const mssqlManager = new MssqlManager(enumDB.im)
    const params: DbParameter[] = []

    params.push({ columnName: 'pgID', value: pgId })
    // Se ejecuta el query
    const result: Program[] = await mssqlManager.executeQuery<Program>(DbConstants.CONST_DB_PROGRAM_BY_ID, params)

    return result ? result[0] : {}
  }
}
