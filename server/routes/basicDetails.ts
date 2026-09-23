import { Router } from 'express'
import { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import AuditService, { Page } from '../services/auditService'
import CommonUtils from '../services/commonUtils'
import { NDeliusIntegrationApiClient, ParomApiClient } from '../data'
import { Parom } from '../data/paromApiClient'
import { BasicDetails } from '../data/ndeliusIntegrationApiClient'

export default function basicDetailsRoutes(
  router: Router,
  auditService: AuditService,
  authenticationClient: AuthenticationClient,
  commonUtils: CommonUtils,
): Router {
  const currentPage = 'basic-details'

  router.get('/basic-details/:id', async (req, res) => {
    await auditService.logPageView(Page.BASIC_DETAILS, { who: res.locals.user.username, correlationId: req.id })
    const paromClient = new ParomApiClient(authenticationClient)
    const ndeliusIntegrationApiClient = new NDeliusIntegrationApiClient(authenticationClient)
    const paromId: string = req.params.id
    const callingScreen: string = req.query.returnTo as string
    const basicDetails: BasicDetails = null
    let parom: Parom = null

    parom = await paromClient.getParomById(paromId, res.locals.user.username)

    if (await commonUtils.redirectRequired(parom, paromId, res, authenticationClient)) return

    res.render('pages/basic-details', {
      parom,
      paromId,
      currentPage,
    })
  })

  return router
}
