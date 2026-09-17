import { type Response } from 'express'
import { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import ProbationAccessControlApiClient, { LimitedAccessCheck } from '../data/probationAccessControlApiClient'

export default class CommonUtils {
  async checkLimitedAccess(
    crn: string,
    res: Response,
    authenticationClient: AuthenticationClient,
  ): Promise<LimitedAccessCheck> {
    const probationAccessControlApiClient = new ProbationAccessControlApiClient(authenticationClient)

    return probationAccessControlApiClient.getLimitedAccessCheck(crn, res.locals.user.username)
  }
}
