import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService, { Page } from '../services/auditService'
import ParomService from '../services/paromService'
import HmppsAuditClient from '../data/hmppsAuditClient'
import ParomApiClient from '../data/paromApiClient'

jest.mock('../services/auditService')
jest.mock('../services/paromService')

const auditService = new AuditService({} as HmppsAuditClient) as jest.Mocked<AuditService>
const paromService = new ParomService({} as ParomApiClient) as jest.Mocked<ParomService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
      paromService,
    },
    userSupplier: () => user,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /', () => {
  it('should render index page', () => {
    auditService.logPageView.mockResolvedValue(undefined)

    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('This site is under construction...')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.INDEX_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
