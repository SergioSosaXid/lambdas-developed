/**
 * @copyright Palace Resorts
 * @description Clase que se encarga de configurar la conexion a una db MySql
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import * as mysqlConn from 'mysql'
import { DbParameter } from '../model/dbParameter'
import { Dictionary } from '../model/dictionary'
import { DbConfig } from './dbConfig'

import { enumDB, enumDBEngine, enumConfigSource } from './enums'
import { IDbConnect } from './iDbConnect'

/**
 * Manejador de MySQL
 */
export class MysqlManager implements IDbConnect {
  dbName: enumDB

  constructor(dbName: enumDB) {
    this.dbName = dbName
  }

  getConnectionInfo(): Dictionary {
    const dbConfig = new DbConfig()
    const configValues = dbConfig.getDbConfigValues(this.dbName)
    return configValues
  }
  getConnectionString(): Dictionary {
    const configData: Dictionary = this.getConnectionInfo()
    return {
      host: configData.DB_SERVER,
      user: configData.DB_USER,
      password: configData.DB_PASS,
      database: configData.DB_NAME,
      port: configData.DB_PORT,
      charset: configData.DB_CHARSET
    }
  }
  createConnection(): mysqlConn.Connection {
    return mysqlConn.createConnection(this.getConnectionString())
  }
  executeQuery<Type>(query: string, params: DbParameter[] = []): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      const dbparams: { [key: string]: any } = {}
      // Se inicializa la conexion
      const conn = this.createConnection()

      conn.config.queryFormat = (query, values) => {
        if (!values) return query
        return query.replace(/\@(\w+)/g, (txt: string, key: any) => {
          if (values.hasOwnProperty(key)) {
            return mysqlConn.escape(values[key])
          }
          return txt
        })
      }
      // Iniciamos la conexion.
      conn.connect((err) => {
        if (err) {
          reject(err)
        }
      })
      if (params.length > 0) {
        params.forEach((param) => {
          dbparams[param.columnName] = param.value
        })
      }
      // Se genera el query
      conn.query(query, dbparams, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (result.length > 0) {
            resolve(result)
          }
        }
      })

      conn.end((err) => {
        if (err) {
          reject(err)
        }
      })
    })
  }
}
