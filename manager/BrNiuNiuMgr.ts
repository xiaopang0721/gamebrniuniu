/**
* name 
*/
module gamebrniuniu.manager {
	const enum NIU_TYPE {
		NOT_NIU = 0, //没牛
		NIU_1 = 1, //牛一
		NIU_2 = 2, //牛二
		NIU_3 = 3, //牛三
		NIU_4 = 4, //牛四
		NIU_5 = 5, //牛五
		NIU_6 = 6, //牛六
		NIU_7 = 7, //牛七
		NIU_8 = 8, //牛八
		NIU_9 = 9, //牛九
		NIU_NIU = 10, //牛牛
		SILVER_NIU = 11, //银牛
		GOLD_NIU = 12, //金牛
		BOMB = 13, //炸弹
		SMALL_NIU = 14, //五小牛
	}
	const enum MULTIPLE {
		RATE_1 = 1, //没牛——牛六	1倍
		RATE_2 = 2, //牛七——牛八	2倍
		RATE_3 = 3, //牛九		  3倍
		RATE_4 = 4, //牛牛，四花牛   4倍
		RATE_5 = 5, //五花牛，炸弹   5倍
		RATE_6 = 6, //五小牛		  6倍
	}
	const CARDS_NUM = 5; //场上共5副牌
	const MAX_CARD_COUNT = 5; //最大手牌数

	export class BrNiuNiuMgr extends gamecomponent.managers.PlayingCardMgrBase<BrNiuNiuData>{
		static readonly MAPINFO_OFFLINE: string = "BrNiuNiuMgr.MAPINFO_OFFLINE";//假精灵
		static readonly CANCEL_MATCH: string = "BrNiuNiuMgr.CANCEL_MATCH";//取消匹配
		static readonly DEAL_OVER: string = "BrNiuNiuMgr.DEAL_OVER";//发牌结束
		static readonly SEE_CARD_OVER: string = "BrNiuNiuMgr.SEE_CARD_OVER";//搓牌动作结束

		private _winnerIndex: number;//赢家位置
		private _offlineUnit: UnitOffline;//假精灵信息
		private _isCancel: boolean = false;
		private _isReDrawCards: boolean = true;
		private _cardsIndex: Array<number> = [];//牌的归属位置

		constructor(game: Game) {
			super(game)
		}

		get offlineUnit() {
			return this._offlineUnit;
		}

		set offlineUnit(v) {
			this._offlineUnit = v;
			this.event(BrNiuNiuMgr.MAPINFO_OFFLINE)
		}

		get isCancel() {
			return this._isCancel;
		}

		set isCancel(v) {
			this._isCancel = v;
			this.event(BrNiuNiuMgr.MAPINFO_OFFLINE)
		}

		get isReDrawCards() {
			return this._isReDrawCards;
		}

		set isReDrawCards(v) {
			this._isReDrawCards = v;
		}

		get allCards() {
			return this._cards;
		}

		//对牌进行排序 重写不需要排序
		SortCards(cards: any[]) {

		}

		//管理器自己的排序
		sortCards(cards: any[]) {
			if (!cards) return;
			cards.sort((a: BrNiuNiuData, b: BrNiuNiuData) => {
				return a.Compare(b, true);
			});
		}

		initCard(all_val: Array<number>) {
			let card_arr = [];
			for (let i: number = 0; i < all_val.length; i++) {
				let card: BrNiuNiuData;
				card = new BrNiuNiuData();
				card.Init(all_val[i]);
				card_arr.push(card);
			}
			return card_arr;
		}

		//banker_Cards  庄家
		//other_Cards  闲家
		//return 庄家是否赢
		bankeriswin(banker_Cards, other_Cards) {
			let new_bankerCards = [];
			let new_otherCards = [];
			for (let i = 0; i < banker_Cards.length; i++) {
				new_bankerCards[i] = banker_Cards[i];
				new_otherCards[i] = other_Cards[i];
			}
			this.sortCards(new_bankerCards);
			this.sortCards(new_otherCards);
			let banker_Cards_Type = this.checkCardsType(new_bankerCards);
			let other_Cards_Type = this.checkCardsType(new_otherCards);
			let result = 0;
			if (banker_Cards_Type != other_Cards_Type) {
				if (banker_Cards_Type > other_Cards_Type) {
					result = 1
				} else {
					result = -1
				}
				return result
			}
			if (banker_Cards_Type == NIU_TYPE.SMALL_NIU) {
				result = new_bankerCards[0].Compare(new_otherCards[0], true) * -1;
				return result
			}
			if (banker_Cards_Type == NIU_TYPE.BOMB) {
				result = new_bankerCards[2].card_val > new_otherCards[2].card_val ? 1 : -1;
				return result
			}
			if (banker_Cards_Type == NIU_TYPE.GOLD_NIU) {
				result = new_bankerCards[0].Compare(new_otherCards[0], true) * -1;
				return result
			}
			if (banker_Cards_Type == NIU_TYPE.SILVER_NIU) {
				result = new_bankerCards[0].Compare(new_otherCards[0], true) * -1;
				return result
			}
			if (banker_Cards_Type >= NIU_TYPE.NIU_1 && banker_Cards_Type <= NIU_TYPE.NIU_NIU) {
				result = new_bankerCards[0].Compare(new_otherCards[0], true) * -1;
				return result
			}
			if (banker_Cards_Type == NIU_TYPE.NOT_NIU) {
				result = new_bankerCards[0].Compare(new_otherCards[0], true) * -1;
				return result
			}
			return result
		}

		// 根据牌获取牌型
		// 获得牛数
		private getNiubyCards(cards): number {
			let lave: number = 0; //余数
			for (let i = 0; i < cards.length; i++) {
				lave = lave + cards[i].GetCount();
			}
			lave = lave % 10;
			for (let i = 0; i < cards.length - 1; i++) {
				for (let j = i + 1; j < cards.length; j++) {
					if ((cards[i].GetCount() + cards[j].GetCount()) % 10 == lave) {
						if (lave == 0) {
							return 10;
						} else {
							return lave;
						}
					}
				}
			}
			return 0;
		}

		public checkCardsRate(cardtype): number {
			let cardRate = MULTIPLE.RATE_1;
			if (cardtype == 14) {
				cardRate = MULTIPLE.RATE_6;
				return cardRate;
			}
			if (cardtype == 12 || cardtype == 13) {
				cardRate = MULTIPLE.RATE_5;
				return cardRate;
			}
			if (cardtype == 10 || cardtype == 11) {
				cardRate = MULTIPLE.RATE_4;
				return cardRate;
			}
			if (cardtype == 9) {
				cardRate = MULTIPLE.RATE_3;
				return cardRate;
			}
			if (cardtype > 6 && cardtype < 9) {
				cardRate = MULTIPLE.RATE_2;
				return cardRate;
			}
			return cardRate;
		}

		public checkCardsType(cards): number {
			let new_cards = [];
			for (let i = 0; i < cards.length; i++) {
				new_cards[i] = cards[i];
			}
			this.sortCards(new_cards);
			let cardtype = NIU_TYPE.NOT_NIU;
			if (this.is_small_niu(new_cards)) {
				cardtype = NIU_TYPE.SMALL_NIU;
				return cardtype
			}
			else if (this.is_bomb(new_cards)) {
				cardtype = NIU_TYPE.BOMB;
				return cardtype
			}
			else if (this.is_gold_niu(new_cards)) {
				cardtype = NIU_TYPE.GOLD_NIU;
				return cardtype
			}
			else if (this.is_silver_niu(new_cards)) {
				cardtype = NIU_TYPE.SILVER_NIU;
				return cardtype
			}
			cardtype = this.getNiubyCards(new_cards)
			return cardtype;
		}

		// 是否五小牛
		private is_small_niu(cards): boolean {
			let sum = 0;
			for (let i = 0; i < cards.length; i++) {
				sum = sum + cards[i].GetCount();
			}
			if (sum <= 10)
				return true
			else
				return false
		}
		// 是否炸弹
		private is_bomb(cards): boolean {
			if (cards[0].GetCardVal() == cards[3].GetCardVal())
				return true;
			else if (cards[1].GetCardVal() == cards[4].GetCardVal())
				return true;
			else
				return false;
		}
		// 是否五花牛
		private is_gold_niu(cards): boolean {
			if (cards[4].GetCardVal() > 10)
				return true;
			else
				return false;
		}
		// 是否四花牛
		private is_silver_niu(cards): boolean {
			if (cards[3].GetCardVal() > 10 && cards[4].GetCardVal() == 10)
				return true;
			else
				return false;
		}

		sort() {
			let cards = this._cards;//牌堆
			let count = 0;
			for (let index = 0; index < CARDS_NUM; index++) {//循环五副牌
				for (let i = 0; i < MAX_CARD_COUNT; i++) {//循环五张牌
					let card = cards[index * MAX_CARD_COUNT + i] as BrNiuNiuData;
					if (card) {
						card.myOwner(index);
						card.index = i;
						card.sortScore = -i;
					}
				}
			}
		}

		setValue(_cards, index) {
			if (!this._cards.length) return;
			for (let j = 0; j < MAX_CARD_COUNT; j++) {//手牌
				let card = this._cards[index * MAX_CARD_COUNT + j] as BrNiuNiuData;
				let _card = _cards[j];
				if (card) {
					card.Init(_card.GetVal());
					card.index = j;
					card.sortScore = -j;
				}
			}
			this.kaipai(index);
		}

		sortCardsToNiu(cards): Array<number> {
			let lave = 0; //余数
			let index1 = 0;
			let index2 = 0;
			let newCards = cards;
			for (let i: number = 0; i < newCards.length; i++) {
				lave = lave + newCards[i].GetCount();
			}
			lave = lave % 10;
			for (let i: number = 0; i < newCards.length - 1; i++) {
				for (let j: number = i + 1; j < newCards.length; j++) {
					if ((newCards[i].GetCount() + newCards[j].GetCount()) % 10 == lave) {
						index1 = i;
						index2 = j;
					}
				}
			}
			if (index1 + index2 == 0) return [];
			return [index1, index2];
		}

		//发牌
		fapai() {
			let count = 0;
			let counter = 0;
			for (let j: number = 0; j < CARDS_NUM; j++) {
				for (let i: number = 0; i < this._cards.length / CARDS_NUM; i++) {
					Laya.timer.once(150 * count, this, () => {
						this._game.playSound(PathGameTongyong.music_tongyong + "fapai.mp3", false);
						let card = this._cards[i * CARDS_NUM + j];
						if (!card) return;
						card.fapai();
						counter++;
						if (counter >= this._cards.length) {
							this.event(BrNiuNiuMgr.DEAL_OVER);
						}
					});
					count++;
				}
			}
		}

		//重新发牌（最后一张牌旋转）
		refapai() {
			for (let i: number = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				if (!card) return;
				card.refapai();
			}
		}

		//重新发牌（正常）
		refapai1() {
			for (let i: number = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				if (!card) return;
				card.refapai1();
			}
		}

		//翻牌
		fanpai() {
			let count = 1;
			for (let j: number = 0; j < CARDS_NUM; j++) {
				for (let i: number = 0; i < this._cards.length / CARDS_NUM; i++) {
					Laya.timer.once(500 * count, this, () => {
						let card = this._cards[i * CARDS_NUM + j];
						if (!card) return;
						card.fanpai();
					});
					count++;
				}
			}
		}

		//翻牌（断线重连）
		refanpai() {
			for (let i: number = 0; i < this._cards.length; i++) {
				let card = this._cards[i];
				if (!card) return;
				card.fanpai();
			}
		}

		//搓牌隐藏第四张
		yincang(index: number) {
			let card = this._cards[5 * index + 4];
			if (!card) return;
			card.yincangpai();
		}

		//开牌
		kaipai(index: number) {
			let idx = index == 0 ? 4 : index - 1;
			Laya.timer.once(1700 + idx * 1800, this, () => {
				let card = this._cards[5 * index + 4];
				if (!card) return;
				card.kaipai();
			})
		}

		//两张牛牌向上移动
		moveCard(index: number, niuIndex: Array<number>) {
			Laya.timer.once(1700 + index * 1900, this, () => {
				for (let i = 0; i < niuIndex.length; i++) {
					if (i == niuIndex[i]) {
						let card = this._cards[5 * index + 4];
						if (!card) return;
						card.targe_pos.y = card.targe_pos.y - 20;
						card.moveCard();
					}
				}
			})
		}
	}
}