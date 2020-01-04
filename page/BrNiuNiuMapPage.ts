/**
* 牛牛
*/
module gamebrniuniu.page {
    import TextFieldU = utils.TextFieldU;
    const enum MAP_STATUS {
        PLAY_STATUS_NONE = 0, // 准备阶段
        PLAY_STATUS_GAMESTART = 1, // 游戏开始
        PLAY_STATUS_WASH_CARD = 2, // 洗牌阶段
        PLAY_STATUS_BET = 3,// 下注阶段
        PLAY_STATUS_STOP_BET = 4,// 停止下注阶段
        PLAY_STATUS_PUSH_CARD = 5, // 发牌阶段
        PLAY_STATUS_SHOW_CARD = 6, // 开牌阶段
        PLAY_STATUS_SETTLE = 7, // 结算阶段
        PLAY_STATUS_RELAX = 8, // 休息阶段
    }
    const MAX_CARDS_COUNT = 5; // 场上共5副牌
    const PLAYER_LEAST_MONEY = 50 // 投注最少携带金额
    const ROOM_CHIP_CONFIG = {
        "71": [1, 5, 10, 20, 50],     //新手
        "72": [1, 10, 20, 50, 100],   //小资
        "73": [10, 20, 50, 100, 500],  //老板
        "74": [20, 50, 100, 500, 1000],  //富豪
    };
    const ONLINE_NUM_RATE_CONFIG = {
        "71": 0.6,     //新手
        "72": 0.5,   //小资
        "73": 0.4,  //老板
        "74": 0.35,  //富豪
    };
    export class BrNiuNiuMapPage extends game.gui.base.Page {
        static readonly MONEY_LIMIT_CONFIG = {
            "71": [5000, 2000, 200],    //新手(上庄限制，入座限制，投注限额)
            "72": [20000, 5000, 500],  //小资(上庄限制，入座限制，投注限额)
            "73": [50000, 10000, 1000],  //老板(上庄限制，入座限制，投注限额)
            "74": [100000, 20000, 2000],    //富豪(上庄限制，入座限制，投注限额)
        };


        private _viewUI: ui.ajqp.game_ui.brniuniu.BaiRenNNUI;
        private _niuMgr: BrNiuNiuMgr;
        private _niuStory: BrniuniuStory;
        private _niuMapInfo: BrniuniuMapInfo;
        private _mainPlayerBenefit: number = 0;//玩家收益
        private _settleInfo: Array<number> = [];//结算信息集合
        private _areaList: Array<Box> = [];//下注区域UI集合
        private _aniKaiPaiList: Array<any> = [];//开牌动作集合
        private _areaKuangUIList: Array<any> = [];//下注区域边框集合
        private _cardsTypeList: Array<any> = [];//卡牌类型UI集合
        private _seatUIList: Array<any> = [];//座位UI集合
        private _chipUIList: Array<ui.ajqp.game_ui.tongyong.effect.Effect_cmUI> = [];//筹码UI集合
        private _chipArr: Array<number> = [];//筹码大小类型
        private _cardsArr: Array<any> = [];//开牌信息集合
        private _clipList: Array<BrniuniuClip> = [];//飘字集合
        private _imgdiList: Array<LImage> = [];//飘字底集合
        private _resultList: Array<number> = [];//结算结果集合
        private _onlineNumRate: number = 1;//在线人数比例
        private _bankerCards: any;//庄家手牌信息
        private _szlimit: number;//上庄金币
        private _seatlimit: number;//入座金币
        private _betlimit: number;//投注限额
        private _curStatus: number;//当前地图状态
        private _countDown: number;//倒计时时间戳
        private _curChip: number;//当前选择筹码
        private _curChipY: number = 55;//当前选择筹码y轴位置
        private _btnRepeatY: number;//重复下注位置
        private _chipSortScore: number = 0;//筹码层级
        private _chipTian: Array<any> = [];//天所有筹码
        private _chipDi: Array<any> = [];//地所有筹码
        private _chipXuan: Array<any> = [];//玄所有筹码
        private _chipHuang: Array<any> = [];//黄所有筹码
        private _unitSeated: Array<any> = [];//入座精灵信息集合
        private _betTotal0: number = 0;//天下注总额（所有玩家）
        private _betTotal1: number = 0;//地下注总额（所有玩家）
        private _betTotal2: number = 0;//玄下注总额（所有玩家）
        private _betTotal3: number = 0;//黄下注总额（所有玩家）
        private _betMain0: number = 0;//天下注总额（主玩家）
        private _betMain1: number = 0;//地下注总额（主玩家）
        private _betMain2: number = 0;//玄下注总额（主玩家）
        private _betMain3: number = 0;//黄下注总额（主玩家）
        private _rebetList: Array<number> = [0, 0, 0, 0];//重复下注列表
        private _mainHeadPos: any = [[0, 0], [0, -10]];//主玩家座位头像初始位置
        private _headStartPos: any = [[0, 0], [0, 158], [0, 316], [0, 0], [0, 158], [0, 316]];//座位头像初始位置
        private _headEndPos: any = [[10, 0], [10, 158], [10, 316], [-10, 0], [-10, 158], [-10, 316]];//座位头像移动位置
        private _htmlText: laya.html.dom.HTMLDivElement;
        private _isFirstOpen: boolean = false;
        private _drawCardType: boolean = false;
        private _bankerName: string;
        private _bankerHead: string;
        private _bankerTXK: string;
        private _bankerVip: string;
        private _betAllTotal: number = 0;
        private _betMainTotal: number = 0;
        private _isReConnect: boolean = true;
        private _isReDrawChips: boolean = true;

        constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
            super(v, onOpenFunc, onCloseFunc);
            this._isNeedDuang = false;
            this._delta = 1000;
            this._asset = [
                DatingPath.atlas_dating_ui + "qifu.atlas",
                Path_game_brniuniu.atlas_game_ui + "brniuniu.atlas",
                Path_game_brniuniu.atlas_game_ui_brniuniu + "niupai.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "qifu.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "pai.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "chongzhi.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "nyl.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "yq.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general + "anniu.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "fapai_1.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "xipai.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "kaipai.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksyx.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksxz.atlas",
            ];
        }

        // 页面初始化函数
        protected init(): void {
            this._viewUI = this.createView('game_ui.brniuniu.BaiRenNNUI');
            this.addChild(this._viewUI);
            this.initView();
            if (!this._pageHandle) {
                this._pageHandle = PageHandle.Get("BrNiuNiuMapPage");//额外界面控制器
            }
            this._niuStory = this._game.sceneObjectMgr.story as BrniuniuStory;
            if (this._niuStory) {
                this._niuMgr = this._niuStory.niuMgr;
                if (this._niuMgr) {
                    this._niuMgr.on(BrNiuNiuMgr.DEAL_OVER, this, this.onUpdateAniDeal);
                    this._niuMgr.on(BrNiuNiuMgr.SEE_CARD_OVER, this, this.onSeeCardOver);
                }
                this.onUpdateMapInfo();
            }
            this._viewUI.mouseThrough = true;
            this._game.playMusic(Path_game_brniuniu.music_brniuniu + "nn_bgm.mp3");
        }

        // 页面打开时执行函数
        protected onOpen(): void {
            super.onOpen();
            //api充值不显示
            this._viewUI.btn_chongzhi.visible = !WebConfig.enterGameLocked;

            this._viewUI.btn_spread.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_back.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_rule.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_chongzhi.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_set.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_zhanji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_repeat.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_shangzhuang.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_qifu.on(LEvent.CLICK, this, this.onBtnClickWithTween);
            this._viewUI.btn_playerList.on(LEvent.CLICK, this, this.onBtnClickWithTween);


            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_ADD_UNIT, this, this.onUnitAdd);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_REMOVE_UNIT, this, this.onUnitRemove);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_MONEY_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_CHANGE, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_ACTION, this, this.onUpdateUnit);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
            this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_UNIT_QIFU_TIME_CHANGE, this, this.onUpdateUnit);

            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_STATUS_CHECK, this, this.onUpdateStatus);
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_GAME_NO, this, this.onUpdateGameNo);//牌局号
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_COUNT_DOWN, this, this.onUpdateCountDown);//倒计时时间戳更新
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_SEATED_LIST, this, this.onUpdateSeatedList);//入座列表更新
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_MAP_BANKER_CHANGE, this, this.updateBanker);//地图庄家变更
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_SZ_LIST, this, this.updateBanker);//上庄列表更新
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_SYSTEM_MONEY_CHANGE, this, this.updateBanker);//系统庄金币更新
            this._game.sceneObjectMgr.on(BrniuniuMapInfo.EVENT_ROAD_RECORD_CHANGE, this, this.updateRoad);//大路信息更新
            this._game.qifuMgr.on(QiFuMgr.QIFU_FLY, this, this.qifuFly);
            this.onUpdateRecord();
            this.onUpdateUnitOffline();
            this.onUpdateSeatedList();
            this.onUpdateCountDown();
        }

        protected layout(): void {
            super.layout();
            if (this._viewUI) {
                //全面屏
                if (this._game.isFullScreen) {
                    this._viewUI.box_top_left.left = 14 + 56;
                    // this._viewUI.box_room_left.left = 115 + 56;
                    this._viewUI.box_top_right.right = 28 + 56;
                    this._viewUI.box_bottom_right.right = 12 + 56;
                } else {
                    this._viewUI.box_top_left.left = 14;
                    // this._viewUI.box_room_left.left = 115;
                    this._viewUI.box_top_right.right = 28;
                    this._viewUI.box_bottom_right.right = 12;
                }
            }
        }

        private _curDiffTime: number;
        update(diff: number) {
            super.update(diff);
            if (!this._curDiffTime || this._curDiffTime < 0) {
                this._viewUI.btn_chongzhi.ani1.play(0, false);
                this._curDiffTime = TongyongPageDef.CZ_PLAY_DIFF_TIME;
            } else {
                this._curDiffTime -= diff;
            }
        }

        //帧间隔心跳
        deltaUpdate() {
            let bool = this._curStatus == MAP_STATUS.PLAY_STATUS_BET || this._curStatus == MAP_STATUS.PLAY_STATUS_SETTLE;
            if (!bool) {
                this._viewUI.box_time.visible = false;
                return;
            }
            let curTime = this._game.sync.serverTimeBys;
            let time = Math.floor(this._countDown - curTime);
            this._viewUI.box_time.ani1.gotoAndStop(24);
            this._viewUI.box_time.visible = time > 0;
            this._viewUI.box_time.txt_time.text = time.toString();
            if (this._curStatus == MAP_STATUS.PLAY_STATUS_BET) {
                if (time <= 3 && !this._viewUI.box_time.ani1.isPlaying) {
                    this._viewUI.box_time.ani1.play(1, true);
                }
                if (time > 3) {
                    this._viewUI.box_time.ani1.gotoAndStop(24);
                }

                if (time == 1) {
                    this._game.playSound(PathGameTongyong.music_tongyong + "time2.mp3", false);
                } else if (time == 2 || time == 3) {
                    this._game.playSound(PathGameTongyong.music_tongyong + "time1.mp3", false);
                }
            }
        }

        //玩家进来了
        private onUnitAdd(u: Unit) {
            this.onUpdateUnit();
        }

        //玩家出去了
        private onUnitRemove(u: Unit) {
            this.onUpdateUnit();
        }

        private onUpdateAniDeal(): void {
            this._viewUI.paixie.ani2.gotoAndStop(0);
        }

        private onSeeCardOver(index: number): void {
            this._aniKaiPaiList[index].ani_kaipai.stop();
            this._aniKaiPaiList[index].visible = false;
            this._cardsTypeList[index].visible = true;
            this.setCardTypeAni(this._cardsTypeList[index]);
        }

        private onUpdateMapInfo(): void {
            let mapinfo = this._game.sceneObjectMgr.mapInfo;
            this._niuMapInfo = mapinfo as BrniuniuMapInfo;
            if (mapinfo) {
                this.initRoomConfig();
                this.updateBanker(0);
                this.onUpdateBattle();
                this.onUpdateStatus();
                this.onUpdateGameNo();
                this.onUpdateRecord();
                this.onUpdateSeatedList();
                this.updateRoad();
                this.onUpdateChipGrey();
                this.updateOnline();
                if (!this._niuMgr.isReDrawCards) {
                    this._viewUI.paixie.ani2.gotoAndStop(0)
                }
            }
        }

        private onUpdateUnitOffline() {
            let mainPlayer = this._game.sceneObjectMgr.mainPlayer;
            if (!mainPlayer) return;
            let mainPlayerInfo = mainPlayer.playerInfo;
            this._viewUI.main_player.txt_name.text = getMainPlayerName(mainPlayerInfo.nickname);
            let money = EnumToString.getPointBackNum(mainPlayerInfo.money, 2);
            this._viewUI.main_player.txt_money.text = money.toString();
            this._viewUI.main_player.img_qifu.visible = TongyongUtil.getIsHaveQiFu(mainPlayer, this._game.sync.serverTimeBys);
            this._viewUI.main_player.img_icon.skin = TongyongUtil.getHeadUrl(mainPlayer.playerInfo.headimg, 2);
            this._viewUI.main_player.img_txk.skin = TongyongUtil.getTouXiangKuangUrl(mainPlayer.playerInfo.headKuang);
            this._viewUI.main_player.img_vip.visible = mainPlayer.playerInfo.vip_level > 0;
            this._viewUI.main_player.img_vip.skin = TongyongUtil.getVipUrl(mainPlayer.playerInfo.vip_level);
        }

        private onUpdateUnit(qifu_index?: number) {
            if (!this._niuMapInfo) return;
            //主玩家的座位
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (mainUnit) {
                let headImg = mainUnit.GetHeadImg();
                this._viewUI.main_player.txt_name.text = getMainPlayerName(mainUnit.GetName());
                if (this._curStatus != MAP_STATUS.PLAY_STATUS_SETTLE) {
                    this._viewUI.main_player.txt_money.text = EnumToString.getPointBackNum(TongyongUtil.getMoneyChange(mainUnit.GetMoney()), 2).toString();
                }
                if (this._game.sceneObjectMgr.mainUnit.GetIndex() == this._niuMapInfo.GetBankerSeat()) {
                    this._viewUI.btn_repeat.disabled = true;
                }
                let mainIdx = mainUnit.GetIndex();
                //头像框
                this._viewUI.main_player.img_txk.skin = TongyongUtil.getTouXiangKuangUrl(mainUnit.GetHeadKuangImg());
                //vip标识
                this._viewUI.main_player.img_vip.visible = mainUnit.GetVipLevel() > 0;
                this._viewUI.main_player.img_vip.skin = TongyongUtil.getVipUrl(mainUnit.GetVipLevel());
                //祈福成功 头像上就有动画
                if (qifu_index && mainIdx == qifu_index) {
                    this._viewUI.main_player.qifu_type.visible = true;
                    this._viewUI.main_player.qifu_type.skin = this._qifuTypeImgUrl;
                    this.playTween(this._viewUI.main_player.qifu_type, qifu_index);
                }
                //祈福成功 头像上就有动画
                if (qifu_index && mainIdx == qifu_index) {
                    this._viewUI.main_player.qifu_type.visible = true;
                    this._viewUI.main_player.qifu_type.skin = this._qifuTypeImgUrl;
                    //时间戳变化 才加上祈福标志
                    this.playTween(this._viewUI.main_player.qifu_type, qifu_index);
                    Laya.timer.once(2500, this, () => {
                        this._viewUI.main_player.img_qifu.visible = true;
                        this._viewUI.main_player.img_icon.skin = TongyongUtil.getHeadUrl(mainUnit.GetHeadImg(), 2);
                    })
                }
                else {
                    this._viewUI.main_player.img_qifu.visible = TongyongUtil.getIsHaveQiFu(mainUnit, this._game.sync.serverTimeBys);
                    this._viewUI.main_player.img_icon.skin = TongyongUtil.getHeadUrl(mainUnit.GetHeadImg(), 2);
                }
                this.onUpdateChipGrey();
            }
            this.updateBanker(0);
            this.onUpdateSeatedList(qifu_index);
        }

        private onUpdateSeatedList(qifu_index?: number): void {
            if (!this._niuMapInfo) return;
            let seatedList = this._niuMapInfo.GetSeatedList();
            if (seatedList != "") {
                this._unitSeated = JSON.parse(seatedList);
            }
            if (!this._unitSeated.length) {
                return;
            }
            for (let i = 0; i < this._seatUIList.length; i++) {
                let unitIndex = this._unitSeated[i][0];
                let unit = this._game.sceneObjectMgr.getUnitByIdx(unitIndex);
                let seat = this._seatUIList[i];
                if (unit) {
                    seat.img_txk.visible = true;
                    seat.txt_name.text = getMainPlayerName(unit.GetName());
                    if (this._curStatus != MAP_STATUS.PLAY_STATUS_SETTLE) {
                        seat.txt_money.text = EnumToString.getPointBackNum(TongyongUtil.getMoneyChange(unit.GetMoney()), 2).toString();
                    }
                    seat.txt_name.fontSize = 15;
                    seat.img_icon.skin = TongyongUtil.getHeadUrl(unit.GetHeadImg(), 2);
                    seat.img_txk.skin = TongyongUtil.getTouXiangKuangUrl(unit.GetHeadKuangImg());
                    seat.img_vip.visible = unit.GetVipLevel() > 0;
                    seat.img_vip.skin = TongyongUtil.getVipUrl(unit.GetVipLevel());
                    //祈福成功 头像上就有动画
                    if (qifu_index && unitIndex == qifu_index) {
                        seat.qifu_type.visible = true;
                        seat.qifu_type.skin = this._qifuTypeImgUrl;
                        this.playTween1(seat.qifu_type, qifu_index);
                    }
                    //时间戳变化 才加上祈福标志
                    if (TongyongUtil.getIsHaveQiFu(unit, this._game.sync.serverTimeBys)) {
                        if (qifu_index && unitIndex == qifu_index) {
                            Laya.timer.once(2500, this, () => {
                                seat.img_qifu.visible = true;
                                seat.img_icon.skin = TongyongUtil.getHeadUrl(unit.GetHeadImg(), 2);
                            })
                        }
                    } else {
                        seat.img_qifu.visible = false;
                    }
                } else {
                    seat.txt_name.text = "";
                    seat.txt_money.text = "点击入座";
                    seat.txt_name.fontSize = 20;
                    seat.img_icon.skin = PathGameTongyong.ui_tongyong_general + "tu_weizi.png";
                    seat.img_qifu.visible = false;
                    seat.qifu_type.visible = false;
                    seat.img_txk.visible = false;
                    seat.img_vip.visible = false;
                }
            }
        }

        private onUpdateSettleMoney(): void {
            if (!this._niuMapInfo) return;
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (mainUnit) {
                let money = EnumToString.getPointBackNum(TongyongUtil.getMoneyChange(mainUnit.GetMoney()), 2);
                this._viewUI.main_player.txt_money.text = money.toString();
            }
            let seatedList = this._niuMapInfo.GetSeatedList();
            if (seatedList != "") {
                this._unitSeated = JSON.parse(seatedList);
            }
            if (!this._unitSeated.length) {
                return;
            }
            for (let i = 0; i < this._seatUIList.length; i++) {
                let unitIndex = this._unitSeated[i][0];
                let unit = this._game.sceneObjectMgr.getUnitByIdx(unitIndex);
                let seat = this._seatUIList[i];
                if (unit) {
                    seat.txt_money.text = EnumToString.getPointBackNum(TongyongUtil.getMoneyChange(unit.GetMoney()), 2).toString();
                }
            }
        }

        private _diff: number = 500;
        private _timeList: { [key: number]: number } = {};
        private _firstList: { [key: number]: number } = {};
        private playTween(img: LImage, index, isTween?: boolean) {
            if (!img) return;
            if (!this._timeList[index]) {
                this._timeList[index] = 0;
            }
            if (this._timeList[index] >= 2500) {
                this._timeList[index] = 0;
                this._firstList[index] = 0;
                img.visible = false;
                return;
            }
            Laya.Tween.to(img, { alpha: isTween ? 1 : 0.2 }, this._diff, Laya.Ease.linearNone, Handler.create(this, this.playTween, [img, index, !isTween]), this._firstList[index] ? this._diff : 0);
            this._timeList[index] += this._diff;
            this._firstList[index] = 1;
        }
        private _timeList1: { [key: number]: number } = {};
        private _firstList1: { [key: number]: number } = {};
        private playTween1(img: LImage, index, isTween?: boolean) {
            if (!img) return;
            if (!this._timeList1[index]) {
                this._timeList1[index] = 0;
            }
            if (this._timeList1[index] >= 2500) {
                this._timeList1[index] = 0;
                this._firstList1[index] = 0;
                img.visible = false;
                return;
            }
            Laya.Tween.to(img, { alpha: isTween ? 1 : 0.2 }, this._diff, Laya.Ease.linearNone, Handler.create(this, this.playTween1, [img, index, !isTween]), this._firstList1[index] ? this._diff : 0);
            this._timeList1[index] += this._diff;
            this._firstList1[index] = 1;
        }

        private _qifuTypeImgUrl: string;
        private qifuFly(dataSource: any): void {
            if (!dataSource) return;
            let dataInfo = dataSource;
            if (!this._game.sceneObjectMgr || !this._game.sceneObjectMgr.mainUnit || this._game.sceneObjectMgr.mainUnit.GetIndex() != dataSource.qifu_index) return;
            this._game.qifuMgr.showFlayAni(this._viewUI.main_player, this._viewUI, dataSource, (dataInfo) => {
                //相对应的玩家精灵做出反应
                this._qifuTypeImgUrl = TongyongUtil.getQFTypeImg(dataInfo.qf_id);
                this.onUpdateUnit(dataInfo.qifu_index);
            });
        }

        private updateOnline(): void {
            let unitNum = 0;
            for (let key in this._game.sceneObjectMgr.unitDic) {
                if (this._game.sceneObjectMgr.unitDic.hasOwnProperty(key)) {
                    let unit = this._game.sceneObjectMgr.unitDic[key];
                    if (unit) {
                        unitNum++;
                    }
                }
            }
            let onlineNum = Math.floor(this._game.datingGame.OnlineNumMgr.getOnlineNum(this._niuMapInfo.GetMapID()) * this._onlineNumRate);
            let innerHtml = StringU.substitute("在线<span style='color:#18ff00'>{0}</span>人", unitNum + onlineNum);
            this._htmlText.innerHTML = innerHtml;
        }

        //战斗结构体更新
        private _battleIndex: number = -1;
        private onUpdateBattle() {
            if (!this._niuMapInfo) return;
            let battleInfoMgr = this._niuMapInfo.battleInfoMgr;
            if (!battleInfoMgr) return;
            for (let i = 0; i < battleInfoMgr.info.length; i++) {
                let info = battleInfoMgr.info[i];
                if (info instanceof gamecomponent.object.BattleInfoDeal) {
                    if (this._battleIndex < i) {
                        this._battleIndex = i;
                        if (info.SeatIndex == 1) this._bankerCards = this._niuMgr.initCard(info.Cards);
                        this._cardsArr = this._cardsArr.concat(info);
                    }
                    if (info.SeatIndex > 1) {
                        if (this._resultList.length < 4) {
                            let cards = this._niuMgr.initCard(info.Cards)
                            let bankerIsWin = this._niuMgr.bankeriswin(this._bankerCards, cards);
                            this._resultList.push(bankerIsWin);
                        }
                    }
                }
                if (info instanceof gamecomponent.object.BattleInfoAreaBet) {
                    if (this._battleIndex < i) {
                        this._battleIndex = i;
                        this.onBattleBet(info, i);
                    }
                }
                if (info instanceof gamecomponent.object.BattleInfoSettle) {
                    if (this._battleIndex < i) {
                        this._battleIndex = i;
                        this.onBattleSettle(info);
                    }
                }
            }
        }
        //战斗日志来更新桌面上的筹码
        private onBattleBet(info: any, index: number): void {
            //主玩家的座位
            if (!this._game.sceneObjectMgr.mainUnit) return;
            let mainIdx = this._game.sceneObjectMgr.mainUnit.GetIndex();
            let startIdx: number;
            let targetIdx: number;
            let isMainPlayer: boolean = info.SeatIndex == mainIdx;
            if (isMainPlayer) {//主玩家
                startIdx = 0;
            } else {//其他玩家
                startIdx = 1;
                for (let i = 0; i < this._unitSeated.length; i++) {
                    let unitIndex = this._unitSeated[i][0];
                    let unit = this._game.sceneObjectMgr.getUnitByIdx(unitIndex);
                    if (unit && info.SeatIndex == unitIndex) {
                        this.moveHead(this._seatUIList[i], this._headStartPos[i][0], this._headStartPos[i][1], this._headEndPos[i][0], this._headEndPos[i][1]);
                        startIdx = 3 + i;
                    }
                }
            }
            targetIdx = info.BetIndex;
            let type = this._chipArr.indexOf(info.BetVal);
            this.createChip(startIdx, targetIdx, type, info.BetVal, index, info.SeatIndex);
            this.updateChipOnTable(targetIdx - 1, info.BetVal, isMainPlayer);
        }

        //头像出筹码动态效果
        private moveHead(view, startX, startY, endX, endY): void {
            Laya.Tween.clearAll(view);
            Laya.Tween.to(view, { x: endX, y: endY }, 50, null, Handler.create(this, () => {
                Laya.Tween.to(view, { x: startX, y: startY }, 50);
            }))
        }

        private updateChipOnTable(index: number, bet: number, isMainPlayer: boolean) {
            if (index == 0) {
                if (isMainPlayer) this._betMain0 += bet;
                this._betTotal0 += bet;
            } else if (index == 1) {
                if (isMainPlayer) this._betMain1 += bet;
                this._betTotal1 += bet;
            } else if (index == 2) {
                if (isMainPlayer) this._betMain2 += bet;
                this._betTotal2 += bet;
            } else if (index == 3) {
                if (isMainPlayer) this._betMain3 += bet;
                this._betTotal3 += bet;
            }
            if (isMainPlayer) {
                this._betMainTotal += bet;
            }
            this._betAllTotal += bet;
            this.updateBetNum();
        }

        private updateBetNum(): void {
            this._viewUI.txt_total0.text = this._betTotal0.toString();
            this._viewUI.txt_total1.text = this._betTotal1.toString();
            this._viewUI.txt_total2.text = this._betTotal2.toString();
            this._viewUI.txt_total3.text = this._betTotal3.toString();
            this._viewUI.txt_bet0.text = this._betMain0.toString();
            this._viewUI.txt_bet1.text = this._betMain1.toString();
            this._viewUI.txt_bet2.text = this._betMain2.toString();
            this._viewUI.txt_bet3.text = this._betMain3.toString();
        }

        //创建筹码
        private createChip(startIdx: number, targetIdx: number, type: number, value: number, index: number, unitIndex: number) {
            let chip = this._game.sceneObjectMgr.createOfflineObject(SceneRoot.CHIP_MARK, BrNiuNiuChip) as BrNiuNiuChip;
            chip.setData(startIdx, targetIdx, type, value, index, unitIndex);
            chip.visible = false;
            if (targetIdx == 1) {
                this._chipTian.push(chip);
            } else if (targetIdx == 2) {
                this._chipDi.push(chip);
            } else if (targetIdx == 3) {
                this._chipXuan.push(chip);
            } else if (targetIdx == 4) {
                this._chipHuang.push(chip);
            }
            if (this._isReDrawChips && this._curStatus != MAP_STATUS.PLAY_STATUS_BET) {
                chip.visible = true;
                chip.drawChip();
            }
            else {
                chip.visible = true;
                chip.sendChip();
                this._game.playSound(Path_game_brniuniu.music_brniuniu + "chouma.mp3", false);
            }
            this._chipSortScore = index;//存下来最后一个筹码层级
        }

        //庄家飞筹码去输的区域
        private bankerFlyChip(startIdx: number, targetIdx: number, type: number, value: number, index: number, unitIndex: number) {
            let chip = this._game.sceneObjectMgr.createOfflineObject(SceneRoot.CHIP_MARK, BrNiuNiuChip) as BrNiuNiuChip;
            chip.setData(startIdx, targetIdx, type, value, index, unitIndex);
            if (targetIdx == 1) {
                this._chipTian.push(chip);
            } else if (targetIdx == 2) {
                this._chipDi.push(chip);
            } else if (targetIdx == 3) {
                this._chipXuan.push(chip);
            } else if (targetIdx == 4) {
                this._chipHuang.push(chip);
            }
            chip.sendChip();
        }

        private _clipResult: any[] = [];
        private onBattleSettle(info: any): void {
            if (!this._game.sceneObjectMgr.mainUnit) return;
            if (this._game.sceneObjectMgr.mainUnit.GetIndex() == info.SeatIndex) {
                this._mainPlayerBenefit = parseFloat(info.SettleVal);
            }
            if (info.SettleVal == 0) return;
            this._clipResult.push([info.SeatIndex, info.SettleVal]);
        }

        private onReconnectDeal(): void {
            if (this._curStatus >= MAP_STATUS.PLAY_STATUS_SHOW_CARD && this._curStatus < MAP_STATUS.PLAY_STATUS_RELAX) {
                for (let j = 0; j < this._cardsArr.length; j++) {
                    let cards = this._niuMgr.initCard(this._cardsArr[j].Cards)
                    let playerIndex = this._cardsArr[j].SeatIndex - 1;
                    let cardType = this._niuMgr.checkCardsType(cards);
                    this._cardsTypeList[playerIndex].visible = true;
                    this.setCardType(this._cardsTypeList[playerIndex], cardType);
                }
                this._drawCardType = true;
            }
        }

        private onBattleShowCards(info: any): void {
            let cards = this._niuMgr.initCard(info.Cards)
            let count = info.SeatIndex - 1 == 0 ? 4 : info.SeatIndex - 2;
            let playerIndex = info.SeatIndex - 1;
            let cardType = this._niuMgr.checkCardsType(cards);
            if (!this._isReConnect) {
                Laya.timer.once(count * 1800, this, () => {
                    this._aniKaiPaiList[playerIndex].card.skin = StringU.substitute(PathGameTongyong.ui_tongyong_pai + "{0}.png", info.Cards[4]);
                    this._aniKaiPaiList[playerIndex].visible = true;
                    this._aniKaiPaiList[playerIndex].ani_kaipai.play(0, false);
                    this._niuMgr.yincang(playerIndex);
                })
                Laya.timer.once(1700 + count * 1800, this, () => {
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "" + StringU.substitute("niu{0}_nv.mp3", cardType));
                })
                this.setCardType(this._cardsTypeList[playerIndex], cardType);
            }
        }

        //设置牌型组件，传入组件和牌型
        private setCardType(view: ui.ajqp.game_ui.brniuniu.component.NiuPaiUI, cardType: number): void {
            let type: number;
            if (cardType == 0) {//没牛
                type = 0;
                view.ani0.gotoAndStop(11);
            } else if (cardType > 0 && cardType < 7) {//牛一到牛六
                type = 1;
                view.ani1.gotoAndStop(14);
                view.type1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "n_{0}.png", cardType);
                view.rate1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
            } else if (cardType >= 7 && cardType < 10) {//牛七，牛八，牛九
                type = 2;
                view.ani2.gotoAndStop(15);
                view.type2_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "n_{0}.png", cardType);
                view.type2_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "n_{0}.png", cardType);
                view.rate2_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
                view.rate2_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
            } else if (cardType == 10) {//牛牛
                type = 3;
                view.ani3.gotoAndStop(19);
                view.type3_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "n_{0}.png", cardType);
                view.type3_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "n_{0}.png", cardType);
                view.rate3_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
                view.rate3_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
            } else if (cardType >= 11 && cardType < 13 || cardType == 14) {//四花牛，五花牛，五小牛
                type = 4;
                view.ani4.gotoAndStop(19);
                if (cardType >= 11 && cardType < 13) {//四花牛，五花牛
                    view.typeOne4_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "tu_{0}.png", cardType == 11 ? "si" : "wu");
                    view.typeOne4_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "tu_{0}.png", cardType == 11 ? "si" : "wu");
                    view.typeTwo4_1.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_hua.png";
                    view.typeTwo4_2.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_hua.png";
                } else {//五小牛
                    view.typeOne4_1.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_wu.png";
                    view.typeOne4_2.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_wu.png";
                    view.typeTwo4_1.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_xiao.png";
                    view.typeTwo4_2.skin = Path_game_brniuniu.ui_brniuniu_niupai + "tu_xiao.png";
                }
                view.rate4_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
                view.rate4_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
            } else if (cardType == 13) {//炸弹
                type = 5;
                view.ani5.gotoAndStop(63);
                view.rate5_1.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
                view.rate5_2.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu_niupai + "sz_{0}.png", this._niuMgr.checkCardsRate(cardType));
            }
            for (let i = 0; i < 6; i++) {//显示当前牌型
                view["box" + i].visible = type == i;
            }
        }

        //设置牌型组件，传入组件和牌型
        private setCardTypeAni(view: ui.ajqp.game_ui.brniuniu.component.NiuPaiUI): void {
            if (view.box0.visible) {//没牛
                view.ani0.play(0, false);
            } else if (view.box1.visible) {//牛一到牛七
                view.ani1.play(0, false);
            } else if (view.box2.visible) {//牛八，牛九
                view.ani2.play(0, false);
            } else if (view.box3.visible) {//牛牛
                view.ani3.play(0, false);
            } else if (view.box4.visible) {//四花牛，五花牛，五小牛
                view.ani4.play(0, false);
            } else if (view.box5.visible) {//炸弹
                view.ani5.play(0, false);
            }
        }

        //结算飘筹码
        private flyChipEffect(isTongPei): void {
            //遍历四个区域的游戏结果
            for (let i = 0; i < this._resultList.length; i++) {
                let chipArr = [];
                chipArr = i == 0 ? this._chipTian : i == 1 ? this._chipDi : i == 2 ? this._chipXuan : this._chipHuang;
                if (this._resultList[i] == 1) {
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "piaoqian.mp3", false);
                    for (let j = 0; j < chipArr.length; j++) {
                        let chip: BrNiuNiuChip = chipArr[j];
                        chip.flyChip(2, false, j, this._game);//庄家先收筹码
                    }
                } else {
                    this._areaKuangUIList[i].visible = true;
                    Laya.timer.once(isTongPei ? 0 : 1000, this, () => {
                        this._game.playSound(Path_game_brniuniu.music_brniuniu + "piaoqian.mp3", false);
                        for (let j = 0; j < 20; j++) {
                            let ranType = MathU.randomRange(0, 4);
                            let ranVal = this._chipArr[ranType];
                            this._chipSortScore++;
                            this.bankerFlyChip(2, i + 1, ranType, ranVal, this._chipSortScore, -1);
                        }
                    })
                    Laya.timer.once(isTongPei ? 1000 : 2000, this, () => {
                        this._game.playSound(Path_game_brniuniu.music_brniuniu + "piaoqian.mp3", false);
                        for (let j = 0; j < chipArr.length; j++) {
                            let chip: BrNiuNiuChip = chipArr[j];
                            let mainIndex = this._game.sceneObjectMgr.mainUnit.GetIndex();
                            if (chip._seatIndex == mainIndex) {
                                chip.flyChip(0, false, j, this._game);//主玩家收筹码
                            } else {
                                let isSeat: boolean = false;
                                for (let k = 0; k < this._unitSeated.length; k++) {
                                    let seatInfo = this._unitSeated[k];
                                    if (seatInfo && seatInfo[0] == chip._seatIndex) {
                                        chip.flyChip(3 + k, false, j, this._game);//入座玩家收筹码
                                        isSeat = true;
                                        break;
                                    }
                                }
                                if (!isSeat) {
                                    chip.flyChip(1, false, j, this._game);//其他玩家收筹码
                                }
                            }
                        }

                    })
                }

            }
        }

        //金币变化 飘字clip
        public addMoneyClip(index: number, value: number): void {
            let clip_money = value >= 0 ? new BrniuniuClip(BrniuniuClip.ADD_MONEY_FONT) : new BrniuniuClip(BrniuniuClip.SUB_MONEY_FONT);
            let preSkin = value >= 0 ? PathGameTongyong.ui_tongyong_general + "tu_jia.png" : PathGameTongyong.ui_tongyong_general + "tu_jian.png";
            let img_di = value >= 0 ? new LImage(PathGameTongyong.ui_tongyong_general + "tu_yingqian.png") : new LImage(PathGameTongyong.ui_tongyong_general + "tu_shuqian.png");
            let playerIcon: any;
            //飘字父控件
            if (index == this._game.sceneObjectMgr.mainUnit.GetIndex()) {
                playerIcon = this._viewUI.main_player as ui.ajqp.game_ui.tongyong.TouXiangUI;
            } else {
                let unit = this._game.sceneObjectMgr.getUnitByIdx(index);
                if (!unit) return;
                let seatIndex = unit.GetSeat();
                let bool = false;
                for (let i = 0; i < this._unitSeated.length; i++) {
                    let unitIndex = this._unitSeated[i][0];
                    if (index == unitIndex) {
                        bool = true;
                    }
                }
                if (!seatIndex) return;
                if (!bool) return;
                playerIcon = this._seatUIList[seatIndex - 1] as ui.ajqp.game_ui.tongyong.TouXiangWzUI;
            }
            //飘字底
            img_di.centerX = playerIcon.img_di.centerX;
            img_di.centerY = playerIcon.img_di.centerY;
            playerIcon.img_di.parent.addChild(img_di);
            this._imgdiList.push(img_di);
            playerIcon.img_di.visible = false;
            //飘字
            clip_money.setText(Math.abs(value), true, false, preSkin);
            clip_money.centerX = playerIcon.clip_money.centerX - 4;
            clip_money.centerY = playerIcon.clip_money.centerY;
            playerIcon.clip_money.parent.addChild(clip_money);
            this._clipList.push(clip_money);
            playerIcon.clip_money.visible = false;
            //飘字box缓动
            playerIcon.box_clip.y = 57;
            playerIcon.box_clip.visible = true;
            Laya.Tween.clearAll(playerIcon.box_clip);
            Laya.Tween.to(playerIcon.box_clip, { y: playerIcon.box_clip.y - 55 }, 700);
            //赢钱动画
            playerIcon.effWin.visible = value > 0;
            value > 0 && playerIcon.effWin.ani1.play(0, false);
        }

        //清理飘字clip和底
        private clearClips(): void {
            if (this._clipList && this._clipList.length) {
                for (let i: number = 0; i < this._clipList.length; i++) {
                    let clip = this._clipList[i];
                    clip.removeSelf();
                    clip.destroy(true);
                    clip = null;
                }
            }
            this._clipList = [];

            if (this._imgdiList && this._imgdiList.length) {
                for (let j: number = 0; j < this._imgdiList.length; j++) {
                    let imgdi = this._imgdiList[j];
                    imgdi.removeSelf();
                    imgdi.destroy(true);
                    imgdi = null;
                }
            }
            this._imgdiList = [];
        }

        //清理场景对象
        private clearObjects(): void {
            this._game.sceneObjectMgr.clearOfflineObject();
            this._chipTian = [];
            this._chipDi = [];
            this._chipXuan = [];
            this._chipHuang = [];
        }

        //更新地图状态
        private onUpdateStatus() {
            if (!this._niuMapInfo) return;
            this.initRoomConfig();
            let mapStatus = this._niuMapInfo.GetMapState();
            if (this._curStatus == mapStatus) return;
            this._curStatus = mapStatus;
            this._viewUI.img_banker.visible = this._curStatus < MAP_STATUS.PLAY_STATUS_PUSH_CARD || this._curStatus >= MAP_STATUS.PLAY_STATUS_RELAX;
            this._viewUI.box_status.visible = !(this._curStatus == MAP_STATUS.PLAY_STATUS_WASH_CARD || this._curStatus == MAP_STATUS.PLAY_STATUS_STOP_BET);
            this._viewUI.paixie.cards.visible = this._curStatus >= MAP_STATUS.PLAY_STATUS_WASH_CARD || this._curStatus == MAP_STATUS.PLAY_STATUS_STOP_BET;
            this.onChipDisabled(this._curStatus == MAP_STATUS.PLAY_STATUS_BET);
            if (this._curStatus > MAP_STATUS.PLAY_STATUS_WASH_CARD) {
                this._viewUI.paixie.ani_chupai.gotoAndStop(12);
            }
            if (this._game.uiRoot.HUD.isOpened(TongyongPageDef.PAGE_TONGYONG_ZJTS) && this._curStatus >= MAP_STATUS.PLAY_STATUS_WASH_CARD) {
                this._pageHandle.pushClose({ id: TongyongPageDef.PAGE_TONGYONG_ZJTS, parent: this._game.uiRoot.HUD });
            }
            switch (this._curStatus) {
                case MAP_STATUS.PLAY_STATUS_NONE:// 准备阶段
                    // this._viewUI.txt_status.index = 0;
                    this.resetAll();
                    Laya.Tween.clearAll(this);
                    Laya.timer.clearAll(this);
                    break;
                case MAP_STATUS.PLAY_STATUS_GAMESTART:// 游戏开始
                    this.updateOnline();
                    this.resetAll();
                    Laya.Tween.clearAll(this);
                    Laya.timer.clearAll(this);
                    this._viewUI.txt_status.index = 2;
                    this._viewUI.xipai.x = 640;
                    this._viewUI.xipai.y = 310;
                    this._viewUI.xipai.scaleX = 1;
                    this._viewUI.xipai.scaleY = 1;
                    this._viewUI.xipai.alpha = 1;
                    this._viewUI.xipai.rotation = 0;
                    this._viewUI.xipai.visible = true;
                    this._viewUI.xipai.ani_xipai.play(0, false);
                    Laya.timer.once(800, this, () => {
                        Laya.Tween.clearAll(this._viewUI.xipai);
                        Laya.Tween.to(this._viewUI.xipai, { x: 922, y: 144, alpha: 0, rotation: -30, scaleX: 0.35, scaleY: 0.35 }, 500);
                    })
                    Laya.timer.once(1300, this, () => {
                        this._viewUI.paixie.cards.visible = true;
                        this._viewUI.paixie.ani_chupai.play(0, false);
                    })
                    break;
                case MAP_STATUS.PLAY_STATUS_WASH_CARD:// 洗牌阶段
                    this.resetAll();
                    this._pageHandle.pushOpen({ id: BrniuniuPageDef.PAGE_BRNIUNIU_BEGIN, parent: this._game.uiRoot.HUD });
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "dingding_start.mp3");
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "xiazhu_start.mp3");
                    break;
                case MAP_STATUS.PLAY_STATUS_BET:// 下注阶段
                    this._pageHandle.pushClose({ id: BrniuniuPageDef.PAGE_BRNIUNIU_BEGIN, parent: this._game.uiRoot.HUD });
                    this.onUpdateSeatedList();
                    this._viewUI.txt_status.index = 3;
                    let bool = false;
                    for (let i = 0; i < this._rebetList.length; i++) {
                        if (this._rebetList[i] > 0) {
                            bool = true;
                            break;
                        }
                    }
                    this._viewUI.btn_repeat.disabled = !bool;
                    if (this._game.sceneObjectMgr.mainUnit) {
                        if (this._game.sceneObjectMgr.mainUnit.GetIndex() == this._niuMapInfo.GetBankerSeat()) {
                            this._viewUI.btn_repeat.disabled = true;
                        }
                    }

                    for (let i = 0; i < this._areaKuangUIList.length; i++) {
                        this._areaKuangUIList[i].visible = true;
                        this.kuangShanShuo(this._areaKuangUIList[i]);
                        Laya.timer.once(1000, this, () => {
                            this._areaKuangUIList[i].visible = false;
                            this._areaKuangUIList[i].alpha = 1;
                            Laya.Tween.clearAll(this._areaKuangUIList[i]);
                            Laya.timer.clearAll(this._areaKuangUIList[i]);
                        });
                    }
                    break;
                case MAP_STATUS.PLAY_STATUS_STOP_BET:// 停止下注阶段
                    for (let i: number = 0; i < this._areaKuangUIList.length; i++) {
                        this._areaKuangUIList[i].visible = false;
                    }
                    this._pageHandle.pushOpen({ id: BrniuniuPageDef.PAGE_BRNIUNIU_END, parent: this._game.uiRoot.HUD });
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "dingding_end.mp3");
                    this._game.playSound(Path_game_brniuniu.music_brniuniu + "xiazhu_end.mp3");
                    this._isReConnect = false;
                    break;
                case MAP_STATUS.PLAY_STATUS_PUSH_CARD:// 发牌阶段
                    this._pageHandle.pushClose({ id: BrniuniuPageDef.PAGE_BRNIUNIU_END, parent: this._game.uiRoot.HUD });
                    this._viewUI.txt_status.index = 4;
                    this._viewUI.paixie.ani2.play(0, true);
                    let isBet = this._betMain0 + this._betMain1 + this._betMain2 + this._betMain3 > 0;
                    isBet && (this._rebetList[0] = this._betMain0);
                    isBet && (this._rebetList[1] = this._betMain1);
                    isBet && (this._rebetList[2] = this._betMain2);
                    isBet && (this._rebetList[3] = this._betMain3);
                    this._isReConnect = false;
                    break;
                case MAP_STATUS.PLAY_STATUS_SHOW_CARD:// 开牌阶段
                    this._viewUI.txt_status.index = 5;
                    for (let i = 0; i < this._cardsArr.length; i++) {
                        let index = i + 1 == this._cardsArr.length ? 0 : i + 1;
                        this.onBattleShowCards(this._cardsArr[index]);
                    }
                    if (this._isReConnect && !this._drawCardType) {
                        this.onReconnectDeal();
                        this._isReConnect = false;
                    }
                    break;
                case MAP_STATUS.PLAY_STATUS_SETTLE:// 结算阶段
                    this.onUpdateSeatedList();
                    this._viewUI.txt_status.index = 6;
                    if (this._isReConnect && !this._drawCardType) {
                        this.onReconnectDeal();
                    }
                    let isTongSha = true;
                    let isTongPei = true;
                    for (let i = 0; i < this._resultList.length; i++) {
                        if (this._resultList[i] == 1) {
                            isTongPei = false;
                        }
                        if (this._resultList[i] == -1) {
                            isTongSha = false;
                        }
                    }
                    if (!this._isReConnect) {
                        if (isTongSha) {//庄家通杀
                            this._game.playSound(Path_game_brniuniu.music_brniuniu + "zjtongchi.mp3", false);
                            this._pageHandle.pushOpen({ id: TongyongPageDef.PAGE_TONGYONG_ZJTS, parent: this._game.uiRoot.HUD });
                        }
                        if (isTongPei) {//庄家通赔
                            // this._game.playSound(Path.music_qzniuniu + "zjtongpei.mp3", false);
                            this._pageHandle.pushOpen({ id: TongyongPageDef.PAGE_TONGYONG_ZJTP, parent: this._game.uiRoot.HUD });
                        }
                        if (!isTongSha && !isTongPei) {
                            if (this._mainPlayerBenefit >= 0) {
                                let rand = MathU.randomRange(1, 3);
                                this._game.playSound(StringU.substitute(PathGameTongyong.music_tongyong + "win{0}.mp3", rand), true);
                            } else if (this._mainPlayerBenefit < 0) {
                                let rand = MathU.randomRange(1, 4);
                                this._game.playSound(StringU.substitute(PathGameTongyong.music_tongyong + "lose{0}.mp3", rand), true);
                            }
                        }
                        this._pageHandle.updatePageHandle();//更新额外界面的开关状态
                        this._pageHandle.reset();//清空额外界面存储数组
                        let time_delay = isTongPei || isTongSha ? 1000 : 0;//飘筹码延迟
                        let fly_delay = isTongSha ? 800 : isTongPei ? 1800 : 2800;//飘字延迟
                        Laya.timer.once(time_delay, this, () => {
                            this.flyChipEffect(isTongPei);
                        });
                        Laya.timer.once(time_delay + fly_delay, this, () => {
                            this.onUpdateSettleMoney();
                            if (this._clipResult && this._clipResult.length > 0) {
                                for (let i = 0; i < this._clipResult.length; i++) {
                                    let info = this._clipResult[i];
                                    this.addMoneyClip(info[0], info[1]);
                                }
                            }
                        });
                    }
                    break;
                case MAP_STATUS.PLAY_STATUS_RELAX:// 休息阶段
                    this._pageHandle.pushClose({ id: TongyongPageDef.PAGE_TONGYONG_ZJTS, parent: this._game.uiRoot.HUD });
                    this._pageHandle.pushClose({ id: TongyongPageDef.PAGE_TONGYONG_ZJTP, parent: this._game.uiRoot.HUD });
                    this._viewUI.txt_status.index = 1;
                    this.resetAll();
                    Laya.Tween.clearAll(this);
                    Laya.timer.clearAll(this);
                    break;
            }

            this._pageHandle.updatePageHandle();//更新额外界面的开关状态
            this._pageHandle.reset();//清空额外界面存储数组
        }

        private kuangShanShuo(img) {
            img.alpha = 0;
            Laya.Tween.to(img, { alpha: 1 }, 333, null, Handler.create(this, () => {
                this.kuangShanShuo(img);
            }))
        }

        //菜单栏
        private menuTween(isOpen: boolean) {
            if (isOpen) {
                this._viewUI.box_menu.visible = true;
                this._viewUI.box_menu.scale(0.2, 0.2);
                this._viewUI.box_menu.alpha = 0;
                Laya.Tween.to(this._viewUI.box_menu, { scaleX: 1, scaleY: 1, alpha: 1 }, 300, Laya.Ease.backInOut);
            } else {
                Laya.Tween.to(this._viewUI.box_menu, { scaleX: 0.2, scaleY: 0.2, alpha: 0 }, 300, Laya.Ease.backInOut, Handler.create(this, () => {
                    this._viewUI.box_menu.visible = false;
                }));
            }
        }

        //按钮缓动回调
        protected onBtnTweenEnd(e: any, target: any): void {
            switch (target) {
                case this._viewUI.btn_spread:
                    this.menuTween(!this._viewUI.box_menu.visible);
                    break;
                case this._viewUI.btn_qifu://祈福
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_QIFU);
                    break;
                case this._viewUI.btn_shangzhuang://申请上庄
                    this._game.uiRoot.general.open(BrniuniuPageDef.PAGE_BRNIUNIU_SZ_LIST, (page: BrNiuNiuSzListPage) => {
                        page.dataSource = this._szlimit;
                    });
                    break;
                case this._viewUI.btn_rule:
                    this._game.uiRoot.general.open(BrniuniuPageDef.PAGE_BRNIUNIU_RULE);
                    break;
                case this._viewUI.btn_chongzhi:
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
                    break;
                case this._viewUI.btn_set:
                    this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_SETTING)
                    break;
                case this._viewUI.btn_playerList:
                    this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_PLAYER_LIST)
                    break;
                case this._viewUI.btn_zhanji:
                    this._game.uiRoot.general.open(TongyongPageDef.PAGE_TONGYONG_RECORD, (page) => {
                        page.dataSource = BrniuniuPageDef.GAME_NAME;
                    });
                    break;
                case this._viewUI.btn_repeat:
                    this.repeatBet();
                    break;
                case this._viewUI.btn_back:
                    let totalBet = this._betMain0 + this._betMain1 + this._betMain2 + this._betMain3;
                    if (totalBet && this._niuMapInfo && this._niuMapInfo.GetPlayState() == 1) {
                        this._game.showTips("游戏尚未结束，请先打完这局哦~");
                        return;
                    }
                    if (this._niuMapInfo && this._niuMapInfo.GetBankerSeat() == this._game.sceneObjectMgr.mainUnit.GetIndex()) {
                        this._game.showTips("老板，您是庄家哦，请先申请下庄后再离开~");
                        return;
                    }
                    this._game.sceneObjectMgr.leaveStory(true);
                    break;
                default:
                    break;
            }
        }

        //重复下注
        private repeatBet(): void {
            if (this._betWait) return;//投注间隔
            let bankerUnit = this._game.sceneObjectMgr.getUnitByIdx(this._niuMapInfo.GetBankerSeat());
            let limitMoney = 0;
            if (bankerUnit) {
                limitMoney = TongyongUtil.getMoneyChange(bankerUnit.GetMoney()) / 4;
                let allTotal = this._betTotal0 + this._betTotal1 + this._betTotal2 + this._betTotal3;
                if (allTotal > limitMoney) {
                    this._game.uiRoot.topUnder.showTips("当前下注总额超出牌局可下注额度，无法下注~");
                    return;
                }
            }
            let total = 0;//重复下注筹码总额
            for (let i = 0; i < this._rebetList.length; i++) {
                total += this._rebetList[i];
            }
            let money = TongyongUtil.getMoneyChange(this._game.sceneObjectMgr.mainUnit.GetMoney());
            if (total > money) {
                this._game.uiRoot.topUnder.showTips("老板,您的金币不够重复下注啦~");
                return;
            }
            let betBefore = this._betMain0 + this._betMain1 + this._betMain2 + this._betMain3;
            limitMoney = (money + betBefore) / 4;
            if (total + betBefore > limitMoney) {
                this._game.uiRoot.topUnder.showTips("老板，下注金额不能超过携带金币的四分之一哦~");
                return;
            }
            for (let i = 0; i < this._rebetList.length; i++) {
                let antes = this._rebetList[i]//之前区域i下注总额
                if (antes) {
                    let total = i == 0 ? this._betMain0 : i == 1 ? this._betMain1 : i == 2 ? this._betMain2 : this._betMain3;
                    if (antes + total > this._betlimit) {
                        this._game.uiRoot.topUnder.showTips(StringU.substitute("本投注点限红{0}哦~", this._betlimit));
                        return;
                    }
                    //从最大筹码开始循环，优先丢出大额筹码，剩下零头再由小额筹码去拼凑
                    for (let j = this._chipArr.length - 1; j >= 0; j--) {
                        if (!antes) break;
                        let num = Math.floor(antes / this._chipArr[j]);
                        if (num) {
                            antes = antes - this._chipArr[j] * num;
                            for (let k = 0; k < num; k++) {
                                this._game.network.call_brniuniu_bet(this._chipArr[j], i + 1);
                            }
                        }
                    }
                }
            }
            this.moveHead(this._viewUI.main_player, this._mainHeadPos[0][0], this._mainHeadPos[0][1], this._mainHeadPos[1][0], this._mainHeadPos[1][1]);
            this._betWait = true;
            Laya.timer.once(100, this, () => {
                this._betWait = false;
            })
        }

        private _betWait: boolean = false;
        private onAreaBetMouseOut(index: number, e: LEvent): void {
            if (this._curStatus == MAP_STATUS.PLAY_STATUS_BET) {
                this._areaKuangUIList[index].visible = false;
            }
        }

        private onAreaBetMouseDown(index: number, e: LEvent): void {
            if (this._curStatus == MAP_STATUS.PLAY_STATUS_BET) {
                this._areaKuangUIList[index].visible = true;
            }
        }

        private onAreaBetMouseUp(index: number, e: LEvent): void {
            //天地玄黄下注
            if (this._curStatus != MAP_STATUS.PLAY_STATUS_BET) {
                this._game.uiRoot.topUnder.showTips("当前不在下注时间，请在下注时间再进行下注！");
                return;
            }
            this._areaKuangUIList[index].visible = false;
            if (this._game.sceneObjectMgr.mainUnit.GetIndex() == this._niuMapInfo.GetBankerSeat()) {
                this._game.uiRoot.topUnder.showTips("老板，您现在当庄哦~不能下注~");
                return;
            }
            if (this._betWait) return;//投注间隔
            let total = index == 0 ? this._betMain0 : index == 1 ? this._betMain1 : index == 2 ? this._betMain2 : this._betMain3;
            if (this._curChip + total > this._betlimit) {
                this._game.uiRoot.topUnder.showTips(StringU.substitute("本投注点限红{0}哦~", this._betlimit));
                return;
            }
            let bankerUnit = this._game.sceneObjectMgr.getUnitByIdx(this._niuMapInfo.GetBankerSeat());
            let limitMoney = 0;
            if (bankerUnit) {
                let allTotal = this._betTotal0 + this._betTotal1 + this._betTotal2 + this._betTotal3;
                limitMoney = TongyongUtil.getMoneyChange(bankerUnit.GetMoney()) / 4;
                if (allTotal > limitMoney) {
                    this._game.uiRoot.topUnder.showTips("当前下注总额超出牌局可下注额度，无法下注~");
                    return;
                }
            }
            let money = TongyongUtil.getMoneyChange(this._game.sceneObjectMgr.mainUnit.GetMoney());
            let betBefore = this._betMain0 + this._betMain1 + this._betMain2 + this._betMain3;
            limitMoney = (money + betBefore) / 4;
            if (this._curChip + betBefore > limitMoney) {
                this._game.uiRoot.topUnder.showTips("老板，下注金额不能超过携带金币的四分之一哦~");
                return;
            }
            if (money + betBefore < PLAYER_LEAST_MONEY) {
                TongyongPageDef.ins.alertRecharge(StringU.substitute("老板，您的金币少于{0}哦~\n补充点金币去大杀四方吧~", PLAYER_LEAST_MONEY), () => {
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
                }, () => {
                }, true, TongyongPageDef.TIPS_SKIN_STR['cz']);
                return;
            }
            if (!this._curChip || this._curChip > money || this._curChip == -1) {
                TongyongPageDef.ins.alertRecharge("老板，您的金币不足哦~\n补充点金币去大杀四方吧~", () => {
                    this._game.uiRoot.general.open(DatingPageDef.PAGE_CHONGZHI);
                }, () => {
                }, true, TongyongPageDef.TIPS_SKIN_STR['cz']);
                return;
            }
            this.moveHead(this._viewUI.main_player, this._mainHeadPos[0][0], this._mainHeadPos[0][1], this._mainHeadPos[1][0], this._mainHeadPos[1][1]);
            this._betWait = true;
            Laya.timer.once(100, this, () => {
                this._betWait = false;
            })
            this._game.network.call_brniuniu_bet(this._curChip, index + 1)
        }

        //筹码点击事件
        private onClickChip(index: number, e: LEvent): void {
            if (this._chipArr[index] == this._curChip) return;
            this._game.uiRoot.btnTween(e.currentTarget);
            this.onSelectChip(index);
        }

        //选择筹码
        private onSelectChip(index: number): void {
            if (this._game.sceneObjectMgr.mainUnit && TongyongUtil.getMoneyChange(this._game.sceneObjectMgr.mainUnit.GetMoney()) < this._chipArr[0]) {
                this._curChip = -1;
                for (let i: number = 0; i < this._chipUIList.length; i++) {
                    this._chipUIList[i].y = this._curChipY;
                    this._chipUIList[i].img0.visible = this._chipUIList[i].img1.visible = false;
                    this._chipUIList[i].ani1.gotoAndStop(0);
                }
            } else {
                this._curChip = this._chipArr[index];
                for (let i: number = 0; i < this._chipUIList.length; i++) {
                    this._chipUIList[i].y = i == index ? this._curChipY - 10 : this._curChipY;
                    this._chipUIList[i].img0.visible = this._chipUIList[i].img1.visible = i == index;
                    if (i == index) {
                        this._chipUIList[i].ani1.play(0, true);
                    } else {
                        this._chipUIList[i].ani1.gotoAndStop(0);
                    }
                }
            }
        }

        //筹码是否置灰（是否下注阶段）
        private onChipDisabled(isBetState: boolean): void {
            this._viewUI.btn_repeat.disabled = !isBetState;
            if (isBetState) {
                if (this._curChip == -1 && TongyongUtil.getMoneyChange(this._game.sceneObjectMgr.mainUnit.GetMoney()) >= this._chipArr[0]) {
                    this._curChip = this._chipArr[0];
                }
                Laya.Tween.to(this._viewUI.btn_repeat, { y: this._btnRepeatY }, 300);
                let index = this._chipArr.indexOf(this._curChip);
                for (let i: number = 0; i < this._chipUIList.length; i++) {
                    Laya.Tween.to(this._chipUIList[i], { y: i == index ? this._curChipY - 10 : this._curChipY }, 300, null, Handler.create(this, () => {
                        this._isTweenOver = true;
                    }));
                    this._chipUIList[i].img0.visible = this._chipUIList[i].img1.visible = i == index;
                    !this._chipUIList[i].disabled && (this._chipUIList[i].mouseEnabled = true);
                    this._chipUIList[i].alpha = 1;
                    if (i == index) {
                        this._chipUIList[i].ani1.play(0, true);
                    } else {
                        this._chipUIList[i].ani1.gotoAndStop(0);
                    }
                }
            } else {
                Laya.Tween.to(this._viewUI.btn_repeat, { y: this._btnRepeatY + 20 }, 300);
                for (let i: number = 0; i < this._chipUIList.length; i++) {
                    Laya.Tween.to(this._chipUIList[i], { y: this._curChipY + 20 }, 300);
                    !this._chipUIList[i].disabled && (this._chipUIList[i].mouseEnabled = false);
                    this._chipUIList[i].alpha = 0.75;
                    this._chipUIList[i].ani1.gotoAndStop(0);
                    this._chipUIList[i].img0.visible = this._chipUIList[i].img1.visible = false;
                }
            }
        }

        private _isTweenOver: boolean = false;
        private onUpdateChipGrey() {
            if (!this._game.sceneObjectMgr.mainUnit) return;
            let money: number = TongyongUtil.getMoneyChange(this._game.sceneObjectMgr.mainUnit.GetMoney());
            let curMaxChipIndex: number = -1;
            for (let i = 0; i < this._chipUIList.length; i++) {
                let index = this._chipUIList.length - 1 - i;
                let chipUI = this._chipUIList[index];
                if (money < this._chipArr[index]) {
                    chipUI.disabled = true;
                } else {
                    if (curMaxChipIndex == -1) {
                        curMaxChipIndex = index;
                    }
                    chipUI.disabled = false;
                }
            }
            //如果因为钱不够导致当前选中筹码被置灰，则向下调整选中筹码
            let curChipIndex = this._chipArr.indexOf(this._curChip);
            if (curChipIndex > curMaxChipIndex && this._isTweenOver) {
                if (this._curStatus == MAP_STATUS.PLAY_STATUS_BET) {
                    this.onSelectChip(curMaxChipIndex);
                }
            }
        }

        //选择座位入座
        private onSelectSeat(index: number): void {
            let mainUnit = this._game.sceneObjectMgr.mainUnit;
            if (!mainUnit) return;
            if (mainUnit.GetIndex() == this._niuMapInfo.GetBankerSeat()) {
                this._game.uiRoot.topUnder.showTips("老板，您是庄家哦~不能入座啦~");
                return;
            }
            if (TongyongUtil.getMoneyChange(mainUnit.GetMoney()) < this._seatlimit) {
                this._game.uiRoot.topUnder.showTips("金币不足");
                return;
            }
            this._game.network.call_brniuniu_seated(index + 1);
        }

        protected onMouseClick(e: LEvent) {
            if (e.target != this._viewUI.btn_spread) {
                this.menuTween(false);
            }
        }

        private resetAll(): void {
            this.clearClips();
            this.resetData();
            this.clearObjects();
            this.resetUI();
            this._niuMgr.clear();//清理场景假对象
        }

        private onUpdateGameNo(): void {
            let gameNo = this._niuMapInfo.GetGameNo();
            if (this._niuMapInfo && gameNo) {
                this._viewUI.txt_id.visible = true;
                this._viewUI.txt_id.text = "牌局号：" + gameNo;
            }
        }

        private onUpdateCountDown(): void {
            if (!this._niuMapInfo) return;
            this._countDown = this._niuMapInfo.GetCountDown();
        }

        private onUpdateRecord(): void {
            if (!this._niuMapInfo) return;
            let recordArr = [];
            let gameRecord = this._niuMapInfo.GetGameRecord();
            if (gameRecord != "") {
                recordArr = JSON.parse(gameRecord);
                //倒序
                for (let i = 0; i < recordArr.length / 2; i++) {
                    let val = recordArr[i];
                    recordArr[i] = recordArr[recordArr.length - 1 - i];
                    recordArr[recordArr.length - 1 - i] = val;
                }
            }
        }

        //初始化UI界面
        private initView(): void {
            this._viewUI.box_menu.zOrder = 99;
            this._viewUI.box_menu.visible = false;
            this._areaList = [];
            this._chipUIList = [];
            this._seatUIList = [];
            this._cardsTypeList = [];
            this._areaKuangUIList = [];
            this._aniKaiPaiList = [];
            for (let i: number = 0; i < 4; i++) {
                this._areaList.push(this._viewUI["area" + i]);
                this._areaList[i].on(LEvent.MOUSE_DOWN, this, this.onAreaBetMouseDown, [i]);
                this._areaList[i].on(LEvent.MOUSE_UP, this, this.onAreaBetMouseUp, [i]);
                this._areaList[i].on(LEvent.MOUSE_OUT, this, this.onAreaBetMouseOut, [i]);
                this._areaKuangUIList.push(this._viewUI["kuang" + i]);
                this._areaKuangUIList[i].visible = false;
            }
            for (let i: number = 0; i < 5; i++) {
                this._chipUIList.push(this._viewUI["btn_chip" + i]);
                this._chipUIList[i].on(LEvent.CLICK, this, this.onSelectChip, [i]);
                this._aniKaiPaiList.push(this._viewUI["kaipai" + i]);
                this._aniKaiPaiList[i].ani_kaipai.on(LEvent.COMPLETE, this, this.onSeeCardOver, [i]);
                this._aniKaiPaiList[i].ani_kaipai.stop();
                this._aniKaiPaiList[i].visible = false;
                this._cardsTypeList.push(this._viewUI["cardType" + i]);
            }
            for (let i: number = 0; i < 6; i++) {
                this._seatUIList.push(this._viewUI["seat" + i]);
                this._seatUIList[i].clip_money.visible = false;
                this._seatUIList[i].effWin.visible = false;
                this._seatUIList[i].img_qifu.visible = false;
                this._seatUIList[i].img_vip.visible = false;
                this._seatUIList[i].on(LEvent.CLICK, this, this.onSelectSeat, [i]);
            }
            if (!this._htmlText) {
                this._htmlText = TextFieldU.createHtmlText(this._viewUI.txt_online);
            }
            for (let i: number = 0; i < 5; i++) {
                this._cardsTypeList[i].visible = false;
            }
            this._viewUI.roadList0.visible = false;
            this._viewUI.roadList0.itemRender = this.createChildren("game_ui.brniuniu.component.RoadRenderUI", RoadRecordRender);
            this._viewUI.roadList0.renderHandler = new Handler(this, this.renderHandler);
            this._viewUI.roadList1.visible = false;
            this._viewUI.roadList1.itemRender = this.createChildren("game_ui.brniuniu.component.RoadRenderUI", RoadRecordRender);
            this._viewUI.roadList1.renderHandler = new Handler(this, this.renderHandler);
            this._viewUI.roadList2.visible = false;
            this._viewUI.roadList2.itemRender = this.createChildren("game_ui.brniuniu.component.RoadRenderUI", RoadRecordRender);
            this._viewUI.roadList2.renderHandler = new Handler(this, this.renderHandler);
            this._viewUI.roadList3.visible = false;
            this._viewUI.roadList3.itemRender = this.createChildren("game_ui.brniuniu.component.RoadRenderUI", RoadRecordRender);
            this._viewUI.roadList3.renderHandler = new Handler(this, this.renderHandler);

            //主玩家UI
            this._viewUI.main_player.clip_money.visible = false;
            this._viewUI.main_player.effWin.visible = false;
            //界面UI
            this._btnRepeatY = this._viewUI.btn_repeat.y;
            this._viewUI.txt_id.visible = false;
            this._viewUI.box_time.visible = false;
            this._viewUI.xipai.visible = false;
            this._viewUI.paixie.ani2.gotoAndStop(0);
            this._viewUI.btn_repeat.disabled = true;
        }

        private renderHandler(cell: RoadRecordRender, index: number) {
            if (cell) {
                cell.setData(this._game, cell.dataSource);
            }
        }

        private initRoomConfig(): void {
            let maplv = this._niuMapInfo.GetMapLevel();
            if (maplv) {
                let config = ROOM_CHIP_CONFIG[maplv];
                config && (this._chipArr = config);
                config && (this._onlineNumRate = ONLINE_NUM_RATE_CONFIG[maplv]);
                config = BrNiuNiuMapPage.MONEY_LIMIT_CONFIG[maplv];
                config && (this._szlimit = config[0]);
                config && (this._seatlimit = config[1]);
                config && (this._betlimit = config[2]);

                this._viewUI.txt_limit.text = this._szlimit.toString();
                if (!this._chipArr) return;
                for (let i = 0; i < this._chipArr.length; i++) {
                    this._chipUIList[i].btn_num.label = this._chipArr[i].toString();
                    this._chipUIList[i].btn_num.skin = StringU.substitute(PathGameTongyong.ui_tongyong_general + "tu_cm{0}.png", i);

                }
                if (!this._curChip) this.onSelectChip(0);
            }
        }

        private updateRoad(): void {
            if (!this._niuMapInfo) return;
            if (this._niuMapInfo.GetRoadRecord() == "") return;
            let roadInfo = JSON.parse(this._niuMapInfo.GetRoadRecord());
            let data0 = [];
            let data1 = [];
            let data2 = [];
            let data3 = [];
            for (let i = 0; i < roadInfo.length; i++) {
                if (roadInfo[i][2] == 1) {
                    data0.push([roadInfo[i][0], roadInfo[i][1]]);
                }
                if (roadInfo[i][2] == 2) {
                    data1.push([roadInfo[i][0], roadInfo[i][1]]);
                }
                if (roadInfo[i][2] == 3) {
                    data2.push([roadInfo[i][0], roadInfo[i][1]]);
                }
                if (roadInfo[i][2] == 4) {
                    data3.push([roadInfo[i][0], roadInfo[i][1]]);
                }
            }
            this._viewUI.roadList0.dataSource = data0;
            this._viewUI.roadList0.visible = true;
            this._viewUI.roadList1.dataSource = data1;
            this._viewUI.roadList1.visible = true;
            this._viewUI.roadList2.dataSource = data2;
            this._viewUI.roadList2.visible = true;
            this._viewUI.roadList3.dataSource = data3;
            this._viewUI.roadList3.visible = true;
        }

        private updateBanker(data: number): void {
            if (!this._niuMapInfo) return;
            let bankerUnit: Unit = this._game.sceneObjectMgr.getUnitByIdx(this._niuMapInfo.GetBankerSeat());
            if (bankerUnit) {
                this._bankerName = bankerUnit.GetName();
                this._bankerHead = TongyongUtil.getHeadUrl(bankerUnit.GetHeadImg(), 2);
                this._bankerTXK = TongyongUtil.getTouXiangKuangUrl(bankerUnit.GetHeadKuangImg());
                this._bankerVip = TongyongUtil.getVipUrl(bankerUnit.GetVipLevel());
                this._viewUI.img_txk_zhuang.skin = this._bankerTXK;
                this._viewUI.img_vip_zhuang.skin = this._bankerVip;
                this._viewUI.img_vip_zhuang.visible = bankerUnit.GetVipLevel() > 0;
                this._viewUI.icon_banker.skin = this._bankerHead;
                this._viewUI.txt_zhuangjia.text = this._bankerName;
                this._viewUI.txt_lianzhuang.text = bankerUnit.GetLzNum().toString();
                let money = EnumToString.getPointBackNum(TongyongUtil.getMoneyChange(bankerUnit.GetMoney()), 2);
                this._viewUI.txt_zhuangMoney.text = money.toString();
                this._viewUI.box_lianzhuang.visible = true;
            } else {
                this._bankerHead = Path_game_brniuniu.ui_brniuniu + "tu_xtz.png"
                this._bankerName = "牛魔王"
                this._viewUI.icon_banker.skin = this._bankerHead;
                this._viewUI.txt_zhuangjia.text = this._bankerName;
                this._viewUI.txt_zhuangMoney.text = TongyongUtil.getMoneyChange(this._niuMapInfo.GetMoney()).toString();
                this._viewUI.box_lianzhuang.visible = false;
            }
            if (data == 1 && !this._isFirstOpen) {
                this._isFirstOpen = true;
            }
            if (data == 1 && this._isFirstOpen) {
                this._game.uiRoot.topUnder.showTips("庄家下庄，庄家更换");
            }
            if (this._niuMapInfo.GetSzList() == "") {
                this._viewUI.btn_shangzhuang.skin = PathGameTongyong.ui_tongyong_general + "btn_sqsz.png";
                return;
            }
            let unitSz = JSON.parse(this._niuMapInfo.GetSzList());
            let isShenQing = false;
            if (!this._game.sceneObjectMgr.mainUnit) return;
            let mainIndex = this._game.sceneObjectMgr.mainUnit.GetIndex();
            if (!unitSz.length) {
                isShenQing = false;
            } else {
                for (let i = 0; i < unitSz.length; i++) {
                    let unitIndex = unitSz[i][0];
                    if (mainIndex == unitIndex) {
                        isShenQing = true;
                    }
                }
            }
            let url = isShenQing ? PathGameTongyong.ui_tongyong_general + "btn_qxsq.png" : PathGameTongyong.ui_tongyong_general + "btn_sqsz.png";
            if (mainIndex == this._niuMapInfo.GetBankerSeat()) url = PathGameTongyong.ui_tongyong_general + "btn_sq3.png";
            this._viewUI.btn_shangzhuang.skin = url;
        }

        //重置UI
        private resetUI(): void {
            if (this._cardsTypeList) {
                for (let i: number = 0; i < this._cardsTypeList.length; i++) {
                    this._cardsTypeList[i] && (this._cardsTypeList[i].visible = false);
                }
            }
            if (this._seatUIList) {
                for (let i: number = 0; i < 6; i++) {
                    this._seatUIList[i] && (this._seatUIList[i].effWin.visible = false);
                }
            }
            if (this._areaKuangUIList) {
                for (let i: number = 0; i < 4; i++) {
                    this._areaKuangUIList[i] && (this._areaKuangUIList[i].visible = false);
                }
            }
            //主玩家UI
            this._viewUI.main_player.clip_money.visible = false;
            //界面UI
            this._viewUI.img_banker.visible = true;
            this._viewUI.txt_total0.text = "0";
            this._viewUI.txt_total1.text = "0";
            this._viewUI.txt_total2.text = "0";
            this._viewUI.txt_total3.text = "0";
            this._viewUI.txt_bet0.text = "0";
            this._viewUI.txt_bet1.text = "0";
            this._viewUI.txt_bet2.text = "0";
            this._viewUI.txt_bet3.text = "0";
        }

        private resetData(): void {
            this._battleIndex = -1;
            this._settleInfo = [];
            this._resultList = [];
            this._clipResult = [];
            this._cardsArr = [];
            this._betTotal0 = 0;
            this._betTotal1 = 0;
            this._betTotal2 = 0;
            this._betTotal3 = 0;
            this._betMain0 = 0;
            this._betMain1 = 0;
            this._betMain2 = 0;
            this._betMain3 = 0;
            this._betMainTotal = 0;
            this._betAllTotal = 0;
            this._mainPlayerBenefit = 0;
            this._isReConnect = false;
            this._isReDrawChips = false;
            this._drawCardType = false;//重连后画完牌型
        }

        private clearMapInfoListen(): void {
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_STATUS_CHECK, this, this.onUpdateStatus);
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_GAME_NO, this, this.onUpdateGameNo);//牌局号
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_COUNT_DOWN, this, this.onUpdateCountDown);//倒计时时间戳更新
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SEATED_LIST, this, this.onUpdateSeatedList);//入座列表更新
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_MAP_BANKER_CHANGE, this, this.updateBanker);//地图庄家变更
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SZ_LIST, this, this.updateBanker);//上庄列表更新
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SYSTEM_MONEY_CHANGE, this, this.updateBanker);//系统庄金币更新
            this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_ROAD_RECORD_CHANGE, this, this.updateRoad);//大路信息更新
        }

        public close(): void {
            if (this._viewUI) {
                this._viewUI.btn_spread.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_back.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_rule.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_chongzhi.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_set.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_zhanji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_repeat.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_shangzhuang.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_qifu.off(LEvent.CLICK, this, this.onBtnClickWithTween);
                this._viewUI.btn_playerList.off(LEvent.CLICK, this, this.onBtnClickWithTween);


                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_ADD_UNIT, this, this.onUnitAdd);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_REMOVE_UNIT, this, this.onUnitRemove);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_MONEY_CHANGE, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_CHANGE, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_ACTION, this, this.onUpdateUnit);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
                this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_UNIT_QIFU_TIME_CHANGE, this, this.onUpdateUnit);

                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_STATUS_CHECK, this, this.onUpdateStatus);
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_GAME_NO, this, this.onUpdateGameNo);//牌局号
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_COUNT_DOWN, this, this.onUpdateCountDown);//倒计时时间戳更新
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SEATED_LIST, this, this.onUpdateSeatedList);//入座列表更新
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_MAP_BANKER_CHANGE, this, this.updateBanker);//地图庄家变更
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SZ_LIST, this, this.updateBanker);//上庄列表更新
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_SYSTEM_MONEY_CHANGE, this, this.updateBanker);//系统庄金币更新
                this._game.sceneObjectMgr.off(BrniuniuMapInfo.EVENT_ROAD_RECORD_CHANGE, this, this.updateRoad);//大路信息更新
                this._game.qifuMgr.off(QiFuMgr.QIFU_FLY, this, this.qifuFly);

                for (let i: number = 0; i < this._areaList.length; i++) {
                    this._areaList[i] && this._areaList[i].off(LEvent.MOUSE_DOWN, this, this.onAreaBetMouseDown);
                    this._areaList[i] && this._areaList[i].off(LEvent.MOUSE_UP, this, this.onAreaBetMouseUp);
                    this._areaList[i] && this._areaList[i].off(LEvent.MOUSE_OUT, this, this.onAreaBetMouseOut);
                }
                this._areaList = [];
                for (let i: number = 0; i < this._chipUIList.length; i++) {
                    this._chipUIList[i] && this._chipUIList[i].off(LEvent.CLICK, this, this.onSelectChip);
                }
                this._chipUIList = [];
                for (let i: number = 0; i < this._aniKaiPaiList.length; i++) {
                    this._aniKaiPaiList[i] && this._aniKaiPaiList[i].ani_kaipai.off(LEvent.COMPLETE, this, this.onSeeCardOver);
                }
                this._aniKaiPaiList = [];
                for (let i: number = 0; i < this._seatUIList.length; i++) {
                    this._seatUIList[i] && this._seatUIList[i].off(LEvent.CLICK, this, this.onSelectSeat, [i]);
                }
                this._seatUIList = [];
                this._chipHuang = [];
                this._viewUI.paixie.ani_chupai.stop();
                this._viewUI.paixie.ani2.gotoAndStop(0)
                this.resetAll();
                if (this._niuMgr) {
                    this._niuMgr.off(BrNiuNiuMgr.DEAL_OVER, this, this.onUpdateAniDeal);
                    this._niuMgr.off(BrNiuNiuMgr.SEE_CARD_OVER, this, this.onSeeCardOver);
                }

                this._game.uiRoot.HUD.close(BrniuniuPageDef.PAGE_BRNIUNIU_BEGIN);
                this._game.uiRoot.HUD.close(BrniuniuPageDef.PAGE_BRNIUNIU_END);
                this._game.uiRoot.HUD.close(TongyongPageDef.PAGE_TONGYONG_ZJTS);
                this._game.uiRoot.HUD.close(TongyongPageDef.PAGE_TONGYONG_ZJTP);
                this._game.stopAllSound();
                this._game.stopMusic();
                this._niuStory && this._niuStory.clear();
                Laya.timer.clearAll(this);
                Laya.Tween.clearAll(this);

            }
            super.close();
        }
    }
    class RoadRecordRender extends ui.ajqp.game_ui.brniuniu.component.RoadRenderUI {
        private _game: Game;
        private _data: any;
        private _typeList = ["无", "1", "2", "3", "4", "5", "6", "7", "8", "9", "牛", "牛", "牛", "牛", "牛"];
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
            this.txt_type.text = this._typeList[this._data[0]];
            this.img_bg.skin = StringU.substitute(Path_game_brniuniu.ui_brniuniu + "tu_{0}.png", this._data[1] == -1 ? "k1" : "k");
        }
        destroy() {
            super.destroy();
        }
    }
}