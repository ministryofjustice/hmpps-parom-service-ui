import { type Response } from 'express'
import { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import ProbationAccessControlApiClient, { LimitedAccessCheck } from '../data/probationAccessControlApiClient'
import { Parom } from '../data/paromApiClient'

export default class CommonUtils {
  async redirectRequired(
    parom: Parom,
    paromId: string,
    res: Response,
    authenticationClient: AuthenticationClient,
  ): Promise<boolean> {
    if (parom.completedDate != null) {
      res.redirect(`/report-completed/${paromId}`)
      return true
    }

    const probationAccessControlApiClient = new ProbationAccessControlApiClient(authenticationClient)

    const laoCheck: LimitedAccessCheck = await probationAccessControlApiClient.getLimitedAccessCheck(
      parom.crn,
      res.locals.user.username,
    )
    if (laoCheck.userExcluded || laoCheck.userRestricted) {
      res.render('pages/limited-access', {
        laoCheck,
      })
      return true
    }

    if (parom.terminated === true) {
      res.redirect(`/event-terminated/${paromId}`)
      return true
    }

    return false
  }
}
