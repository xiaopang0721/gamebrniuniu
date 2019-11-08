/**
* name 
*/
module gamebrniuniu.data {
	export class BrNiuNiuData extends gamecomponent.object.PlayingPuKeCard {
		public _card_count: number = 0;
		public _isFan: boolean = false;
		private _b: boolean;
		//牌X轴位置，前四张牌Y轴位置，第五张牌Y轴位置，牌间隔距离
		private _posList: any = [[555, 45, 55, 35], [210, 485, 495, 30], [458, 485, 495, 30], [705, 485, 495, 30], [950, 485, 495, 30]];
		private _curIdx: number;
		private _maxCards: number = 5;//场上共5副牌

		constructor() {
			super();
		}

		public Init(v: number) {
			if (v < 0 || v > 52) {
				throw "PlayingCard v < 0 || v > 52," + v
			}
			this._val = v - 1;
			this.time_interval = 300;
			this.Analyze();
		}

		protected Analyze(): void {
			this._card_val = this._val % 13 + 1;
			this._card_color = Math.floor(this._val / 13);
			if (this._card_val > 10)
				this._card_count = 10;
			else
				this._card_count = this._card_val;
			this._isFan = this._val < 0 ? false : true;
		}

		//获取牛牛牌值
		public GetCount() {
			return this._card_count;
		}

		myOwner(index: number) {
			this.size = 0.2;
			this._curIdx = index;
			this.rotateAngle = Math.PI / 6;
		}

		fapai() {
			let posX = this._posList[this._curIdx][0];
			let posY = this._posList[this._curIdx][1];
			if (this.index == 4) {
				posY = this._posList[this._curIdx][2];
			}
			let space = this._posList[this._curIdx][3];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.targe_pos.x = posX + this.index * space; 
			this.targe_pos.y = posY;
			this.scaleX = -1;
			super.fapai();
			Laya.Tween.clearAll(this);
			Laya.Tween.to(this, { size: 0.55 }, this.time_interval);
			Laya.Tween.to(this, { rotateAngle: this.index == 4 ? Math.PI * 4.5 : Math.PI * 4 }, this.time_interval, null, Handler.create(this, this.fanpai));
		}

		refapai() {
			let posX = this._posList[this._curIdx][0];
			let posY = this._posList[this._curIdx][1];
			if (this.index == 4) {
				posY = this._posList[this._curIdx][2];
			}
			let space = this._posList[this._curIdx][3];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.pos.x = posX + this.index * space;
			this.pos.y = posY;
			this.targe_pos.x = posX + this.index * space;
			this.targe_pos.y = posY;
			this.size = 0.55;
			this.rotateAngle = this.index == 4 ? Math.PI * 4.5 : Math.PI * 4;
			super.fapai();
		}

		refapai1() {
			let posX = this._posList[this._curIdx][0];
			let posY = this._posList[this._curIdx][1];
			let space = this._posList[this._curIdx][3];
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.pos.x = posX + this.index * space;
			this.pos.y = posY;
			this.targe_pos.x = posX + this.index * space;
			this.targe_pos.y = posY;
			this.size = 0.55;
			this.rotateAngle = Math.PI * 4;
			super.fapai();
		}

		fanpai() {
			if (!this._isFan) return;
			super.fanpai();
		}

		kaipai() {
			if (!this._isFan) return;
			this.visible = true;
			if (!this.targe_pos) {
				this.targe_pos = new Vector2();
			}
			this.targe_pos.y = this._posList[this._curIdx][1];
			this.rotateAngle = Math.PI * 4;
			this.scaleX = 1;
			this.isShow = true;
			this.pos.y = this.targe_pos.y;
			// super.fanpai();
		}

		yincangpai() {
			this.visible = false;
		}

		moveCard() {
			super.movePai();
		}
	}
}