import { asSystem, RestClient } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'

export default class ParomApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Parom API', config.apis.parom, logger, authenticationClient)
  }

  async getParomById(uuid: string, username: string): Promise<Parom> {
    return this.get(
      {
        path: `/parom/${uuid}`,
      },
      asSystem(username),
    )
  }
}

export interface Parom {
  id: string
  crn: string
  dateOfBirth: string
  completedDate: string
  terminated: boolean
  terminatedUnterminatedDate: Date
}
