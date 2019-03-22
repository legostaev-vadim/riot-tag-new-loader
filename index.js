const riot = require('riot-compiler')
const loaderUtils = require('loader-utils')
const _ = require('lodash')

module.exports = function (source) {

  _.merge(riot, loaderUtils.getOptions(this))
  
  const code = `
    var riot = require('riot')
    ${riot.compile(source, null, this.resourcePath)}`

  return code
}
