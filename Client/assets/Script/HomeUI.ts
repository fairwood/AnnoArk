import CsvMain from "./CvsMain";
import BaseUI from "./BaseUI";
import MainCtrl from "./MainCtrl";
import { DataMgr, UserData, CargoData } from "./DataMgr";
import WorldUI from "./WorldUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeUI extends BaseUI {
    static Instance: HomeUI;
    onLoad() {
        HomeUI.Instance = this;
    }

    @property(cc.Button)
    btnClaim0: cc.Button = null;
    @property(cc.Button)
    btnClaim1: cc.Button = null;
    @property(cc.Button)
    btnClaim2: cc.Button = null;

    start() {
        if (DataMgr.myData) {
            if (!DataMgr.myData.arkSize) {
                DataMgr.myData = null;
            }
        }
        if (DataMgr.myData) {
            CsvMain.EnterUI(WorldUI);
        }
    }

    onClaim(event, index: string) {
        switch (index) {
            case '0': {
                DataMgr.myData = MainCtrl.Instance.generateNewArk(9);
                this.enterGameWithArk();
                break;
            }
            case '1': {
                //TODO:调用合约
                break;
            }
            case '2': {
                //TODO:调用合约
                break;
            }
        }
        DataMgr.myBuildingData = [];
    }

    enterGameWithArk() {
        DataMgr.myCargoData = [];
        DataMgr.CargoConfig.forEach(cargoInfo=>{
            let data = new CargoData();
            data.id = cargoInfo.id;
            data.amount = 0;
            DataMgr.myCargoData.push(data);
        })
        CsvMain.EnterUI(WorldUI);
    }

    onBookClick() {
        console.log('哪有白皮书')
    }
}
