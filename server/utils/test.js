const { encrypt, comparePwd, createToken, verifyToken, checkToken } = require('./index')

// encrypt('123456')
//   .then(pwd => {
//     console.log(pwd)
//     return pwd
//   })
//   .then(pwd => {
//     comparePwd('123456', pwd)
//       .then(res => console.log(res))
//   })

// const token = createToken({ id: 123, name: 'Hale' })
// const decoded = verifyToken(token)
//
// console.log(decoded)

checkToken()
