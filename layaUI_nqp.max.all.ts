
module ui.nqp.game_ui.brniuniu {
    export class BaiRenNNUI extends View {
		public txt_id:laya.display.Text;
		public img_banker:Laya.Image;
		public icon_banker:Laya.Image;
		public img_txk_zhuang:Laya.Image;
		public banker_cards:ui.nqp.game_ui.brniuniu.component.cardsUI;
		public cardType0:ui.nqp.game_ui.brniuniu.component.NiuPaiUI;
		public txt_zhuangjia:Laya.Label;
		public txt_zhuangMoney:Laya.Label;
		public btn_shangzhuang:Laya.Button;
		public txt_limit:Laya.Label;
		public box_lianzhuang:Laya.Box;
		public txt_lianzhuang:Laya.Label;
		public area0:Laya.Box;
		public kuang0:ui.nqp.game_ui.brniuniu.component.XuanZhongUI;
		public txt_bet0:laya.display.Text;
		public txt_total0:laya.display.Text;
		public area1:Laya.Box;
		public kuang1:ui.nqp.game_ui.brniuniu.component.XuanZhongUI;
		public txt_bet1:laya.display.Text;
		public txt_total1:laya.display.Text;
		public area2:Laya.Box;
		public kuang2:ui.nqp.game_ui.brniuniu.component.XuanZhongUI;
		public txt_bet2:laya.display.Text;
		public txt_total2:laya.display.Text;
		public area3:Laya.Box;
		public kuang3:ui.nqp.game_ui.brniuniu.component.XuanZhongUI;
		public txt_bet3:laya.display.Text;
		public txt_total3:laya.display.Text;
		public btn_playerList:Laya.Button;
		public txt_online:laya.display.Text;
		public paixie:ui.nqp.game_ui.tongyong.PaiXeiUI;
		public ani_deal:ui.nqp.game_ui.tongyong.FaPaiUI;
		public kaipai0:ui.nqp.game_ui.brniuniu.component.KaiPaiUI;
		public kaipai1:ui.nqp.game_ui.brniuniu.component.KaiPaiUI;
		public box_time:ui.nqp.game_ui.tongyong.DaoJiShiUI;
		public box_status:Laya.Box;
		public txt_status:Laya.Clip;
		public kaipai2:ui.nqp.game_ui.brniuniu.component.KaiPaiUI;
		public kaipai3:ui.nqp.game_ui.brniuniu.component.KaiPaiUI;
		public kaipai4:ui.nqp.game_ui.brniuniu.component.KaiPaiUI;
		public seat0:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public seat1:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public seat2:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public seat3:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public seat4:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public seat5:ui.nqp.game_ui.brniuniu.component.TouXiangWzUI;
		public cardType1:ui.nqp.game_ui.brniuniu.component.NiuPaiUI;
		public cardType2:ui.nqp.game_ui.brniuniu.component.NiuPaiUI;
		public cardType3:ui.nqp.game_ui.brniuniu.component.NiuPaiUI;
		public cardType4:ui.nqp.game_ui.brniuniu.component.NiuPaiUI;
		public btn_chip0:Laya.Button;
		public guang0:Laya.Image;
		public btn_chip1:Laya.Button;
		public guang1:Laya.Image;
		public btn_chip2:Laya.Button;
		public guang2:Laya.Image;
		public btn_chip3:Laya.Button;
		public guang3:Laya.Image;
		public btn_chip4:Laya.Button;
		public guang4:Laya.Image;
		public btn_repeat:Laya.Button;
		public main_player:ui.nqp.game_ui.brniuniu.component.TouXiangUI;
		public xipai:ui.nqp.game_ui.tongyong.effect.XiPaiUI;
		public roadList0:Laya.List;
		public roadList1:Laya.List;
		public roadList2:Laya.List;
		public roadList3:Laya.List;
		public btn_back:Laya.Button;
		public btn_spread:Laya.Button;
		public btn_qifu:Laya.Button;
		public box_menu:Laya.Image;
		public btn_rule:Laya.Button;
		public btn_cardType:Laya.Button;
		public btn_set:Laya.Button;
		public btn_zhanji:Laya.Button;
		public btn_chongzhi:ui.nqp.game_ui.brniuniu.component.Effect_chongzhiUI;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":594,"x":483,"width":314,"var":"txt_id","text":"牌局号：15323156415613212313","leading":6,"height":23,"fontSize":20,"color":"#d4d4d4"}},{"type":"Box","props":{"width":687,"top":0,"height":90,"centerX":0,"anchorX":0.5},"child":[{"type":"Image","props":{"y":47,"var":"img_banker","skin":"brniuniu_ui/game_ui/brniuniu/tu_zj.png","centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":47,"x":41,"skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_txk.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":47,"x":41,"var":"icon_banker","skin":"brniuniu_ui/game_ui/brniuniu/tu_xtz.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-5,"x":-9,"var":"img_txk_zhuang","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png"}},{"type":"cards","props":{"y":11,"x":238,"visible":false,"var":"banker_cards","runtime":"ui.nqp.game_ui.brniuniu.component.cardsUI"}},{"type":"NiuPai","props":{"y":42,"x":225,"var":"cardType0","runtime":"ui.nqp.game_ui.brniuniu.component.NiuPaiUI"}},{"type":"Label","props":{"y":35,"x":89,"var":"txt_zhuangjia","text":"系统　牛魔王","height":22,"fontSize":20,"color":"#a1ffff","align":"left"}},{"type":"Label","props":{"y":62,"x":121,"wordWrap":true,"width":150,"var":"txt_zhuangMoney","text":"1000000","height":22,"fontSize":20,"color":"#e3e460","align":"left"}},{"type":"Image","props":{"y":75,"x":104,"width":37,"skin":"tongyong_ui/game_ui/tongyong/general/icon_money.png","scaleY":0.65,"scaleX":0.65,"height":38,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":61,"x":573,"var":"btn_shangzhuang","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_sq0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":19,"x":575,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"wordWrap":true,"text":"上庄需要","fontSize":20,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"x":87,"wordWrap":true,"var":"txt_limit","text":"5000","fontSize":20,"color":"#e3e460","align":"left"}}]},{"type":"Box","props":{"y":9,"x":89,"var":"box_lianzhuang"},"child":[{"type":"Label","props":{"wordWrap":true,"width":123,"text":"已连庄　　局","height":22,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"x":59,"wordWrap":true,"width":48,"var":"txt_lianzhuang","text":"000","height":22,"fontSize":20,"color":"#00ff51","align":"center"}}]}]},{"type":"Box","props":{"y":183,"x":168,"var":"area0"},"child":[{"type":"XuanZhong","props":{"var":"kuang0","blendMode":"lighter","runtime":"ui.nqp.game_ui.brniuniu.component.XuanZhongUI"}},{"type":"Text","props":{"y":180,"x":38,"wordWrap":true,"width":132,"var":"txt_bet0","text":"0","strokeColor":"#570d1c","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffd200","align":"center"}},{"type":"Text","props":{"y":8,"x":38,"wordWrap":true,"width":132,"var":"txt_total0","text":"0","strokeColor":"#580023","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":183,"x":415,"var":"area1"},"child":[{"type":"XuanZhong","props":{"var":"kuang1","blendMode":"lighter","runtime":"ui.nqp.game_ui.brniuniu.component.XuanZhongUI"}},{"type":"Text","props":{"y":180,"x":36,"wordWrap":true,"width":132,"var":"txt_bet1","text":"0","strokeColor":"#570d1c","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffd200","align":"center"}},{"type":"Text","props":{"y":8,"x":36,"wordWrap":true,"width":132,"var":"txt_total1","text":"0","strokeColor":"#580023","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":183,"x":660,"var":"area2"},"child":[{"type":"XuanZhong","props":{"var":"kuang2","blendMode":"lighter","runtime":"ui.nqp.game_ui.brniuniu.component.XuanZhongUI"}},{"type":"Text","props":{"y":180,"x":37,"wordWrap":true,"width":132,"var":"txt_bet2","text":"0","strokeColor":"#570d1c","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffd200","align":"center"}},{"type":"Text","props":{"y":8,"x":37,"wordWrap":true,"width":132,"var":"txt_total2","text":"0","strokeColor":"#580023","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":183,"x":907,"var":"area3"},"child":[{"type":"XuanZhong","props":{"var":"kuang3","blendMode":"lighter","runtime":"ui.nqp.game_ui.brniuniu.component.XuanZhongUI"}},{"type":"Text","props":{"y":181,"x":36,"wordWrap":true,"width":132,"var":"txt_bet3","text":"0","strokeColor":"#570d1c","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffd200","align":"center"}},{"type":"Text","props":{"y":8,"x":36,"wordWrap":true,"width":132,"var":"txt_total3","text":"0","strokeColor":"#580023","stroke":4,"leading":6,"height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":657,"x":70,"var":"btn_playerList","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_qtwj.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":67,"x":-23,"wordWrap":true,"width":132,"var":"txt_online","text":"在线200人","strokeColor":"#3b1211","stroke":4,"leading":6,"height":26,"fontSize":20,"color":"#ffffff","align":"center"}}]},{"type":"PaiXei","props":{"y":144,"x":922,"var":"paixie","anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.tongyong.PaiXeiUI"}},{"type":"FaPai","props":{"y":135,"x":852,"var":"ani_deal","runtime":"ui.nqp.game_ui.tongyong.FaPaiUI"}},{"type":"KaiPai","props":{"y":27,"x":655,"var":"kaipai0","runtime":"ui.nqp.game_ui.brniuniu.component.KaiPaiUI"}},{"type":"KaiPai","props":{"y":465,"x":289,"var":"kaipai1","runtime":"ui.nqp.game_ui.brniuniu.component.KaiPaiUI"}},{"type":"DaoJiShi","props":{"y":124,"x":636,"var":"box_time","anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.tongyong.DaoJiShiUI"}},{"type":"Box","props":{"y":168,"x":637,"width":231,"var":"box_status","height":30,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":13.5,"skin":"brniuniu_ui/game_ui/brniuniu/tu_h.png","scaleY":0.7,"scaleX":0.6,"centerX":2,"anchorY":0.5,"anchorX":0.5,"alpha":0.5}},{"type":"Clip","props":{"y":2,"x":86,"var":"txt_status","skin":"tongyong_ui/game_ui/tongyong/general/clip_zhuangtai0.png","clipY":7}}]},{"type":"KaiPai","props":{"y":465,"x":537,"var":"kaipai2","runtime":"ui.nqp.game_ui.brniuniu.component.KaiPaiUI"}},{"type":"KaiPai","props":{"y":465,"x":783,"var":"kaipai3","runtime":"ui.nqp.game_ui.brniuniu.component.KaiPaiUI"}},{"type":"KaiPai","props":{"y":465,"x":1029,"var":"kaipai4","runtime":"ui.nqp.game_ui.brniuniu.component.KaiPaiUI"}},{"type":"Box","props":{"left":20,"centerY":-10},"child":[{"type":"TouXiangWz","props":{"var":"seat0","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}},{"type":"TouXiangWz","props":{"y":158,"var":"seat1","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}},{"type":"TouXiangWz","props":{"y":316,"var":"seat2","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}}]},{"type":"Box","props":{"right":20,"centerY":-10},"child":[{"type":"TouXiangWz","props":{"var":"seat3","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}},{"type":"TouXiangWz","props":{"y":158,"var":"seat4","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}},{"type":"TouXiangWz","props":{"y":316,"var":"seat5","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangWzUI"}}]},{"type":"NiuPai","props":{"y":475,"x":162,"var":"cardType1","runtime":"ui.nqp.game_ui.brniuniu.component.NiuPaiUI"}},{"type":"NiuPai","props":{"y":475,"x":408,"var":"cardType2","runtime":"ui.nqp.game_ui.brniuniu.component.NiuPaiUI"}},{"type":"NiuPai","props":{"y":475,"x":655,"var":"cardType3","runtime":"ui.nqp.game_ui.brniuniu.component.NiuPaiUI"}},{"type":"NiuPai","props":{"y":475,"x":901,"var":"cardType4","runtime":"ui.nqp.game_ui.brniuniu.component.NiuPaiUI"}},{"type":"Box","props":{"x":641,"width":948,"height":147,"bottom":0,"anchorY":1,"anchorX":0.5},"child":[{"type":"Box","props":{"y":-574,"width":679,"height":113,"centerX":-10,"bottom":-20,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":54.5,"x":57,"var":"btn_chip0","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_cm1.png","labelStrokeColor":"#000000","labelStroke":3,"labelSize":26,"labelPadding":"-2","labelFont":"Arial","labelColors":"#ffffff","labelBold":true,"label":"50","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":52,"x":59,"var":"guang0","skin":"tongyong_ui/game_ui/tongyong/general/tu_cm.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":54.5,"x":178,"var":"btn_chip1","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_cm2.png","labelStrokeColor":"#000000","labelStroke":3,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"100","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":52,"x":59,"var":"guang1","skin":"tongyong_ui/game_ui/tongyong/general/tu_cm.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":54.5,"x":300,"var":"btn_chip2","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_cm3.png","labelStrokeColor":"#000000","labelStroke":3,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"200","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":52,"x":60,"var":"guang2","skin":"tongyong_ui/game_ui/tongyong/general/tu_cm.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":54.5,"x":421,"var":"btn_chip3","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_cm4.png","labelStrokeColor":"#000000","labelStroke":3,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"500","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":52,"x":59,"var":"guang3","skin":"tongyong_ui/game_ui/tongyong/general/tu_cm.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":54.5,"x":539,"var":"btn_chip4","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_cm5.png","labelStrokeColor":"#000000","labelStroke":3,"labelSize":26,"labelPadding":"-2","labelColors":"#ffffff","labelBold":true,"label":"1000","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":51,"x":59,"var":"guang4","skin":"tongyong_ui/game_ui/tongyong/general/tu_cm.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Button","props":{"y":96,"var":"btn_repeat","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_xz.png","sizeGrid":"0,20,0,20","labelStrokeColor":"#0f5b08","labelStroke":4,"labelSize":28,"labelColors":"#ffffff","labelBold":true,"centerX":326,"anchorY":0.5,"anchorX":0.5}},{"type":"TouXiang","props":{"var":"main_player","runtime":"ui.nqp.game_ui.brniuniu.component.TouXiangUI"}}]},{"type":"XiPai","props":{"y":292,"x":642,"var":"xipai","anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.tongyong.effect.XiPaiUI"}},{"type":"List","props":{"y":412,"x":174,"width":190,"var":"roadList0","spaceX":2,"repeatY":1,"repeatX":8,"height":31},"child":[{"type":"RoadRender","props":{"name":"render","runtime":"ui.nqp.game_ui.brniuniu.component.RoadRenderUI"}}]},{"type":"List","props":{"y":412,"x":421,"width":190,"var":"roadList1","spaceX":2,"repeatY":1,"repeatX":8,"height":31},"child":[{"type":"RoadRender","props":{"name":"render","runtime":"ui.nqp.game_ui.brniuniu.component.RoadRenderUI"}}]},{"type":"List","props":{"y":412,"x":668,"width":190,"var":"roadList2","spaceX":2,"repeatY":1,"repeatX":8,"height":31},"child":[{"type":"RoadRender","props":{"name":"render","runtime":"ui.nqp.game_ui.brniuniu.component.RoadRenderUI"}}]},{"type":"List","props":{"y":412,"x":916,"width":190,"var":"roadList3","spaceX":2,"repeatY":1,"repeatX":8,"height":31},"child":[{"type":"RoadRender","props":{"name":"render","runtime":"ui.nqp.game_ui.brniuniu.component.RoadRenderUI"}}]}]},{"type":"Button","props":{"var":"btn_back","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_fh1.png","right":10,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"var":"btn_spread","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_cd.png","left":10,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":52,"x":1159,"var":"btn_qifu","top":16,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_qf.png","right":85,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"width":180,"var":"box_menu","top":0,"skin":"tongyong_ui/game_ui/tongyong/general/cd_1.png","sizeGrid":"20,20,20,20","left":10,"height":291},"child":[{"type":"Image","props":{"y":74,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Image","props":{"y":145,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Image","props":{"y":217,"x":11,"width":160,"skin":"tongyong_ui/game_ui/tongyong/general/cd_2.png"}},{"type":"Button","props":{"y":86,"x":14,"var":"btn_rule","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_gz.png"}},{"type":"Button","props":{"y":18,"x":14,"var":"btn_cardType","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_px.png"}},{"type":"Button","props":{"y":225,"x":14,"var":"btn_set","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_sz.png"}},{"type":"Button","props":{"y":153,"x":14,"var":"btn_zhanji","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_zj.png"}}]},{"type":"Effect_chongzhi","props":{"var":"btn_chongzhi","right":10,"bottom":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.nqp.game_ui.brniuniu.component.Effect_chongzhiUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.Effect_chongzhiUI",ui.nqp.game_ui.brniuniu.component.Effect_chongzhiUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.NiuPaiUI",ui.nqp.game_ui.brniuniu.component.NiuPaiUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.XuanZhongUI",ui.nqp.game_ui.brniuniu.component.XuanZhongUI);
			View.regComponent("ui.nqp.game_ui.tongyong.PaiXeiUI",ui.nqp.game_ui.tongyong.PaiXeiUI);
			View.regComponent("ui.nqp.game_ui.tongyong.FaPaiUI",ui.nqp.game_ui.tongyong.FaPaiUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.cardsUI",ui.nqp.game_ui.brniuniu.component.cardsUI);
			View.regComponent("ui.nqp.game_ui.tongyong.DaoJiShiUI",ui.nqp.game_ui.tongyong.DaoJiShiUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.TouXiangWzUI",ui.nqp.game_ui.brniuniu.component.TouXiangWzUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.TouXiangUI",ui.nqp.game_ui.brniuniu.component.TouXiangUI);
			View.regComponent("ui.nqp.game_ui.tongyong.effect.XiPaiUI",ui.nqp.game_ui.tongyong.effect.XiPaiUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.RoadRenderUI",ui.nqp.game_ui.brniuniu.component.RoadRenderUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.KaiPaiUI",ui.nqp.game_ui.brniuniu.component.KaiPaiUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.BaiRenNNUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class BaiRenNN_GuiZeUI extends View {
		public btn_close:Laya.Button;
		public txt_leixing:Laya.Image;
		public txt_wanfa:Laya.Image;
		public txt_beishu:Laya.Panel;
		public btn_tab:Laya.Tab;
		public item2:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"width":787,"height":531,"centerY":1,"centerX":-5,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-42,"x":-54,"skin":"tongyong_ui/game_ui/tongyong/dating/tu_bk2.png"}},{"type":"Image","props":{"y":20,"x":397,"skin":"tongyong_ui/game_ui/tongyong/hud/tit_game_rule.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":-45,"x":769,"var":"btn_close","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_tuichu.png"}},{"type":"Image","props":{"y":85,"x":211,"var":"txt_leixing","skin":"brniuniu_ui/game_ui/brniuniu/guize_2.png"}},{"type":"Image","props":{"y":84,"x":212,"var":"txt_wanfa","skin":"brniuniu_ui/game_ui/brniuniu/guize_1.png"}},{"type":"Panel","props":{"y":60,"x":193,"width":602,"var":"txt_beishu","height":459},"child":[{"type":"Image","props":{"y":24,"x":14,"skin":"brniuniu_ui/game_ui/brniuniu/guize_4.png"}}]},{"type":"Tab","props":{"y":60,"x":-11,"var":"btn_tab"},"child":[{"type":"Button","props":{"stateNum":2,"skin":"tongyong_ui/game_ui/tongyong/dating/btn_wjjs.png","name":"item0"}},{"type":"Button","props":{"y":80,"stateNum":2,"skin":"tongyong_ui/game_ui/tongyong/dating/btn_pxsm.png","name":"item1"}},{"type":"Button","props":{"y":160,"var":"item2","stateNum":2,"skin":"tongyong_ui/game_ui/tongyong/dating/btn_jspl.png"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.BaiRenNN_GuiZeUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class BaiRenNN_HUDUI extends View {
		public view:ui.nqp.game_ui.tongyong.HudUI;
		public btn_join:Laya.Button;
		public list_room:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"top":-1,"skin":"tongyong_ui/game_ui/tongyong/hud/tu_bj.png","right":-1,"left":-1,"bottom":-1}},{"type":"Hud","props":{"var":"view","top":0,"runtime":"ui.nqp.game_ui.tongyong.HudUI","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"top":10,"skin":"brniuniu_ui/game_ui/brniuniu/brnn_title.png","centerX":200}},{"type":"Button","props":{"y":668,"x":640,"var":"btn_join","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/dating/btn_ksjr.png","centerX":0,"bottom":10,"anchorY":0.5,"anchorX":0.5}},{"type":"List","props":{"y":360,"x":640,"var":"list_room","right":0,"left":0,"height":500,"centerY":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ChangCiRender","props":{"renderType":"render","runtime":"ui.nqp.game_ui.brniuniu.component.ChangCiRenderUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.tongyong.HudUI",ui.nqp.game_ui.tongyong.HudUI);
			View.regComponent("ui.nqp.game_ui.brniuniu.component.ChangCiRenderUI",ui.nqp.game_ui.brniuniu.component.ChangCiRenderUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.BaiRenNN_HUDUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class cardsUI extends View {
		public card0:Laya.Image;
		public card1:Laya.Image;
		public card2:Laya.Image;
		public card3:Laya.Image;
		public card4:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":80},"child":[{"type":"Image","props":{"y":40,"x":30,"var":"card0","skin":"tongyong_ui/game_ui/tongyong/pai/52.png","scaleY":0.55,"scaleX":0.55,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":40,"x":65,"var":"card1","skin":"tongyong_ui/game_ui/tongyong/pai/52.png","scaleY":0.55,"scaleX":0.55,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":40,"x":100,"var":"card2","skin":"tongyong_ui/game_ui/tongyong/pai/52.png","scaleY":0.55,"scaleX":0.55,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":40,"x":135,"width":104,"var":"card3","skin":"tongyong_ui/game_ui/tongyong/pai/52.png","scaleY":0.55,"scaleX":0.55,"height":146,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":40,"x":170,"var":"card4","skin":"tongyong_ui/game_ui/tongyong/pai/52.png","scaleY":0.55,"scaleX":0.55,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.cardsUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class ChangCiRenderUI extends View {
		public img_bg:Laya.Image;
		public txt_status:Laya.Label;
		public txt_max:Laya.Label;
		public btn_enter:Laya.Button;
		public bar:Laya.ProgressBar;
		public list_record:Laya.List;
		public img_tdxh:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":650,"height":500},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"img_bg","skin":"tongyong_ui/game_ui/tongyong/hud/difen_2_0.png"}},{"type":"Label","props":{"y":65,"x":528,"width":147,"var":"txt_status","text":"下注中： 5S","leading":6,"height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":72,"x":152,"width":160,"var":"txt_max","text":"投注限额：5000","leading":6,"height":20,"fontSize":18,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Button","props":{"y":332,"x":221,"var":"btn_enter","stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/hud/btn_hud_0.png"}},{"type":"ProgressBar","props":{"y":88,"x":41,"width":562,"var":"bar","skin":"tongyong_ui/game_ui/tongyong/dating/progress.png","height":13}},{"type":"List","props":{"y":101,"x":105,"width":498,"var":"list_record","spaceY":1,"spaceX":26,"repeatX":10,"height":200,"cacheAsBitmap":true,"anchorY":0,"anchorX":0},"child":[{"type":"HudRender","props":{"renderType":"render","runtime":"ui.nqp.game_ui.brniuniu.component.HudRenderUI"}}]},{"type":"Image","props":{"y":112,"x":50,"var":"img_tdxh","skin":"brniuniu_ui/game_ui/brniuniu/tu_tdxh0.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.nqp.game_ui.brniuniu.component.HudRenderUI",ui.nqp.game_ui.brniuniu.component.HudRenderUI);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.ChangCiRenderUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class Effect_chongzhiUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":246,"height":94},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Button","props":{"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/btn_chongzhi.png"}},{"type":"Box","props":{"y":0,"x":0,"blendMode":"lighter"},"child":[{"type":"Button","props":{"y":0,"x":12,"stateNum":1,"skin":"tongyong_ui/game_ui/tongyong/general/tu_chizhizz.png"}},{"type":"Image","props":{"x":79.16666666666666,"skin":"tongyong_ui/game_ui/tongyong/general/tu_czsg.png","renderType":"mask"},"compId":3}]}]}],"animations":[{"nodes":[{"target":3,"keyframes":{"x":[{"value":-173,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":183,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":40}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.Effect_chongzhiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class Go1UI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":350,"x":650,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_0.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5},"compId":7},{"type":"Image","props":{"y":360,"x":957.4016,"skin":"tongyong_ui/game_ui/tongyong/general/tu_ks1.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":2},{"type":"Image","props":{"y":360,"x":317.5984,"skin":"tongyong_ui/game_ui/tongyong/general/tu_ks0.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":4},{"type":"Image","props":{"y":360,"x":637,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","centerY":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":3},{"type":"Image","props":{"y":251,"x":385,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":9},{"type":"Image","props":{"y":436,"x":916,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":10}]}],"animations":[{"nodes":[{"target":2,"keyframes":{"x":[{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"key":"x","index":0},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":10},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"x","index":40},{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"alpha","index":48}]}},{"target":4,"keyframes":{"x":[{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"key":"x","index":0},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":10},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":40},{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"alpha","index":48}]}},{"target":3,"keyframes":{"x":[{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":40},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":48}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":48}]}},{"target":7,"keyframes":{"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":0},{"value":false,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":46}],"scaleY":[{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":40},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":45},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":46}],"scaleX":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":40},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":45},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":46}]}},{"target":9,"keyframes":{"y":[{"value":251,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0}],"x":[{"value":385,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":4},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":10},{"value":937,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":30}]}},{"target":10,"keyframes":{"y":[{"value":436,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":0},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":4},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":10},{"value":425,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":30}],"x":[{"value":916,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":0},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":4},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":10},{"value":343,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.Go1UI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class HudRenderUI extends View {
		public tian:Laya.Image;
		public di:Laya.Image;
		public xuan:Laya.Image;
		public huang:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":25,"height":200},"child":[{"type":"Box","props":{"y":0,"x":1},"child":[{"type":"Image","props":{"y":14,"x":0,"var":"tian","skin":"tongyong_ui/game_ui/tongyong/general/tu_g.png"}},{"type":"Image","props":{"y":65,"x":0,"var":"di","skin":"tongyong_ui/game_ui/tongyong/general/tu_g.png"}},{"type":"Image","props":{"y":115,"x":0,"var":"xuan","skin":"tongyong_ui/game_ui/tongyong/general/tu_g.png"}},{"type":"Image","props":{"y":167,"x":0,"var":"huang","skin":"tongyong_ui/game_ui/tongyong/general/tu_g.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.HudRenderUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class KaiPaiUI extends View {
		public ani_kaipai:Laya.FrameAnimation;
		public card:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":80,"height":58},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":81,"rotation":0,"height":59},"compId":9,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"tongyong_ui/game_ui/tongyong/pai/0.png","scaleY":0.55,"scaleX":0.55,"rotation":90,"anchorY":1}},{"type":"Image","props":{"y":1,"x":1,"width":80,"visible":false,"skin":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_0.png","height":34},"compId":10}]},{"type":"Panel","props":{"y":27,"x":0,"width":81,"visible":false,"rotation":0,"height":16},"compId":7,"child":[{"type":"Image","props":{"y":-1,"x":0,"var":"card","skin":"tongyong_ui/game_ui/tongyong/pai/1.png","scaleY":0.55,"scaleX":0.55,"rotation":90,"anchorY":1}},{"type":"Image","props":{"y":3,"x":0,"skin":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_0.png","mouseEnabled":true,"height":14,"alpha":1},"compId":8}]},{"type":"Image","props":{"y":48,"x":-103,"skin":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou1.png","rotation":0},"compId":3},{"type":"Image","props":{"y":45,"x":185,"skin":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou1.png","scaleX":-1},"compId":4}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":45,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":29,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":2},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":6},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":19},{"value":-40,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":20}],"x":[{"value":185,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":164,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":6},{"value":164,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":19},{"value":122,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":20}],"skin":[{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou1.png","tweenMethod":"linearNone","tween":false,"target":4,"key":"skin","index":0},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou2.png","tweenMethod":"linearNone","tween":false,"target":4,"key":"skin","index":6},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou2.png","tweenMethod":"linearNone","tween":false,"target":4,"label":null,"key":"skin","index":19},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou3.png","tweenMethod":"linearNone","tween":false,"target":4,"key":"skin","index":20}],"scaleX":[{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":20}]}},{"target":3,"keyframes":{"y":[{"value":48,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":6},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"y","index":19},{"value":61,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":20}],"x":[{"value":-103,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":-83,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":6},{"value":-83,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"x","index":19},{"value":-103,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":20}],"skin":[{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou1.png","tweenMethod":"linearNone","tween":false,"target":3,"key":"skin","index":0},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou2.png","tweenMethod":"linearNone","tween":false,"target":3,"key":"skin","index":6},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou2.png","tweenMethod":"linearNone","tween":false,"target":3,"label":null,"key":"skin","index":19},{"value":"tongyong_ui/game_ui/tongyong/general/effect/kaipai/tu_shou1.png","tweenMethod":"linearNone","tween":false,"target":3,"key":"skin","index":20}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":6},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"label":null,"key":"rotation","index":19},{"value":-29,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":20}]}},{"target":7,"keyframes":{"y":[{"value":27,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":0},{"value":27,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":6},{"value":27,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":19},{"value":11,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":20}],"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":6},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":19},{"value":-11,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":20}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":6},{"value":true,"tweenMethod":"linearNone","tween":true,"target":7,"key":"visible","index":19},{"value":true,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":20}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"rotation","index":19},{"value":-32,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":20}],"height":[{"value":16,"tweenMethod":"linearNone","tween":true,"target":7,"key":"height","index":0},{"value":16,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"height","index":19},{"value":38,"tweenMethod":"linearNone","tween":true,"target":7,"key":"height","index":20}]}},{"target":9,"keyframes":{"y":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":19},{"value":38,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":20}],"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":19},{"value":-2,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":20}],"width":[{"value":81,"tweenMethod":"linearNone","tween":true,"target":9,"key":"width","index":0},{"value":81,"tweenMethod":"linearNone","tween":true,"target":9,"key":"width","index":19},{"value":30,"tweenMethod":"linearNone","tween":true,"target":9,"key":"width","index":20}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":19},{"value":-68,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":20}],"height":[{"value":59,"tweenMethod":"linearNone","tween":true,"target":9,"key":"height","index":0},{"value":59,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"height","index":5},{"value":43,"tweenMethod":"linearNone","tween":true,"target":9,"key":"height","index":6},{"value":43,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"height","index":19},{"value":13,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"height","index":20}]}},{"target":10,"keyframes":{"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":6}]}},{"target":8,"keyframes":{"y":[{"value":3,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":0},{"value":3,"tweenMethod":"linearNone","tween":true,"target":8,"label":null,"key":"y","index":19},{"value":8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":20}],"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"label":null,"key":"x","index":19},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":20}],"mouseEnabled":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":8,"key":"mouseEnabled","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":8,"label":null,"key":"mouseEnabled","index":19},{"value":true,"tweenMethod":"linearNone","tween":false,"target":8,"key":"mouseEnabled","index":20}],"height":[{"value":14,"tweenMethod":"linearNone","tween":true,"target":8,"key":"height","index":0},{"value":30,"tweenMethod":"linearNone","tween":true,"target":8,"key":"height","index":20}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"label":null,"key":"alpha","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":20}]}}],"name":"ani_kaipai","id":1,"frameRate":12,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.KaiPaiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class MapRenderUI extends View {
		public tian:Laya.Image;
		public di:Laya.Image;
		public xuan:Laya.Image;
		public huang:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":20,"height":80},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"var":"tian","skin":"brniuniu_ui/game_ui/brniuniu/tu_g.png"}},{"type":"Image","props":{"y":20,"x":0,"var":"di","skin":"brniuniu_ui/game_ui/brniuniu/tu_g.png"}},{"type":"Image","props":{"y":39,"x":0,"var":"xuan","skin":"brniuniu_ui/game_ui/brniuniu/tu_g.png"}},{"type":"Image","props":{"y":60,"x":0,"var":"huang","skin":"brniuniu_ui/game_ui/brniuniu/tu_g.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.MapRenderUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class NiuPaiUI extends View {
		public ani1:Laya.FrameAnimation;
		public box_niu:Laya.Box;
		public img_bg:Laya.Image;
		public img_type:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":220,"height":80},"child":[{"type":"Box","props":{"y":2,"x":-1,"width":220,"var":"box_niu","height":77},"child":[{"type":"Image","props":{"y":42,"x":110,"var":"img_bg","skin":"brniuniu_ui/game_ui/brniuniu/brnntype_bgimg_1.png","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":6},{"type":"Box","props":{"y":30,"x":107,"scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5},"compId":8,"child":[{"type":"Image","props":{"y":10,"var":"img_type","skin":"brniuniu_ui/game_ui/brniuniu/brnntype_lose_14.png"}}]}]}],"animations":[{"nodes":[{"target":8,"keyframes":{"scaleY":[{"value":2.5,"tweenMethod":"backInOut","tween":true,"target":8,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":10}],"scaleX":[{"value":2.5,"tweenMethod":"backInOut","tween":true,"target":8,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":10}]}},{"target":6,"keyframes":{"alpha":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":10}]}}],"name":"ani1","id":1,"frameRate":24,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.NiuPaiUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class RoadRenderUI extends View {
		public img_bg:Laya.Image;
		public txt_type:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":22,"height":28},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"img_bg","skin":"brniuniu_ui/game_ui/brniuniu/tu_k.png"}},{"type":"Text","props":{"y":3,"x":0,"wordWrap":true,"width":22,"var":"txt_type","text":"牛","leading":6,"height":21,"fontSize":20,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.RoadRenderUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class TouXiangUI extends View {
		public img_icon:Laya.Image;
		public img_txk:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_money:laya.display.Text;
		public clip_money:Laya.Clip;
		public img_qifu:Laya.Image;
		public qifu_type:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":137},"child":[{"type":"Box","props":{"y":1,"x":1,"width":99,"height":136},"child":[{"type":"Image","props":{"y":73,"x":-15,"skin":"tongyong_ui/game_ui/tongyong/general/tu_txk1.png"}},{"type":"Image","props":{"y":30,"x":49,"var":"img_icon","skin":"tongyong_ui/game_ui/tongyong/touxiang/head_0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-17,"x":2,"var":"img_txk","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png","scaleY":0.95,"scaleX":0.95}},{"type":"Image","props":{"y":79,"x":-6,"width":114,"skin":"tongyong_ui/game_ui/tongyong/general/tu_k2.png","height":24}},{"type":"Image","props":{"y":76,"x":-11,"skin":"tongyong_ui/game_ui/tongyong/general/icon_money.png"}},{"type":"Text","props":{"y":107,"x":1,"wordWrap":true,"width":101,"var":"txt_name","text":"玩家名字","leading":6,"height":23,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":133,"x":-6,"wordWrap":true,"width":110,"var":"txt_money","text":"0","leading":6,"height":22,"fontSize":20,"color":"#f8ea5e","align":"center"}},{"type":"Clip","props":{"y":5,"var":"clip_money","skin":"tongyong_ui/game_ui/tongyong/general/clip_num1.png","clipX":11,"centerX":0}},{"type":"Image","props":{"y":21,"x":69,"visible":false,"var":"img_qifu","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_qf.png"}},{"type":"Image","props":{"y":62,"x":51,"visible":false,"var":"qifu_type","skin":"tongyong_ui/game_ui/tongyong/qifu/f_cs2.png","scaleY":0.5,"scaleX":0.5,"anchorY":1,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.TouXiangUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class TouXiangWzUI extends View {
		public img_icon:Laya.Image;
		public img_txk:Laya.Image;
		public txt_money:laya.display.Text;
		public txt_name:laya.display.Text;
		public clip_money:Laya.Clip;
		public img_qifu:Laya.Image;
		public qifu_type:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":137},"child":[{"type":"Box","props":{"y":1,"x":1,"width":99,"height":136},"child":[{"type":"Image","props":{"y":73,"x":-15,"skin":"tongyong_ui/game_ui/tongyong/general/tu_txk1.png"}},{"type":"Image","props":{"y":32,"x":50,"var":"img_icon","skin":"tongyong_ui/game_ui/tongyong/general/tu_weizi.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-16,"x":2,"var":"img_txk","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png","scaleY":0.95,"scaleX":0.95}},{"type":"Text","props":{"y":82,"x":0,"wordWrap":true,"width":101,"var":"txt_money","text":"点击入座","leading":6,"height":22,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":106,"x":0,"wordWrap":true,"width":99,"var":"txt_name","text":"玩家名字","leading":6,"height":21,"fontSize":20,"color":"#fbe85a","align":"center"}},{"type":"Clip","props":{"y":5,"var":"clip_money","skin":"tongyong_ui/game_ui/tongyong/general/clip_num1.png","clipX":11,"centerX":0}},{"type":"Image","props":{"y":21,"x":69,"visible":false,"var":"img_qifu","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_qf.png"}},{"type":"Image","props":{"y":52,"x":50,"visible":false,"var":"qifu_type","skin":"tongyong_ui/game_ui/tongyong/qifu/f_cs2.png","scaleY":0.5,"scaleX":0.5,"anchorY":1,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.TouXiangWzUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class WanJiaUI extends View {
		public txt_name:laya.display.Text;
		public txt_money:laya.display.Text;
		public img_icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":80},"child":[{"type":"Box","props":{"y":0,"x":0,"width":200,"height":80},"child":[{"type":"Text","props":{"y":14,"x":76,"wordWrap":true,"width":121,"var":"txt_name","text":"ID:000000000","leading":6,"height":17,"fontSize":18,"color":"#9e9bad","bold":true,"align":"center"}},{"type":"Text","props":{"y":44,"x":101,"wordWrap":true,"width":97,"var":"txt_money","text":"1000000.00","leading":6,"height":17,"fontSize":18,"color":"#9e9bad","bold":true,"align":"left"}},{"type":"Image","props":{"y":38,"x":38,"skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_txk.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":38,"x":38,"var":"img_icon","skin":"tongyong_ui/game_ui/tongyong/touxiang/head_1.png","scaleY":0.9,"scaleX":0.9,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":77,"x":3,"width":190,"skin":"brniuniu_ui/game_ui/brniuniu/tu_xx.png"}},{"type":"Image","props":{"y":52,"x":87,"skin":"tongyong_ui/game_ui/tongyong/dating/icon_money1.png","scaleY":0.55,"scaleX":0.55,"anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.WanJiaUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu.component {
    export class XuanZhongUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":206,"height":224},"child":[{"type":"Image","props":{"y":0,"x":0,"width":204,"skin":"brniuniu_ui/game_ui/brniuniu/tu_xz.png","sizeGrid":"50,0,50,0","height":224},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":10}]}}],"name":"ani1","id":1,"frameRate":24,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.component.XuanZhongUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class GoUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":350,"x":650,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_0.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5},"compId":7},{"type":"Image","props":{"y":360,"x":957.4016,"skin":"tongyong_ui/game_ui/tongyong/general/tu_xz.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":2},{"type":"Image","props":{"y":360,"x":317.5984,"skin":"tongyong_ui/game_ui/tongyong/general/tu_ks0.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":4},{"type":"Image","props":{"y":360,"x":637,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","centerY":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":3},{"type":"Image","props":{"y":251,"x":385,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":9},{"type":"Image","props":{"y":436,"x":916,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":10}]}],"animations":[{"nodes":[{"target":2,"keyframes":{"x":[{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"key":"x","index":0},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":10},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"x","index":40},{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"alpha","index":48}]}},{"target":4,"keyframes":{"x":[{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"key":"x","index":0},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":10},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":40},{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"alpha","index":48}]}},{"target":3,"keyframes":{"x":[{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":40},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":48}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":48}]}},{"target":7,"keyframes":{"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":0},{"value":false,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":46}],"scaleY":[{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":40},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":45},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":46}],"scaleX":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":40},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":45},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":46}]}},{"target":9,"keyframes":{"y":[{"value":251,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0}],"x":[{"value":385,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":4},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":10},{"value":937,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":30}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":9,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":9,"key":"visible","index":4}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":30}]}},{"target":10,"keyframes":{"y":[{"value":436,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":0},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":4},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":10},{"value":425,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":30}],"x":[{"value":916,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":0},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":4},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":10},{"value":343,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":30}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":4}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.GoUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class JieSuanUI extends View {
		public ani2:Laya.FrameAnimation;
		public img_0:Laya.Image;
		public img_1:Laya.Image;
		public img_2:Laya.Image;
		public img_3:Laya.Image;
		public txt_name0:laya.display.Text;
		public img_head0:Laya.Image;
		public txt_benefit0:laya.display.Text;
		public txt_bet0:laya.display.Text;
		public img_txk0:Laya.Image;
		public txt_name1:laya.display.Text;
		public img_head1:Laya.Image;
		public txt_bet1:laya.display.Text;
		public txt_benefit1:laya.display.Text;
		public img_txk1:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":250,"x":636,"var":"img_0","skin":"tongyong_ui/game_ui/tongyong/general/tu_gs.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5},"compId":44},{"type":"Image","props":{"width":660,"skin":"tongyong_ui/game_ui/tongyong/dating/game_popout_bg.png","sizeGrid":"20,20,0,20","height":380,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"var":"img_1","skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sl2.png","centerY":-190,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"var":"img_2","skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_js.png","centerY":-180,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":208,"x":626,"var":"img_3","skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":387,"x":493,"width":284,"height":229,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":113,"x":69,"wordWrap":true,"width":150,"var":"txt_name0","text":"玩家名字六字","leading":6,"height":20,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":64,"x":141,"skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_txk.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":64,"x":141,"var":"img_head0","skin":"brniuniu_ui/game_ui/brniuniu/tu_xtz.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":189,"x":106,"width":167,"skin":"tongyong_ui/game_ui/tongyong/general/tu_k3.png","sizeGrid":"10,10,10,10","height":34}},{"type":"Text","props":{"y":194,"x":8,"wordWrap":true,"width":102,"text":"我的输赢：","leading":6,"height":20,"fontSize":20,"color":"#fff4d9","align":"center"}},{"type":"Text","props":{"y":195,"x":116,"wordWrap":true,"width":145,"var":"txt_benefit0","text":"000000.00","leading":6,"height":20,"fontSize":20,"color":"#f8ea5e","align":"left"}},{"type":"Image","props":{"y":145,"x":106,"width":167,"skin":"tongyong_ui/game_ui/tongyong/general/tu_k3.png","sizeGrid":"10,10,10,10","height":34}},{"type":"Text","props":{"y":150,"x":8,"wordWrap":true,"width":102,"text":"我的下注：","leading":6,"height":20,"fontSize":20,"color":"#fff4d9","align":"center"}},{"type":"Text","props":{"y":151,"x":116,"wordWrap":true,"width":145,"var":"txt_bet0","text":"000000.00","leading":6,"height":20,"fontSize":20,"color":"#f8ea5e","align":"left"}},{"type":"Image","props":{"y":12,"x":92,"var":"img_txk0","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png"}}]},{"type":"Box","props":{"y":387,"x":784,"width":284,"height":229,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":113,"x":69,"wordWrap":true,"width":150,"var":"txt_name1","text":"玩家名字六字","leading":6,"height":20,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":64,"x":141,"skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_txk.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":64,"x":141,"var":"img_head1","skin":"brniuniu_ui/game_ui/brniuniu/tu_xtz.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":145,"x":106,"width":167,"skin":"tongyong_ui/game_ui/tongyong/general/tu_k3.png","sizeGrid":"10,10,10,10","height":34}},{"type":"Text","props":{"y":150,"x":8,"wordWrap":true,"width":102,"text":"总下注额：","leading":6,"height":20,"fontSize":20,"color":"#fff4d9","align":"center"}},{"type":"Text","props":{"y":151,"x":116,"wordWrap":true,"width":145,"var":"txt_bet1","text":"000000.00","leading":6,"height":20,"fontSize":20,"color":"#f8ea5e","align":"left"}},{"type":"Image","props":{"y":189,"x":106,"width":167,"skin":"tongyong_ui/game_ui/tongyong/general/tu_k3.png","sizeGrid":"10,10,10,10","height":34}},{"type":"Text","props":{"y":194,"x":8,"wordWrap":true,"width":102,"text":"庄家输赢：","leading":6,"height":20,"fontSize":20,"color":"#fff4d9","align":"center"}},{"type":"Text","props":{"y":195,"x":116,"wordWrap":true,"width":145,"var":"txt_benefit1","text":"000000.00","leading":6,"height":20,"fontSize":20,"color":"#f8ea5e","align":"left"}},{"type":"Image","props":{"y":12,"x":92,"var":"img_txk1","skin":"tongyong_ui/game_ui/tongyong/touxiang/tu_v1.png"}}]},{"type":"Image","props":{"y":387,"x":638,"skin":"tongyong_ui/game_ui/tongyong/general/tu_bb3.png","anchorY":0.5,"anchorX":0.5,"alpha":0.1}}]}],"animations":[{"nodes":[{"target":44,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":44,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":44,"key":"rotation","index":100}]}}],"name":"ani2","id":2,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.JieSuanUI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class JieSuan_1UI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":330,"x":640,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_1.png","scaleY":1,"scaleX":1,"centerY":-30,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":8},{"type":"Image","props":{"y":-105.5,"x":-320,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sl1.png","centerY":-50,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":-105.5,"x":-320,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sl.png","centerY":-40,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Image","props":{"y":348,"x":626,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5},"compId":6}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":7}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":7}]}},{"target":5,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":5},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":5},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":5}]}},{"target":6,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":10}]}},{"target":8,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":10}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":10}]}}],"name":"ani1","id":1,"frameRate":24,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.JieSuan_1UI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class JieSuan_2UI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":330,"x":640,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_1.png","scaleY":1,"scaleX":1,"gray":true,"centerY":-30,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":8},{"type":"Image","props":{"y":-105.5,"x":-320,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sb1.png","centerY":-50,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":-105.5,"x":-320,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_sb.png","centerY":-40,"centerX":0,"anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Image","props":{"y":348,"x":626,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","gray":true,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5},"compId":6}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":7}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":7}]}},{"target":5,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":5},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":5},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"scaleX","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":5,"key":"alpha","index":5}]}},{"target":6,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":10}]}},{"target":8,"keyframes":{"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":10}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":10}]}}],"name":"ani1","id":1,"frameRate":24,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.JieSuan_2UI.uiView);
        }
    }
}

module ui.nqp.game_ui.brniuniu {
    export class StopUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":360,"x":640,"width":1280,"height":720,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":350,"x":650,"visible":false,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_0.png","scaleY":0.1,"scaleX":2,"anchorY":0.5,"anchorX":0.5},"compId":7},{"type":"Image","props":{"y":360,"x":1000,"skin":"tongyong_ui/game_ui/tongyong/general/tu_xz.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":2},{"type":"Image","props":{"y":360,"x":275,"skin":"tongyong_ui/game_ui/tongyong/general/tu_tz0.png","centerY":0,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":4},{"type":"Image","props":{"y":360,"x":637,"skin":"tongyong_ui/game_ui/tongyong/general/jiesuan_2.png","centerY":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":3},{"type":"Image","props":{"y":251,"x":937,"visible":true,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":9},{"type":"Image","props":{"y":425,"x":343,"visible":true,"skin":"tongyong_ui/game_ui/tongyong/general/gzyz_3.png","blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":10}]}],"animations":[{"nodes":[{"target":2,"keyframes":{"x":[{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"key":"x","index":0},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":10},{"value":740,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"x","index":40},{"value":1000,"tweenMethod":"strongInOut","tween":true,"target":2,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"alpha","index":48}]}},{"target":4,"keyframes":{"x":[{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"key":"x","index":0},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":10},{"value":535,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":40},{"value":275,"tweenMethod":"strongInOut","tween":true,"target":4,"label":null,"key":"x","index":48}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"alpha","index":48}]}},{"target":3,"keyframes":{"x":[{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":40},{"value":637,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":48}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":13},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":48}]}},{"target":7,"keyframes":{"visible":[{"value":true,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":0},{"value":false,"tweenMethod":"linearNone","tween":false,"target":7,"key":"visible","index":46}],"scaleY":[{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleY","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":40},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":45},{"value":0.1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleY","index":46}],"scaleX":[{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"scaleX","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":40},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":45},{"value":2,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"scaleX","index":46}]}},{"target":9,"keyframes":{"y":[{"value":251,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0}],"x":[{"value":385,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":4},{"value":346,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":10},{"value":937,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":30}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":9,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":9,"key":"visible","index":4}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"alpha","index":30}]}},{"target":10,"keyframes":{"y":[{"value":436,"tweenMethod":"linearNone","tween":true,"target":10,"key":"y","index":0},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":4},{"value":427,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":10},{"value":425,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"y","index":30}],"x":[{"value":916,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":0},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":4},{"value":936,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":10},{"value":343,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"x","index":30}],"visible":[{"value":false,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":0},{"value":true,"tweenMethod":"linearNone","tween":false,"target":10,"key":"visible","index":4}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":4},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":9},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"label":null,"key":"alpha","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.nqp.game_ui.brniuniu.StopUI.uiView);
        }
    }
}
