/**
 * @copyright Palace Resorts
 * @description Clase que se encarga de configurar la conexion a una db MSSQL
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { ColumnValue, Connection, Request, TYPES } from 'tedious'
import { DbParameter } from '../model/dbParameter'
import { DbConfig } from './dbConfig'
import { Dictionary } from '../model/dictionary'
import { enumDB } from './enums'
import { IDbConnect } from './iDbConnect'
import { logger } from '../helpers/logManager'

/**
 * Manejador de MSSQL
 */
export class MssqlManager implements IDbConnect {
  dbName!: enumDB
  /**
   * Constructor de la clase
   * @param  {enumDB} dbName
   * @param  {enumConfigSource} configMode
   */
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
      server: configData.DB_SERVER,
      authentication: {
        type: 'default',
        options: {
          userName: configData.DB_USER,
          password: configData.DB_PASS
        }
      },
      options: {
        instanceName: configData.DB_INSTANCE,
        database: configData.DB_NAME,
        encrypt: false,
        rowCollectionOnDone: true,
        useColumnNames: true
      }
    }
  }

  createConnection(): Connection {
    return new Connection(this.getConnectionString())
  }

  executeQuery<Type>(query: string, params: DbParameter[] = []): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      const result: Type[] = []
      // Se inicializa la conexion
      const conn = this.createConnection()
      // Se crea el comando a ajecutar en bd
      const req = new Request(query, (err) => {
        if (err) {
          logger.error(err)
          reject(err)
        } else {
          resolve(result)
        }
      })

      if (params.length > 0) {
        params.forEach((param) => {
          req.addParameter(param.columnName, param.type ?? TYPES.VarChar, param.value)
        })
      }

      // Se extraen los valores del resultado
      req.on('row', (columns: ColumnValue[]) => {
        const item: { [name: string]: any } = {}
        for (const name in columns) {
          if (name) {
            item[name] = columns[name].value
          }
        }
        result.push(<Type>item)
      })

      // Se inicializa la conexion y ejecuta la consulta
      conn.on('connect', (err) => {
        if (err) {
          logger.error(err)
          reject(err)
        } else {
          conn.execSql(req)
        }
      })
      // Se abre conexion
      conn.connect()
    })
  }
}
