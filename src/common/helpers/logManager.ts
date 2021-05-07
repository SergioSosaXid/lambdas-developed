/**
 * @copyright Palace Resorts
 * @description Configura el logger Winston para el comportamiento en las lambdas
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOGGIN_LEVEL,
  format: winston.format.colorize(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console({ stderrLevels: ['error'] })]
})
