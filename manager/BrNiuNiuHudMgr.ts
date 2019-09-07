/**
* name 
*/
module gamebrniuniu.manager {
	export class BrNiuNiuHudMgr extends gamecomponent.managers.BaseMgr {
		static readonly EVENT_RETURN_MAPINFO: string = "BrNiuNiuHudMgr.RETURN_MAPINFO";
		private _data: any = [];
		constructor(game: Game) {
			super(game)
			this._delta = 3000;
			this._game.network.addHanlder(Protocols.SMSG_BRNN_RETURN_MAPINFO, this, this.onOptHandler);
		}

		public get data() {
			return this._data;
		}

		private onOptHandler(optcode: number, msg: any): void {
			let mapRecord1 = [];
			if (msg.record1 != "") mapRecord1 = JSON.parse(msg.record1);
			for (let i = 0; i < mapRecord1.length / 2; i++) {
				let val = mapRecord1[i];
				mapRecord1[i] = mapRecord1[mapRecord1.length - 1 - i];
				mapRecord1[mapRecord1.length - 1 - i] = val;
			}
			let data1 = [msg.status1, msg.countdown1, mapRecord1]

			let mapRecord2 = [];
			if (msg.record2 != "") mapRecord2 = JSON.parse(msg.record2);
			for (let i = 0; i < mapRecord2.length / 2; i++) {
				let val = mapRecord2[i];
				mapRecord2[i] = mapRecord2[mapRecord2.length - 1 - i];
				mapRecord2[mapRecord2.length - 1 - i] = val;
			}
			let data2 = [msg.status2, msg.countdown2, mapRecord2]

			let mapRecord3 = [];
			if (msg.record3 != "") mapRecord3 = JSON.parse(msg.record3);
			for (let i = 0; i < mapRecord3.length / 2; i++) {
				let val = mapRecord3[i];
				mapRecord3[i] = mapRecord3[mapRecord3.length - 1 - i];
				mapRecord3[mapRecord3.length - 1 - i] = val;
			}
			let data3 = [msg.status3, msg.countdown3, mapRecord3]

			let mapRecord4 = [];
			if (msg.record4 != "") mapRecord4 = JSON.parse(msg.record4);
			for (let i = 0; i < mapRecord4.length / 2; i++) {
				let val = mapRecord4[i];
				mapRecord4[i] = mapRecord4[mapRecord4.length - 1 - i];
				mapRecord4[mapRecord4.length - 1 - i] = val;
			}
			let data4 = [msg.status4, msg.countdown4, mapRecord4]

			this._data = [data1, data2, data3, data4];
			this.event(BrNiuNiuHudMgr.EVENT_RETURN_MAPINFO);
		}

		/**
		 * 帧间隔心跳
		 */
		deltaUpdate() {
			this._game.network.call_brnn_get_mapinfo()
		}

		clear() {
			Laya.timer.clearAll(this);
			this._game.network.removeHanlder(Protocols.SMSG_BRNN_RETURN_MAPINFO, this, this.onOptHandler);
			super.clear();
		}
	}
}