const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const diff = require('just-diff')
const diffApply = require('just-diff-apply')

const defaultYaml = fs.readFileSync(path.join(__dirname, './default.yaml'), 'utf-8')
const defaultObject = yaml.load(defaultYaml)

const customYaml = fs.readFileSync(path.join(__dirname, './custom.yaml'), 'utf-8')
const customObject = yaml.load(customYaml)

const patchArray = diff
  .diff(defaultObject, customObject)
  .filter(it => ['replace', 'add'].includes(it.op))
  .map(it => ({ ...it, op: 'add' }))

const resultObject = {}
diffApply.diffApply(resultObject, patchArray)
const resultYaml = yaml.dump(resultObject, { quotingType: '"', forceQuotes: true })
fs.writeFileSync(path.join(__dirname, './result.yaml'), resultYaml)
