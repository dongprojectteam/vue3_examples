module.exports.setup = function (app, db) {
  app.put('/db/accounts/:email/:password/:oldpassword', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.get(
      `SELECT * FROM tbl_accounts WHERE (email='${req.params.email}' OR email='vue') AND grade='owner'`,
      (err, row) => {
        if (!err && row) {
          if (row['password'] != req.params.password) {
            result.rsp = 'wrong_password'
            result.temp = row
            res.json(result)
          } else {
            db.run(
              `UPDATE tbl_accounts SET email='${req.params.email}', password='${req.params.oldpassword}' WHERE (email='${req.params.email}' OR email='vue') AND grade='owner' AND password='${req.params.password}'`,
              (err1) => {
                if (err1) {
                  result.error = err1.message
                  res.json(result)
                } else {
                  result.rsp = 'ok'
                  result.temp = `UPDATE tbl_accounts SET email='${req.params.email}', password='${req.params.oldpassword}' WHERE (email='${req.params.email}' OR email='vue') AND grade='owner' AND password='${req.params.password}'`
                  res.json(result)
                }
              }
            )
          }
        } else {
          result.rsp = 'no_email'
          res.json(result)
        }
      }
    )
  })
}
