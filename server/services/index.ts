import { dataAccess } from '../data'
import AuditService from './auditService'
import ParomService from './paromService'
import CommonUtils from './commonUtils'

export const services = () => {
  const { applicationInfo, hmppsAuthClient, hmppsAuditClient } = dataAccess()

  return {
    applicationInfo,
    hmppsAuthClient,
    auditService: new AuditService(hmppsAuditClient),
    paromService: new ParomService(),
    commonUtils: new CommonUtils(),
  }
}

export type Services = ReturnType<typeof services>
