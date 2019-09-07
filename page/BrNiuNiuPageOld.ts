/**
* 牛牛
*/
module gamebrniuniu.page {
	const STATUS_CONFIG = ["准备中", "洗牌中", "开始下注", "下注中", "停止下注", "发牌中", "开牌中", "结算中", "显示结算", "准备中"];
	export class BrNiuNiuPageOld extends game.gui.base.Page {
		private _viewUI: ui.game_ui.brniuniu.BaiRenNN_HUDUI;
		private _player: any;
		private _playerInfo: any;
		private _listArr: any;
		private _listState: any;
		private _niuHudMgr: BrNiuNiuHudMgr;

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._asset = [
				Path_game_brniuniu.atlas_game_ui + "brniuniu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
			];
			this._isNeedDuang = false;
		}

		// 页面初始化函数
		protected init(): void {
			this._viewUI = this.createView('game_ui.brniuniu.BaiRenNN_HUDUI', ["game_ui.tongyong.HudUI"]);
			this.addChild(this._viewUI);
			if (!this._niuHudMgr) {
				this._niuHudMgr = new BrNiuNiuHudMgr(this._game);
				this._niuHudMgr.on(BrNiuNiuHudMgr.EVENT_RETURN_MAPINFO, this, this.onUpdateMapinfo);
			}
			this._listArr = [];
			this._listState = [];
			for (let index = 0; index < this._viewUI.box_rooms.numChildren; index++) {
				this._viewUI.box_rooms._childs[index].visible = false;
				this._listState.push(this._viewUI["txt_status" + index]);
				this._listArr.push(this._viewUI["list_record" + index]);
				this._listArr[index].itemRender = this.createChildren("game_ui.brniuniu.component.HudRenderUI", HudRecordRender);
				this._listArr[index].renderHandler = new Handler(this, this.renderHandler);
				this._listArr[index].dataSource = [];
			}
		}

		private renderHandler(cell: HudRecordRender, index: number) {
			if (cell) {
				cell.setData(this._game, cell.dataSource);
			}
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			this._viewUI.btn_xinshou.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.btn_chuji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.btn_zhongji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			this._viewUI.btn_gaoji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			(this._viewUI.view as TongyongHudPage).onOpen(this._game, BrniuniuPageDef.GAME_NAME);
			for (let index = 0; index < this._viewUI.box_rooms.numChildren; index++) {
				this._viewUI.box_rooms._childs[index].visible = true;
				Laya.Tween.from(this._viewUI.box_rooms._childs[index], {
					right: -this._viewUI.box_rooms.width
				}, 200 + index * 100, Laya.Ease.linearNone);
			}

			this._game.playMusic(Path_game_brniuniu.music_brniuniu + "nn_bgm.mp3");
		}


		//帧心跳
		update(diff: number) {
			if (this._niuHudMgr) {
				this._niuHudMgr.update(diff);
			}
			this.onTime();
		}

		private onUpdateMapinfo(): void {
			let data = this._niuHudMgr.data;
			for (let i = 0; i < this._listArr.length; i++) {
				this._listArr[i].dataSource = data[i][2];
			}
		}

		private onTime(): void {
			if (!this._niuHudMgr || !this._niuHudMgr.data || !this._niuHudMgr.data.length) return;
			let data = this._niuHudMgr.data;
			for (let i = 0; i < this._listArr.length; i++) {
				let curTime = this._game.sync.serverTimeBys;
				let endTime = data[i][1] + 2;
				let time = Math.floor(endTime - curTime);
				if (time <= 0) {
					this._listState[i].text = "刷新中...";
				} else {
					this._listState[i].text = STATUS_CONFIG[data[i][0]] + time + "s";
				}
			}
		}


		protected onBtnTweenEnd(e: any, target: any): void {
			this._player = this._game.sceneObjectMgr.mainPlayer;
			if (!this._player) return;
			this._playerInfo = this._player.playerInfo;
			switch (target) {
				case this._viewUI.btn_xinshou:
					this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_BRNIUNIU_1.toString(), true);

					break;
				case this._viewUI.btn_chuji:
					this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_BRNIUNIU_2.toString(), true);
					break;
				case this._viewUI.btn_zhongji:
					this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_BRNIUNIU_3.toString(), true);
					break;
				case this._viewUI.btn_gaoji:
					this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_BRNIUNIU_4.toString(), true);
					break;
				default:
					break;
			}
		}

		private showTipsBox(limit: number) {
			TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，您的金币少于{0}哦~\n补充点金币去大杀四方吧~", limit), () => {
				this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
			}, () => {
			}, false, PathGameTongyong.ui_tongyong_general + "btn_cz.png");
		}

		public close(): void {
			this._player = null;
			if (this._viewUI) {
				this._viewUI.btn_xinshou.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_chuji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_zhongji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_gaoji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
			}
			if (this._niuHudMgr) {
				this._niuHudMgr.off(BrNiuNiuHudMgr.EVENT_RETURN_MAPINFO, this, this.onUpdateMapinfo);
				this._niuHudMgr.clear();
				this._niuHudMgr = null;
			}
			this._game.stopMusic();
			Laya.Tween.clearAll(this);
			super.close();
		}
	}

	class HudRecordRender extends ui.game_ui.brniuniu.component.HudRenderUI {
		private _game: Game;
		private _data: any;
		constructor() {
			super();
		}
		setData(game: Game, data: any) {
			this._game = game;
			this._data = data;
			if (!this._data) {
				this.visible = false;
				return;
			}
			this.visible = true;
			this.tian.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu + "tu_{0}.png", this._data[0] == -1 ? "g1" : "x1");
			this.di.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu + "tu_{0}.png", this._data[1] == -1 ? "g1" : "x1");
			this.xuan.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu + "tu_{0}.png", this._data[2] == -1 ? "g1" : "x1");
			this.huang.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu + "tu_{0}.png", this._data[3] == -1 ? "g1" : "x1");
		}
		destroy() {
			super.destroy();
		}
	}
}