import app from './app.js'
import request from 'supertest'

const validNames = ['Food', 'Gaming', 'Coding', 'Other']

describe("App Test", () => {
  test("GET /", async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API')
  })

  describe('POST /entries', () => {
    let res

    beforeAll(async () => {
      res = await request(app).post('/entries').send({
        category: 'Food',
        content: 'Ice Cream rules!'
      })
    })

    test('Returns a JSON body with _id', () => {
      expect(res.status).toBe(201)
      expect(res.header['content-type']).toMatch('json')
      expect(res.body._id).toBeDefined()
    })

    test('Category has _id and correct name', () => {
      expect(res.body.category).toBeDefined()
      expect(res.body.category._id).toBeDefined()
      expect(res.body.category.name).toBeDefined()
      expect(res.body.category.name).toBe('Food')
    })

    test('Content has the correct value', () => {
      expect(res.body.content).toBeDefined()
      expect(res.body.content).toBe('Ice Cream rules!')
    })
  })

  describe("GET /categories", () => {
    let res

    beforeEach(async() => {
      res = await request(app).get('/categories')
    })

    test('Returns JSON', () => {
      expect(res.status).toBe(200)
      expect(res.header['content-type']).toMatch('json')
    })

    test("Returns an array of 4 elements", () => {
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body).toHaveLength(4)
    })

    test("Each category has a valid 'name' and '_id'", () => {
      res.body.forEach(el => {
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        expect(validNames).toContain(el.name)
      })
    })
  })
})