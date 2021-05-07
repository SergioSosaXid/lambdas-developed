/**
 * @copyright Palace Resorts
 * @description Logica de negocio del proceso chargebacktypes
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { DbConstants } from '../../common/db/dbConstants'
import { enumDB, enumDBEngine, enumConfigSource } from '../../common/db/enums'
import { ChargebackType } from '../../common/model/entities'
import { DbParameter } from '../../common/model/dbParameter'
import { MysqlManager } from '../../common/db/mysqlManager'
/**
 * Logica de negocio lambda chargebacks
 */
export class ChargebackTypeManager {
  /**
   *
   * @return {Promise<ChargebackType[]>}
   */
  async getChargebackTypes(): Promise<ChargebackType[]> {
    // Se inicializa el manejador de BD
    const mysqlManager = new MysqlManager(enumDB.chb)
    // Se asigna la configuracion y motor de BD
    return mysqlManager.executeQuery<ChargebackType>(DbConstants.CONST_DB_ALL_CHBTYPES)
  }

  /**
   *
   * @param {string} chtId
   * @return {Promise<object[]>}
   */
  async getChargebackTypeById(chtId: string): Promise<ChargebackType> {
    // Se inicializa el manejador de BD
    const mysqlManager = new MysqlManager(enumDB.chb)
    // Se asigna la configuracion y motor de BD
    const params: DbParameter[] = []

    params.push({ columnName: 'chtID', value: chtId })

    let result = await mysqlManager.executeQuery<ChargebackType>(DbConstants.CONST_DB_CHBTYPE_BY_ID, params)

    return result ? result[0] : {}
  }
}
