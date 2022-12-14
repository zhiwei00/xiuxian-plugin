import { appname } from './yunzai/index.js'
import noderequire from './db/noderequire.js'
const FS=noderequire.fs()
const PATH=noderequire.path()
class index {
  toindex = async (input) => {
    let filepath = `./plugins/${appname}/` + input
    let apps = {}
    let name = []
    let newsum = []
    const travel = (dir, callback) => {
      FS.readdirSync(dir).forEach((file) => {
        let model = dir.search('model')
        if (model == -1) {
          let resources = dir.search('resources')
          if (resources == -1) {
            let temporary = file.search('.js')
            if (temporary != -1) {
              let y = file.replace('.js', '')
              name.push(y)
            }
            var pathname = PATH.join(dir, file)
            if (FS.statSync(pathname).isDirectory()) {
              travel(pathname, callback)
            } else {
              callback(pathname)
            }
          }
        }
      })
    }
    travel(filepath, (pathname) => {
      let temporary = pathname.search('.js')
      if (temporary != -1) {
        newsum.push(pathname)
      }
    })
    for (var j = 0; j < newsum.length; j++) {
      newsum[j] = newsum[j].replace(/\\/g, '/')
      newsum[j] = newsum[j].replace(`plugins/${appname}`, '')
      apps[name[j]] = (await import(`..${newsum[j]}`))[name[j]]
    }
    return apps
  }
}
export default new index()