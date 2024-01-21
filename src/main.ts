import fs from 'node:fs'
import path from 'node:path'
import { f } from './core'

function main(): void {
  const cwd = process.cwd()
  const [, , p1, p2] = process.argv

  const defaultYamlPath = path.isAbsolute(p1) ? p1 : path.join(cwd, p1)
  const customYamlPath = path.isAbsolute(p2) ? p2 : path.join(cwd, p2)

  const defaultYaml = fs.readFileSync(defaultYamlPath, { encoding: 'utf8' })
  const customYaml = fs.readFileSync(customYamlPath, { encoding: 'utf8' })

  const stdout = f(defaultYaml, customYaml)
  console.log(stdout)
}

main()
