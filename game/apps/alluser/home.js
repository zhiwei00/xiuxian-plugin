export class home {
    consumption_danyao = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        let thing = e.msg.replace('#服用', '')
        const code = thing.split('\*')
        let [thing_name, thing_acount] = code
        thing_acount = await Numbers(thing_acount)
        const najie_thing = await exist_najie_thing_name(UID, thing_name)
        if (najie_thing == 1) {
            return [`没有${thing_name}`]
        }
        if (najie_thing.acount < thing_acount) {
            return ['数量不足']
        }
        const id = najie_thing.id.split('-')
        const msg = []
        if (id[1] == 1) {
            let blood = parseInt(najie_thing.blood)
            await Add_blood(UID, blood)
            msg.push(`血量恢复至${blood}%`)
        } else if (id[1] == 2) {
            let experience = parseInt(najie_thing.experience)
            await Add_experience(UID, thing_acount * experience)
            msg.push(`修为增加${thing_acount * najie_thing.experience}`)
        } else if (id[1] == 3) {
            let experiencemax = parseInt(najie_thing.experiencemax)
            await Add_experiencemax(UID, thing_acount * experiencemax)
            msg.push(`气血增加${thing_acount * najie_thing.experiencemax}`)
        } else {
            msg.push(`不可服用${thing_name}`)
            return msg
        }
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, najie_thing, -thing_acount)
        await Write_najie(UID, najie)
        return msg
    }
    add_gongfa = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const thing_name = e.msg.replace('#学习', '')
        const najie_thing = await exist_najie_thing_name(UID, thing_name)
        if (najie_thing == 1) {
            return [`没有[${thing_name}]`]
        }
        const id = najie_thing.id.split('-')
        if (id[0] != 5) {
            return []
        }
        const talent = await Read_talent(UID)
        const islearned = talent.AllSorcery.find(item => item.id == najie_thing.id)
        if (islearned) {
            return ['学过了']
        }
        if (talent.AllSorcery.length >= this.xiuxianConfigData.myconfig.gongfa) {
            e.reply('你反复看了又看,却怎么也学不进')
            return
        }
        talent.AllSorcery.push(najie_thing)
        await Write_talent(UID, talent)
        await player_efficiency(UID)
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, najie_thing, -1)
        await Write_najie(UID, najie)
        return [`学习${thing_name}`]
    }
    delete_gongfa = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const thing_name = e.msg.replace('#忘掉', '')
        const talent = await Read_talent(UID)
        const islearned = talent.AllSorcery.find(item => item.name == thing_name)
        if (!islearned) {
            return [`没学过${thing_name}`]
        }
        talent.AllSorcery = talent.AllSorcery.filter(item => item.name != thing_name)
        await Write_talent(UID, talent)
        await player_efficiency(UID)
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, islearned, 1)
        await Write_najie(UID, najie)
        return [`忘了${thing_name}`]
    }
    consumption_daoju = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const thing_name = e.msg.replace('#消耗', '')
        const najie_thing = await exist_najie_thing_name(UID, thing_name)
        if (najie_thing == 1) {
            return [`没有[${thing_name}]`]
        }
        const id = najie_thing.id.split('-')
        if (id[0] != 6) {
            return []
        }
        const msg = []
        if (id[2] == 1) {
            const player = await Read_level(UID)
            if (player.level_id >= 10) {
                return ['[天机门]石昊\n你灵根已定\n此生不可再洗髓']
            }
            const talent = await Read_talent(UID)
            talent.talent = await get_talent()
            await Write_talent(UID, talent)
            await player_efficiency(UID)
            const img = await get_player_img(UID)
            msg.push(img)
        } else if (id[2] == 2) {
            const talent = await Read_talent(UID)
            talent.talentshow = 0
            await Write_talent(UID, talent)
            const img = await get_player_img(UID)
            msg.push(img)
        } else {
            return msg
        }
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, najie_thing, -1)
        await Write_najie(UID, najie)
        return msg
    }
}