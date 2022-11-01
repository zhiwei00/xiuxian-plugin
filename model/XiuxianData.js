import fs from "node:fs"
import Config from "./Config.js"
import path from "path"

let all = [];
let commodities = [];
/*
  数据封装
 */
class XiuxianData {
    constructor() {
        //默认配置
        this.configData = Config.getdefSet("version", "version")
        //插件根目录
        const __dirname = path.resolve() + path.sep + "plugins" + path.sep + "xiuxian-emulator-plugin"
        //修仙配置
        this.filePathMap = {
            "player": path.join(__dirname, "/resources/data/birth/xiuxian/player"),
            "equipment": path.join(__dirname, "/resources/data/birth/xiuxian/equipment"),
            "najie": path.join(__dirname, "/resources/data/birth/xiuxian/najie"),
            "birthassociation": path.join(__dirname, "/resources/data/birth/association"),
            "fixedequipment": path.join(__dirname, "/resources/data/fixed/equipment"),
            "fixedgoods": path.join(__dirname, "/resources/data/fixed/goods"),
            "fixedlib": path.join(__dirname, "/resources/data/fixed/item"),
            "fixedLevel": path.join(__dirname, "/resources/data/fixed/Level"),
            "fixedoccupation": path.join(__dirname, "/resources/data/fixed/occupation"),
            "fixedplace": path.join(__dirname, "/resources/data/fixed/place"),
            "fixedtalent": path.join(__dirname, "/resources/data/fixed/talent"),
            "all": path.join(__dirname, "/resources/data/fixed/all"),
        }
        this.association = this.filePathMap.birthassociation;
        this.fixedequipment = this.filePathMap.fixedequipment;
        this.goods = this.filePathMap.fixedgoods;
        this.lib = this.filePathMap.fixedlib;
        this.Level = this.filePathMap.fixedLevel;
        this.occupation = this.filePathMap.fixedoccupation;
        this.place = this.filePathMap.fixedplace;
        this.talent = this.filePathMap.fixedtalent;
        this.all = this.filePathMap.all;

        this.deletelist('all');
        this.deletelist('commodities');

        //怪物
        this.monster_list = JSON.parse(fs.readFileSync(`${this.lib}/monster_list.json`));
        //境界
        this.Level_list = JSON.parse(fs.readFileSync(`${this.Level}/Level_list.json`));
        this.LevelMax_list = JSON.parse(fs.readFileSync(`${this.Level}/LevelMax_list.json`));
        //装备
        this.fabao_list = JSON.parse(fs.readFileSync(`${this.fixedequipment}/fabao_list.json`));
        this.wuqi_list = JSON.parse(fs.readFileSync(`${this.fixedequipment}/wuqi_list.json`));
        this.huju_list = JSON.parse(fs.readFileSync(`${this.fixedequipment}/huju_list.json`));
        //物品
        this.danyao_list = JSON.parse(fs.readFileSync(`${this.goods}/danyao_list.json`));
        this.daoju_list = JSON.parse(fs.readFileSync(`${this.goods}/daoju_list.json`));
        this.gongfa_list = JSON.parse(fs.readFileSync(`${this.goods}/gongfa_list.json`));
        this.ring_list = JSON.parse(fs.readFileSync(`${this.goods}/ring_list.json`));
        //地点
        this.didian_list = JSON.parse(fs.readFileSync(`${this.place}/didian_list.json`));
        this.forbiddenarea_list = JSON.parse(fs.readFileSync(`${this.place}/forbiddenarea_list.json`));
        this.timeplace_list = JSON.parse(fs.readFileSync(`${this.place}/timeplace_list.json`));
        //灵根
        this.talent_list = JSON.parse(fs.readFileSync(`${this.talent}/talent.json`));

        //所有信息
        this.all_list = JSON.parse(fs.readFileSync(`${this.all}/all.json`));
        this.commodities_list = JSON.parse(fs.readFileSync(`${this.all}/commodities.json`));

        this.list(this.fabao_list, all, 99);
        this.list(this.wuqi_list, all, 99);
        this.list(this.huju_list, all, 99);
        this.list(this.danyao_list, all, 99);
        this.list(this.daoju_list, all, 99);
        this.list(this.gongfa_list, all, 99);
        this.list(this.ring_list, all, 99);
        this.add(all, 'all');

        this.list(this.fabao_list, commodities, 6);
        this.list(this.wuqi_list, commodities, 6);
        this.list(this.huju_list, commodities, 6);
        this.list(this.danyao_list, commodities, 6);
        this.list(this.gongfa_list, commodities, 6);
        this.add(commodities, 'commodities');
    }

    //删除
    deletelist(name) {
        let sum = [];
        let dir = path.join(this.all, `${name}.json`);
        let new_ARR = JSON.stringify(sum, "", "\t");
        fs.writeFileSync(dir, new_ARR, 'utf8', (err) => {
        });
    }

    //存临时数组
    list(add, sum, acount) {
        add.forEach((item, index) => {
            if (index < acount) {
                sum.push(item);
            }
        });
    }

    //添加临时数组
    add(sum, name) {
        let dir = path.join(this.all, `${name}.json`);
        let new_ARR = JSON.stringify(sum, "", "\t");
        fs.writeFileSync(dir, new_ARR, 'utf8', (err) => {
        })
            ;
    }

    //新增信息
    addlist(sum, add, name, acount) {
        add.forEach((item, index) => {
            if (index < acount) {
                sum.push(item);
            }
        });
        let dir = path.join(this.all, `${name}.json`);
        let new_ARR = JSON.stringify(sum, "", "\t");
        fs.writeFileSync(dir, new_ARR, 'utf8', (err) => {
        })
            ;
    }

    /**
      * 检测存档存在
      * @param file_path_type ["player" , "association" ]
      * @param file_name 
      */
    existData(file_path_type, file_name) {
        let file_path;
        file_path = this.filePathMap[file_path_type];
        let dir = path.join(file_path + '/' + file_name + '.json');
        if (fs.existsSync(dir)) {
            return true;
        }
        return false;
    }

    /**
     * 获取文件数据(user_qq为空查询item下的file_name文件)
     * @param file_name  [player,equipment,najie]
     * @param user_qq
     */
    getData(file_name, user_qq) {
        let file_path;
        let dir;
        let data;
        if (user_qq) {//带user_qq的查询数据文件
            file_path = this.filePathMap[file_name];
            dir = path.join(file_path + '/' + user_qq + '.json');
        }
        else {//不带参数的查询item下文件
            file_path = this.filePathMap.lib;
            dir = path.join(file_path + '/' + file_name + '.json');
        }
        try {
            data = fs.readFileSync(dir, 'utf8')
        }
        catch (error) {
            logger.error('读取文件错误：' + error);
            return "error";
        }
        //将字符串数据转变成json格式
        data = JSON.parse(data);
        return data;
    }


    /**
     * 写入数据
     * @param file_name [player,equipment,najie]
     * @param user_qq
     * @param data
     */
    setData(file_name, user_qq, data) {
        let file_path;
        let dir;
        if (user_qq) {
            file_path = this.filePathMap[file_name];
            dir = path.join(file_path + '/' + user_qq + '.json');
        } else {
            file_path = this.filePathMap.lib;
            dir = path.join(file_path + '/' + file_name + '.json');
        }
        let new_ARR = JSON.stringify(data, "", "\t");//json转string
        if (fs.existsSync(dir)) {
            fs.writeFileSync(dir, new_ARR, 'utf-8', (err) => {
                console.log('写入成功', err)
            })
        }
        return;
    }

}

export default new XiuxianData();

