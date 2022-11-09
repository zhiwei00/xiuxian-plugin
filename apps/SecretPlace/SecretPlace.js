//插件加载
import plugin from '../../../../lib/plugins/plugin.js'
import {Go,Read_action} from '../Xiuxian/Xiuxian.js'
export class SecretPlace extends plugin {
    constructor() {
        super({
            name: 'SecretPlace',
            dsc: 'SecretPlace',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#修仙状态$',
                    fnc: 'Xiuxianstate'
                },
                {
                    reg: '^#击杀$',
                    fnc: 'Kill'
                },
                {
                    reg: '^#前往.*$',
                    fnc: 'forward'
                },
                {
                    reg: '^#移动.*$',
                    fnc: 'move'
                },
                {
                    reg: '^#位置信息$',
                    fnc: 'address'
                }
            ]
        })
    }

    async address(e){
        let usr_qq = e.user_id;
        let action=await Read_action(usr_qq);
        e.reply("坐标("+action.x+","+action.x+","+action.z+")");
        return;
    }

    async Xiuxianstate(e) {
        await Go(e);
        return;
    }

    async Kill(e) {
        e.reply("待更新");
        return;
    }
    
    async move(e) {
        e.reply("待更新");
        return;
    }

}
