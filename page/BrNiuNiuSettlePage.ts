/**
* name 
*/
module gamebrniuniu.page {
	export class BrNiuNiuSettlePage extends game.gui.base.Page {
		private _viewUI: ui.nqp.game_ui.brniuniu.JieSuanUI;
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
		protected onOpen(): void {
			super.onOpen();
			let mainPlayer = this._game.sceneObjectMgr.mainPlayer;
			//主玩家
			this._viewUI.img_head0.skin = this._game.datingGame.getHeadUrl(mainPlayer.playerInfo.headimg, 2);
			this._viewUI.txt_name0.text = mainPlayer.playerInfo.nickname;
			this._viewUI.txt_bet0.text = this.dataSource.myBet.toString();
			this._viewUI.txt_benefit0.text = this.dataSource.myBenefit.toString();
			this._viewUI.img_txk0.skin = this._game.datingGame.getTouXiangKuangUrl(mainPlayer.playerInfo.headKuang, 2)
			//庄家
			this._viewUI.img_head1.skin = this.dataSource.bankerHead;
			this._viewUI.img_txk1.skin = this.dataSource.bankerTxk;
			this._viewUI.txt_name1.text = this.dataSource.bankerName;
			this._viewUI.txt_bet1.text = this.dataSource.allBet.toString();
			this._viewUI.txt_benefit1.text = this.dataSource.bankerBenefit.toString();

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