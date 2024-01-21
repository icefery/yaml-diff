import yaml from 'js-yaml'
import diff from 'just-diff'
import diffApply, { type DiffOps } from 'just-diff-apply'

export function f(defaultYaml: string, customYaml: string): string {
  const defaultObject = yaml.load(defaultYaml) as object
  const customObject = yaml.load(customYaml) as object
  const resultObject = {}

  const patchArray = diff
    .diff(defaultObject, customObject)
    .filter(it => ['replace', 'add'].includes(it.op))
    .map(it => ({ ...it, op: 'add' })) as DiffOps

  diffApply.diffApply(resultObject, patchArray)

  return yaml.dump(resultObject, { quotingType: "'" })
}
