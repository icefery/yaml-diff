const yaml = require('js-yaml')
const diff = require('just-diff')
const diffApply = require('just-diff-apply')

function f(defaultYaml, customYaml) {
  const defaultObject = yaml.load(defaultYaml)
  const customObject = yaml.load(customYaml)

  const patchArray = diff
    .diff(defaultObject, customObject)
    .filter(it => ['replace', 'add'].includes(it.op))
    .map(it => ({ ...it, op: 'add' }))
  const resultObject = {}
  diffApply.diffApply(resultObject, patchArray)

  return yaml.dump(resultObject, { quotingType: '"', forceQuotes: true })
}

module.exports = { f }
