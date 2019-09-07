/**
* name 牛牛剧情
*/
module gamebrniuniu.story {
	const enum MAP_STATUS {
		PLAY_STATUS_NONE = 0, // 准备阶段
		PLAY_STATUS_GAMESTART = 1, // 游戏开始
		PLAY_STATUS_WASH_CARD = 2, // 洗牌阶段
		PLAY_STATUS_BET = 3,// 下注阶段
		PLAY_STATUS_STOP_BET = 4,// 停止下注阶段
		PLAY_STATUS_PUSH_CARD = 5, // 发牌阶段
		PLAY_STATUS_SHOW_CARD = 6, // 开牌阶段
		PLAY_STATUS_SETTLE = 7, // 结算阶段
		PLAY_STATUS_SHOW_INFO = 8, // 显示结算信息阶段
		PLAY_STATUS_RELAX = 9, // 休息阶段
	}
	const CARDS_COUNT = 5 // 场上共5副数
	export class BrniuniuStory extends gamecomponent.story.StoryBaiRenBase {
		private _niuMgr: BrNiuNiuMgr;
		private _winnerIndex: number;
		private _curStatus: number;
		private _niuMapInfo: BrniuniuMapInfo;
		private _dealCards: Array<number> = [];
		private _openCards: Array<number> = [];

		constructor(v: Game, mapid: string, maplv: number) {
			super(v, mapid, maplv);
			this.init();
		}

		get niuMgr() {
			return this._niuMgr;
		}

		init() {
			if (!this._niuMgr) {
				this._niuMgr = new BrNiuNiuMgr(this._game);
			}
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
			this._game.sceneObjectMgr.on(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			this.onIntoNewMap();
		}

		private onIntoNewMap(info?: MapAssetInfo): void {
			if (!info) return;
			this.onMapInfoChange();
			this._game.uiRoot.closeAll();
			this._game.uiRoot.HUD.open(BrniuniuPageDef.PAGE_BRNIUNIU_MAP);
		}

		private onMapInfoChange(): void {
			let mapinfo = this._game.sceneObjectMgr.mapInfo;
			this._niuMapInfo = mapinfo as BrniuniuMapInfo;
			if (mapinfo) {
				this.onUpdateState();
				this.onUpdateBattle();
			}
		}

		private onUpdateState(): void {
			if (!this._niuMapInfo) return;
			let mapStatus = this._niuMapInfo.GetMapState();
			if (this._curStatus == mapStatus) return;
			this._curStatus = mapStatus;
			switch (this._curStatus) {
				case MAP_STATUS.PLAY_STATUS_NONE:// 准备阶段
					this.serverClose();
					break;
				case MAP_STATUS.PLAY_STATUS_GAMESTART:// 游戏开始

					break;
				case MAP_STATUS.PLAY_STATUS_WASH_CARD:// 洗牌阶段

					break;
				case MAP_STATUS.PLAY_STATUS_BET:// 下注阶段
					break;
				case MAP_STATUS.PLAY_STATUS_STOP_BET:// 停止下注阶段
					break;
				case MAP_STATUS.PLAY_STATUS_PUSH_CARD:// 发牌阶段
					this.cardsDeal();
					break;
				case MAP_STATUS.PLAY_STATUS_SHOW_CARD:// 开牌阶段
					for (let i = 0; i < CARDS_COUNT; i++) {
						let index = i + 1 == 5 ? 0 : i + 1;
						let cards = [];
						for (let j = 0; j < 5; j++) {
							cards.push(this._openCards[index * 5 + j]);
						}
						let _cards = this._niuMgr.initCard(cards);
						this._niuMgr.setValue(_cards, index);
					}
					break;
				case MAP_STATUS.PLAY_STATUS_SETTLE:// 结算阶段
					break;
				case MAP_STATUS.PLAY_STATUS_SHOW_INFO:// 显示结算信息阶段
					break;
				case MAP_STATUS.PLAY_STATUS_RELAX:// 休息阶段
					break;
			}
		}

		createObj() {
			let card = this._game.sceneObjectMgr.createOfflineObject(SceneRoot.CARD_MARK, BrNiuNiuData) as BrNiuNiuData;
			card.pos = new Vector2(900, 177);
			return card;
		}

		//正常游戏发牌
		private cardsDeal(): void {
			let handle = new Handler(this, this.createObj);
			this._niuMgr.Init(this._dealCards, handle);
			this._niuMgr.sort();
			this._niuMgr.fapai();
		}

		//断线重连,重发下牌
		private cardsDraw(): void {
			if (!this._niuMapInfo) return;
			let status = this._niuMapInfo.GetMapState();
			if (status == MAP_STATUS.PLAY_STATUS_PUSH_CARD && this._dealCards.length == 25) {
				let handle = new Handler(this, this.createObj);
				this._niuMgr.Init(this._dealCards, handle);
				this._niuMgr.sort();
				this._niuMgr.refapai();
				this._niuMgr.refanpai();
				this._niuMgr.isReDrawCards = false;
				this._niuMgr.event(BrNiuNiuMgr.DEAL_OVER);
			}
			else if (status > MAP_STATUS.PLAY_STATUS_PUSH_CARD && status < MAP_STATUS.PLAY_STATUS_RELAX && this._openCards.length == 25) {
				let handle = new Handler(this, this.createObj);
				this._niuMgr.Init(this._openCards, handle);
				this._niuMgr.sort();
				this._niuMgr.refapai1();
				this._niuMgr.refanpai();
				this._niuMgr.isReDrawCards = false;
				this._niuMgr.event(BrNiuNiuMgr.DEAL_OVER);
			}
		}

		//战斗结构体 出牌
		private onUpdateBattle(): void {
			if (!this._niuMapInfo) return;
			let battleInfoMgr = this._niuMapInfo.battleInfoMgr;
			this._dealCards = [];
			this._openCards = [];
			for (let i: number = 0; i < battleInfoMgr.info.length; i++) {
				let info = battleInfoMgr.info[i];
				if (info instanceof gamecomponent.object.BattleInfoDeal) {
					let arr = info.Cards.concat();
					if (this._openCards.length < 25) {
						this._openCards = this._openCards.concat(arr)
					}
					arr[arr.length - 1] = 0
					if (this._dealCards.length < 25) {
						this._dealCards = this._dealCards.concat(arr)
					}
				}
			}
			if (this._niuMgr.isReDrawCards) {
				this.cardsDraw();
			}
		}

		enterMap() {
			//各种判断
			this._game.network.call_match_game(this._mapid, this.maplv);
			return true;
		}

		leavelMap() {
			//各种判断
			this._game.network.call_leave_game();
			return true;
		}

		clear() {
			this._niuMapInfo = null;
			this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
			this._game.sceneObjectMgr.off(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			if (this._niuMgr) {
				this._niuMgr.clear();
				this._niuMgr = null;
			}
		}

		update(diff: number) {

		}
	}
}