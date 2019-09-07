/**
* name 
*/
module gamebrniuniu.page {
	export class BrNiuNiuSettlePage extends game.gui.base.Page {
		private _viewUI: ui.game_ui.brniuniu.JieSuanUI;
		private _imgList: Array<LImage> = [];

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._isNeedBlack = true;
			this._isClickBlack = true;
			this._asset = [
				Path_game_brniuniu.atlas_game_ui + "brniuniu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
			];
		}

		// 页面初始化函数
		protected init(): void {
			this._viewUI = this.createView('game_ui.brniuniu.JieSuanUI');
			this.addChild(this._viewUI);
		}

		// 页面打开时执行函数
		private _qifuNameStr: string[] = ["xs", "px", "gsy", "gg", "cs", "tdg"];
		protected onOpen(): void {
			super.onOpen();
			let mainPlayer = this._game.sceneObjectMgr.mainPlayer;
			//主玩家
			this._viewUI.img_head0.skin = StringU.substitute(PathGameTongyong.ui_tongyong_touxiang + "head_{0}.png", mainPlayer.playerInfo.headimg);
			if (mainPlayer.playerInfo.qifu_type && mainPlayer.GetQiFuEndTime(mainPlayer.playerInfo.qifu_type - 1) > this._game.sync.serverTimeBys) {
				this._viewUI.img_head0.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._qifuNameStr[mainPlayer.playerInfo.qifu_type - 1] + ".png";
			}
			this._viewUI.txt_name0.text = mainPlayer.playerInfo.nickname;
			this._viewUI.txt_bet0.text = this.dataSource.myBet.toString();
			this._viewUI.txt_benefit0.text = this.dataSource.myBenefit.toString();
			this._viewUI.img_txk0.visible = mainPlayer.playerInfo.vip_level > 0;
			if (this._viewUI.img_txk0.visible) {
				this._viewUI.img_txk0.skin = PathGameTongyong.ui_tongyong_touxiang + "tu_v" + mainPlayer.playerInfo.vip_level + ".png";
			}
			//庄家
			this._viewUI.img_head1.skin = this.dataSource.bankerHead;
			if (mainPlayer.playerInfo.qifu_type && mainPlayer.GetQiFuEndTime(mainPlayer.playerInfo.qifu_type - 1) > this._game.sync.serverTimeBys) {
				this._viewUI.img_head0.skin = PathGameTongyong.ui_tongyong_touxiang + "head_" + this._qifuNameStr[mainPlayer.playerInfo.qifu_type - 1] + ".png";
			}
			this._viewUI.txt_name1.text = this.dataSource.bankerName;
			this._viewUI.txt_bet1.text = this.dataSource.allBet.toString();
			this._viewUI.txt_benefit1.text = this.dataSource.bankerBenefit.toString();
			this._viewUI.img_txk1.visible = mainPlayer.playerInfo.vip_level > 0;
			if (this._viewUI.img_txk1.visible) {
				this._viewUI.img_txk1.skin = PathGameTongyong.ui_tongyong_touxiang + "tu_v" + mainPlayer.playerInfo.vip_level + ".png";
			}

			for (let i = 0; i < 4; i++) {
				this._imgList[i] = this._viewUI["img_" + i];
				this._imgList[i].disabled = this.dataSource.myBenefit < 0;
			}
			Laya.timer.once(3000, this, () => {
				this.close();
			});
		}

		public close(): void {
			if (this._viewUI) {
				if (this._imgList) {
					this._imgList = null;
				}
			}
			Laya.timer.clearAll(this);
			super.close();
		}
	}
}