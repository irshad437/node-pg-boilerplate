let cache_helper = require('./cache')

cache_helper
  .set('mykey2', 'myvalue2')
  .then((r) => {
    console.log('r', r)
  })
  .catch((r) => {
    console.log('e', r)
  })
