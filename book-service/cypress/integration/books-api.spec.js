describe('Books API testing', () => {
  beforeEach(() => {
    cy.task('db:reseed')
  })
  it('find-all', () => {
    cy.request('GET', '/find/all').then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.not.be.null
      expect(res.body.length).to.equal(1)
      expect(res.body[0].title).equal('Ulises')
      expect(res.body[0].author).equal('James Joyce')
    })
  })

  it('find-by-id', () => {
    cy.request('GET', '/find/all')
      .then((res) => {
        expect(res.status).to.equal(200)
        return res.body[0]._id
      })
      .then((id) => {
        cy.request('GET', '/find/' + id).then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
          expect(res.body.title).equal('Ulises')
          expect(res.body.author).equal('James Joyce')
        })
      })
  })

  it('create', () => {
    const newBook = {
      "title": "Crime and Punishment",
      "author": "Fyodor Dostoevsky",
      "isbn": "54321"
    }
    cy.request('POST', '/create', newBook)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.not.be.null
        expect(res.body.title).equal('Crime and Punishment')
        expect(res.body.author).equal('Fyodor Dostoevsky')
        expect(res.body.isbn).equal('54321')
        return res.body._id
      }).then((id) => {
        cy.request('GET', '/find/' + id).then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.not.be.null
          expect(res.body.title).equal('Crime and Punishment')
          expect(res.body.author).equal('Fyodor Dostoevsky')
        })
      })
  })

  it('delete', () => {
    cy.request('GET', '/find/all')
      .then((res) => {
        expect(res.status).to.equal(200)
        return res.body[0]._id
      })
      .then((id) => {
        cy.request('POST', '/delete/' + id).then((res) => {
          expect(res.status).to.equal(200)
          return 'ok'
        })
          .then((ok) => {
            cy.request('GET', '/find/all').then((res) => {
              expect(res.status).to.equal(200)
              expect(res.body).to.not.be.null
              expect(res.body.length).to.equal(0)
            })
          })
      })
  })
})