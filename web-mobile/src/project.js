require=function r(i,c,l){function s(o,t){if(!c[o]){if(!i[o]){var e="function"==typeof require&&require;if(!t&&e)return e(o,!0);if(u)return u(o,!0);var n=new Error("Cannot find module '"+o+"'");throw n.code="MODULE_NOT_FOUND",n}var a=c[o]={exports:{}};i[o][0].call(a.exports,function(t){return s(i[o][1][t]||t)},a,a.exports,r,i,c,l)}return c[o].exports}for(var u="function"==typeof require&&require,t=0;t<l.length;t++)s(l[t]);return s}({ArkInWorld:[function(t,o,e){"use strict";cc._RF.push(o,"dec21HFq/1BXrPvCkgOJBUs","ArkInWorld"),Object.defineProperty(e,"__esModule",{value:!0});var n=cc._decorator,a=n.ccclass,r=n.property,i=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.sprArk=null,t.lblName=null,t}return __extends(t,o),t.prototype.setAndRefresh=function(t,o){console.log("sar",t),this.data=t,this.sprArk.node.setContentSize(t.arkSize,t.arkSize),this.lblName.string=t.nickname,this.refreshZoom(o)},t.prototype.refreshZoom=function(t){var o=new cc.Vec2(this.data.arkLocationX,this.data.arkLocationY);o.mulSelf(t),this.node.position=o},__decorate([r(cc.Sprite)],t.prototype,"sprArk",void 0),__decorate([r(cc.Label)],t.prototype,"lblName",void 0),t=__decorate([a],t)}(cc.Component);e.default=i,cc._RF.pop()},{}],ArkUI:[function(t,o,e){"use strict";cc._RF.push(o,"e7f42dM68VAz487nLcu3wTI","ArkUI"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./CvsMain"),a=t("./BaseUI"),r=t("./WorldUI"),u=t("./DataMgr"),c=t("./BuildPanel"),l=t("./Building"),i=cc._decorator,s=i.ccclass,p=i.property,d=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.arkMap=null,t.cargoLabelContainer=null,t.cargoLabelTemplate=null,t.cargoLabels={},t.panPad=null,t.sldZoom=null,t.pressingZoomSlider=!1,t.zoomScale=1,t.buildingTemplate=null,t.buildingContainer=null,t.blueprint=null,t.blueprintIndicator=null,t.currentHoldingBlueprint=null,t.grpBuild=null,t.btnConfirmBuild=null,t}return __extends(t,o),(i=t).prototype.onLoad=function(){var n=this,o=i.Instance=this;this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_START,function(t){o.pressingZoomSlider=!0}),this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_END,function(t){o.pressingZoomSlider=!1}),this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_CANCEL,function(t){o.pressingZoomSlider=!1}),this.panPad.on(cc.Node.EventType.TOUCH_MOVE,this.onPanPadTouchMove,this),this.panPad.on(cc.Node.EventType.MOUSE_WHEEL,this.onMouseWheel,this),this.cells=[];for(var t=-50;t<=50;t++){this.cells[t]=[];for(var e=-50;e<50;e++)this.cells[t][e]=new h}this.blueprint.on(cc.Node.EventType.TOUCH_MOVE,this.dragBlueprint.bind(this)),this.buildingTemplate.active=!1;var a=cc.instantiate(this.cargoLabelTemplate);a.parent=this.cargoLabelContainer;var r=a.getComponent(cc.Label);r.string="人口",this.cargoLabels.population=r,u.DataMgr.CargoConfig.forEach(function(t){var o=cc.instantiate(n.cargoLabelTemplate);o.parent=n.cargoLabelContainer;var e=o.getComponent(cc.Label);e.string=t.Name,n.cargoLabels[t.id]=e}),this.cargoLabelTemplate.active=!1},t.prototype.onEnable=function(){this.refreshZoom();for(var t=u.DataMgr.myData,o=-Math.floor(t.arkSize/2);o<t.arkSize/2;o++)for(var e=-Math.floor(t.arkSize/2);e<t.arkSize/2;e++){var n=this.cells[o][e];n.isLand=!0,n.building=null}var a=0;u.DataMgr.myBuildingData.forEach(function(t){a+=t.workers}),u.DataMgr.idleWorkers=t.population-a},t.prototype.refreshZoom=function(){this.arkMap.scale=this.zoomScale},t.prototype.update=function(t){u.DataMgr.changed&&(this.refreshData(),u.DataMgr.changed=!1),this.cargoLabels.population.string="人口 "+u.DataMgr.myData.population+" (闲置 "+u.DataMgr.idleWorkers+") 增长"+u.DataMgr.populationGrowPerMin.toFixed(0)+"/min";for(var o=function(t){var n=u.DataMgr.CargoConfig[t],o=u.DataMgr.myCargoData.find(function(t,o,e){return t.id==n.id});e.cargoLabels[n.id].string=n.Name+"   "+o.amount.toFixed()},e=this,n=0;n<u.DataMgr.CargoConfig.length;n++)o(n);var a=this.sldZoom.progress;if(this.pressingZoomSlider||(.5<a?((a-=5*t)<.5&&(a=.5),this.sldZoom.progress=a):a<.5&&(.5<(a+=5*t)&&(a=.5),this.sldZoom.progress=a)),.5!=a){var r=this.zoomScale;this.zoomScale*=Math.pow(1.5,2*(a-.5)*5*t),this.clampZoom();var i=this.zoomScale/r;this.arkMap.position=this.arkMap.position.mul(i),this.refreshZoom()}if(this.currentHoldingBlueprint){this.blueprint.active=!0,this.blueprint.position=new cc.Vec2(100*this.currentBlueprintIJ.i-50,100*this.currentBlueprintIJ.j-50),this.blueprint.setContentSize(100*this.currentHoldingBlueprint.length,100*this.currentHoldingBlueprint.width);var c=!1;this.blueprintIndicator.clear();for(n=0;n<this.currentHoldingBlueprint.length;n++)for(var l=0;l<this.currentHoldingBlueprint.width;l++){var s=this.cells[this.currentBlueprintIJ.i+n][this.currentBlueprintIJ.j+l];this.blueprintIndicator.fillColor=s.building?cc.Color.RED:cc.Color.GREEN,s.building&&(c=!0),this.blueprintIndicator.fillRect(100*n,100*l,100,100)}this.grpBuild.active=!0,this.btnConfirmBuild.interactable=!c}else this.blueprint.active=!1,this.grpBuild.active=!1},t.prototype.refreshData=function(){},t.prototype.onGotoWorldClick=function(){n.default.EnterUI(r.default)},t.prototype.onBuildingClick=function(){c.default.Show()},t.prototype.onTechClick=function(){},t.prototype.onCenterBtnClick=function(){var t=u.DataMgr.myData,o=new cc.Vec2(t.arkLocationX,t.arkLocationY);o.mulSelf(this.zoomScale),this.arkMap.position=o.neg()},t.prototype.onPanPadTouchMove=function(t){console.log("drag map");var o=t.getDelta();this.arkMap.position=this.arkMap.position.add(new cc.Vec2(o.x,o.y))},t.prototype.onMouseWheel=function(t){var o=t.getScrollY(),e=this.zoomScale;this.zoomScale*=Math.pow(1.5,o/120),this.clampZoom();var n=this.zoomScale/e;this.arkMap.position=this.arkMap.position.mul(n),this.refreshZoom()},t.prototype.onZoomSliderChange=function(t){},t.prototype.clampZoom=function(){3<this.zoomScale&&(this.zoomScale=3),this.zoomScale<.3&&(this.zoomScale=.3)},t.prototype.enterBuildMode=function(t){this.currentHoldingBlueprint=t,this.currentBlueprintIJ=u.IJ.ZERO},t.prototype.dragBlueprint=function(t){var o=t.getLocation(),e=this.arkMap.convertToNodeSpaceAR(o);this.currentBlueprintIJ.i=Math.round(e.x/100),this.currentBlueprintIJ.j=Math.round(e.y/100)},t.prototype.onBtnConfirmBuildClick=function(){for(var t=!1,o=0;o<this.currentHoldingBlueprint.length;o++)for(var e=0;e<this.currentHoldingBlueprint.width;e++){this.cells[this.currentBlueprintIJ.i+o][this.currentBlueprintIJ.j+e].building&&(t=!0)}t||(this.createBuilding(this.currentHoldingBlueprint,this.currentBlueprintIJ),"road00001"==this.currentHoldingBlueprint.id?this.currentBlueprintIJ.j+=1:this.currentHoldingBlueprint=null)},t.prototype.onBtnCancelBuildClick=function(){this.currentHoldingBlueprint=null},t.prototype.createBuilding=function(t,o){var e=cc.instantiate(this.buildingTemplate);e.parent=this.buildingContainer;var n=e.getComponent(l.default),a=new u.BuildingData;a.id=t.id,a.ij=o.clone(),a.workers=0,u.DataMgr.myBuildingData.push(a),n.setInfo(t,a),e.position=new cc.Vec2(100*o.i-50,100*o.j-50),e.active=!0;for(var r=0;r<t.length;r++)for(var i=0;i<t.width;i++){this.cells[o.i+r][o.j+i].building=n}},__decorate([p(cc.Node)],t.prototype,"arkMap",void 0),__decorate([p(cc.Node)],t.prototype,"cargoLabelContainer",void 0),__decorate([p(cc.Node)],t.prototype,"cargoLabelTemplate",void 0),__decorate([p(cc.Node)],t.prototype,"panPad",void 0),__decorate([p(cc.Slider)],t.prototype,"sldZoom",void 0),__decorate([p(cc.Node)],t.prototype,"buildingTemplate",void 0),__decorate([p(cc.Node)],t.prototype,"buildingContainer",void 0),__decorate([p(cc.Node)],t.prototype,"blueprint",void 0),__decorate([p(cc.Graphics)],t.prototype,"blueprintIndicator",void 0),__decorate([p(cc.Node)],t.prototype,"grpBuild",void 0),__decorate([p(cc.Button)],t.prototype,"btnConfirmBuild",void 0),t=i=__decorate([s],t);var i}(a.default);e.default=d;var h=function(){this.isLand=!1,this.building=null};cc._RF.pop()},{"./BaseUI":"BaseUI","./BuildPanel":"BuildPanel","./Building":"Building","./CvsMain":"CvsMain","./DataMgr":"DataMgr","./WorldUI":"WorldUI"}],BaseUI:[function(t,o,e){"use strict";cc._RF.push(o,"3b934a4EjZFs6JzaRDhWpVf","BaseUI"),Object.defineProperty(e,"__esModule",{value:!0});var n=cc._decorator,a=n.ccclass,r=(n.property,function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o=__decorate([a],o)}(cc.Component));e.default=r,cc._RF.pop()},{}],BuildPanel:[function(t,o,e){"use strict";cc._RF.push(o,"5cf0290QotGfpJodxaDGNKp","BuildPanel"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./DataMgr"),a=t("./BuildingButton"),r=cc._decorator,i=r.ccclass,c=r.property,l=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.buttonContainer=null,t.buttonTemplate=null,t}return __extends(t,o),(e=t).prototype.onLoad=function(){(e.Instance=this).node.active=!1,console.log("BP onL")},t.prototype.start=function(){var e=this;n.DataMgr.BuildingConfig.forEach(function(t){var o=cc.instantiate(e.buttonTemplate);o.parent=e.buttonContainer,o.getComponent(a.default).setAndRefresh(t),o.active=!0}),this.buttonTemplate.active=!1},t.prototype.onEnable=function(){},t.prototype.refresh=function(){},t.Show=function(){e.Instance.node.active=!0},t.Hide=function(){e.Instance.node.active=!1},t.prototype.close=function(){this.node.active=!1},__decorate([c(cc.Node)],t.prototype,"buttonContainer",void 0),__decorate([c(cc.Node)],t.prototype,"buttonTemplate",void 0),t=e=__decorate([i],t);var e}(cc.Component);e.default=l,cc._RF.pop()},{"./BuildingButton":"BuildingButton","./DataMgr":"DataMgr"}],BuildingButton:[function(t,o,e){"use strict";cc._RF.push(o,"7884bIsfolMCKOoH+GiGik+","BuildingButton"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./BuildPanel"),a=t("./ArkUI"),i=t("./DataMgr"),r=cc._decorator,c=r.ccclass,l=r.property,s=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.lblName=null,t.lblSize=null,t.lblConsumption=null,t}return __extends(t,o),t.prototype.setAndRefresh=function(a){this.info=a,this.lblName.string=a.Name,this.lblSize.string=a.length+"*"+a.width;for(var r=[],t=function(t){var o=a["Raw"+t];if(o&&0<o.length){var e=a["Raw"+t+"Rate"],n=i.DataMgr.CargoConfig.find(function(t){return t.id==o});r.push("消耗 "+e+n.Name+"/min")}},o=0;o<4;o++)t(o);var e=function(t){var o=a["Out"+t];if(o&&0<o.length){var e=a["Out"+t+"Rate"],n=i.DataMgr.CargoConfig.find(function(t){return t.id==o});r.push("生产 "+e+n.Name+"/min")}};for(o=0;o<4;o++)e(o);if(0<r.length){var n=r[0];for(o=1;o<r.length;o++){n+="\n"+r[o]}this.lblConsumption.string=n}else this.lblConsumption.string=""},t.prototype.onClick=function(){n.default.Hide(),a.default.Instance.enterBuildMode(this.info)},__decorate([l(cc.Label)],t.prototype,"lblName",void 0),__decorate([l(cc.Label)],t.prototype,"lblSize",void 0),__decorate([l(cc.Label)],t.prototype,"lblConsumption",void 0),t=__decorate([c],t)}(cc.Component);e.default=s,cc._RF.pop()},{"./ArkUI":"ArkUI","./BuildPanel":"BuildPanel","./DataMgr":"DataMgr"}],Building:[function(t,o,e){"use strict";cc._RF.push(o,"3d090TfsndH9pF8dNZnNchl","Building"),Object.defineProperty(e,"__esModule",{value:!0});var c=t("./DataMgr"),n=cc._decorator,a=n.ccclass,r=n.property,i=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.lblName=null,t.lblConsumption=null,t.lblOutput=null,t.lblWorkers=null,t.nodeGear=null,t}return __extends(t,o),t.prototype.setInfo=function(a,t){this.info=a,this.data=t,this.lblName.string=a.Name;for(var r=[],o=function(t){var o=a["Raw"+t];if(o&&0<o.length){var e=a["Raw"+t+"Rate"],n=c.DataMgr.CargoConfig.find(function(t){return t.id==o});r.push("消耗 "+e+n.Name+"/min")}},e=0;e<4;e++)o(e);var n=function(t){var o=a["Out"+t];if(o&&0<o.length){var e=a["Out"+t+"Rate"],n=c.DataMgr.CargoConfig.find(function(t){return t.id==o});r.push("生产 "+e+n.Name+"/min")}};for(e=0;e<4;e++)n(e);if(0<r.length){var i=r[0];for(e=1;e<r.length;e++){i+="\n"+r[e]}this.lblConsumption.string=i}else this.lblConsumption.string="";this.node.setContentSize(100*a.length,100*a.width)},t.prototype.changeWorkers=function(t,o){if("-"==o){var e=Math.min(this.data.workers,1);this.data.workers-=e,c.DataMgr.idleWorkers+=e}else if("+"==o){var n=Math.min(c.DataMgr.idleWorkers,1);this.data.workers+=n,c.DataMgr.idleWorkers-=n}},t.prototype.update=function(t){this.lblWorkers.string="工人 "+this.data.workers.toFixed(),this.data.isWorking&&(this.nodeGear.rotation+=90*this.data.workers*t)},__decorate([r(cc.Label)],t.prototype,"lblName",void 0),__decorate([r(cc.Label)],t.prototype,"lblConsumption",void 0),__decorate([r(cc.Label)],t.prototype,"lblOutput",void 0),__decorate([r(cc.Label)],t.prototype,"lblWorkers",void 0),__decorate([r(cc.Node)],t.prototype,"nodeGear",void 0),t=__decorate([a],t)}(cc.Component);e.default=i,cc._RF.pop()},{"./DataMgr":"DataMgr"}],CvsMain:[function(t,o,e){"use strict";cc._RF.push(o,"69237yn4edJBK/5XvDAGlzX","CvsMain"),Object.defineProperty(e,"__esModule",{value:!0});var n=cc._decorator,a=n.ccclass,r=n.property,i=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.uiContainer=null,t}return __extends(t,o),(e=t).prototype.onLoad=function(){(e.Instance=this).uiContainer.children.forEach(function(t){return t.active=!1})},t.EnterUI=function(o){this.Instance.uiContainer.children.forEach(function(t){t.getComponent(o)?t.active=!0:t.active=!1})},__decorate([r(cc.Node)],t.prototype,"uiContainer",void 0),t=e=__decorate([a],t);var e}(cc.Component);e.default=i,cc._RF.pop()},{}],DataMgr:[function(t,o,e){"use strict";cc._RF.push(o,"c6c13KfXfRK06sYYQzi7BU0","DataMgr"),Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function o(){}return o.readData=function(){try{var t=JSON.parse(cc.sys.localStorage.getItem("user0"));o.myData=t,o.myBuildingData=JSON.parse(cc.sys.localStorage.getItem("user0Building")),o.changed=!0,console.log("finish read data")}catch(t){console.error(t)}},o.writeData=function(){try{cc.sys.localStorage.setItem("user0",JSON.stringify(o.myData)),cc.sys.localStorage.setItem("user0Building",JSON.stringify(o.myBuildingData)),console.log("finish write data")}catch(t){console.error(t)}},o.clearData=function(){cc.sys.localStorage.removeItem("user0"),cc.sys.localStorage.removeItem("user0Building")},o.idleWorkers=0,o.othersData=[],o.changed=!1,o.populationGrowPerMin=0,o}();e.DataMgr=n;var a=function(){this.population=0};e.UserData=a;var r=function(){};e.BuildingInfo=r;var i=function(){this.workers=0,this.isWorking=!1};e.BuildingData=i;var c=function(){};e.CargoInfo=c;var l=function(){};e.CargoData=l;var s=function(){function o(){this.i=0,this.j=0}return o.prototype.clone=function(){var t=new o;return t.i=this.i,t.j=this.j,t},Object.defineProperty(o,"ZERO",{get:function(){return new o},enumerable:!0,configurable:!0}),o}();e.IJ=s,cc._RF.pop()},{}],DialogPanel:[function(t,o,e){"use strict";cc._RF.push(o,"c0958fmSyFAp6wyHbHS0e10","DialogPanel"),Object.defineProperty(e,"__esModule",{value:!0});var n=cc._decorator,a=n.ccclass,r=n.property,i=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.lblTitle=null,t.lblContext=null,t.btn0=null,t.lblBtn0=null,t.btn1=null,t.lblBtn1=null,t}return __extends(t,o),(e=t).prototype.onLoad=function(){(e.Instance=this).hide()},t.PopupWith1Button=function(t,o,e,n){this.Instance.show(),this.Instance.lblTitle.string=t,this.Instance.lblContext.string=o,this.Instance.func0=n,this.Instance.lblBtn0.string=e,this.Instance.btn0.active=!0,this.Instance.btn0.position=new cc.Vec2(0,0),this.Instance.btn1.active=!1},t.PopupWith2Buttons=function(t,o,e,n,a,r){this.Instance.show(),this.Instance.lblTitle.string=t,this.Instance.lblContext.string=o,this.Instance.func0=n,this.Instance.lblBtn0.string=e,this.Instance.btn0.active=!0,this.Instance.btn0.position=new cc.Vec2(-150,0),this.Instance.func1=n,this.Instance.lblBtn1.string=e,this.Instance.btn1.active=!0,this.Instance.btn1.position=new cc.Vec2(150,0)},t.prototype.onBtn0Click=function(){this.func0&&this.func0()},t.prototype.onBtn1Click=function(){this.func1&&this.func1()},t.prototype.show=function(){this.node.active=!0},t.prototype.hide=function(){this.node.active=!1},__decorate([r(cc.Label)],t.prototype,"lblTitle",void 0),__decorate([r(cc.Label)],t.prototype,"lblContext",void 0),__decorate([r(cc.Node)],t.prototype,"btn0",void 0),__decorate([r(cc.Label)],t.prototype,"lblBtn0",void 0),__decorate([r(cc.Node)],t.prototype,"btn1",void 0),__decorate([r(cc.Label)],t.prototype,"lblBtn1",void 0),t=e=__decorate([a],t);var e}(cc.Component);e.default=i,cc._RF.pop()},{}],Foregroud:[function(t,o,e){"use strict";cc._RF.push(o,"c7a1eqdirtJGpHjde8W3SsV","Foregroud"),Object.defineProperty(e,"__esModule",{value:!0});var n=cc._decorator,a=n.ccclass,r=(n.property,function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype.onLoad=function(){this.node.children.forEach(function(t){t.active||(t.active=!0,t.active=!1)})},o=__decorate([a],o)}(cc.Component));e.default=r,cc._RF.pop()},{}],HomeUI:[function(t,o,e){"use strict";cc._RF.push(o,"458fd6d6ChEGo+U+drv+haG","HomeUI"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./CvsMain"),a=t("./BaseUI"),r=t("./MainCtrl"),i=t("./DataMgr"),c=t("./WorldUI"),l=cc._decorator,s=l.ccclass,u=l.property,p=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.btnClaim0=null,t.btnClaim1=null,t.btnClaim2=null,t}return __extends(t,o),(e=t).prototype.onLoad=function(){e.Instance=this},t.prototype.start=function(){i.DataMgr.myData&&(i.DataMgr.myData.arkSize||(i.DataMgr.myData=null)),i.DataMgr.myData&&n.default.EnterUI(c.default)},t.prototype.onClaim=function(t,o){switch(o){case"0":i.DataMgr.myData=r.default.Instance.generateNewArk(9),this.enterGameWithArk()}i.DataMgr.myBuildingData=[]},t.prototype.enterGameWithArk=function(){i.DataMgr.myCargoData=[],i.DataMgr.CargoConfig.forEach(function(t){var o=new i.CargoData;o.id=t.id,o.amount=0,i.DataMgr.myCargoData.push(o)}),n.default.EnterUI(c.default)},t.prototype.onBookClick=function(){console.log("哪有白皮书")},__decorate([u(cc.Button)],t.prototype,"btnClaim0",void 0),__decorate([u(cc.Button)],t.prototype,"btnClaim1",void 0),__decorate([u(cc.Button)],t.prototype,"btnClaim2",void 0),t=e=__decorate([s],t);var e}(a.default);e.default=p,cc._RF.pop()},{"./BaseUI":"BaseUI","./CvsMain":"CvsMain","./DataMgr":"DataMgr","./MainCtrl":"MainCtrl","./WorldUI":"WorldUI"}],MainCtrl:[function(t,o,e){"use strict";cc._RF.push(o,"162b9/mIe1LjqpHBpjQnzp+","MainCtrl"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./CvsMain"),a=t("./HomeUI"),l=t("./DataMgr"),r=cc._decorator,i=r.ccclass,c=(r.property,function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),(e=o).prototype.onLoad=function(){e.Instance=this,l.DataMgr.readData(),this.fetchRemoteData()},o.prototype.start=function(){n.default.EnterUI(a.default),console.log("goto home"),cc.loader.loadRes("Building",function(t,o){console.log("Building loaded"),l.DataMgr.BuildingConfig=o}.bind(this)),cc.loader.loadRes("Cargo",function(t,o){console.log("Cargo loaded"),l.DataMgr.CargoConfig=o}.bind(this)),cc.loader.loadRes("Tech",function(t,o){console.log("Tech loaded"),l.DataMgr.TechConfig=o}.bind(this))},o.prototype.gotoHome=function(){n.default.EnterUI(a.default)},o.prototype.generateNewArk=function(t){var o=new l.UserData;o.arkSize=t;var e=Math.random()*Math.PI;return o.arkLocationX=4e3*Math.cos(e),o.arkLocationY=4e3*Math.sin(e),o.speed=0,o.population=2,o.nickname="新玩家",o},o.prototype.fetchRemoteData=function(){var t=[],o=new l.UserData;o.arkSize=41,o.arkLocationX=0,o.arkLocationY=0,o.speed=0,o.population=2251,o.nickname="星云号交易所方舟",t.push(o),l.DataMgr.othersData=t,l.DataMgr.changed=!0},o.prototype.update=function(c){if(l.DataMgr.myBuildingData&&l.DataMgr.myBuildingData.forEach(function(n){if(n.isWorking=!1,!(n.workers<=0)){for(var a=l.DataMgr.BuildingConfig.find(function(t){return t.id==n.id}),t=[],o=0;o<4;o++){var e=a["Raw"+o];e&&0<e.length&&t.push([e,a["Raw"+o+"Rate"]/60*c*n.workers])}var r=!0;if(t.forEach(function(o){if(r){var t=l.DataMgr.myCargoData.find(function(t){return t.id==o[0]});t&&t.amount>o[1]?o.push(t):r=!1}}),r){t.forEach(function(t){t[2].amount-=t[1]});var i=function(t){var o=a["Out"+t];if(o&&0<o.length){var e=l.DataMgr.myCargoData.find(function(t){return t.id==o});e||((e=new l.CargoData).id=o,e.amount=0,l.DataMgr.myCargoData.push(e)),e.amount+=a["Out"+t+"Rate"]/60*c*n.workers}};for(o=0;o<4;o++)i(o);n.isWorking=!0}}}),l.DataMgr.myData&&l.DataMgr.myCargoData){var e=!1;if(l.DataMgr.CargoConfig.forEach(function(o){if(!e&&o.IsFood){var t=l.DataMgr.myCargoData.find(function(t){return t.id==o.id});t&&0<t.amount&&(e=!0)}}),e){var t=(10+Math.sqrt(l.DataMgr.myData.population))/10,o=t/60*c;Math.random()<o&&(l.DataMgr.myData.population+=1,l.DataMgr.idleWorkers+=1),l.DataMgr.populationGrowPerMin=t}}},o=e=__decorate([i],o);var e}(cc.Component));e.default=c,cc._RF.pop()},{"./CvsMain":"CvsMain","./DataMgr":"DataMgr","./HomeUI":"HomeUI"}],TaskMgr:[function(t,o,e){"use strict";cc._RF.push(o,"8b016C7S51BeY/RKmLSDzh4","TaskMgr"),Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.list=[{description:"",func:function(){}}],t}();e.default=n,cc._RF.pop()},{}],WorldUI:[function(t,o,e){"use strict";cc._RF.push(o,"d2d4ehqPFVDS4fv9l1Oq7He","WorldUI"),Object.defineProperty(e,"__esModule",{value:!0});var n=t("./CvsMain"),a=t("./BaseUI"),r=t("./ArkUI"),i=t("./ArkInWorld"),c=t("./DataMgr"),l=cc._decorator,s=l.ccclass,u=l.property,p=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.lblEnergy=null,t.btnPause=null,t.ingameRange=null,t.arkContainer=null,t.arkTemplate=null,t.worldMap=null,t.earth=null,t.panPad=null,t.sldZoom=null,t.pressingZoomSlider=!1,t.zoomScale=.1,t}return __extends(t,o),(e=t).prototype.onLoad=function(){var o=e.Instance=this;this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_START,function(t){o.pressingZoomSlider=!0}),this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_END,function(t){o.pressingZoomSlider=!1}),this.sldZoom.node.getChildByName("Handle").on(cc.Node.EventType.TOUCH_CANCEL,function(t){o.pressingZoomSlider=!1}),this.panPad.on(cc.Node.EventType.TOUCH_MOVE,this.onPanPadTouchMove,this),this.panPad.on(cc.Node.EventType.MOUSE_WHEEL,this.onMouseWheel,this)},t.prototype.start=function(){},t.prototype.onEnable=function(){this.refreshData(),this.refreshZoom()},t.prototype.refreshData=function(){for(var t=c.DataMgr.othersData.length+1,o=this.arkContainer.childrenCount;o<t;o++){cc.instantiate(this.arkTemplate).parent=this.arkContainer}var e=[];for(o=t;o<this.arkContainer.childrenCount;o++)e.push(this.arkContainer.children[o]);e.forEach(function(t){return t.destroy()}),this.arkContainer.children[0].getComponent(i.default).setAndRefresh(c.DataMgr.myData,this.zoomScale);for(o=0;o<c.DataMgr.othersData.length;o++){c.DataMgr.othersData[o];this.arkContainer.children[o+1].getComponent(i.default).setAndRefresh(c.DataMgr.othersData[o],this.zoomScale)}},t.prototype.refreshZoom=function(){var o=this,t=12e3*this.zoomScale;this.earth.setContentSize(t,t),this.arkContainer.children.forEach(function(t){t.getComponent(i.default).refreshZoom(o.zoomScale)})},t.prototype.update=function(t){c.DataMgr.changed&&(this.refreshData(),c.DataMgr.changed=!1);var o=this.sldZoom.progress;if(this.pressingZoomSlider||(.5<o?((o-=5*t)<.5&&(o=.5),this.sldZoom.progress=o):o<.5&&(.5<(o+=5*t)&&(o=.5),this.sldZoom.progress=o)),.5!=o){var e=this.zoomScale;this.zoomScale*=Math.pow(1.5,2*(o-.5)*5*t),this.clampZoom();var n=this.zoomScale/e;this.worldMap.position=this.worldMap.position.mul(n),this.refreshZoom()}},t.prototype.onGotoArkClick=function(){n.default.EnterUI(r.default)},t.prototype.onCenterBtnClick=function(){var t=c.DataMgr.myData,o=new cc.Vec2(t.arkLocationX,t.arkLocationY);o.mulSelf(this.zoomScale),this.worldMap.position=o.neg()},t.prototype.onPanPadTouchMove=function(t){console.log("drag map");var o=t.getDelta();this.worldMap.position=this.worldMap.position.add(new cc.Vec2(o.x,o.y))},t.prototype.onMouseWheel=function(t){var o=t.getScrollY(),e=this.zoomScale;this.zoomScale*=Math.pow(1.5,o/120),this.clampZoom();var n=this.zoomScale/e;this.worldMap.position=this.worldMap.position.mul(n),this.refreshZoom()},t.prototype.onZoomSliderChange=function(t){},t.prototype.clampZoom=function(){10<this.zoomScale&&(this.zoomScale=10),this.zoomScale<.01&&(this.zoomScale=.01)},__decorate([u(cc.Label)],t.prototype,"lblEnergy",void 0),__decorate([u(cc.Button)],t.prototype,"btnPause",void 0),__decorate([u(cc.Node)],t.prototype,"ingameRange",void 0),__decorate([u(cc.Node)],t.prototype,"arkContainer",void 0),__decorate([u(cc.Node)],t.prototype,"arkTemplate",void 0),__decorate([u(cc.Node)],t.prototype,"worldMap",void 0),__decorate([u(cc.Node)],t.prototype,"earth",void 0),__decorate([u(cc.Node)],t.prototype,"panPad",void 0),__decorate([u(cc.Slider)],t.prototype,"sldZoom",void 0),t=e=__decorate([s],t);var e}(a.default);e.default=p,cc._RF.pop()},{"./ArkInWorld":"ArkInWorld","./ArkUI":"ArkUI","./BaseUI":"BaseUI","./CvsMain":"CvsMain","./DataMgr":"DataMgr"}]},{},["ArkInWorld","ArkUI","BaseUI","BuildPanel","Building","BuildingButton","CvsMain","DataMgr","DialogPanel","Foregroud","HomeUI","MainCtrl","TaskMgr","WorldUI"]);