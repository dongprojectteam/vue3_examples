module.exports.setup = function (app, db) {
  app.get('/', (req, res, next) => {
    res.json({ rsp: 'ok' })
  })

  app.get('/db/about-me', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.get('SELECT * FROM tbl_about_myself', (err, row) => {
      if (!err) {
        result.data = row
        db.all(
          'SELECT * FROM tbl_my_resume ORDER BY date desc',
          (err2, rows) => {
            if (!err2) {
              result.rsp = 'ok'
              result.data.resume = rows
              res.json(result)
            } else {
              res.json(result)
            }
          }
        )
      } else {
        res.json(result)
      }
    })
  })

  app.get('/db/applications', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.all('SELECT * FROM tbl_applications ORDER BY date desc', (err, rows) => {
      if (!err) {
        result.rsp = 'ok'
        result.data = rows
        res.json(result)
      } else {
        res.json(result)
      }
    })
  })
}
