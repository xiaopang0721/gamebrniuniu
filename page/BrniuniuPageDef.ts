/**
* name 
*/
module gamebrniuniu.page {
	export class BrniuniuPageDef extends game.gui.page.PageDef {
		static GAME_NAME: string;
		//百人牛牛界面
		static PAGE_BRNIUNIU: string = "1";
		//百人牛牛地图UI
		static PAGE_BRNIUNIU_MAP: string = "2";
		//百人牛牛开始下注界面
		static PAGE_BRNIUNIU_BEGIN: string = "3";
		//牛牛游戏通杀界面
		static PAGE_NIUNIU_TONGSHA: string = "4";
		//牛牛游戏通赔界面
		static PAGE_NIUNIU_TONGPEI: string = "5";
		//百人牛牛游戏规则界面
		static PAGE_BRNIUNIU_RULE: string = "101";
		//百人牛牛游戏匹配界面
		static PAGE_BRNIUNIU_PIPEI: string = "7";
		//百人牛牛玩家列表界面
		static PAGE_BRNIUNIU_PLAYER_LIST: string = "11";
		//百人牛牛停止下注界面
		static PAGE_BRNIUNIU_END: string = "12";
		//百人牛牛上庄列表界面
		static PAGE_BRNIUNIU_SZ_LIST: string = "13";
		//百人牛牛结算界面
		static PAGE_BRNIUNIU_SETTLE: string = "14";


		static myinit(str: string) {
			super.myinit(str);
			BrniuniuClip.init();
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU] = BrNiuNiuPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_MAP] = BrNiuNiuMapPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_BEGIN] = BrNiuNiuBeginPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_NIUNIU_TONGSHA] = BrNiuNiuTongShaPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_NIUNIU_TONGPEI] = BrNiuNiuTongPeiPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_RULE] = BrNiuNiuRulePage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_PLAYER_LIST] = BrNiuNiuPlayerListPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_END] = BrNiuNiuEndPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_SZ_LIST] = BrNiuNiuSzListPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_SETTLE] = BrNiuNiuSettlePage;


			this["__needLoadAsset"] = [
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "pai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				Path_game_brniuniu.atlas_game_ui + "brniuniu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "tuichu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "qifu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/suiji.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/fapai_1.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/xipai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general/effect/kaipai.atlas",
				Path.custom_atlas_scene + 'card.atlas',
				Path.custom_atlas_scene + 'chip.atlas',
				Path.map + 'pz_brniuniu.png',
				Path.map_far + 'bg_brniuniu.jpg'
			]

			if (WebConfig.needMusicPreload) {
				this["__needLoadAsset"] = this["__needLoadAsset"].concat([
					Path_game_brniuniu.music_brniuniu + "nn_bgm.mp3",
					Path_game_brniuniu.music_brniuniu + "chouma.mp3",
					Path_game_brniuniu.music_brniuniu + "dingding_end.mp3",
					Path_game_brniuniu.music_brniuniu + "dingding_start.mp3",
					Path_game_brniuniu.music_brniuniu + "niu0_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu1_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu2_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu3_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu4_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu5_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu6_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu7_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu8_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu9_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu10_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu11_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu12_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu13_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "niu14_nv.mp3",
					Path_game_brniuniu.music_brniuniu + "piaoqian.mp3",
					Path_game_brniuniu.music_brniuniu + "shouqian.mp3",
					Path_game_brniuniu.music_brniuniu + "xiazhu_end.mp3",
					Path_game_brniuniu.music_brniuniu + "xiazhu_start.mp3",
					Path_game_brniuniu.music_brniuniu + "zjtongchi.mp3",
				])
			}
		}
	}
}