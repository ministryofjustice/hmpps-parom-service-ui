import { RestClient } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'

export default class ParomApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Parom API', config.apis.parom, logger, authenticationClient)
  }
}
