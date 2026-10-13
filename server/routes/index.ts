import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import basicDetailsRoutes from './basicDetails'

export default function routes({ auditService, hmppsAuthClient, commonUtils }: Services): Router {
  const router = Router()

  router.get('/', async (req, res, _next) => {
    await auditService.logPageView(Page.INDEX_PAGE, { who: res.locals.user.username, correlationId: req.id })

    return res.render('pages/index')
  })

  router.get('/parom/:id', async (req, res) => {
    res.redirect(`/basic-details/${req.params.id}`)
  })

  basicDetailsRoutes(router, auditService, hmppsAuthClient, commonUtils)

  return router
}
