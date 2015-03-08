/*

AMAITORTE
holiday.js
Version 5.0 (2008-02-11 > 2014-05-10)

入力された日付が日本国における国民の祝日かどうかを調べ、更にその名称を知る事が出来るスクリプトです。

※ 詳しい利用方法と利用規約はこのスクリプトの提供元ページをご参照下さい。
※ このスクリプトを入手することにより、提供元ページに書かれた利用規約に同意したものと見做されます。
※ このスクリプトの作者は、このスクリプトを使用したことによるいかなる損害にも責任を負いません。

© Nekobungi Sumire 2008-2014

*/




var amaitortedays = new Object();
amaitortedays.version = 4;

amaitortedays.isNationalHoliday = function(InputTime, TargetMode){
	if(!InputTime){
		var InputTime = new Date();
	}
	var targetDay = amaitortedays.DDDDcodeJST(InputTime);
	var thisyear = amaitortedays.YYYYcodeJST(InputTime);
	
	// 日付が固定の祝日 -------------------------------------------
	if(      1949 <= thisyear && targetDay === 101){
		return '元日';
	}else if(1967 <= thisyear && targetDay === 211){
		return '建国記念の日';
	}else if(2007 <= thisyear && targetDay === 429){
		return '昭和の日';
	}else if(1949 <= thisyear && targetDay === 503){
		return '憲法記念日';
	}else if(2007 <= thisyear && targetDay === 504){
		return 'みどりの日';
	}else if(1949 <= thisyear && targetDay === 505){
		return 'こどもの日';
	}else if(2016 <= thisyear && targetDay === 811){
		return '山の日';
	}else if(1948 <= thisyear && targetDay === 1103){
		return '文化の日';
	}else if(1948 <= thisyear && targetDay === 1123){
		return '勤労感謝の日';
	}else if(1989 <= thisyear && targetDay === 1223){
		return '天皇誕生日';
	}
	
	// 日付が固定の祝日(過去) -------------------------------------------
	if(      1949 <= thisyear && thisyear < 2000 && targetDay === 115){
		return '成人の日';
	}else if(1949 <= thisyear && thisyear < 1989 && targetDay === 429){
		return '天皇誕生日';
	}else if(1989 <= thisyear && thisyear < 2007 && targetDay === 429){
		return 'みどりの日';
	}else if(1996 <= thisyear && thisyear < 2003 && targetDay === 731){
		return '海の日';
	}else if(1966 <= thisyear && thisyear < 2003 && targetDay === 931){
		return '敬老の日';
	}else if(1966 <= thisyear && thisyear < 2000 && targetDay === 1021){
		return '体育の日';
	}
	
	// 戦前の祝祭日 -------------------------------------------
	// 1873年10月14日制定。1948年7月20日に廃止。
	if(TargetMode !== 2){
		if(      1874 <= thisyear && thisyear < 1949 && targetDay === 101){
			return '四方節';
		}else if(1874 <= thisyear && thisyear < 1949 && targetDay === 105){
			return '新年宴会';
		}else if(1874 <= thisyear && thisyear < 1949 && targetDay === 211){
			return '紀元節';
		}else if(1927 <= thisyear && thisyear < 1949 && targetDay === 429){
			return '天長節';
		}else if(1913 <= thisyear && thisyear < 1927 && targetDay === 831){
			return '天長節';
		}else if(1913 <= thisyear && thisyear < 1927 && targetDay === 1031){
			return '天長節祝日';
		}else if(1873 <= thisyear && thisyear < 1912 && targetDay === 1103){
			return '天長節';
		}else if(1927 <= thisyear && thisyear < 1948 && targetDay === 1103){
			return '明治節';
		}
		
		if(      1874 <= thisyear && thisyear < 1949 && targetDay === 103){
			return '元始祭';
		}else if(1874 <= thisyear && thisyear < 1913 && targetDay === 130){
			return '孝明天皇祭';
		}else if(1874 <= thisyear && thisyear < 1949 && targetDay === 403){
			return '神武天皇祭';
		}else if(1913 <= thisyear && thisyear < 1927 && targetDay === 730){
			return '明治天皇祭';
		}else if(1874 <= thisyear && thisyear < 1879 && targetDay === 917){
			return '神嘗祭';
		}else if(1879 <= thisyear && thisyear < 1948 && targetDay === 1017){
			return '神嘗祭';
		}else if(1873 <= thisyear && thisyear < 1948 && targetDay === 1123){
			return '新嘗祭';
		}else if(1927 <= thisyear && thisyear < 1948 && targetDay === 1225){
			return '大正天皇祭';
		}
	}
	
	// 年と日付が固定の休日 -------------------------------------------
	if(TargetMode !== 2){
		if(      1959 === thisyear && targetDay === 1021){
			return '皇太子明仁親王の結婚の儀';
		}else if(1989 === thisyear && targetDay === 224 && TargetMode === 1){
			return '昭和天皇の大喪の礼';
		}else if(1990 === thisyear && targetDay === 1112){
			return '即位礼正殿の儀';
		}else if(1993 === thisyear && targetDay === 609){
			return '皇太子徳仁親王の結婚の儀';
		}
	}
	
	
	// 曜日が固定の祝日 -------------------------------------------
	var tempDateObj = new Date(); // 計算用のオブジェクト
	
	// ※ここでの日付は仮想的なものだからUTCではなくローカル日付を使う
	tempDateObj.setDate(1);
	tempDateObj.setMonth(0); // 一旦その年の元旦まで巻き戻し
	tempDateObj.setFullYear(thisyear);
	
	var tempDainan; // 第○月曜日とかの○
	var tempKijunYobi; // その月の1日の曜日(番号)
	
	// 日付オブジェクトを一日ずつ進めながら、その日が第何何曜日かを計算する
	while(amaitortedays.DDDDcode(tempDateObj) < 1231){
		if(tempDateObj.getDate() === 1){
			tempKijunYobi = tempDateObj.getDay(); // その月の1日になったら基準の曜日を覚える
			tempDainan = 0; // 第○月曜日とかの○もリセット
		}
		if(tempKijunYobi === tempDateObj.getDay()){ // 基準の曜日になったら「第○月曜日とかの○」を1つ上げる。
			tempDainan ++;
		}
		
		// 曜日番号 0日 1月 2火 3水 4木 5金 6土
		tempTsukiDaiYou = (tempDateObj.getMonth() + 1) * 100;
		tempTsukiDaiYou += tempDainan * 10;
		tempTsukiDaiYou += tempDateObj.getDay(); // 例えばtempTsukiDaiYouが1231なら12月の第3月曜日
		
		
		if(targetDay === amaitortedays.DDDDcode(tempDateObj)){ // 日付オブジェクトの日が現実の日と一致したとき
			if(      2000 <= thisyear && tempTsukiDaiYou === 121){
				return '成人の日';
			}else if(2003 <= thisyear && tempTsukiDaiYou === 731){
				return '海の日';
			}else if(2003 <= thisyear && tempTsukiDaiYou === 931){
				return '敬老の日';
			}else if(2000 <= thisyear && tempTsukiDaiYou === 1021){
				return '体育の日';
			}
			break;
		}
		
		tempDateObj.setTime(tempDateObj.getTime() + 60 * 60 * 24 * 1000);
	}
	
	
	// 春分の日と秋分の日 -------------------------------------------
	var HaruBun = 0;
	var AkiBun = 0;
	
	if(      1851 <= thisyear && thisyear < 1900){
		HaruBun =	parseInt(19.8277+0.242194*(thisyear-1980) - parseInt((thisyear-1983)/4)) + 300;
		AkiBun =	parseInt(23.2588+0.242194*(thisyear-1980) - parseInt((thisyear-1983)/4)) + 900;
		
	}else if(1900 <= thisyear && thisyear < 1980){
		HaruBun =	parseInt(20.8357+0.242194*(thisyear-1980) - parseInt((thisyear-1983)/4)) + 300;
		AkiBun =	parseInt(23.2588+0.242194*(thisyear-1980) - parseInt((thisyear-1983)/4)) + 900;
		
	}else if(1980 <= thisyear && thisyear < 2100){
		HaruBun =	parseInt(20.8431+0.242194*(thisyear-1980) - parseInt((thisyear-1980)/4)) + 300;
		AkiBun =	parseInt(23.2488+0.242194*(thisyear-1980) - parseInt((thisyear-1980)/4)) + 900;
		
	}else if(2100 <= thisyear && thisyear < 2151){
		HaruBun =	parseInt(21.8510+0.242194*(thisyear-1980) - parseInt((thisyear-1980)/4)) + 300;
		AkiBun =	parseInt(23.2488+0.242194*(thisyear-1980) - parseInt((thisyear-1980)/4)) + 900;
		
	}
	
	if(      1949 <= thisyear && targetDay === HaruBun){
		return '春分の日';
	}else if(1948 <= thisyear && targetDay === AkiBun){
		return '秋分の日';
	}
	
	if(TargetMode !== 2){
		if(      1879 <= thisyear && thisyear < 1949 && targetDay === HaruBun){
			return '春季皇霊祭';
		}else if(1878 <= thisyear && thisyear < 1948 && targetDay === AkiBun){
			return '秋季皇霊祭';
		}
	}

	
	// 振替休日と国民の休日 -------------------------------------------
	if(TargetMode !== 2 && TargetMode !== 3){
		var CurrentTime = InputTime.getTime();
		//console.log(new Date(InputTime ? InputTime.getTime() : null));
		var yesteday = new Date(CurrentTime - 86400000);
		var tomorrow = new Date(CurrentTime + 86400000);
		if(
			1986 <= thisyear &&
			amaitortedays.isNationalHoliday(yesteday, 2) &&
			amaitortedays.isNationalHoliday(tomorrow, 2)
		){
			// 昨日と明日とが祝日なら国民の休日である
			return '国民の休日';
		}else if(
			1973 <= thisyear &&
			amaitortedays.DayJST(InputTime) !== 0 &&
			(2007 <= thisyear || amaitortedays.DayJST(InputTime) === 1)
		){
			// 昨日から順に遡る
			var endpoint = CurrentTime - 432000000;
			for(var i = CurrentTime - 86400000; i >= endpoint; i -= 86400000){
				//console.log(amaitortedays.DDDDcodeJST(new Date(i)));
				if(!amaitortedays.isNationalHoliday(new Date(i), 2)){
					// 平日が挟まっているのを発見したら停止
					//console.log('平日が挟まっているのを発見したら停止');
					break;
				}else if(amaitortedays.DayJST(new Date(i)) === 0){
					// 祝日が日曜日だった場合は振替休日である
					return '振替休日';
					break
				}
			}
		}
	}
	
	return null;
}

amaitortedays.DDDDcodeJST = function(InputTime){
	var thistime = new Date(InputTime.getTime()+32400000);
	return (thistime.getUTCMonth() + 1) * 100 + thistime.getUTCDate();
}
amaitortedays.YYYYcodeJST = function(InputTime){
	var thistime = new Date(InputTime.getTime()+32400000);
	return thistime.getUTCFullYear();
}
amaitortedays.DayJST = function(InputTime){
	var thistime = new Date(InputTime.getTime()+32400000);
	return thistime.getUTCDay();
}

amaitortedays.DDDDcodeUTC = function(InputTime){
	return (InputTime.getUTCMonth() + 1) * 100 + InputTime.getUTCDate();
}
amaitortedays.DDDDcode = function(InputTime){
	return (InputTime.getMonth() + 1) * 100 + InputTime.getDate();
}