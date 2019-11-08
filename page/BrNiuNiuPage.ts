/**
* 牛牛
*/
module gamebrniuniu.page {
	export class BrNiuNiuPage extends game.gui.base.Page {
		static readonly BET_TIME: number = 15;   //下注时长
		static readonly BET_MAX: number[] = [200, 500, 1000, 2000];   //投注限额

		private _viewUI: ui.nqp.game_ui.brniuniu.BaiRenNN_HUDUI;
		private _player: any;
		private _playerInfo: any;
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

			this._viewUI.list_room.hScrollBarSkin = "";
			this._viewUI.list_room.itemRender = this.createChildren("game_ui.brniuniu.component.ChangCiRenderUI", BrniuniuHUDRender);
			this._viewUI.list_room.renderHandler = new Handler(this, this.renderHandler);
			this._viewUI.list_room.scrollBar.elasticDistance = 100;
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			this._viewUI.btn_join.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			(this._viewUI.view as TongyongHudNqpPage).onOpen(this._game, BrniuniuPageDef.GAME_NAME);
			this._game.playMusic(Path_game_brniuniu.music_brniuniu + "nn_bgm.mp3");

			let datas = [];
			for (let i = 0; i < BrNiuNiuPage.BET_MAX.length; i++) {
				let data = [];
				data[0] = BrNiuNiuPage.BET_MAX[i];
				data[1] = i;
				datas.push(data);
			}

			this._viewUI.list_room.dataSource = datas;
		}

		public close(): void {
			this._player = null;
			if (this._viewUI) {
				this._viewUI.list_room.dataSource = [];
				this._viewUI.btn_join.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				if (this._niuHudMgr) {
					this._niuHudMgr.off(BrNiuNiuHudMgr.EVENT_RETURN_MAPINFO, this, this.onUpdateMapinfo);
					this._niuHudMgr.clear();
					this._niuHudMgr = null;
				}
				this._game.stopMusic();
				Laya.Tween.clearAll(this);
			}
			super.close();
		}

		public resize(w: number, h: number, realW: number, realH: number, isLayout: boolean = true): void {
			super.resize(w, h, realW, realH);
			if (this._viewUI) {
				this._viewUI.list_room.width = this._clientWidth;
			}
		}

		private renderHandler(cell: BrniuniuHUDRender, index: number) {
			if (!cell) return;
			cell.setData(this, this._game, cell.dataSource);
			if (!cell.isTween) {
				Laya.Tween.from(cell, { x: cell.x + 600 }, 200 + index * 100);
				cell.isTween = true;
			}
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
			this._viewUI.list_room.cells.forEach(element => {
				let cell = element as BrniuniuHUDRender;
				let i = cell.index;
				cell.setRecord(data[i][2]);
			});
		}

		private onTime(): void {
			if (!this._niuHudMgr || !this._niuHudMgr.data || !this._niuHudMgr.data.length) return;
			let data = this._niuHudMgr.data;
			this._viewUI.list_room.cells.forEach(element => {
				let cell = element as BrniuniuHUDRender;
				let i = cell.index;
				if (cell.index >= 0) {
					let curTime = this._game.sync.serverTimeBys;
					let endTime = data[i][1];
					let time = Math.floor(endTime - curTime);
					let valueBar: number;
					if (data[i][0] == 3) {//下注中
						if (time <= 0) {
							valueBar = 0;
							cell.state = "结算中...";
							cell.barV = valueBar;
						} else {
							valueBar = time / BrNiuNiuPage.BET_TIME;
							cell.state = "下注中..." + time + "s";
							if (cell.tag != 1 && valueBar) {
								cell.tag = 1;
								cell.barV = valueBar;
								Laya.Tween.to(cell.bar, { value: 0 }, time * 1000, null, Handler.create(this, () => {
									cell.tag = 0;
								}));
							}
						}
					} else {
						valueBar = 0;
						cell.state = "结算中...";
						cell.barV = valueBar;
					}
				}
			});
		}


		protected onBtnTweenEnd(e: any, target: any): void {
			this._player = this._game.sceneObjectMgr.mainPlayer;
			if (!this._player) return;
			this._playerInfo = this._player.playerInfo;
			switch (target) {
				case this._viewUI.btn_join:
					let maplv = TongyongUtil.getJoinMapLv(BrniuniuPageDef.GAME_NAME, this._playerInfo.money);
					if (!maplv) return;
					this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, maplv.toString(), true);
					break;
				default:
					break;
			}
		}
	}

	class BrniuniuHUDRender extends ui.nqp.game_ui.brniuniu.component.ChangCiRenderUI {
		public index: number;
		public isTween: boolean;
		private _page: BrNiuNiuPage;
		private _game: Game;
		private _data: any;
		private _max: number = -1;
		constructor() {
			super();
		}
		setData(page: BrNiuNiuPage, game: Game, data: any) {
			if (!data) {
				this.visible = false;
				return;
			}
			if (this._max == data[0]) {
				return;
			}
			this._page = page;
			this._game = game;
			this._max = data[0];
			this.index = data[1];
			this.visible = true;
			this.list_record.itemRender = HudRecordRender;
			this.list_record.renderHandler = new Handler(this, this.renderHandler);
			this.list_record.dataSource = [];
			this.on(LEvent.CLICK, this, this.onClick);
			this.show();
		}

		destroy() {
			this.off(LEvent.CLICK, this, this.onClick);
			super.destroy();
		}

		setRecord(arr) {
			this.list_record.dataSource = arr;
		}

		set state(v) {
			this.txt_status.text = v.toString();
		}

		set barV(v) {
			this.bar.value = v;
		}

		private renderHandler(cell: HudRecordRender, index: number) {
			if (cell) {
				cell.setData(this._game, cell.dataSource);
			}
		}

		private show() {
			this.txt_max.text = '投注限额：' + this._max;
			this.btn_enter.skin = PathGameTongyong.ui_tongyong + 'hud/btn_hud_' + this.index + '.png';
			this.img_bg.skin = PathGameTongyong.ui_tongyong + 'hud/difen_2_' + this.index + '.png';
			this.img_tdxh.skin = Path_game_brniuniu.ui_brniuniu + 'tu_tdxh' + this.index + '.png';
		}

		private onClick() {
			this._game.sceneObjectMgr.intoStory(BrniuniuPageDef.GAME_NAME, Web_operation_fields['GAME_ROOM_CONFIG_BRNIUNIU_' + (this.index + 1)].toString(), true);
		}
	}

	class HudRecordRender extends ui.nqp.game_ui.brniuniu.component.HudRenderUI {
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