const fs = require('fs')
const path = require('path')
const { f } = require('./core')

function main() {
  const defaultYamlPath = path.isAbsolute(process.argv[2]) ? process.argv[2] : path.join(process.cwd(), process.argv[2])
  const customYamlPath = path.isAbsolute(process.argv[3]) ? process.argv[3] : path.join(process.cwd(), process.argv[3])

  const defaultYaml = fs.readFileSync(defaultYamlPath, 'utf-8')
  const customYaml = fs.readFileSync(customYamlPath, 'utf-8')

  const stdout = f(defaultYaml, customYaml)
  console.log(stdout)
}

main()
