import { dataAccess } from '../data'
import AuditService from './auditService'
import ParomService from './paromService'
import CommonUtils from './commonUtils'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, paromApiClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    paromService: new ParomService(paromApiClient),
    commonUtils: new CommonUtils(),
  }
}

export type Services = ReturnType<typeof services>
