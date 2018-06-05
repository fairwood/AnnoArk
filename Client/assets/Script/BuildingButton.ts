import BuildPanel from "./BuildPanel";
import ArkUI from "./ArkUI";
import { BuildingInfo, DataMgr } from "./DataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingButton extends cc.Component {

    @property(cc.Label)
    lblName: cc.Label = null;
    @property(cc.Label)
    lblSize: cc.Label = null;

    @property(cc.Label)
    lblConsumption: cc.Label = null;

    info: BuildingInfo;

    setAndRefresh(info: BuildingInfo) {
        this.info = info;
        this.lblName.string = info.Name;
        this.lblSize.string = info.length + '*' + info.width;
        
        let strInfoLines = [];
        for (let i = 0; i < 4; i++) {
            const rawid = info['Raw' + i];
            if (rawid && rawid.length > 0) {
                const rawRate = info['Raw' + i + 'Rate'];
                const cargoInfo = DataMgr.CargoConfig.find(c => c.id == rawid);
                strInfoLines.push(`消耗 ${rawRate}${cargoInfo.Name}/min`);
            }
        }
        for (let i = 0; i < 4; i++) {
            const outid = info['Out' + i];
            if (outid && outid.length > 0) {
                const outRate = info['Out' + i + 'Rate'];
                const cargoInfo = DataMgr.CargoConfig.find(c => c.id == outid);
                strInfoLines.push(`生产 ${outRate}${cargoInfo.Name}/min`);
            }
        }
        if (strInfoLines.length > 0) {
            let str = strInfoLines[0];
            for (let i = 1; i < strInfoLines.length; i++) {
                const line = strInfoLines[i];
                str += '\n' + line;
            }
            this.lblConsumption.string = str;
        } else {
            this.lblConsumption.string = '';
        }

    }

    onClick() {
        BuildPanel.Hide();
        ArkUI.Instance.enterBuildMode(this.info);
    }
}
