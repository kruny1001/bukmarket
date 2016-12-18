'use strict';

angular.module('starter')
	.factory('RestaurantService', function ($sce) {
		var getRestaurant = function(type){
			var resource = [
				//1
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_no_5.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_no_4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_no_3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_no_2.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_no_1.png'],
					name:'돈마해장국(노형동점)', phone:'064-744-4005', note:'제주특별자치도 제주시 광평동로 25',
					name_cn:'Donma醒酒汤(老衡洞店)', note_cn:'济州特别自治道济州市廣坪洞路 25',
					name_en:'Donma Hae Jangguk(Nohyeong-dong Store)', note_en:'25, Gwangpyeongdong-ro Jeju-si Jeju-do',
					name_jp:'ドンマ酔い覚ましスープ(老衡洞店)', note_jp:'済州特別自治道 済州市 クァンピョンドンロ(広坪東路) 25.',
					pos:[33.482251, 126.470086],
					verified:false
				},
				//2
				{pics:[
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/f1.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/f2.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/f3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/f4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/f5.png'
				],
					name:'화로향', phone:'064-724-4050 ', note:'제주특별자치도 제주시 관덕로15길 27',
					name_cn:'火炉香', note_cn:'济州特别自治道济州市观德路15-gil 27',
					name_en:'Hwarohyang', note_en:'Gwandeok-ro 15-gil Jeju-si Jeju-do',
					name_jp:'ファロヒャン(火鉢(ひばち)の香り)', note_jp:'済州特別自治道 済州市  グヮンドクロ 15ギル 27',
					pos:[33.497801, 126.529561],
					verified:false
				},
				//3
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_5.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_2.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_1.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_6.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_7.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_8.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donma_y_9.png'],
					name:'돈마해장국(연동점)', phone:'064-744-4002', note:'제주특별자치도 제주시 삼동길 60',
					name_cn:'Donma 醒酒汤(莲洞店)', note_cn:'济州特别自治道济州市Samdong-gil 60',
					name_en:'Donma Hae Jangguk(Yeon-dong Store)', note_en:'60, Samdong-gil Jeju-si Jeju-do',
					name_jp:'ドンマ酔い覚ましスープ(蓮洞店)', note_jp:'済州特別自治道 済州市 サムドンギル 60',
					pos:[33.499621, 126.531188],
					verified:false
				},
				//4
				{pics:[
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol1.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol5.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol6.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol7.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol8.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol9.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol10.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol11.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol12.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol13.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol14.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/mol15.png'
				],
					name:'몰이랑흑도새기랑', phone:'064-744-7031', note:'제주특별자치도 제주시 축산마을북길 1',
					name_cn:'马和黑猪', note_cn:'济州特别自治道济州市Chuksanmaeulbuk-gil 1',
					name_en:'MolyirangHeokdosaegirang (Horse and Black pig)', note_en:'1, Chuksanmaeulbuk-gil Jeju-si Jeju-do',
					name_jp:'モール(馬)と黒ドセキ(豚)と', note_jp:'済州特別自治道 済州市 畜産マウルブクギル 1',
					pos:[33.450060, 126.486150],
					verified:false
				},
				//5
				{pics:[
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_5.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_6.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_7.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_8.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_1.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_2.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/donh_3.png'],
					name:'돈향기', phone:'064-724-0228', note:'제주특별자치도 제주시 관덕로15길 30',
					name_cn:'猪香气', note_cn:'济州特别自治道济州市观德路15-gil 30',
					name_en:'Don Hyanggi', note_en:'30, Gwandeok-ro 15-gil, Jeju-si, Jeju-do',
					name_jp:'ドンヒャンキ(豚の香り)', note_jp:'済州特別自治道 済州市  グヮンドクロ 15ギル 30',
					pos:[33.515803, 126.527091],
					verified:false
				},
				//6
				{pics:[
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/jejum_3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/jejum_4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/jejum_5.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/jejum_6.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/jejum_7.png',
				],
					name:'제주몬트락', phone:'064-757-2300', note:'제주특별자치도 제주시 건입동 1388-3',
					name_cn:'济州Montrak', note_cn:'济州特别自治道济州市健入洞 1388-3',
					name_en:'Jeju Montrak', note_en:'1388-3, Geonip-dong Jeju-si Jeju-do',
					name_jp:'済州モントゥラク', note_jp:'済州特別自治道 済州市 健入洞 1388-3',
					pos:[33.516314, 126.527008],
					verified:false
				},
				//7
				{pics:[
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/top1.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/top2.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/top3.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/top4.png',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/top5.png',
				],
					name:'탑부평', phone:'064-721-7869', note:'제주특별자치도 제주시 관덕로15길 26',
					name_cn:'塔富平', note_cn:'济州特别自治道济州市观德路15-gil 26',
					name_en:'Top Bupyeong', note_en:'26, Gwandeok-ro 15-gil Jeju-si Jeju-do',
					name_jp:'塔富平', note_jp:'済州特別自治道 済州市  グヮンドクロ 15ギル 26',
					pos:[33.515517, 126.527036],
					verified:false
				},
				//8
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/v1463378911/handon/rest/yeg1.jpg', 'https://res.cloudinary.com/dbfirebase/image/upload/v1463379018/handon/rest/yeg2.jpg'],
					name:'예그린 가든', phone:'064-739- 9516', note:'제주특별자치도 서귀포시 천제연로 188번길15',
					name_cn:'也格林garden', note_cn:'济州特别自治道西归浦市天街沿路188beon-gil 15',
					name_en:'Ye Green Garden', note_en:'15, Cheonjeyeon-ro 188beon-gil, Seogwipo-si, Jeju-do',
					name_jp:'イェグリンガーデン', note_jp:'済州特別自治道 西帰浦市 天帝淵路188ギル 15',
					pos:[33.251153,126.424468],
					verified:true
				},
				//9
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung4.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung2.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung3.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung1.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung5.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379416/handon/rest/bongyoung6.jpg',],
					name:'봉영축산유통', phone:'064-733- 7036', note:'제주특별자치도 서귀포시 서문로 29번길 7',
					name_cn:'风英畜产流通', note_cn:'济州特别自治道西归浦市西门路29beon-gil 7',
					name_en:'Bongyong Livestock Distribution', note_en:'7, Seomun-ro 29beon-gil, Seogwipo-si, Jeju-do',
					name_jp:'奉迎畜産流通', note_jp:'済州特別自治道 西帰浦市 西門路 29ギル 7',
					pos:[33.249828,126.559241],
					verified:true
				},
				//10
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379569/handon/rest/ssup1.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379569/handon/rest/ssup2.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379569/handon/rest/ssup3.jpg'],
					name:'섭지골', phone:'064-784- 0014', note:'제주특별자치도 서귀포시 성산읍 신양로 107',
					name_cn:'舌质谷', note_cn:'济州特别自治道西归浦城山邑心阳路107',
					name_en:'Seopjigol', note_en:'107, Sinyang-ro, Seongsan-eup, Seogwipo-si, Jeju-do',
					name_jp:'サップジコル', note_jp:'済州特別自治道 西帰浦市 城山邑 シンヤンロ 107',
					pos:[33.435961,126.916258],
					verified:true
				},
				//11
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_500/v1463427719/handon/rest/base.jpg'],
					name:'돗토렴', phone:'064-759- 0990', note:'제주특별자치도 제주시 연수로3길 5',
					name_cn:'Dot To Liem', note_cn:'济州特别自治道济州市沿水路3-gil 5',
					name_en:'Dot To Liem', note_en:'5, Yeonsu-ro3-gil, Jeju-si, Jeju-do',
					name_jp:'ドットリョム', note_jp:'済州特別自治道 済州市 連守路3ギル 5',
					pos:[33.502616,126.543594],
					verified:true
				},
				//12
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/v1463427217/handon/rest/dontel1.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/v1463427217/handon/rest/dontel2.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/v1463427217/handon/rest/dontel3.jpg'],
					name:'돈델리', phone:'064-738- 4577', note:'제주특별자치도 서귀포시 천제연로 263',
					name_cn:'Don De Li', note_cn:'济州特别自治道西归浦市天街沿路263',
					name_en:'Don De Li', note_en:'263, Cheonjeyeon-ro, Seogwipo-si, Jeju-do',
					name_jp:'豚デリー', note_jp:'済州特別自治道 西帰浦市 天帝淵ロ 263',
					pos:[33.253374, 126.432018],
					verified:true
				},
				//13
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379000/handon/rest/dami1.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379000/handon/rest/dami2.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379000/handon/rest/dami3.jpg'],
					name:'다미정', phone:'064-749- 2299', note:'제주특별자치도 제주시 광평동로 31-4',
					name_cn:'多美情', note_cn:'济州特别自治道济州市光平同路31-4',
					name_en:'Da Mi Jung', note_en:'31-4, Gwangpyeongdong-ro, Jeju-si, Jeju-do',
					name_jp:'ダミチョン(多美情)', note_jp:'済州特別自治道 済州市 広坪東ロ 31-4',
					pos:[33.482768,126.469572],
					verified:true
				},
				//14
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379085/handon/rest/donil1.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379085/handon/rest/donil2.jpg',
					'https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463379085/handon/rest/donil3.jpg'],
					name:'돈일깡통구이', phone:'064-757- 7080', note:'제주특별자치도 제주시 연수로1길 2',
					name_cn:'顿一刚通guyi', note_cn:'济州特别自治道济州市沿水路1-gil 2',
					name_en:'Donil kangtong Gui', note_en:'2, Yeonsu-ro1-gil, Jeju-si, Jeju-do',
					name_jp:'豚の缶焼き', note_jp:'済州特別自治道 済州市 連守路1ギル 2',
					pos:[33.502069,126.543546],
					verified:true
				},
				//15
				{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_500/v1463427719/handon/rest/base.jpg'],
					name:'윤창영농조합법인', phone:'064-738- 4577', note:'제주특별자치도 서귀포시 천제연로 263',
					name_cn:'尹昌英农组和法人', note_cn:'济州特别自治道西归浦市天街沿路263',
					name_en:'Yoon Chang Agricultural Association Corporation', note_en:'263, Cheonjeyeon-ro, Seogwipo-si, Jeju-do',
					name_jp:'ユンチャンヨン農組合法人', note_jp:'済州特別自治道 西帰浦市 天帝淵ロ 263',
				pos:[33.251497, 126.432911],
				verified:true
		},
			//16
			{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_500/v1463427719/handon/rest/base.jpg'],
				name:'싱싱오름 친환경로컬푸드마켓', phone:'064-758- 3681', note:'제주특별자치도 제주시 신설로 9길 25',
				name_cn:'Sing Sing Oh Lom 环保当地食品超市', note_cn:'济州特别自治道济州市新雪路9-gil 25',
				name_en:'Singsingoreum Eco-friendly local food market', note_en:'25, Sinseol-ro 9-gil, Jeju-si, Jeju-do',
				name_jp:'シンシンオルムローカルフードマーケット', note_jp:'済州特別自治道 済州市 シンサルロ 9ギル 25',
				pos:[33.494357,126.546782],
				verified:true
			},
			//17
			{pics:['https://res.cloudinary.com/dbfirebase/image/upload/c_fit,w_350/v1463427480/handon/rest/sema1.png'],
				name:'새마을 식당(제주시청점)', phone:'064-757-0422', note:'제주특별자치도 제주시 광양 14길 8',
				name_cn:'新村餐厅(济州市厅店)', note_cn:'济州特别自治道济州市光阳 14-gil 8',
				name_en:'Semaul Restaurant(Jeju City Hall Store)', note_en:'8, Gwangyang14-gil, Jeju-si, Jeju-do',
				name_jp:'セマウル食堂(済州市役所店)', note_jp:'済州特別自治道 済州市 光陽14ギル 8',
				pos:[33.497801, 126.529561],
				verified:true
			}
			];

			return resource;
		}
		return {
			getRestaurant : getRestaurant,
		}
	})
