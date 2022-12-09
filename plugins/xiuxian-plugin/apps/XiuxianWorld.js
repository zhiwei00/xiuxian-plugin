import plugin from '../../../../../lib/plugins/plugin.js';
import pluginup from '../model/pluginup.js';
export class XiuxianWorld extends plugin {
    constructor() {
        super({
            name: 'XiuxianWorld',
            dsc: 'XiuxianWorld',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#修仙存档升级$',
                    fnc: 'Xiuxiandataup'
                },
                {
                    reg: '^#修仙备份$',
                    fnc: 'Xiuxianbackups'
                }
            ]
        });
    };
    Xiuxianbackups=(e)=>{
        if (!e.isMaster) {
            return;
        };
        e.reply('待更新');
        return;
    }
    Xiuxiandataup=(e)=>{
        if (!e.isMaster) {
            return;
        };
        const the=pluginup.pluginupdata();
        if(the!=1){
            e.reply('出错了');
            return;
        };
        e.reply('升级完成');
        return;
    };
};