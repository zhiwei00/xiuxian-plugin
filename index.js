import Config from './model/Config.js'
import index from './model/index.js'
import Schedule from './model/xiuxian/schedule.js'
Schedule.scheduleJobflie('0 0 */1 * * ?')
Schedule.allLife('0 0 */1 * * ?')
const versionData = Config.getdefSet('version', 'version')
const xiuxain = await index.toindex('apps')
const plugin = await index.toindex('plugins')
const apps = { ...xiuxain, ...plugin }
logger.info(`Game-Box&&xiuxian-plugin[V${versionData[0].version}]`)
export { apps } 