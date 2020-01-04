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
		//百人牛牛游戏匹配界面
		static PAGE_BRNIUNIU_PIPEI: string = "4";
		//百人牛牛停止下注界面
		static PAGE_BRNIUNIU_END: string = "5";
		//百人牛牛上庄列表界面
		static PAGE_BRNIUNIU_SZ_LIST: string = "6";
		//百人牛牛游戏规则界面
		static PAGE_BRNIUNIU_RULE: string = "101";


		static myinit(str: string) {
			super.myinit(str);
			BrniuniuClip.init();
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU] = BrNiuNiuPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_MAP] = BrNiuNiuMapPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_BEGIN] = BrNiuNiuBeginPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_RULE] = BrNiuNiuRulePage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_END] = BrNiuNiuEndPage;
			PageDef._pageClassMap[BrniuniuPageDef.PAGE_BRNIUNIU_SZ_LIST] = BrNiuNiuSzListPage;


			this["__needLoadAsset"] = [
				DatingPath.atlas_dating_ui + "qifu.atlas",
				Path_game_brniuniu.atlas_game_ui + "brniuniu.atlas",
				Path_game_brniuniu.atlas_game_ui_brniuniu + "niupai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "qifu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "pai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "chongzhi.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "nyl.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "yq.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "zjtp.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "zjts.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general + "anniu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "anniug.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "fapai_1.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "xipai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "kaipai.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksyx.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksxz.atlas",

				Path_game_brniuniu.ui_brniuniu_sk + "bairenniuniu.sk",
				Path_game_brniuniu.ui_brniuniu_sk + "bairenniuniu.png",
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