/**
* name 
*/
module gamebrniuniu.page {
	export class BrNiuNiuSzListPage extends game.gui.base.Page {
		private _viewUI: ui.ajqp.game_ui.tongyong.ShangZhuangLBUI;
		private _isShenQing: boolean = false;

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._isNeedBlack = true;
			this._isClickBlack = false;
			this._asset = [
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
			];
		}

		protected init(): void {
			this._viewUI = this.createView('game_ui.tongyong.ShangZhuangLBUI');
			this.addChild(this._viewUI);

		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			this._viewUI.list_player.vScrollBarSkin = "";
			this._viewUI.list_player.scrollBar.autoHide = false;
			this._viewUI.list_player.scrollBar.elasticDistance = 100;
			this._viewUI.list_player.itemRender = this.createChildren("game_ui.tongyong.WanJia1UI", SzItemRender);
			this._viewUI.list_player.renderHandler = new Handler(this, this.renderHandler);
			this._viewUI.btn_shangzhuang.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_MAP_BANKER_CHANGE, this, this.onUpdateSZList);//地图庄家变更
			this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_SZ_LIST, this, this.onUpdateSZList);//上庄列表更新
			this.onUpdateSZList();
			this._viewUI.list_player.dataSource = this.dataSource;
		}

		//按钮缓动回调
		protected onBtnTweenEnd(e: any, target: any): void {
			switch (target) {
				case this._viewUI.btn_shangzhuang://申请上庄
					let mainUnit = this._game.sceneObjectMgr.mainUnit;
					if (!mainUnit) return;
					let money = mainUnit.GetMoney();
					if (money < this.dataSource) {
						this._game.uiRoot.topUnder.showTips("金币不足");
						return;
					}
					let mapinfo: BrniuniuMapInfo = this._game.sceneObjectMgr.mapInfo as BrniuniuMapInfo;
					if (!mapinfo) return;
					let mainIndex = this._game.sceneObjectMgr.mainUnit.GetIndex();
					if (mainIndex == mapinfo.GetBankerSeat()) {//申请下庄
						this._game.network.call_brniuniu_xiazhuang();
						this._game.uiRoot.topUnder.showTips("已经成功申请下庄");
						this.close()
					} else if (this._isShenQing) {//取消申请
						this._game.network.call_brniuniu_xiazhuang();
						this._game.uiRoot.topUnder.showTips("已经取消申请上庄");
						this.close()
					} else {//申请上庄
						this._game.network.call_brniuniu_shangzhuang();
						this._game.uiRoot.topUnder.showTips("已经成功申请上庄");
						this.close()
					}
					break;
			}
		}

		private renderHandler(cell: SzItemRender, index: number) {
			if (cell) {
				cell.setData(this._game, cell.dataSource);
			}
		}

		private onUpdateSZList() {
			let mapinfo: BrniuniuMapInfo = this._game.sceneObjectMgr.mapInfo as BrniuniuMapInfo;
			if (!mapinfo) return;
			let unitSz = [];
			if (mapinfo.GetSzList() == "") {
				return;
			}
			let limitMoney = BrNiuNiuMapPage.MONEY_LIMIT_CONFIG[mapinfo.GetMapLevel()][0]
			this._viewUI.txt_limit.text = "上庄需要 " + limitMoney;
			unitSz = JSON.parse(mapinfo.GetSzList());
			this._viewUI.list_player.dataSource = unitSz;

			let mainIndex = this._game.sceneObjectMgr.mainUnit.GetIndex();
			for (let i = 0; i < unitSz.length; i++) {
				let unitIndex = unitSz[i][0];
				if (mainIndex == unitIndex) {
					this._isShenQing = true;
					break;
				} else {
					this._isShenQing = false;
				}
			}
			if (!unitSz.length) this._isShenQing = false;
			let url = this._isShenQing ? PathGameTongyong.ui_tongyong_general + "btn_qxsq.png" : PathGameTongyong.ui_tongyong_general + "btn_sqsz.png";
			if (mainIndex == mapinfo.GetBankerSeat()) url = PathGameTongyong.ui_tongyong_general + "btn_sq3.png";
			this._viewUI.btn_shangzhuang.skin = url;
		}

		public close(): void {
			if (this._viewUI) {
				this._viewUI.list_player.vScrollBarSkin = null;
				this._viewUI.btn_shangzhuang.off(LEvent.CLICK, this, this.onBtnClickWithTween);

				this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_MAP_BANKER_CHANGE, this, this.onUpdateSZList);//地图庄家变更
				this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SZ_LIST, this, this.onUpdateSZList);//上庄列表更新
			}
			super.close();
		}
	}

	class SzItemRender extends ui.ajqp.game_ui.tongyong.WanJia1UI {
		private _game: Game;
		private _unit: Unit;
		private _clipMoney: BrniuniuClip;
		setData(game: Game, data: any) {
			this._game = game;
			this._unit = this._game.sceneObjectMgr.getUnitByIdx(data[0]);
			this.img_txk.skin = TongyongUtil.getTouXiangKuangUrl(this._unit.GetHeadKuangImg());
			this.txt_name.text = this._unit.GetName();
			this.img_head.skin = TongyongUtil.getHeadUrl(this._unit.GetHeadImg(), 2);
			if (!this._clipMoney) {
				this._clipMoney = new BrniuniuClip(BrniuniuClip.MONEY_FONT2)
				this._clipMoney.x = this.clip_money.x;
				this._clipMoney.y = this.clip_money.y;
				this._clipMoney.scale(0.85, 0.85);
				this.clip_money.parent.addChild(this._clipMoney);
				this.clip_money.visible = false;
			}
			this._clipMoney.setText(EnumToString.getPointBackNum(this._unit.GetMoney(), 2) + "", true, false);
		}
	}
}