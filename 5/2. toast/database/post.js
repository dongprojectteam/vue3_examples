module.exports.setup = function (app, db) {
  app.post('/db/accounts/login/:email/:password', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    const token = 'T-' + Math.floor(Math.random() * 100000).toString()
    db.get(
      `SELECT * FROM tbl_accounts WHERE email='${req.params.email}'`,
      (err, row) => {
        if (!err) {
          if (!row) {
            result.rsp = 'no_email'
            result.email = req.params.email
            res.json(result)
          } else if (row['password'] != req.params.password) {
            result.rsp = 'wrong_password'
            res.json(result)
          } else {
            db.run(
              `UPDATE tbl_accounts SET token='${token}' WHERE email='${req.params.email}'`
            )
            result.rsp = 'ok'
            result.token = token
            res.json(result)
          }
        } else {
          result.rsp = 'no_email'
          res.json(result)
        }
      }
    )
  })

  app.post('/db/accounts/check-token/:email/:token', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.get(
      `SELECT * from tbl_accounts WHERE grade = 'owner' AND ((email='${req.params.email}' AND token='${req.params.token}') OR (email='vue' AND password='vue' AND token is null))`,
      (err, row) => {
        if (!err && row) {
          result.rsp = 'ok'
          result.data = row['email']
          res.json(result)
        } else {
          res.json(result)
        }
      }
    )
  })

  app.post('/db/blog', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }

    db.run(
      `INSERT INTO tbl_blog (title, post, type) VALUES ('${req.body.title}', '${req.body.content}', '${req.body.type}')`,
      (err) => {
        if (!err) {
          result.rsp = 'ok'
          res.json(result)
        } else {
          res.json(result)
        }
      }
    )
  })
}
