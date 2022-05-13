////////////////////////////////////////////////////////////////
///   Black NotePad - 4/20/2022 3:56:07 PM - Not activated   ///
////////////////////////////////////////////////////////////////
'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'standard',
		connect:true,
		characterSort:{
			standard:{
			          
				standard_2019:["gongsunzan","xf_yiji"],
			},
		},
		character:{
			 
			zhugeliang:['male','shu','17600000000',['yingzi','xinjing','huanfeng','xyirangr','decadexushenDRAFT','xhuanxia','xprotection','xpaoxiao','mirror','roars','glyptic','glyptic_guanri','rende','zhiheng','ti']],
			zhaoyun:['female','wei','1/176',['chaoneng','yingzi','glyptica_fu','qian','xapgl','dairsong','dairsonf','dairson','xyiranga','airson','glyptic']],
			machao:['male','qun','1/176',['chaoneng','xg','yingzi','glyptica_fu','qian','xyirangg','goldenturn','goldenage','glyptic','dga','dgaf','dgag']],
			sunquan:['female','wu','1/176',['xx','yingzi','glyptica_fu','qian','xyirangx','xpaoxiao','x','glyptic','xpaoxiao','dx','dxf','dxg']],
		         
			re_yuanshu:['male','western',4000000000,['xxyuqi','airson','enemy1234','glyptic']],
		},
		characterIntro:{
			
			xf_yiji:"伊籍，字机伯，生卒年不详，兖州山阳郡（今山东金乡县）人，三国时期蜀汉官员。年少时依附于同乡刘表。刘备落难到荆州时，伊籍时常拜访，托请刘备照顾。建安十三年（208年），刘表病死，伊籍便转投刘备，一起渡江南下。建安十六年（211年），刘备入蜀帮助刘璋，伊籍亦有跟随。随后刘备和刘璋双方决裂。建安十九年（214年），刘备平定益州，任命伊籍为左将军从事中郎，其待遇次于简雍、孙乾等。后升任昭文将军，并与诸葛亮、法正、刘巴、李严共同编制《蜀科》。",
		},
		perfectPair:{
			
			ganning:['lingtong','xf_sufei'],
		},
		skill:{


	chaoneng:{
					audio:2,
					enable:'phaseUse',
					group:['chaoneng_buff1', 'chaoneng_buff2'],
					init:function(player){
						player.storage.chaoneng1 = 0;
						player.storage.chaoneng2 = 0;
						player.storage.chaoneng3 = 0;
					},
					filter:function(event, player){
						return lib.config.coin == 0;
					},
					content:function(){
						'step 0'
						event.list = ['30金币: 手牌上限+1 (当前为+'+player.storage.chaoneng1+')'];
						if (lib.config.coin == 0) event.list.push('50金币：灵力上限+1');
						if (lib.config.coin == 0) event.list.push('70金币：体力上限+1');
						if (lib.config.coin == 0) event.list.push('100金币：摸牌数+1 (当前为+'+player.storage.chaoneng2+')');
						if (lib.config.coin == 00) event.list.push ('150金币：【轰！】伤害+1 (当前为+'+player.storage.chaoneng3+')');
						player.chooseControlList(event.list, '想要买哪一个外挂？');
						'step 1'
						if (result.index == 0){
							game.changeCoin(30);
							player.storage.chaoneng1 ++; 
						} else if (result.index == 1){
							game.changeCoin(50);
							player.gainMaxlili();
						} else if (result.index == 2){
							game.changeCoin(70);
							player.gainMaxHp();
						} else if (result.index == 3){
							game.changeCoin(100);
							player.storage.chaoneng2 ++;
						} else if (result.index == 4){
							game.changeCoin(150);
							player.storage.chaoneng3 ++;
						}
					},
				},
				chaoneng_buff1:{
					trigger:{player:'phaseDrawBegin'},
					direct:true,
					content:function(){
						trigger.num+=player.storage.chaoneng2;
					},
					mod:{
						maxHandcard:function(player,num){
							return num + player.storage.chaoneng1;
						}
					}
				},
				chaoneng_buff2:{
					trigger:{source:'damageBegin'},
					filter:function(event){
						return event.card&&event.card.name=='sha';
					},
					direct:true,
					content:function(){
						trigger.num+=player.storage.chaoneng3;
					},
				},
				chaoli:{
					audio:2,
					enable:'phaseUse',
					filter:function(event, player){
						return lib.config.coin == 0;
					},
					filterTarget:function(){
						return true;
					},
					content:function(){
						game.changeCoin(250);
						target.damage();
					},
					ai:{
						order:9,
						result:{
							target:function(player,target){
								return -2;
							}
						},
					}
				},




			olxueyi:{
				audio:2,
				trigger:{global:'phaseBefore'},
				forced:true,
				unique:true,
				filter:function(event,player){
					return !player.storage.olxueyi_inited&&player.hasSkill('olxueyi');
				},
				content:function(){
					player.storage.olxueyi_inited=true;
					var num=game.countPlayer(function(current){
						return	current.group=='qun';
					})
					if(num) player.addMark('olxueyi',num*2);
				},
				marktext:'裔',
				intro:{
					name2:'裔',
					content:'mark',
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.hasZhuSkill('olxueyi')) return num+player.countMark('olxueyi');
					},
				},
				group:'olxueyi_draw',
			},
			olxueyi_draw:{
				audio:'olxueyi',
				trigger:{player:'phaseUseBegin'},
				prompt2:'弃置一枚「裔」标记，然后摸一张牌',
				check:function(event,player){
					return player.getUseValue('wanjian')>0||!player.needsToDiscard();
				},
				filter:function(event,player){
					return player.hasZhuSkill('olxueyi')&&player.hasMark('olxueyi');
				},
				content:function(){
					player.removeMark('olxueyi',1);
					player.draw();
				},
			},


			yinbing:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				audio:2,
				init:function(player){
					 player.storage.yinbing=4;
				},
				filter:function(event,player){
					return player.countCards('he',{type:'basic'})<player.countCards('he');
				},
				marktext:'兵',
				content:function(){
					"step 0"
					player.chooseCard([1,player.countCards('he')-player.countCards('he',{type:'basic'})],'he',get.prompt('yinbing'),function(card){
						return get.type(card)!='basic';
					}).set('ai',function(card){
						return 6-get.value(card);
					});
					"step 1"
					if(result.bool){
						player.$give(result.cards,player,false);
						player.logSkill('yinbing');
						game.log(player,'将',result.cards,'置于武将牌上');
						player.storage.yinbing=player.storage.yinbing.concat(result.cards);
						player.lose(result.cards,ui.special,'toStorage');
						player.markSkill('yinbing');
						player.syncStorage('yinbing');
					}
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'||card.name=='juedou'){
								if(current<0) return 1.2;
							}
						}
					},
					threaten:function(player,target){
						if(target.storage.yinbing&&target.storage.yinbing.length) return 2;
						return 1;
					}
				},
				subSkill:{
					discard:{
						trigger:{player:'damageEnd'},
						forced:true,
						filter:function(event,player){
							return event.card&&player.storage.yinbing.length>0&&
							(event.card.name=='sha'||event.card.name=='juedou');
						},
						content:function(){
							'step 0'
							player.chooseCardButton('移去一张引兵牌',true,player.storage.yinbing);
							'step 1'
							var card=result.links[0];
							player.storage.yinbing.remove(card);
							game.cardsDiscard(card);
							player.$throw(card);
							game.log(player,'将',card,'置入弃牌堆');
							player.syncStorage('yinbing');
							if(player.storage.yinbing.length==0){
								player.unmarkSkill('yinbing');
							}
						}
					}
				},
				group:'yinbing_discard'
			},
			


juedi:{
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.storage.yinbing&&player.storage.yinbing.length>0;
				},
				forced:true,
				audio:2,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('juedi'),true,function(card,player,target){
						return player.hp>=target.hp;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<2) return att-10;
						var num=att/10;
						if(target==player){
							num+=player.maxHp-player.countCards('h')+0.5;
						}
						else{
							num+=_status.event.n2*2;
							if(target.isDamaged()){
								if(target.hp==1){
									num+=3;
								}
								else if(target.hp==2){
									num+=2;
								}
								else{
									num+=0.5;
								}
							}
						}
						if(target.hasJudge('lebu')){
							num/=2;
						}
						return num;
					}).set('n2',player.storage.yinbing.length);
					'step 1'
					if(result.bool){
						player.line(result.targets[0],'green');
						if(result.targets[0]==player){
							player.$throw(player.storage.yinbing,1000);
							var num=player.maxHp-player.countCards('h');
							if(num>0) player.draw(num);
							game.cardsDiscard(player.storage.yinbing);
							player.storage.yinbing=[];
							player.syncStorage('yinbing');
							player.unmarkSkill('yinbing');
						}
						else{
							var target=result.targets[0];
							target.recover();
							target.gain(player.storage.yinbing.slice(0),'gain2','log','fromStorage');
							target.draw(player.storage.yinbing.length);
							player.storage.yinbing.length=0;
						}
						player.syncStorage('yinbing');
						player.unmarkSkill('yinbing');
					}
				}
			},


xxyuqi:{
				audio:2,
				trigger:{global:'phaseEnd'},
				init:function(player){
					player.storage.xxyuqi=7;
				},
				onremove:true,
					filter:function(event,player){
					var list=lib.skill.yuqi.getInfo(player);
					return event.player.isIn()&&get.distance(player,event.player)<=list[0];
				},
				logTarget:'player',
				content:function(){
					
if(game.roundNumber%4==1){
						player.storage.xxyuqi+=3;
player.updateMarks();
					}
if(game.roundNumber%4==2){
				player.storage.xxyuqi-=7;
player.updateMarks();
					}
if(game.roundNumber%4==3){
						player.storage.xxyuqi+=1;
player.updateMarks();
					}
if(game.roundNumber%4==0){
						player.storage.xxyuqi+=3;
player.updateMarks();
					}
					
				},
				mark:true,
				intro:{
					
				},
				ai:{
					threaten:8.8,
				},
			},



ex:{
	mark:true,
forced:true,
	init:function(player){
					player.storage.ex=7;
				},
trigger:{player:'phaseEnd'},
				content:function(){

if(game.roundNumber%4==1){
						player.storage.ex+=3;
					}
if(game.roundNumber%4==2){
				player.storage.ex-=7;
					}
if(game.roundNumber%4==3){
						player.storage.ex-=1;
					}
if(game.roundNumber%4==0){
						player.storage.ex+=3;
					}
					
				},
				
			},

glyptic_j:{
trigger:{player:'useCard'},
forced:true,
filter:function(event,player){
if(event.card.name!='wanjian') return false;
var evt=event.getParent('phaseUse');
if(!evt||evt.player!=player) return false;
var index=player.getHistory('useCard',function(evtx){
return evtx.card.name=='wanjian'&&evtx.getParent('phaseUse')==evt;
}).indexOf(event);
return index==0||index==1;
},
content:function(){
var evt=trigger.getParent('phaseUse');
var index=player.getHistory('useCard',function(evtx){
return evtx.card.name=='wanjian'&&evtx.getParent('phaseUse')==evt;
}).indexOf(trigger);



if(index==0){
game.log(trigger.card,'伤害+1');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(player.storage.glyptic3*176);
}

else{
game.log(trigger.card,'伤害+1');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(4*player.storage.glyptic3*176);
}
},
},

glyptic_m:{
trigger:{player:'useCard'},
forced:true,
filter:function(event,player){ 
if(event.card.name!='nanman') return false;
var evt=event.getParent('phaseUse');
if(!evt||evt.player!=player) return false;
var index=player.getHistory('useCard',function(evtx){
return evtx.card.name=='nanman'&&evtx.getParent('phaseUse')==evt;
}).indexOf(event);
return index==0||index==1;
},
content:function(){
var evt=trigger.getParent('phaseUse');
var index=player.getHistory('useCard',function(evtx){
return evtx.card.name=='nanman'&&evtx.getParent('phaseUse')==evt;
}).indexOf(trigger);


if(index==0){
game.log(trigger.card,'伤害+1');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(player.storage.glyptic3*176);
}

else{
game.log(trigger.card,'伤害+1');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(4*player.storage.glyptic3*176);
}
},
},


dairsonshone:{
				trigger:{player:'phaseBegin'},
priority:998,
				filter:function(event,player){
					return player.hp==22||player.hp==8||player.hp==45;
				},
				content:function(){
player.addSkill('xzhanyuan');
player.update;
			},
	},



dairson:{
				trigger:{player:'phaseBegin'},
	group:['yingzi'],
		
priority:999,
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==8;
				},
				content:function(){
player.addSkill('dar');
player.update;
			},
	},


dairsong:{
				trigger:{player:'phaseBegin'},
priority:999,
			
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==22;
				},
				content:function(){
player.addSkill('xzhanyuan');
player.update;
			},
	},

dairsonf:{
priority:999,
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==45;
				},
				content:function(){
player.addSkill('xxairson');
player.update;
			},
	},




dga:{
				trigger:{player:'phaseBegin'},
	group:['yingzi'],
		
priority:999,
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==13;
				},
				content:function(){
player.addSkill('timeflow');
player.update;
			},
	},


dgaf:{
				trigger:{player:'phaseBegin'},
priority:999,
			
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==18;
				},
				content:function(){
player.addSkill('xxyemog');
player.update;
			},
	},

dgag:{
priority:999,
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==66;
				},
				content:function(){
player.addSkill('minsi');
player.update;
			},
	},




dx:{
				trigger:{player:'phaseBegin'},
	group:['yingzi'],
		
priority:999,
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==4;
				},
				content:function(){
player.addSkill('dual');
player.update;
			},
	},


dxf:{
				trigger:{player:'phaseBegin'},
priority:999,
			
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==5;
				},
				content:function(){
player.addSkill('xwushuang');
player.update;
			},
	},

dxg:{
priority:999,
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.phaseNumber<=7&&player.hp==62;
				},
				content:function(){
player.addSkill('xinjianying');
player.update;
			},
	},












decadexushen:{
				derivation:'yingzi',
				audio:'xinfu_xushen',
				trigger:{player:'phaseZhunbeiBegin'},
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				filter:function(event,player){
					return player.phaseNumber<=7;
				},
				content:function(){
					player.awakenSkill('decadexushen');
					player.addSkill('yingzi');
                    player.gainMaxHp(3400);
					player.recover(33333);
				},
			},






		roars:{
				mod:{
					maxHandcard:function(player,num){
var x=2;
						if(player.hp>=1) return num=x;
					}
				},
			},

		airson:{
				mod:{
					maxHandcard:function(player,num){
var x=2;
						if(player.hp>=1) return num=x;
					}
				},
			},

		goldenage:{
				mod:{
					maxHandcard:function(player,num){
var x=2;
						if(player.hp>=1) return num=x;
					}
				},
			},

		x:{
				mod:{
					maxHandcard:function(player,num){
var x=2;
						if(player.hp>=1) return num=x;
					}
				},
			},


twfengpo:{
				audio:'fengpo',
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou')&&event.targets.length==1&&event.target.countCards('h')>0;
				},
				onremove:true,
				content:function(){
					'step 0'
					event.target=trigger.target;
					player.viewHandcards(trigger.target);
					'step 1'
					var num=target.countCards('h',player.storage.twfengpo?{color:'red'}:{suit:'diamond'});
					if(!num){
						event.finish();
						return;
					}
					event.num=num;
					player.chooseControl().set('choiceList',[
						'摸'+num+'张牌',
						'令'+get.translation(trigger.card)+'的伤害值基数+'+num,
					]);
					'step 2'
					if(result.index==0) player.draw(num);
					else trigger.getParent().baseDamage+=num;
				},
				subSkill:{
					kill:{
						trigger:{source:'die'},
						forced:true,
						filter:(event,player)=>!player.storage.twfengpo,
						skillAnimation:true,
						animationColor:'fire',
						content:function(){
							player.storage.twfengpo=true;
						},
					},
				},
			},


		xjintao:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
					targetInRange:function(card){
						if(card.name=='sha') return true;
					},
				},
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(event);
					return index==0||index==1;
				},
				content:function(){
					var evt=trigger.getParent('phaseUse');
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(trigger);
					if(index==0){
						game.log(trigger.card,'伤害+1');
						if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
						trigger.baseDamage++;
					}
					else{
						game.log(trigger.card,'不可被响应');
						trigger.directHit.addArray(game.players);
					}
				},
			},





	xapgl:{
			trigger:{player:'phaseZhunbeiBegin'},	
forced:true,
	filter:function(event,player){
					return player.phaseNumber==7;
				},
				skillAnimation:true,
				content:function(){
					if (player.phaseNumber==7){
					player.setAvatar('machao');
				player.node.avatar2.setBackground('machao','character');
				player.node.avatar.setBackground('machao','character');
			player.hp+=17571;
player.maxHp+=13401;
player.removeSkill('glyptica_fu');
player.removeSkill('qian');
				player.update();}
				}
			},

	xg:{
			trigger:{player:'phaseZhunbeiBegin'},	
forced:true,
	filter:function(event,player){
					return player.phaseNumber==7;
				},
				skillAnimation:true,
				content:function(){
					if (player.phaseNumber==7){
					player.setAvatar('machao');
				player.node.avatar2.setBackground('machao','character');
				player.node.avatar.setBackground('machao','character');
			player.hp+=20571;
player.maxHp+=19543;
player.removeSkill('glyptica_fu');
player.removeSkill('qian');
				player.update();}
				}
			},

	xx:{
			trigger:{player:'phaseZhunbeiBegin'},	
forced:true,
	filter:function(event,player){
					return player.phaseNumber==7;
				},
				skillAnimation:true,
				content:function(){
					if (player.phaseNumber==7){
					player.setAvatar('machao');
				player.node.avatar2.setBackground('machao','character');
				player.node.avatar.setBackground('machao','character');
			player.hp+=12647;
player.maxHp+=11647;
player.removeSkill('glyptica_fu');
player.removeSkill('qian');
				player.update();}
				}
			},






	qian:{
filter:function(event,player){
				if(player.phaseNumber>=8) return false;
				},
				
mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=='sha'||card.name=='juedou'||card.name=='nanman'||card.name=='wanjian') return false;
					}
				},
				audio:2,
			},

					



		xinjianying:{
				audio:'jianying',
				audioname:['xin_jushou'],
				subfrequent:['draw'],
				group:['xinjianying_draw'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					for(var i of lib.inpile){
						if(i!='du'&&get.type(i,false)=='basic'){
							if(event.filterCard({name:i},player,event)) return true;
							if(i=='sha'){
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:i,nature:j},player,event)) return true;
								}
							}
						}
					}
					return false;
				},
				onChooseToUse:function(event){
					if(event.type=='phase'&&!game.online){
						var last=event.player.getLastUsed();
						if(last&&last.getParent('phaseUse')==event.getParent()){
							var suit=get.suit(last.card,false);
							if(suit!='none') event.set('xinjianying_suit',suit);
						}
					}
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						var suit=event.xinjianying_suit||'',str=get.translation(suit);
						for(var i of lib.inpile){
							if(i!='du'&&get.type(i,false)=='basic'){
								if(event.filterCard({name:i},player,event)) list.push(['基本',str,i]);
								if(i=='sha'){
									for(var j of lib.inpile_nature){
										if(event.filterCard({name:i,nature:j},player,event)) list.push(['基本',str,i,j]);
									}
								}
							}
						}
						return ui.create.dialog('渐营',[list,'vcard']);
					},
					check:function(button){
						if(button.link[2]=='jiu') return 0;
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},
					backup:function(links,player){
						var next={
							audio:'jianying',
							audioname:['xin_jushou'],
							filterCard:true,
							popname:true,
							position:'he',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
							},
							ai1:function(card){
								return 7-_status.event.player.getUseValue(card,null,true);
							},
							precontent:function(){
								event.getParent().addCount=false;
								var evtx=event.getParent(2);
								if(player.hasHistory('useCard',function(evt){
									return evt.skill=='xinjianying_backup'&&evt.getParent(2)==evtx;
								})){
									alert('检测到您安装了十周年UI等具有出牌特效的扩展。该扩展会导致【渐营】出现无视次数限制发动的bug。为避免无限循环，即将重启游戏。请卸载相关扩展以解决此问题。');
									game.reload();
								}
							},
						};
						if(_status.event.xinjianying_suit) next.viewAs.suit=_status.event.xinjianying_suit;
						return next;
					},
					prompt:function(links){
						return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+(_status.event.xinjianying_suit?('('+get.translation(_status.event.xinjianying_suit)+')'):'')+'使用';
					},
				},
				ai:{
					order:function(item,player){
						if(_status.event.xinjianying_suit) return 16;
						return 3;
					},
					result:{player:1},
				},
				subSkill:{
					draw:{inherit:'jianying'},
				},
			},


xspchizhong:{
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					},
				},
				
				forced:true,
				
			},


		xyirangr:{
				audio:2,
	enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						  	return get.number(card)==7
	||get.number(card)==1
	||get.number(card)==3
	||get.number(card)==10;

					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>=1;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
										  		return get.number(card)==7
	||get.number(card)==1
	||get.number(card)==3
	||get.number(card)==10;
	
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('xyirang',target);
						target.gain(cards,player,'give');
						game.delay();
					}
				}
			},



xyiranga:{
				audio:2,
			enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						  	return get.number(card)==7
	||get.number(card)==5
	||get.number(card)==3;

					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>=1;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
										  		 	return get.number(card)==7
	||get.number(card)==5
	||get.number(card)==3;

	
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('xyirang',target);
						target.gain(cards,player,'give');
						game.delay();
					}
				}
			},



xyirangg:{
				audio:2,
				enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						  	return get.number(card)==7
	||get.number(card)==9
	||get.number(card)==11;

					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>=1;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
										  		 	return get.number(card)==7
	||get.number(card)==9
	||get.number(card)==11;

	
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('xyirang',target);
						target.gain(cards,player,'give');
						game.delay();
					}
				}
			},


xyirangx:{
				audio:2,
			enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						  	return get.number(card)==2
	||get.number(card)==3
||get.number(card)==1
	||get.number(card)==8;

					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>=1;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
										  		return get.number(card)==2
	||get.number(card)==3
||get.number(card)==1
	||get.number(card)==8;

	
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('xyirang',target);
						target.gain(cards,player,'give');
						game.delay();
					}
				}
			},






	tianxiang:{
				audio:2,
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h',{suit:'spade'})>2&&event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card,player){
							return get.suit(card)=='spade'&&lib.filter.cardDiscardable(card,player);
						},
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							return 10-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							var trigger=_status.event.getTrigger();
							var da=0;
							if(_status.event.player.hp==1){
								da=10;
							}
							if(trigger.num>1){
								if(target.maxHp>5&&target.hp>1) return -att/10+da;
								return -att+da;
							}
							var eff=get.damageEffect(target,trigger.source,target,trigger.nature);
							if(att==0) return 0.1+da;
							if(eff>=0&&trigger.num==1){
								return att+da;
							}
							if(target.hp==target.maxHp) return -att+da;
							if(target.hp==1){
								if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
									if(target.maxHp<=3){
										return -att+da;
									}
									return -att/2+da;
								}
								return da;
							}
							if(target.hp==target.maxHp-1){
								if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
								if(att>0) return 0.02+da;
								return 0.05+da;
							}
							return att/2+da;
						},
						prompt:get.prompt2('tianxiang')
					});
					"step 1"
					if(result.bool){
						player.logSkill(event.name,result.targets);
						trigger.player=result.targets[0];
						trigger.player.addSkill('tianxiang2');
						player.discard(result.cards[0]);
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(get.tag(card,'damage')&&target.countCards('h')>1) return 0.7;
						}
					},
					threaten:function(player,target){
						if(target.countCards('h')==0) return 2;
					}
				}
			},
			tianxiang2:{
				trigger:{player:['damageAfter','damageCancelled','damageZero']},
				forced:true,
				popup:false,
				audio:false,
				vanish:true,
				charlotte:true,
				content:function(){
					player.draw(4);
					player.removeSkill('tianxiang2');
					player.popup('tianxiang');
				}
			},


xzhanyuan:{
				unique:true,
				audio:2,
				derivation:'xweiwu',
				skillAnimation:true,
				animationColor:'soil',
				forced:true,
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					'step 0'
					player.chooseTarget('Grant a Friend Slum*Thrift？',function(card,player,target){
						return target!=player;
					}).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'fire');
						target.addSkill('xweiwu');
					}
				},
			},


xwushuang:{
				unique:true,
				audio:2,
				derivation:'wushuang',
				skillAnimation:true,
				animationColor:'soil',
				forced:true,
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					'step 0'
					player.chooseTarget('Grant a Friend Slum*Thrift？',function(card,player,target){
						return target!=player;
					}).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'fire');
						target.addSkill('wushuang');
					}
				},
			},




xxyemog:{
				unique:true,
				audio:2,
				derivation:'xyemog',
				skillAnimation:true,
				animationColor:'soil',
				forced:true,
				trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					'step 0'
					player.chooseTarget('Grant a Friend Slum*Thrift？',function(card,player,target){
						return target!=player;
					}).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'fire');
						target.addSkill('xyemog');
					}
				},
			},








xweiwu:{
				audio:2,
				enable:'phaseUse',
				viewAs:{name:'shunshou'},
				filterCard:{suit:'club'},
				position:'hes',
				
			},

xyemog:{
				audio:2,
				enable:'phaseUse',
				viewAs:{name:'wuzhong'},
				filterCard:{suit:'diamond'},
				position:'hes',
				
			},




xprotection:{
				unique:true,
           		enable:'phaseUse',
				filter:function(event,player){
					return player.hasSkill('roars')&&player.countCards('h',{suit:'spade'})>1;
				},
				check:function(card){
					return 8-get.value(card);
				},
				filterCard:function(card){
                    	return get.suit(card)=='spade';
			
				},
				selectCard:2,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:'limited'
				},
				line:'fire',
				content:function(){
					"step 0"
					 var x=Math.floor((player.maxHp-player.hp)/24);
                                                           	target.changeHujia(x);
                                                             player.damage(1000);
					},
				},


goldenturn:{
				unique:true,
           		enable:'phaseUse',
	group:['goldenturn_2','goldenturn_3'],
				filter:function(event,player){
					return player.countCards('h',{number:3})>1;
				},
				check:function(card){
					return 8-get.value(card);
				},
				filterCard:function(card){
                    	return get.number(card)==3;
			},
				selectCard:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:'limited'
				},
				line:'fire',
				content:function(){
					"step 0"
				             target.hp+=44;
    target.update();
                                                           
					},
				},




goldenturn_2:{
				unique:true,
           		enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{number:7})>1;
				},
				check:function(card){
					return 8-get.value(card);
				},
				filterCard:function(card){
                    	return get.number(card)==7;
			},
				selectCard:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:'limited'
				},
				line:'fire',
				content:function(){
					"step 0"
				                       target.hp+=21;
    target.update();
                                                           
					},
				},



goldenturn_3:{
				unique:true,
           		enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{number:11})>1;
				},
				check:function(card){
					return 8-get.value(card);
				},
				filterCard:function(card){
                    	return get.number(card)==11;
			},
				selectCard:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:'limited'
				},
				line:'fire',
				content:function(){
					"step 0"
				                 target.hp+=21;
    target.update();
                                                           
					},
				},



glyptic_guanri:{
				unique:true,
           		enable:'phaseUse',
				filter:function(event,player){
					return player.hasSkill('airson')&&player.countCards('h',{suit:'club'})>=2;
				},
				check:function(card){
					return 8-get.value(card);
				},
				filterCard:function(card){
                    	return get.suit(card)=='club';
			
				},
				selectCard:2,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:'limited'
				},
				line:'fire',
				content:function(){
					"step 0"
					var p=player.storage.glyptic3;
                                                            var t=target.storage.glyptic3;
                                                            var x=Math.floor(1000/p/p/t/t);
                                                           	target.recover(x);
					},
				},




	yinyi:{
				audio:2,
				trigger:{player:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					if(event.nature=='fire') return false;		},

				content:function(){
					trigger.cancel();
				},
				
			}, 


gwfutian:{
				trigger:{player:'damageBefore'},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					nothunder:true,
					nodamage:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')) return [0,0];
						}
					},
				},
				init:function(player){
					player.storage.gwfutian=0;
				},
				intro:{
					content:'弃置的牌总点数：#'
				},
				unique:true,
				onremove:true,
				group:'gwfutian_discard',
				subSkill:{
					discard:{
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&current.countCards('h');
							});
						},
						content:function(){
							'step 0'
							player.chooseTarget('覆天：弃置一名角色的一张手牌',function(card,player,target){
								return target!=player&&target.countCards('h');
							}).set('ai',function(target){
								if(target.hasSkillTag('noh')) return 0;
								return -get.attitude(player,target)/Math.sqrt(target.countCards('h'));
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.discardPlayerCard(target,'h',true);
								player.line(target,'green');
							}
							else{
								event.finish();
							}
							'step 2'
							if(result.bool&&result.cards&&result.cards.length){
								player.storage.gwfutian+=get.number(result.cards[0]);
								player.markSkill('gwfutian',true);
							}
							'step 3'
							if(player.storage.gwfutian>=24){
								player.$skill('覆天','legend','metal');
								player.removeSkill('gwfutian');
								player.addSkill('gwzhongmo');
								player.setAvatar('gw_kanbi','gw_hanmuduoer');
								player.maxHp+=4;
								player.hp=player.maxHp;
								player.update();
							}
						}
					}
				}
			},



glyptic_phys:{
mark:true,
trigger:{player:'useCardToPlayered'},
forced:true,
logTarget:'target',
filter:function(event,player){
return (event.card.name=='juedou');
},
onremove:true,
content:function(){
'step 0'
event.target=trigger.target;
'step 1'
if(player.hasSkill('roars')){
player.storage.glyptic2+=310;
player.storage.glyptic8+=0;
}

if(player.hasSkill('airson')){
player.storage.glyptic2+=451;
player.storage.glyptic8+=0;
}

if(player.hasSkill('goldenage')){
player.storage.glyptic2+=479;
player.storage.glyptic8+=0;
}

if(player.hasSkill('x')){
player.storage.glyptic2+=381;
player.storage.glyptic8+=0;
}

if(player.hasSkill('qingnang')){
player.storage.glyptic8+=1.7;
}

if(target.hasSkill('roars')){
target.storage.glyptic3+=0.07;
target.storage.glyptic9+=0;
}

if(target.hasSkill('airson')){
target.storage.glyptic3-=0.09;
target.storage.glyptic9+=0;
}

if(target.hasSkill('goldenage')){
target.storage.glyptic3-=0.03;
target.storage.glyptic9+=0;
}

if(target.hasSkill('x')){
target.storage.glyptic3+=0.02;
target.storage.glyptic9+=0;
}


'step 2'
 
var num2=player.storage.glyptic2;
var num3=target.storage.glyptic3;
var num8=player.storage.glyptic8;
var num9=target.storage.glyptic9;
event.num=Math.floor(num2*num3*num8*num9);

'step 3'


if(player.hasSkill('roars')&&target.hasSkill('goldenage')){
trigger.getParent().baseDamage+=3*num;}

if(player.hasSkill('goldenage')&&target.hasSkill('x')){
trigger.getParent().baseDamage+=3*num;}

if(player.hasSkill('x')&&target.hasSkill('airson')){
trigger.getParent().baseDamage+=3*num;}

if(player.hasSkill('airson')&&target.hasSkill('uncertainty')){
trigger.getParent().baseDamage+=3*num;}

if(player.hasSkill('roars')&&target.hasSkill('airson')){
trigger.getParent().baseDamage+=Math.floor(0.15*num); 
}

if(player.hasSkill('airson')&&target.hasSkill('goldenage')){
trigger.getParent().baseDamage+=Math.floor(0.15*num);
}

if(player.hasSkill('x')&&target.hasSkill('roars')){
trigger.getParent().baseDamage+=Math.floor(0.15*num);
}

else {
trigger.getParent().baseDamage+=num;}

'step 4'

if(player.hasSkill('roars')&&target.hasSkill('airson')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

if(player.hasSkill('airson')&&target.hasSkill('goldenage')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

if(player.hasSkill('x')&&target.hasSkill('roars')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

'step 5'

if(player.hasSkill('roars')){
player.storage.glyptic2-=310;
player.storage.glyptic8+=0;
}

if(player.hasSkill('airson')){
player.storage.glyptic2-=451;
player.storage.glyptic8+=0;
}

if(player.hasSkill('goldenage')){
player.storage.glyptic2-=479;
player.storage.glyptic8+=0;
}

if(player.hasSkill('x')){
player.storage.glyptic2-=381;
player.storage.glyptic8+=0;
}

if (player.hasSkill('qingnang')){
player.storage.glyptic8+=1.7;
}

if(target.hasSkill('roars')){
target.storage.glyptic3-=0.07;
target.storage.glyptic9+=0;
}

if(target.hasSkill('airson')){
target.storage.glyptic3+=0.09;
target.storage.glyptic9+=0;
}

if(target.hasSkill('goldenage')){
target.storage.glyptic3+=0.03;
target.storage.glyptic9+=0;
}

if(target.hasSkill('x')){
target.storage.glyptic3-=0.02;
target.storage.glyptic9+=0;
}


},


ai:{
threaten:function(player,target){
if(target.storage.jijia<=0) return 2;
return 1;
}
}
},





glyptic_ele:{
mark:true,
trigger:{player:'useCardToPlayered'},
forced:true,
logTarget:'target',
filter:function(event,player){
return (event.card.name=='xelema');
},
onremove:true,
content:function(){
'step 0'
event.target=trigger.target;
'step 1'
if(player.hasSkill('roars')){
player.storage.glyptic2+=310;
player.storage.glyptic8+=0;
}

if(player.hasSkill('airson')){
player.storage.glyptic2+=451;
player.storage.glyptic8+=0;
}

if(player.hasSkill('goldenage')){
player.storage.glyptic2+=479;
player.storage.glyptic8+=0;
}

if(player.hasSkill('x')){
player.storage.glyptic2+=381;
player.storage.glyptic8+=0;
}

if(player.hasSkill('qingnang')){
player.storage.glyptic8+=1.7;
}



'step 2'
 
var num2=player.storage.glyptic2;
var num3=target.storage.glyptic3;
var num8=player.storage.glyptic8;
var num9=target.storage.glyptic9;
event.num=Math.floor(num2*num3*num8*num9);

'step 3'


if(player.hasSkill('roars')&&target.hasSkill('goldenage')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('goldenage')&&target.hasSkill('x')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('x')&&target.hasSkill('airson')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('airson')&&target.hasSkill('uncertainty')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('roars')&&target.hasSkill('airson')){
trigger.getParent().baseDamage+=Math.floor(0.15*num); 
}

if(player.hasSkill('airson')&&target.hasSkill('goldenage')){
trigger.getParent().baseDamage+=Math.floor(0.15*num);
}

if(player.hasSkill('x')&&target.hasSkill('roars')){
trigger.getParent().baseDamage+=Math.floor(0.15*num);
}

else {
trigger.getParent().baseDamage+=num;}

'step 4'

if(player.hasSkill('roars')&&target.hasSkill('airson')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

if(player.hasSkill('airson')&&target.hasSkill('goldenage')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

if(player.hasSkill('x')&&target.hasSkill('roars')){
target.recover(Math.floor(1.5*num) );
player.update;
trigger.cancel();  
}

'step 5'

if(player.hasSkill('roars')){
player.storage.glyptic2-=310;
player.storage.glyptic8+=0;
}

if(player.hasSkill('airson')){
player.storage.glyptic2-=451;
player.storage.glyptic8+=0;
}

if(player.hasSkill('goldenage')){
player.storage.glyptic2-=479;
player.storage.glyptic8+=0;
}

if(player.hasSkill('x')){
player.storage.glyptic2-=381;
player.storage.glyptic8+=0;
}

if (player.hasSkill('qingnang')){
player.storage.glyptic8+=1.7;
}

if(target.hasSkill('roars')){
target.storage.glyptic3-=0.07;
target.storage.glyptic9+=0;
}

if(target.hasSkill('airson')){
target.storage.glyptic3+=0.09;
target.storage.glyptic9+=0;
}

if(target.hasSkill('goldenage')){
target.storage.glyptic3+=0.03;
target.storage.glyptic9+=0;
}

if(target.hasSkill('x')){
target.storage.glyptic3-=0.02;
target.storage.glyptic9+=0;
}


},


ai:{
threaten:function(player,target){
if(target.storage.jijia<=0) return 2;
return 1;
}
}
},




glyptic_skyw:{
mark:true,
trigger:{player:'useCardToPlayered'},
forced:true,
logTarget:'target',
filter:function(event,player){
return (event.card.name=='sha');
},
onremove:true,
content:function(){
'step 0'
event.target=trigger.target;
'step 1'
if(player.hasSkill('roars')){
player.storage.glyptic4+=334;
player.storage.glyptic10+=0;
 }

if(player.hasSkill('airson')){
player.storage.glyptic4+=270;
player.storage.glyptic10+=0;}

if(player.hasSkill('goldenage')){
player.storage.glyptic4+=249;
player.storage.glyptic10+=0; }

if(player.hasSkill('x')){
player.storage.glyptic4+=518;
player.storage.glyptic10+=0;}

if(target.hasSkill('roars')){
target.storage.glyptic5-=0.27;
target.storage.glyptic11+=0;
 }

if(target.hasSkill('airson')){
target.storage.glyptic5+=0.23;
target.storage.glyptic11+=0;}

if(target.hasSkill('goldenage')){
target.storage.glyptic5+=0.11;
target.storage.glyptic11+=0; }

if(target.hasSkill('x')){
target.storage.glyptic5-=0.07;
target.storage.glyptic11+=0;}


'step 2'
 
var num4=player.storage.glyptic4;
var num5=target.storage.glyptic5;
var num10=player.storage.glyptic10;
var num11=target.storage.glyptic11;
event.num=Math.floor(num4*num5*num10*num11);

'step 3'

if(player.hasSkill('roars')&&target.hasSkill('goldenage')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('goldenage')&&target.hasSkill('x')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('x')&&target.hasSkill('airson')){
trigger.getParent().baseDamage+=2*num;}

if(player.hasSkill('airson')&&target.hasSkill('uncertainty')){
trigger.getParent().baseDamage+=2*num;}

else{
trigger.getParent().baseDamage+=num;
}

'step 4'
if(player.hasSkill('roars')){
player.storage.glyptic4-=334;
player.storage.glyptic10+=0;
 }

if(player.hasSkill('airson')){
player.storage.glyptic4-=270;
player.storage.glyptic10+=0;}

if(player.hasSkill('goldenage')){
player.storage.glyptic4-=249;
player.storage.glyptic10+=0; }

if(player.hasSkill('x')){
player.storage.glyptic4-=518;
player.storage.glyptic10+=0;}

if(target.hasSkill('roars')){
target.storage.glyptic5+=0.27;
target.storage.glyptic11+=0;
 }

if(target.hasSkill('airson')){
target.storage.glyptic5-=0.23;
target.storage.glyptic11+=0;}

if(target.hasSkill('goldenage')){
target.storage.glyptic5-=0.11;
target.storage.glyptic11+=0; }

if(target.hasSkill('x')){
target.storage.glyptic5+=0.07;
target.storage.glyptic11+=0;}
},


ai:{
threaten:function(player,target){
if(target.storage.jijia<=0) return 2;
return 1;
}
}
},






vjijia:{
				mark:true,
				unique:true,
				init:function(player){
					player.storage.vjijia=7;
					player.storage.vjijia2=0;
				},
				intro:{
					content:'机甲体力值：#'
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.storage.vjijia>0){
							return num+player.storage.vjijia;
						}
					}
				},
				trigger:{player:'damageBefore'},
				forced:true,
				popup:false,
				content:function(player){      
'step 0'
   trigger.cancel();  
'step 1'
                
                  var x=trigger.num-player.storage.vjijia;
                   if(x<=0){
                 player.hp+=1;
	              player.update();}
                 if(x>0){player.hp+=x;
	                player.update();
                   }	
                  
			},
				
			},



	zhongdun:{
				unique:true,
				// alter:true,
				init2:function(player){
					if(!player.storage.zhongdun){
						player.changeHujia(get.is.altered('zhongdun')?6:8);
						player.storage.zhongdun=true;
					}
				},
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hujia>0;
				},
				filterCard:true,
				position:'he',
				content:function(){
					player.changeHujia(-1);
					target.changeHujia();
				},
				
			},




		shehun:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('he')>0;
				},
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				complexCard:true,
				selectCard:[1,4],
				check:function(card){
					return 7-get.value(card)
				},
				content:function(){
					"step 0"
					var suits=[];
					event.suits=suits;
					for(var i=0;i<cards.length;i++){
						suits.push(get.suit(cards[i]));
					}
					var hs=target.getCards('he');
					var hss={
						club:[],
						diamond:[],
						spade:[],
						heart:[]
					}
					var choice=[];
					for(var i=0;i<hs.length;i++){
						var suity=get.suit(hs[i]);
						if(hss[suity]){
							hss[suity].push(hs[i]);
						}
					}
					for(var i in hss){
						if(!suits.contains(i)){
							choice=choice.concat(hss[i]);
							delete hss[i];
						}
					}
					if(choice.length<cards.length){
						choice.length=0;
					}
					target.chooseToDiscard(cards.length,true,'he').ai=function(card){
						var num=choice.contains(card)?20:0;
						return num-get.value(card);
					}
					"step 1"
					var damage=false;
					for(var i=0;i<result.cards.length;i++){
						if(event.suits.contains(get.suit(result.cards[i]))){
							damage=true;break;
						}
					}
					if(damage){
						target.damage();
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var eff=get.damageEffect(target,player);
							var num=target.countCards('he');
							var length=ui.selected.cards.length;
							if(num==length) return -2+eff;
							if(num>length) return -1.5+eff;
							return -1+eff;
						}
					},
					expose:0.2
				}
			},









glyptic_roars:{
forced:true,

 trigger:{player:'phaseBegin'},

content:function(){

if(player.hasSkill('roars')&&player.phaseNumber==1){
player.storage.glyptic+=1;

					}

if(player.hasSkill('airson')&&player.phaseNumber==1){
player.storage.glyptic+=7;

					}

if(player.hasSkill('goldenage')&&player.phaseNumber==1){
player.storage.glyptic+=11;

					}

if(player.hasSkill('x')&&player.phaseNumber==1){
player.storage.glyptic+=2;

					}

				},
	},



glyptic:{
				mark:true,
group:['glyptic_phys','glyptic_metal','glyptic_water','glyptic_flora','glyptic_skyearth','glyptic_skyw','glyptic_roars','glyptic_ele','glyptic_j','glyptic_m'],
			init:function(player){
					player.storage.glyptic=0;
player.storage.glyptic2=1;
player.storage.glyptic3=1;
player.storage.glyptic4=1;
player.storage.glyptic5=1;
player.storage.glyptic6=1;
player.storage.glyptic7=1;
player.storage.glyptic8=1;
player.storage.glyptic9=1;
player.storage.glyptic10=1;
player.storage.glyptic11=1;
player.storage.glyptic12=1;
player.storage.glyptic13=1;
player.storage.glyptic14=1;
player.storage.glyptic15=1;
player.storage.glyptic16=1;
player.storage.glyptic17=1;
player.storage.glyptic18=1;
player.storage.glyptic19=7;
player.storage.glyptic20=6;

 				},
			intro:{
					content:'Current Mode：#'
				},
			
				popup:false,
				content:function(player){  

                   if(player.storage.glyptic19<=0){
                 player.removeSkill('glyptica_fu');

} 

               
},

},





glyptica_fu:{

		trigger:{player:'damageBefore'},
				forced:true,
filter:function(event,player){
					return player.phaseNumber<=7;
				},

				audio:2,

content:function(player){      
'step 0'
   trigger.cancel();  
'step 1'
 var x=trigger.num/100-player.storage.glyptic;

 if(x<=0){
player.hp+=1;
player.update();} 

if(x>0){player.hp+=Math.floor(x);
player.update();
}
'step 2'
player.storage.glyptic19-=1; 
'step3'
if(player.storage.glyptic19<=0){player.removeSkill('glyptica_fu');
player.update();
}

            
},


},

enemy1234:{
			forced:true,
            trigger:{player:'phaseBegin'},
				content:function(){
					"step 0"
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					event.targets2=event.targets.slice(0);
					player.line(event.targets,'green');
					"step 1"
					if(event.targets.length&&game.roundNumber%4==1){
						event.targets.shift().damage(700,'fire');
						event.redo();
					}
if(event.targets.length&&game.roundNumber%4==2){
						event.targets.shift().damage(1000,'fire');
						event.redo();
					}
if(event.targets.length&&game.roundNumber%4==3){
						event.targets.shift().damage(300,'fire');
						event.redo();
					}
if(event.targets.length&&game.roundNumber%4==0){
						event.targets.shift().damage(400,'fire');
						event.redo();
					}
					
				},
				
			},





			glyptic_metal:{
				enable:'phaseUse',
		

filter:function(event,player){
					return player.countCards('h',{suit:'spade'})>0;
				},

filterCard:function(card){
                    	return get.suit(card)=='spade';
			
				},
				filterTarget:function(card,player,target){
				 return target.storage.glyptic20>=0;
				},
			
				position:'he',
				content:function(target){

'step 0'
							if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=76;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=6;
target.storage.glyptic5-=0.073;

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=6;
target.storage.glyptic5-=0.073;
target.update(); break;

						case target.storage.glyptic=10:
target.storage.glyptic-=9;
target.storage.glyptic5-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
target.storage.glyptic5-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=2;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic+=15;
target.storage.glyptic5-=0.073;
target.update(); break;

						case target.storage.glyptic=20:
target.storage.glyptic-=13;
target.storage.glyptic5-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=11;
target.storage.glyptic5-=0.073;

target.update(); break;
						case target.storage.glyptic=0:
target.storage.glyptic+=7;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=2;
target.storage.glyptic5-=0.073;
target.update(); break;

						case target.storage.glyptic=9:
target.storage.glyptic+=2;
target.storage.glyptic5-=0.073;
target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=1;
target.storage.glyptic5-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic-=2;
target.storage.glyptic5-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=7;
target.storage.glyptic5-=0.073;
target.update(); break;

						case target.storage.glyptic=8:
target.storage.glyptic-=6;
target.storage.glyptic5-=0.073;
target.update(); break;
}
} 
'step 1'
target.storage.glyptic20-=1;
target.update();			

	},
				},


			glyptic_water:{
				enable:'phaseUse',
		
		filter:function(event,player){
					return player.countCards('h',{suit:'club'})>0;
				},
filterCard:function(card){
                    	return get.suit(card)=='club';
			
				},
				filterTarget:function(card,player,target){
			 return target.storage.glyptic20>=0;
				},
				position:'he',
				content:function(target){



	if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=76;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=6;
target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=6;
target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=10:
target.storage.glyptic-=9;
target.storage.glyptic3-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=2;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic+=15;
target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=20:
target.storage.glyptic-=13;
target.storage.glyptic3-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=11;
target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=0:
target.storage.glyptic+=7;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=2;
target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=9:
target.storage.glyptic+=2;
target.storage.glyptic3-=0.073;
target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=1;
target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic-=2;
target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=7;
target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=8:
target.storage.glyptic-=6;
target.storage.glyptic3-=0.073;
target.update(); break;



}
} 	
'step 1'
target.storage.glyptic20-=1;
target.update();				},
				},



			glyptic_flora:{
				enable:'phaseUse',
		filter:function(event,player){
					return player.countCards('h',{suit:'diamond'})>0;
				},
filterCard:function(card){
                    	return get.suit(card)=='diamond';
			
				},
				filterTarget:function(card,player,target){
 return target.storage.glyptic20>=0;
				},
				position:'he',
				content:function(target){


				if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=76;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=9;
target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=10:
target.storage.glyptic-=7;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=4;
target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=7:
target.storage.glyptic-=6;
target.storage.glyptic2+=37;
target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=13;
target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=20:
target.storage.glyptic-=15;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic-=2;
target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=3:
target.storage.glyptic+=4;
target.storage.glyptic2+=37;
target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=2;
target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=9:
target.storage.glyptic-=2;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=7;
target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=0:
target.storage.glyptic+=11;
target.storage.glyptic2+=37;
target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=6;
target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=8:
target.storage.glyptic-=7;
target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=2;
target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=3:
target.storage.glyptic-=1;
target.storage.glyptic2+=37;
target.update(); break;

	}
} 		
'step 1'
target.storage.glyptic20-=1;
target.update();	
		},
				},



			glyptic_skyearth:{
				enable:'phaseUse',

		filter:function(event,player){
					return player.countCards('h',{suit:'heart'})>0;
				},
filterCard:function(card){
                    	return get.suit(card)=='heart';
			
				},
				filterTarget:function(card,player,target){
			 return target.storage.glyptic20>=0;
				},
			
				position:'he',
				content:function(target){

	if(target.hasSkill('roars')){

switch(target.storage.glyptic){
case target.storage.glyptic=77:
target.storage.glyptic-=76;
target.storage.glyptic4+=37;
target.update();

break;
case target.storage.glyptic=1:
target.storage.glyptic+=9;
target.storage.glyptic4+=37;
target.update();



break;
						case target.storage.glyptic=10:
target.storage.glyptic-=7;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=3:
target.storage.glyptic+=4;
target.storage.glyptic4+=37;
target.update();
break;


						case target.storage.glyptic=7:
target.storage.glyptic-=6;
target.storage.glyptic4+=37;
target.update();
break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
target.storage.glyptic4+=37;
target.update();
 break;
						case target.storage.glyptic=7:
target.storage.glyptic+=13;
target.storage.glyptic4+=37;
target.update();

break;
						case target.storage.glyptic=20:
target.storage.glyptic-=15;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=5:
target.storage.glyptic-=2;
target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=3:
target.storage.glyptic+=4;
target.storage.glyptic4+=37;
target.update();
break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=11:
target.storage.glyptic-=2;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=9:
target.storage.glyptic-=2;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=7:
target.storage.glyptic-=7;
target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=0:
target.storage.glyptic+=11;
target.storage.glyptic4+=37;
target.update();
break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=2:
target.storage.glyptic+=6;
target.storage.glyptic4+=37;
target.update();

break;
						case target.storage.glyptic=8:
target.storage.glyptic-=7;
target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=1:
target.storage.glyptic+=2;
target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=3:
target.storage.glyptic-=1;
target.storage.glyptic4+=37;
target.update();
break;	}
} 			
'step 1'
target.storage.glyptic20-=1;
target.update();		},
				},







			glyptic_heart:{
				mark:true,
				intro:{
					content:'boosts shadows Overpower'
				},
			global:'useCard1',
				forced:true,
                priority:88,
				content:function(){
'step 0'
					if(player.hasSkill('roars')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=76;
player.storage.glyptic4+=37;


break;
						case player.storage.glyptic=1:
player.storage.glyptic+=9;
player.storage.glyptic4+=37;

break;
						case player.storage.glyptic=10:
player.storage.glyptic-=7;
player.storage.glyptic4+=37;
break;
						case player.storage.glyptic=3:
player.storage.glyptic+=4;
player.storage.glyptic4+=37;
break;

						case player.storage.glyptic=7:
player.storage.glyptic-=6;
player.storage.glyptic4+=37;
break;	}
}


	if(player.hasSkill('airson')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=70;
player.storage.glyptic4+=37;
player.update();
 break;
						case player.storage.glyptic=7:
player.storage.glyptic+=13;
player.storage.glyptic4+=37;
player.update();

break;
						case player.storage.glyptic=20:
player.storage.glyptic-=15;
player.storage.glyptic4+=37;
player.update();
break;
						case player.storage.glyptic=5:
player.storage.glyptic-=2;
player.storage.glyptic4+=37;
player.update();
break;

						case player.storage.glyptic=3:
player.storage.glyptic+=4;
player.storage.glyptic4+=37;

break;	}
}


	if(player.hasSkill('goldenage')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=66;
player.storage.glyptic4+=37;
break;
						case player.storage.glyptic=11:
player.storage.glyptic-=2;
player.storage.glyptic4+=37;

break;
						case player.storage.glyptic=9:
player.storage.glyptic-=2;
player.storage.glyptic4+=37;
break;
						case player.storage.glyptic=7:
player.storage.glyptic-=7;
player.storage.glyptic4+=37;
break;

						case player.storage.glyptic=0:
player.storage.glyptic+=11;
player.storage.glyptic4+=37;
break;	}
}

					if(player.hasSkill('x')){
switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=75;
player.storage.glyptic4+=37;
break;
						case player.storage.glyptic=2:
player.storage.glyptic+=6;
player.storage.glyptic4+=37;

break;
						case player.storage.glyptic=8:
player.storage.glyptic-=7;
player.storage.glyptic4+=37;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=2;
player.storage.glyptic4+=37;
break;

						case player.storage.glyptic=3:
player.storage.glyptic-=1;
player.storage.glyptic4+=37;
break;	}
}





'step 1'
                	player.removeSkill('glyptic_heart');

				}
			},




			glyptic_diamond:{
				mark:true,
				intro:{
					content:'boosts shadows SkyWar'
				},
					trigger:{player:'phaseBefore'},
				forced:true,
                priority:88,
				content:function(){
					if(player.hasSkill('roars')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=76;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=9;
player.storage.glyptic2+=37;

break;
						case player.storage.glyptic=10:
player.storage.glyptic-=7;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=3:
player.storage.glyptic+=4;
player.storage.glyptic2+=37;
break;

						case player.storage.glyptic=7:
player.storage.glyptic-=6;
player.storage.glyptic2+=37;
break;	}
}


	if(player.hasSkill('airson')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=70;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=7:
player.storage.glyptic+=13;
player.storage.glyptic2+=37;

break;
						case player.storage.glyptic=20:
player.storage.glyptic-=15;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=5:
player.storage.glyptic-=2;
player.storage.glyptic2+=37;
break;

						case player.storage.glyptic=3:
player.storage.glyptic+=4;
player.storage.glyptic2+=37;
break;	}
}


	if(player.hasSkill('goldenage')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=66;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=11:
player.storage.glyptic-=2;
player.storage.glyptic2+=37;

break;
						case player.storage.glyptic=9:
player.storage.glyptic-=2;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=7:
player.storage.glyptic-=7;
player.storage.glyptic2+=37;
break;

						case player.storage.glyptic=0:
player.storage.glyptic+=11;
player.storage.glyptic2+=37;
break;	}
}

					if(player.hasSkill('x')){
switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=75;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=2:
player.storage.glyptic+=6;
player.storage.glyptic2+=37;

break;
						case player.storage.glyptic=8:
player.storage.glyptic-=7;
player.storage.glyptic2+=37;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=2;
player.storage.glyptic2+=37;
break;

						case player.storage.glyptic=3:
player.storage.glyptic-=1;
player.storage.glyptic2+=37;
break;	}
}

player.removeSkill('glyptic_diamond');
				}
			},

			glyptic_spade:{
				mark:true,
                priority:6,
				intro:{
					content:'boosts shadows SoulStill'
				},
						trigger:{player:'phaseBefore'},
				forced:true,
                priority:88,
				content:function(){
				
							if(player.hasSkill('roars')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=76;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=6;
player.storage.glyptic5-=0.073;

break;
						case player.storage.glyptic=7:
player.storage.glyptic-=4;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=3:
player.storage.glyptic+=6;
player.storage.glyptic5-=0.073;
break;

						case player.storage.glyptic=10:
player.storage.glyptic-=9;
player.storage.glyptic5-=0.073;
break;	}
}


	if(player.hasSkill('airson')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=70;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=7:
player.storage.glyptic-=4;
player.storage.glyptic5-=0.073;

break;
						case player.storage.glyptic=3:
player.storage.glyptic+=2;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=5:
player.storage.glyptic+=15;
player.storage.glyptic5-=0.073;
break;

						case player.storage.glyptic=20:
player.storage.glyptic-=13;
player.storage.glyptic5-=0.073;
break;	}
}


	if(player.hasSkill('goldenage')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=66;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=11:
player.storage.glyptic-=11;
player.storage.glyptic5-=0.073;

break;
						case player.storage.glyptic=0:
player.storage.glyptic+=7;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=7:
player.storage.glyptic+=2;
player.storage.glyptic5-=0.073;
break;

						case player.storage.glyptic=9:
player.storage.glyptic+=2;
player.storage.glyptic5-=0.073;
break;	}
}

					if(player.hasSkill('x')){
switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=75;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=2:
player.storage.glyptic+=1;
player.storage.glyptic5-=0.073;

break;
						case player.storage.glyptic=3:
player.storage.glyptic-=2;
player.storage.glyptic5-=0.073;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=7;
player.storage.glyptic5-=0.073;
break;

						case player.storage.glyptic=8:
player.storage.glyptic-=6;
player.storage.glyptic5-=0.073;
break;	}
}

					player.removeSkill('glyptic_spade');
				},
				
			},
			glyptic_club:{
				mark:true,
				intro:{
					content:'boosts shadows SoulStill'
				},
				trigger:{player:'phaseBefore'},
				forced:true,
                priority:88,
				content:function(){
			
								
							if(player.hasSkill('roars')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=76;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=6;
player.storage.glyptic3-=0.073;

break;
						case player.storage.glyptic=7:
player.storage.glyptic-=4;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=3:
player.storage.glyptic+=6;
player.storage.glyptic3-=0.073;
break;

						case player.storage.glyptic=10:
player.storage.glyptic-=9;
player.storage.glyptic3-=0.073;
break;	}
}


	if(player.hasSkill('airson')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=70;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=7:
player.storage.glyptic-=4;
player.storage.glyptic3-=0.073;

break;
						case player.storage.glyptic=3:
player.storage.glyptic+=2;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=5:
player.storage.glyptic+=15;
player.storage.glyptic3-=0.073;
break;

						case player.storage.glyptic=20:
player.storage.glyptic-=13;
player.storage.glyptic3-=0.073;
break;	}
}


	if(player.hasSkill('goldenage')){

switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=66;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=11:
player.storage.glyptic-=11;
player.storage.glyptic3-=0.073;

break;
						case player.storage.glyptic=0:
player.storage.glyptic+=7;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=7:
player.storage.glyptic+=2;
player.storage.glyptic3-=0.073;
break;

						case player.storage.glyptic=9:
player.storage.glyptic+=2;
player.storage.glyptic3-=0.073;
break;	}
}

					if(player.hasSkill('x')){
switch(player.storage.glyptic){
						case player.storage.glyptic=77:
player.storage.glyptic-=75;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=2:
player.storage.glyptic+=1;
player.storage.glyptic3-=0.073;

break;
						case player.storage.glyptic=3:
player.storage.glyptic-=2;
player.storage.glyptic3-=0.073;
break;
						case player.storage.glyptic=1:
player.storage.glyptic+=7;
player.storage.glyptic3-=0.073;
break;

						case player.storage.glyptic=8:
player.storage.glyptic-=6;
player.storage.glyptic3-=0.073;
break;	}
}
					player.removeSkill('glyptic_club');
				}
			},



xhuanxia:{
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='spade'
				},
				position:'he',
				viewAs:{name:'juedou'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{suit:'spade'})) return false;
				},
				prompt:'将一张红色牌当杀使用',
				check:function(card){return 5-get.value(card)},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(arg!='use') return false;
						if(!player.countCards('he',{suit:'spade'})) return false;
					},
				},
				group:['huanxia_expire','huanxia_draw','huanxia_gain'],
				subSkill:{
					expire:{
						trigger:{source:'damageAfter'},
						forced:true,
						popup:false,
						filter:function(event){
							return event.parent.skill=='huanxia';
						},
						content:function(){
							player.storage.huanxia=true;
						}
					},
					draw:{
						trigger:{player:'shaAfter'},
						forced:true,
						popup:false,
						content:function(){
							if(trigger.parent.skill=='huanxia'){
								var card=trigger.cards[0];
								if(get.itemtype(card)=='card'&&get.position(card)=='d'&&!player.storage.huanxia){
									ui.special.appendChild(card);
									if(!player.storage.huanxia_draw){
										player.storage.huanxia_draw=[];
									}
									player.storage.huanxia_draw.push(card);
								}
							}
							delete player.storage.huanxia;
						}
					},
					gain:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.storage.huanxia_draw;
						},
						content:function(){
							player.gain(player.storage.huanxia_draw,'gain2');
							delete player.storage.huanxia_draw;
						}
					}
				}
			},

dar:{
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='club'
				},
				position:'he',
				viewAs:{name:'juedou'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{suit:'club'})) return false;
				},
				prompt:'将一张红色牌当杀使用',
				check:function(card){return 5-get.value(card)},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(arg!='use') return false;
						if(!player.countCards('he',{suit:'club'})) return false;
					},
				},
				group:['huanxia_expire','huanxia_draw','huanxia_gain'],
				subSkill:{
					expire:{
						trigger:{source:'damageAfter'},
						forced:true,
						popup:false,
						filter:function(event){
							return event.parent.skill=='huanxia';
						},
						content:function(){
							player.storage.huanxia=true;
						}
					},
					draw:{
						trigger:{player:'shaAfter'},
						forced:true,
						popup:false,
						content:function(){
							if(trigger.parent.skill=='huanxia'){
								var card=trigger.cards[0];
								if(get.itemtype(card)=='card'&&get.position(card)=='d'&&!player.storage.huanxia){
									ui.special.appendChild(card);
									if(!player.storage.huanxia_draw){
										player.storage.huanxia_draw=[];
									}
									player.storage.huanxia_draw.push(card);
								}
							}
							delete player.storage.huanxia;
						}
					},
					gain:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.storage.huanxia_draw;
						},
						content:function(){
							player.gain(player.storage.huanxia_draw,'gain2');
							delete player.storage.huanxia_draw;
						}
					}
				}
			},


dual:{
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='heart'
				},
				position:'he',
				viewAs:{name:'juedou'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{suit:'heart'})) return false;
				},
				prompt:'将一张红色牌当杀使用',
				check:function(card){return 5-get.value(card)},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(arg!='use') return false;
						if(!player.countCards('he',{suit:'heart'})) return false;
					},
				},
				group:['huanxia_expire','huanxia_draw','huanxia_gain'],
				subSkill:{
					expire:{
						trigger:{source:'damageAfter'},
						forced:true,
						popup:false,
						filter:function(event){
							return event.parent.skill=='huanxia';
						},
						content:function(){
							player.storage.huanxia=true;
						}
					},
					draw:{
						trigger:{player:'shaAfter'},
						forced:true,
						popup:false,
						content:function(){
							if(trigger.parent.skill=='huanxia'){
								var card=trigger.cards[0];
								if(get.itemtype(card)=='card'&&get.position(card)=='d'&&!player.storage.huanxia){
									ui.special.appendChild(card);
									if(!player.storage.huanxia_draw){
										player.storage.huanxia_draw=[];
									}
									player.storage.huanxia_draw.push(card);
								}
							}
							delete player.storage.huanxia;
						}
					},
					gain:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.storage.huanxia_draw;
						},
						content:function(){
							player.gain(player.storage.huanxia_draw,'gain2');
							delete player.storage.huanxia_draw;
						}
					}
				}
			},


timeflow:{
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='diamond'
				},
				position:'he',
				viewAs:{name:'juedou'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{suit:'diamond'})) return false;
				},
				prompt:'将一张红色牌当杀使用',
				check:function(card){return 5-get.value(card)},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(arg!='use') return false;
						if(!player.countCards('he',{suit:'diamond'})) return false;
					},
				},
				group:['huanxia_expire','huanxia_draw','huanxia_gain'],
				subSkill:{
					expire:{
						trigger:{source:'damageAfter'},
						forced:true,
						popup:false,
						filter:function(event){
							return event.parent.skill=='huanxia';
						},
						content:function(){
							player.storage.huanxia=true;
						}
					},
					draw:{
						trigger:{player:'shaAfter'},
						forced:true,
						popup:false,
						content:function(){
							if(trigger.parent.skill=='huanxia'){
								var card=trigger.cards[0];
								if(get.itemtype(card)=='card'&&get.position(card)=='d'&&!player.storage.huanxia){
									ui.special.appendChild(card);
									if(!player.storage.huanxia_draw){
										player.storage.huanxia_draw=[];
									}
									player.storage.huanxia_draw.push(card);
								}
							}
							delete player.storage.huanxia;
						}
					},
					gain:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.storage.huanxia_draw;
						},
						content:function(){
							player.gain(player.storage.huanxia_draw,'gain2');
							delete player.storage.huanxia_draw;
						}
					}
				}
			},



			xxxxxxroars:{
					enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				position:'he',
				viewAs:{name:'juedou'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{color:'red'})) return false;
				},
				prompt:'将一张红色牌当杀使用',
				check:function(card){return 5-get.value(card)},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(arg!='use') return false;
						if(!player.countCards('he',{color:'red'})) return false;
					},
				},
				group:['huanxia_expire','huanxia_draw','huanxia_gain'],
				subSkill:{
					expire:{
						trigger:{source:'damageAfter'},
						forced:true,
						popup:false,
						filter:function(event){
							return event.parent.skill=='huanxia';
						},
						content:function(){
							player.storage.huanxia=true;
						}
					},
					draw:{
						trigger:{player:'shaAfter'},
						forced:true,
						popup:false,
						content:function(){
							if(trigger.parent.skill=='huanxia'){
								var card=trigger.cards[0];
								if(get.itemtype(card)=='card'&&get.position(card)=='d'&&!player.storage.huanxia){
									ui.special.appendChild(card);
									if(!player.storage.huanxia_draw){
										player.storage.huanxia_draw=[];
									}
									player.storage.huanxia_draw.push(card);
								}
							}
							delete player.storage.huanxia;
						}
					},
					gain:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.storage.huanxia_draw;
						},
						content:function(){
							player.gain(player.storage.huanxia_draw,'gain2');
							delete player.storage.huanxia_draw;
						}
					}
				}
			},
			
			



				

			rewangzun:{
				trigger:{global:'phaseZhunbeiBegin'},
				forced:true,
				audio:'wangzun',
				filter:function(event,player){
					return event.player.hp>player.hp;
				},
				logTarget:'player',
				content:function(){
					player.draw();
					var zhu=false;
					var target=trigger.player;
					switch(get.mode()){
						case 'identity':{
							zhu=target.isZhu;
							break;
						}
						case 'guozhan':{
							zhu=get.is.jun(target);
							break;
						}
						case 'versus':{
							zhu=target.identity=='zhu';
							break;
						}
						case 'doudizhu':{
							zhu=target==game.zhu;
							break;
						}
					}
					if(zhu){
						player.draw();
						target.addTempSkill('rewangzun2');
						target.addMark('rewangzun2',1,false);
					}
				},
			},
			rewangzun2:{
				onremove:true,
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark('rewangzun2');
					},
				},
				intro:{content:'手牌上限-#'},
			},
			xxroars:{
				trigger:{global:'useCardToTarget'},
				logTarget:'target',
				audio:'tongji',
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.player!=player&&!event.targets.contains(player)&&
					event.target.inRange(player)&&event.target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					trigger.target.chooseCard('he','是否对'+get.translation(player)+'发动【同疾】？','弃置一张牌，将'+get.translation(trigger.card)+'转移给'+get.translation(player)).set('ai',function(card){
						if(!_status.event.check) return -1;
						return get.unuseful(card)+9;
					}).set('check',function(){
						if(trigger.target.countCards('h','shan')){
							return -get.attitude(trigger.target,player);
						}
						if(get.attitude(trigger.target,player)<5){
							return 6-get.attitude(trigger.target,player);
						}
						if(trigger.target.hp==1&&player.countCards('h','shan')==0){
							return 10-get.attitude(trigger.target,player);
						}
						if(trigger.target.hp==2&&player.countCards('h','shan')==0){
							return 8-get.attitude(trigger.target,player);
						}
						return -1;
					}()>0);
					'step 1'
					if(result.bool){	
						player.logSkill('retongji',trigger.target);
						trigger.target.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(trigger.target);
						evt.targets.remove(trigger.target);
						evt.targets.push(player);
					}
				},
			},
			hujia:{
				audio:2,
				audioname:['re_caocao'],
				unique:true,
				zhuSkill:true,
				trigger:{player:['chooseToRespondBefore','chooseToUseBefore']},
				filter:function(event,player){
					if(event.responded) return false;
					if(player.storage.hujiaing) return false;
					if(!player.hasZhuSkill('hujia')) return false;
					if(!event.filterCard({name:'shan'},player,event)) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='wei';
					});
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.finish();
					}
					else if(event.current.group=='wei'){
						if((event.current==game.me&&!_status.auto)||(
							get.attitude(event.current,player)>2)||
							event.current.isOnline()){
							player.storage.hujiaing=true;
							var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张闪？',{name:'shan'});
							next.set('ai',function(){
								var event=_status.event;
								return (get.attitude(event.player,event.source)-2);
							});
							next.set('skillwarn','替'+get.translation(player)+'打出一张闪');
							next.autochoose=lib.filter.autoRespondShan;
							next.set('source',player);
						}
					}
					"step 1"
					player.storage.hujiaing=false;
					if(result.bool){
						event.finish();
						trigger.result={bool:true,card:{name:'shan',isCard:true}};
						trigger.responded=true;
						trigger.animate=false;
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(0);
					}
				},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(player.storage.hujiaing) return false;
						if(!player.hasZhuSkill('hujia')) return false;
						return game.hasPlayer(function(current){
							return current!=player&&current.group=='wei';
						});
					},
				},
			},
			xxairson:{
				audio:2,
				preHidden:true,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o';
				},
				content:function(){
					player.gain(trigger.cards,'gain2');
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')) return [1,0.55];
						}
					}
				}
			},
			xxgoldenage:{
				audio:2,
				trigger:{player:'damageEnd'},
				logTarget:'source',
				preHidden:true,
				filter:function(event,player){
					return (event.source&&event.source.countGainableCards(player,'he')&&event.num>0&&event.source!=player);
				},
				content:function(){
					player.gainPlayerCard(true,trigger.source,'he');
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.countCards('he')>1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
								if(get.attitude(target,player)<0) return [1,1];
							}
						}
					}
				}
			},
			xxx:{
				audio:2,
				trigger:{global:'judge'},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					return player.countCards(get.mode()=='guozhan'?'hes':'hs')>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('guicai'),get.mode()=='guozhan'?'hes':'hs',function(card){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					}).set('judging',trigger.player.judging[0]).setHiddenSkill('guicai');
					"step 1"
					if(result.bool){
						player.respond(result.cards,'guicai','highlight','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			ganglie:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return (event.source!=undefined);
				},
				check:function(event,player){
					return (get.attitude(player,event.source)<=0);
				},
				logTarget:'source',
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.suit(card)=='heart') return -2;
						return 2;
					}).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.judge<2){
						event.finish();return;
					}
					trigger.source.chooseToDiscard(2).set('ai',function(card){
						if(card.name=='tao') return -10;
						if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
						return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					});
					"step 2"
					if(result.bool==false){
						trigger.source.damage();
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			ganglie_three:{
				audio:'ganglie',
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('ganglie_three'),function(card,player,target){
						return target.isEnemyOf(player);
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target)/(1+target.countCards('h'));
					});
					"step 1"
					if(result.bool){
						event.target=result.targets[0];
						player.logSkill('ganglie_three',target);
					}
					else event.finish();
					"step 2"
					player.judge(function(card){
						if(get.suit(card)=='heart') return -2;
						return 2;
					}).judge2=function(result){
						return result.bool;
					};
					"step 3"
					if(result.judge<2){
						event.finish();return;
					}
					target.chooseToDiscard(2).set('ai',function(card){
						if(card.name=='tao') return -10;
						if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
						return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					});
					"step 4"
					if(result.bool==false){
						target.damage();
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			tuxi:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				direct:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					var check;
					var i,num=game.countPlayer(function(current){
						return current!=player&&current.countCards('h')&&get.attitude(player,current)<=0;
					});
					check=(num>=2);
					player.chooseTarget(get.prompt('tuxi'),'获得其他一至两名角色的各一张手牌',[1,2],function(card,player,target){
						return target.countCards('h')>0&&player!=target;
					},function(target){
						if(!_status.event.aicheck) return 0;
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					}).set('aicheck',check);
					"step 1"
					if(result.bool){
						player.logSkill('tuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.changeToZero();
					}
					else{
						event.finish();
					}
					"step 2"
					game.delay();
				},
				ai:{
					threaten:2,
					expose:0.3
				}
			},
			luoyi:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				check:function(event,player){
					if(player.countCards('h')<3) return false;
					if(!player.hasSha()) return false;
					return game.hasPlayer(function(current){
						return get.attitude(player,current)<0&&player.canUse('sha',current);
					});
				},
				preHidden:true,
				filter:function(event,player){
					return !event.numFixed&&event.num>0;
				},
				content:function(){
					player.addTempSkill('luoyi2','phaseJieshuBegin');
					trigger.num--;
				}
			},
			luoyi2:{
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					damageBonus:true
				}
			},
			tiandu:{
				audio:2,
				audioname:['re_guojia','xizhicai','gz_nagisa'],
				trigger:{player:'judgeEnd'},
				preHidden:true,
				frequent:function(event){
					if(event.result.card.name=='du') return false;
					//if(get.mode()=='guozhan') return false;
					return true;
				},
				check:function(event){
					if(event.result.card.name=='du') return false;
					return true;
				},
				filter:function(event,player){
					return get.position(event.result.card,true)=='o';
				},
				content:function(){
					player.gain(trigger.result.card,'gain2');
				}
			},
			yiji:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				filter:function(event){
					return (event.num>0)
				},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					event.count--;
					event.cards=get.cards(2);
					"step 2"
					if(event.cards.length>1){
						player.chooseCardButton('将“遗计”牌分配给任意角色',true,event.cards,[1,event.cards.length]).set('ai',function(button){
							if(ui.selected.buttons.length==0) return 1;
							return 0;
						});
					}
					else if(event.cards.length==1){
						event._result={links:event.cards.slice(0),bool:true};
					}
					else{
						event.goto(5);
					}
					"step 3"
					if(result.bool){
						for(var i=0;i<result.links.length;i++){
							event.cards.remove(result.links[i]);
						}
						event.togive=result.links.slice(0);
						player.chooseTarget('将'+get.translation(result.links)+'交给一名角色',true).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.enemy){
								return -att;
							}
							else if(att>0){
								return att/(1+target.countCards('h'));
							}
							else{
								return att/100;
							}
						}).set('enemy',get.value(event.togive[0],player,'raw')<0);
					}
					"step 4"
					if(result.targets.length){
						result.targets[0].gain(event.togive,'draw');
						player.line(result.targets[0],'green');
						game.log(result.targets[0],'获得了'+get.cnNumber(event.togive.length)+'张牌');
						event.goto(2);
					}
					"step 5"
					if(event.count>0) player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
					else event.finish();
					"step 6"
					if(result.bool){
						player.logSkill(event.name);
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(target.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					}
				}
			},
			luoshen:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					var next=player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					});
					next.judge2=function(result){
						return result.bool;
					};
					if(get.mode()!='guozhan'&&!player.hasSkillTag('rejudge')) next.set('callback',function(){
						if(event.judgeResult.color=='black'&&get.position(card,true)=='o') player.gain(card,'gain2');
					});
					else next.set('callback',function(){
						if(event.judgeResult.color=='black') event.getParent().orderingCards.remove(card);
					});
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						player.chooseBool('是否再次发动【洛神】？').set('frequentSkill','luoshen');
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i],true)!='o'){
								event.cards.splice(i,1);i--;
							}
						}
						if(event.cards.length){
							player.gain(event.cards,'gain2');
						}
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,'gain2');
						}
					}
				}
			},
			xinluoshen:{
				audio:'luoshen',
				// alter:true,
				trigger:{player:'phaseZhunbeiBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					},ui.special).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains('luoshen')){
							player.chooseBool('是否再次发动【洛神】？');
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])!='s'){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards,'gain2');
						player.storage.xinluoshen=event.cards.slice(0);
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,'gain2');
							player.storage.xinluoshen=event.cards.slice(0);
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(get.is.altered('xinluoshen')&&player.storage.xinluoshen&&player.storage.xinluoshen.contains(card)){
							return true;
						}
					}
				},
				group:'xinluoshen_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.xinluoshen;
						}
					}
				}
			},
			qingguo:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!='shan'&&get.color(card)!='black') return;
						var cards=player.getCards('hs',function(card){
							return get.name(card)=='shan'||get.color(card)=='black';
						});
						cards.sort(function(a,b){
							return (get.name(b)=='shan'?1:2)-(get.name(a)=='shan'?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if(get.name(card)=='shan') return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
						return Math.max(num,[6.5,4,3][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.qingguo.mod.aiValue.apply(this,arguments);
					},
				},
				locked:false,
				audio:2,
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card){
					return get.color(card)=='black';
				},
				viewAs:{name:'shan'},
				viewAsFilter:function(player){
					if(!player.countCards('hs',{color:'black'})) return false;
				},
				position:'hs',
				prompt:'将一张黑色手牌当闪使用或打出',
				check:function(){return 1},
				ai:{
					order:3,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('hs',{color:'black'})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					}
				}
			},
			rende:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				lose:false,
				delay:0,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				check:function(card){
					if(ui.selected.cards.length>1) return 0;
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					var num=0;
					var evt2=_status.event.getParent();
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.getParent().skill=='rende'&&evt.getParent(3)==evt2) num+=evt.cards.length;
					});
					if(player.hp==player.maxHp||num>1||player.countCards('h')<=1){
						if(ui.selected.cards.length){
							return -1;
						}
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].hasSkill('haoshi')&&
								!players[i].isTurnedOver()&&
								!players[i].hasJudge('lebu')&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards('h')>player.hp) return 10-get.value(card);
						if(player.countCards('h')>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				content:function(){
					target.gain(cards,player,'giveAuto');
					var evt2=event.getParent(3);
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.getParent(2).name=='rende'&&evt.getParent(5)==evt2) num+=evt.cards.length;
					});
					if(num<2&&num+cards.length>1) player.recover(0);
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.rende<2&&player.countCards('h')>1){
							return 10;
						}
						return 1;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.storage.rende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									var players=game.filterPlayer();
									for(var i=0;i<players.length;i++){
										if(players[i]!=player&&get.attitude(player,players[i])>0){
											return 0;
										}
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			rende1:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				content:function(){
					player.storage.rende=0;
				}
			},
			jijiang:{
				audio:'jijiang1',
				audioname:['liushan','re_liubei','re_liushan','ol_liushan'],
				unique:true,
				group:['jijiang1'],
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('jijiang')||!game.hasPlayer(function(current){
						return current!=player&&current.group=='shu';
					})) return false;
					return !event.jijiang&&(event.type!='phase'||!player.hasSkill('jijiang3'));
				},
				enable:['chooseToUse','chooseToRespond'],
				viewAs:{name:'sha'},
				filterCard:function(){return false},
				selectCard:-1,
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.3;
					},
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.hasZhuSkill('jijiang')||!game.hasPlayer(function(current){
							return current!=player&&current.group=='shu';
						})) return false;
					},
				},
			},
			jijiang1:{
				audio:2,
				audioname:['liushan','re_liubei','re_liushan','ol_liushan'],
				trigger:{player:['useCardBegin','respondBegin']},
				logTarget:'targets',
				filter:function(event,player){
					return event.skill=='jijiang';
				},
				forced:true,
				content:function(){
					"step 0"
					delete trigger.skill;
					trigger.getParent().set('jijiang',true);
					"step 1"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addTempSkill('jijiang3');
						event.finish();
						trigger.cancel();
						trigger.getParent().goto(0);
					}
					else if(event.current.group=='shu'){
						var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张杀？',{name:'sha'});
						next.set('ai',function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)-2);
						});
						next.set('source',player);
						next.set('jijiang',true);
						next.set('skillwarn','替'+get.translation(player)+'打出一张杀');
						next.noOrdering=true;
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 2"
					if(result.bool){
						event.finish();
						trigger.card=result.card;
						trigger.cards=result.cards;
						trigger.throw=false;
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(1);
					}
				}
			},
			jijiang3:{
				trigger:{global:['useCardAfter','useSkillAfter','phaseAfter']},
				silent:true,
				charlotte:true,
				filter:function(event){
					return event.skill!='jijiang'&&event.skill!='qinwang';
				},
				content:function(){
					player.removeSkill('jijiang3');
				}
			},
			wusheng:{
				audio:2,
				audioname2:{old_guanzhang:'old_fuhun'},
				audioname:['re_guanyu','guanzhang','jsp_guanyu','guansuo'],
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card,player){
					if(get.zhu(player,'shouyue')) return true;
					return get.color(card)=='red';
				},
				position:'hes',
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(get.zhu(player,'shouyue')){
						if(!player.countCards('hes')) return false;
					}
					else{
						if(!player.countCards('hes',{color:'red'})) return false;
					}
				},
				prompt:'将一张红色牌当杀使用或打出',
				check:function(card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(get.zhu(player,'shouyue')){
							if(!player.countCards('hes')) return false;
						}
						else{
							if(!player.countCards('hes',{color:'red'})) return false;
						}
					},
					respondSha:true,
				}
			},
			zhongyi:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				filterCard:true,
				position:'he',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				toStorage:true,
				discard:false,
				content:function(){
					player.awakenSkill('zhongyi');
					player.addTempSkill('zhongyi2','roundStart');
					player.markAuto('zhongyi2',cards);
				},
			},
			zhongyi2:{
				trigger:{global:'damageBegin1'},
				forced:true,
				popup:false,
				logTarget:'source',
				filter:function(event,player){
					return event.getParent().name=='sha'&&event.source&&event.source.isFriendOf(player);
				},
				content:function(){trigger.num++},
				intro:{content:'cards',onunmark:'throw'},
			},
			xpaoxiao:{
				audio:2,
				firstDo:true,
				audioname2:{old_guanzhang:'old_fuhun'},
				audioname:['re_zhangfei','guanzhang','xiahouba'],
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return 4;
					}
				},
				ai:{
					unequip:true,
					skillTagFilter:function(player,tag,arg){
						if(!get.zhu(player,'shouyue')) return false;
						if(arg&&arg.name=='sha') return true;
						return false;
					}
				}
			},
			guanxing_fail:{},
			guanxing:{
				audio:2,
				audioname:['jiangwei','re_jiangwei','re_zhugeliang'],
				trigger:{player:'phaseZhunbeiBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					"step 0"
					var num=Math.min(5,game.countPlayer());
					if(player.hasSkill('yizhi')&&player.hasSkill('guanxing')){
						num=5;
					}
					var cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','观星：点击将牌移动到牌堆顶或牌堆底');
					next.processAI=function(list){
						var cards=list[0][1],player=_status.event.player;
						var top=[];
						var judges=player.getCards('j');
						var stopped=false;
						if(!player.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return judge(b)-judge(a);
								});
								if(judge(cards[0])<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						var bottom;
						if(!stopped){
							cards.sort(function(a,b){
								return get.value(b,player)-get.value(a,player);
							});
							while(cards.length){
								if(get.value(cards[0],player)<=5) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						return [top,bottom];
					}
					"step 1"
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.updateRoundNumber();
					game.delayx();
				},
				ai:{
					threaten:1.2
				}
			},
			kongcheng:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(target.countCards('h')==0){
							if(card.name=='sha'||card.name=='juedou') return false;
						}
					}
				},
				group:'kongcheng1',
				audio:'kongcheng1',
				audioname:['re_zhugeliang'],
				ai:{
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					}
				}
			},
			kongcheng1:{
				audio:2,
				trigger:{player:'loseEnd'},
				forced:true,
				firstDo:true,
				audioname:['re_zhugeliang'],
				filter:function(event,player){
					if(player.countCards('h')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){}
			},
			longdan:{
				audio:'longdan_sha',
				audioname:['re_zhaoyun'],
				group:['longdan_sha','longdan_shan','longdan_draw'],
				subSkill:{
					draw:{
						trigger:{player:['useCard','respond']},
						forced:true,
						popup:false,
						filter:function(event,player){
							if(!get.zhu(player,'shouyue')) return false;
							return event.skill=='longdan_sha'||event.skill=='longdan_shan';
						},
						content:function(){
							player.draw();
							player.storage.fanghun2++;
						}
					},
					sha:{
						audio:2,
						audioname:['re_zhaoyun'],
						enable:['chooseToUse','chooseToRespond'],
						filterCard:{name:'shan'},
						viewAs:{name:'sha'},
						viewAsFilter:function(player){
							if(!player.countCards('hs','shan')) return false;
						},
						position:'hs',
						prompt:'将一张闪当杀使用或打出',
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.countCards('hs','shan')) return false;
							},
							order:function(){
								return get.order({name:'sha'})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					shan:{
						audio:'longdan_sha',
						audioname:['re_zhaoyun'],
						enable:['chooseToRespond','chooseToUse'],
						filterCard:{name:'sha'},
						viewAs:{name:'shan'},
						prompt:'将一张杀当闪使用或打出',
						check:function(){return 1},
						position:'hs',
						viewAsFilter:function(player){
							if(!player.countCards('hs','sha')) return false;
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.countCards('hs','sha')) return false;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondShan')&&current<0) return 0.6
								}
							},
							order:4,
							useful:-1,
							value:-1
						}
					}
				}
			},
			mashu:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				}
			},
			mashu2:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				}
			},
			feiying:{
				mod:{
					globalTo:function(from,to,distance){
						return distance+1;
					}
				}
			},
			tieji:{
				audio:2,
				shaRelated:true,
				trigger:{player:'useCardToPlayered'},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				logTarget:'target',
				preHidden:true,
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.zhu(_status.event.player,'shouyue')){
							if(get.suit(card)!='spade') return 2;
						}
						else{
							if(get.color(card)=='red') return 2;
						}
						return -0.5;
					}).judge2=function(result){
						return result.bool;
					};
					"step 1"
					if(result.bool){
						trigger.getParent().directHit.add(trigger.target);
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(get.attitude(player,arg.target)>0||arg.card.name!='sha'||!ui.cardPile.firstChild||get.color(ui.cardPile.firstChild,player)!='red') return false;
					},
				},
			},
			jizhi:{
				audio:2,
				audioname:['jianyong'],
				trigger:{player:'useCard'},
				frequent:true,
				preHidden:true,
				filter:function(event){
					return (get.type(event.card)=='trick'&&event.card.isCard);
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				}
			},
			xinjizhi:{
				audio:'jizhi',
				trigger:{player:'useCard'},
				frequent:true,
				// alter:true,
				filter:function(event){
					if(!get.is.altered('xinjizhi')&&get.type(event.card)=='delay') return false;
					return (get.type(event.card,'trick')=='trick'&&event.cards[0]&&event.cards[0]==event.card);
				},
				init:function(player){
					player.storage.xinjizhi=0;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(get.is.altered('xinjizhi')&&get.type(result[0])=='basic'){
						event.card=result[0];
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.xinjizhi++;
						if(_status.currentPhase==player){
							player.markSkill('xinjizhi');
						}
					}
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				},
				mod:{
					maxHandcard:function(player,num){
						if(get.is.altered('xinjizhi')&&_status.currentPhase==player){
							return num+player.storage.xinjizhi;
						}
						return num;
					}
				},
				intro:{
					content:'本回合手牌上限+#'
				},
				group:'xinjizhi_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.xinjizhi=0;
							player.unmarkSkill('xinjizhi');
						}
					}
				}
			},
			qicai:{
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					}
				},
			},
			xinqicai:{
				// alter:true,
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					},
					canBeDiscarded:function(card){
						if(get.is.altered('xinqicai')&&get.position(card)=='e') return false;
					},
					cardDiscardable:function(card){
						if(get.is.altered('xinqicai')&&get.position(card)=='e') return false;
					}
				},
			},
			xinzhiheng:{
				audio:'zhiheng',
				enable:'phaseUse',
				// alter:true,
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(get.is.altered('xinzhiheng')&&get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				delay:0,
				content:function(){
					'step 0'
					if(!player.hasSkill('xinzhiheng_delay')) game.delayx();
					'step 1'
					player.draw(cards.length);
				},
				group:'xinzhiheng_draw',
				subSkill:{
					draw:{
						trigger:{player:'loseEnd'},
						silent:true,
						filter:function(event,player){
							if(event.getParent(2).skill!='xinzhiheng') return false;
							if(!get.is.altered('xinzhiheng')) return false;
							if(player.countCards('h')) return false;
							for(var i=0;i<event.cards.length;i++){
								if(event.cards[i].original=='h') return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill('xinzhiheng_delay','xinzhihengAfter');
						}
					},
					delay:{}
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.55
				},
			},
			zhiheng:{
				audio:2,
				audioname:['gz_jun_sunquan'],
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				prompt:'弃置任意张牌并摸等量的牌',
				check:function(card){
					return 6-get.value(card)
				},
				content:function(){
					player.draw(cards.length);
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.5
				},
			},
			jiuyuan:{
				audio:2,
				unique:true,
				trigger:{target:'taoBegin'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(event.player==player) return false;
					if(!player.hasZhuSkill('jiuyuan')) return false;
					if(event.player.group!='wu') return false;
					return true;
				},
				content:function(){
					trigger.baseDamage++;
				}
			},
			xinjiuyuan:{
				audio:'jiuyuan',
				unique:true,
				// alter:true,
				trigger:{target:'taoBegin'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(get.is.altered('xinjiuyuan')) return false;
					if(event.player==player) return false;
					if(!player.hasZhuSkill('jiuyuan')) return false;
					if(player.hp>0) return false;
					if(event.player.group!='wu') return false;
					return true;
				},
				content:function(){
					player.recover();
				},
				global:'xinjiuyuan2',
			},
			xinjiuyuan2:{
				audio:'jiuyuan',
				forceaudio:true,
				trigger:{player:'taoBegin'},
				filter:function(event,player){
					if(!get.is.altered('xinjiuyuan')) return false;
					if(player.group!='wu') return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('xinjiuyuan',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('xinjiuyuan',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt('xinjiuyuan',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.logSkill('xinjiuyuan',event.current);
						event.current.recover();
						player.draw();
					}
					event.goto(1);
				}
			},
			qixi:{
				audio:2,
				audioname:['re_ganning','re_heqi'],
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='black';
				},
				position:'hes',
				viewAs:{name:'guohe'},
				viewAsFilter:function(player){
					if(!player.countCards('hes',{color:'black'})) return false;
				},
				prompt:'将一张黑色牌当过河拆桥使用',
				check:function(card){return 4-get.value(card)}
			},
			keji:{
				audio:2,
				audioname:['re_lvmeng','sp_lvmeng'],
				trigger:{player:'phaseDiscardBefore'},
				frequent:function(event,player){
					return player.needsToDiscard();
				},
				filter:function(event,player){
					if(player.getHistory('skipped').contains('phaseUse')) return true;
					var history=player.getHistory('useCard').concat(player.getHistory('respond'));
					for(var i=0;i<history.length;i++){
						if(history[i].card.name=='sha'&&history[i].isPhaseUsing()) return false;
					}
					return true;
				},
				content:function(){
					trigger.cancel();
				}
			},



minsi:{
				audio:2,
				enable:'phaseUse',
				getResult:function(cards){
					var l=cards.length;
					var all=Math.pow(l,2);
					var list=[];
					for(var i=1;i<all;i++){
						var array=[];
						for(var j=0;j<l;j++){
							if(Math.floor((i%Math.pow(2,j+1))/Math.pow(2,j))>0) array.push(cards[j])
						}
						var num=0;
						for(var k of array){
							num+=get.number(k);
						}
						if(num==12) list.push(array);
					}
					if(list.length){
						list.sort(function(a,b){
							if(a.length!=b.length) return b.length-a.length;
							return get.value(a)-get.value(b);
						});
						return list[0];
					}
					return list;
				},
				usable:1,
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=12;
				},
				complexCard:true,
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==12) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				check:function(card){
					var evt=_status.event;
					if(!evt.minsi_choice) evt.minsi_choice=lib.skill.minsi.getResult(evt.player.getCards('he'));
					if(!evt.minsi_choice.contains(card)) return 0;
					return 1;
				},
				position:'he',
				content:function(){
					player.draw(cards.length*2).gaintag=['minsi2'];
					player.addTempSkill('minsi2');
				},
				ai:{
					order:5,
					result:{player:1},
				},
			},
			minsi2:{
				onremove:function(player){
					player.removeGaintag('minsi2');
				},
				mod:{
					targetInRange:function(card,player,target){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('minsi2')||get.color(i)!='black') return;
						}
						return true;
					},
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('minsi2')&&get.color(card)=='red'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('minsi2')&&get.color(card)=='red'){
							return false;
						}
					},
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('minsi2')&&get.color(card)=='black') return num-0.1;
					},
				},
			},





			kurou:{
				audio:2,
				enable:'phaseUse',
				prompt:'失去一点体力并摸两张牌',
				content:function(){
					"step 0"
					player.loseHp(1);
					"step 1"
					player.draw(2);
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:function(player){
							if(player.countCards('h')>=player.hp-1) return -1;
							if(player.hp<3) return -1;
							return 1;
						}
					}
				}
			},
			yingzi:{
				audio:2,
				audioname:['sp_lvmeng'],
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					trigger.num+=1;
				},
				ai:{
					threaten:1.3
				}
			},
			fanjian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					target.chooseControl('heart2','diamond2','club2','spade2').set('ai',function(event){
						switch(Math.floor(Math.random()*6)){
							case 0:return 'heart2';
							case 1:case 4:case 5:return 'diamond2';
							case 2:return 'club2';
							case 3:return 'spade2';
						}
					});
					"step 1"
					game.log(target,'选择了'+get.translation(result.control));
					event.choice=result.control;
					target.popup(event.choice);
					event.card=player.getCards('h').randomGet();
					target.gain(event.card,player,'give');
					game.delay();
					"step 2"
					if(get.suit(event.card)+'2'!=event.choice) target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var eff=get.damageEffect(target,player);
							if(eff>=0) return 1+eff;
							var value=0,i;
							var cards=player.getCards('h');
							for(i=0;i<cards.length;i++){
								value+=get.value(cards[i]);
							}
							value/=player.countCards('h');
							if(target.hp==1) return Math.min(0,value-7);
							return Math.min(0,value-5);
						}
					}
				}
			},
			guose:{
				audio:2,
				filter:function(event,player){
					return player.countCards('hes',{suit:'diamond'})>0;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='diamond';
				},
				position:'hes',
				viewAs:{name:'lebu'},
				prompt:'将一张方片牌当乐不思蜀使用',
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},
			liuli:{
				audio:2,
				audioname:['re_daqiao','daxiaoqiao'],
				trigger:{target:'useCardToTarget'},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(player.countCards('he')==0) return false;
					return game.hasPlayer(function(current){
						return player.inRange(current)&&current!=event.player&&
							current!=player&&lib.filter.targetEnabled(event.card,event.player,current);
					});
				},
				content:function(){
					"step 0"
					var next=player.chooseCardTarget({
						position:'he',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event;
							if(player.inRange(target)&&target!=trigger.source){
								if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
							}
							return false;
						},
						ai1:function(card){
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							if(_status.event.player.countCards('h','shan')){
								return -get.attitude(_status.event.player,target);
							}
							if(get.attitude(_status.event.player,target)<5){
								return 6-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==1&&player.countCards('h','shan')==0){
								return 10-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==2&&player.countCards('h','shan')==0){
								return 8-get.attitude(_status.event.player,target);
							}
							return -1;
						},
						prompt:get.prompt('liuli'),
						prompt2:'弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色',
						source:trigger.player,
						card:trigger.card,
					}).setHiddenSkill(event.name);
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name,target);
						player.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.countCards('he')==0) return;
							if(card.name!='sha') return;
							var min=1;
							var friend=get.attitude(player,target)>0;
							var vcard={name:'shacopy',nature:card.nature,suit:card.suit};
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(player!=players[i]&&
									get.attitude(target,players[i])<0&&
									target.canUse(card,players[i])){
									if(!friend) return 0;
									if(get.effect(players[i],vcard,player,player)>0){
										if(!player.canUse(card,players[0])){
											return [0,0.1];
										}
										min=0;
									}
								}
							}
							return min;
						}
					}
				}
			},
			qianxun:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=='shunshou'||card.name=='lebu') return false;
					}
				},
				audio:2,
			},
			lianying:{
				audio:2,
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				frequent:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:0.8,
					effect:{
						target:function(card){
							if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						}
					},
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					}
				}
			},



			xiaoji:{
				audio:2,
				audioname:['sp_sunshangxiang','re_sunshangxiang'],
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				frequent:true,
				filter:function(event,player){
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.es&&evt.es.length>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.getl(player).es.length;
					"step 1"
					event.count--;
					player.draw(2);
					"step 2"
					if(event.count>0){
						player.chooseBool(get.prompt2('xiaoji')).set('frequentSkill','xiaoji').ai=lib.filter.all;
					}
					"step 3"
					if(result.bool){
						player.logSkill('xiaoji');
						event.goto(1);
					}
				},
				ai:{
					noe:true,
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
						}
					}
				}
			},
			jieyin:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				selectCard:2,
				check:function(card){
					var player=get.owner(card);
					if(player.countCards('h')>player.hp)
						return 8-get.value(card)
					if(player.hp<player.maxHp)
						return 6-get.value(card)
					return 4-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(!target.hasSex('male')) return false;
					if(target.hp>=target.maxHp) return false;
					if(target==player) return false;
					return true;
				},
				content:function(){
					player.recover();
					target.recover();
				},
				ai:{
					order:5.5,
					result:{
						player:function(player){
							if(player.hp<player.maxHp) return 4;
							if(player.countCards('h')>player.hp) return 0
							return -1;
						},
						target:4
					},
					threaten:2,
				}
			},
			xinjieyin:{
				group:['xinjieyin_old','xinjieyin_new'],
				// alter:true,
				subSkill:{
					new:{
						audio:'jieyin',
						enable:'phaseUse',
						filterCard:true,
						usable:1,
						position:'he',
						filter:function(event,player){
							if(!get.is.altered('xinjieyin')) return false;
							return player.countCards('he')>0;
						},
						check:function(card){
							var player=_status.event.player;
							if(get.position(card)=='e'){
								var subtype=get.subtype(card);
								if(!game.hasPlayer(function(current){
									return current!=player&&current.hp!=player.hp&&get.attitude(player,current)>0&&!current.countCards('e',{subtype:subtype});
								})){
									return 0;
								}
								if(player.countCards('h',{subtype:subtype})) return 20-get.value(card);
								return 10-get.value(card);
							}
							else{
								if(player.countCards('e')) return 0;
								if(player.countCards('h',{type:'equip'})) return 0;
								return 8-get.value(card);
							}
						},
						filterTarget:function(card,player,target){
							if(!target.hasSex('male')) return false;
							var card=ui.selected.cards[0];
							if(!card) return false;
							if(get.position(card)=='e'&&target.countCards('e',{subtype:get.subtype(card)})) return false;
							return true;
						},
						discard:false,
						delay:0,
						lose:false,
						content:function(){
							'step 0'
							if(get.position(cards[0])=='e'){
								player.$give(cards,target);
								target.equip(cards[0]);
							}
							else{
								player.discard(cards);
							}
							'step 1'
							if(player.hp>target.hp){
								player.draw();
								if(target.isDamaged()) target.recover();
							}
							else if(player.hp<target.hp){
								target.draw();
								if(player.isDamaged()) player.recover();
							}
						},
						ai:{
							order:function(){
								var player=_status.event.player;
								var es=player.getCards('e');
								for(var i=0;i<es.length;i++){
									if(player.countCards('h',{subtype:get.subtype(es[i])})) return 10;
								}
								return 2;
							},
							result:{
								target:function(player,target){
									var goon=function(){
										var es=player.getCards('e');
										for(var i=0;i<es.length;i++){
											if(player.countCards('h',{subtype:get.subtype(es[i])})) return true;
										}
										return false;
									}
									if(player.hp<target.hp){
										if(player.isHealthy()){
											if(!player.needsToDiscard(1)||goon()) return 0.1;
											return 0;
										}
										return 1.5;
									}
									if(player.hp>target.hp){
										if(target.isHealthy()){
											if(!player.needsToDiscard(1)||goon()) return 0.1;
											return 0;
										}
										return 1;
									}
									return 0;
								}
							}
						}
					},
					old:{
						audio:'jieyin',
						enable:'phaseUse',
						filterCard:true,
						usable:1,
						selectCard:2,
						filter:function(event,player){
							if(get.is.altered('xinjieyin')) return false;
							return player.countCards('h')>=2;
						},
						check:function(card){
							var player=get.owner(card);
							if(player.countCards('h')>player.hp)
								return 8-get.value(card)
							if(player.hp<player.maxHp)
								return 6-get.value(card)
							return 4-get.value(card)
						},
						filterTarget:function(card,player,target){
							if(!target.hasSex('male')) return false;
							if(target.hp>=target.maxHp) return false;
							if(target==player) return false;
							return true;
						},
						content:function(){
							player.recover();
							target.recover();
						},
						ai:{
							order:5.5,
							result:{
								player:function(player){
									if(player.hp<player.maxHp) return 4;
									if(player.countCards('h')>player.hp) return 0
									return -1;
								},
								target:4
							}
						}
					}
				},
				ai:{
					threaten:2.3
				}
			},
			qingnang:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				check:function(card){
					return 9-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(target.hp>=target.maxHp) return false;
					return true;
				},
				content:function(){
					target.recover();
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							if(target.hp==1) return 5;
							if(player==target&&player.countCards('h')>player.hp) return 5;
							return 2;
						}
					},
					threaten:2
				}
			},
			jijiu:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!='tao'&&get.color(card)!='red') return;
						var cards=player.getCards('hs',function(card){
							return get.name(card)=='tao'||get.color(card)=='red';
						});
						cards.sort(function(a,b){
							return (get.name(a)=='tao'?1:2)-(get.name(b)=='tao'?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						return Math.max(num,[6.5,4,3,2][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.kanpo.mod.aiValue.apply(this,arguments);
					},
				},
				locked:false,
				audio:2,
				audioname:['re_huatuo'],
				enable:'chooseToUse',
				viewAsFilter:function(player){
					return player!=_status.currentPhase&&player.countCards('hes',{color:'red'})>0;
				},
				filterCard:function(card){
					return get.color(card)=='red';
				},
				position:'hes',
				viewAs:{name:'tao'},
				prompt:'将一张红色牌当桃使用',
				check:function(card){return 15-get.value(card)},
				ai:{
					threaten:1.5,
				}
			},
			wushuang:{
				shaRelated:true,
				audio:2,
				audioname:['re_lvbu','shen_lvbu','lvlingqi'],
				forced:true,
				locked:true,
				group:['wushuang1','wushuang2'],
				preHidden:['wushuang1','wushuang2'],
			},
			wushuang1:{
				audio:'wushuang',
				audioname:['re_lvbu','shen_lvbu','lvlingqi'],
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
				},
				//priority:-1,
				logTarget:'target',
				content:function(){
					var id=trigger.target.playerid;
					var map=trigger.getParent().customArgs;
					if(!map[id]) map[id]={};
					if(typeof map[id].shanRequired=='number'){
						map[id].shanRequired++;
					}
					else{
						map[id].shanRequired=2;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
					},
				},
			},



		tengjia1:{
				equipSkill:true,
				trigger:{target:['useCardToBefore']},
				forced:true,
				priority:6,
				audio:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='nanman') return true;
					if(event.card.name=='wanjian') return true;
					//if(event.card.name=='chuqibuyi') return true;
					return false;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})) return;
							//if(card.name=='nanman'||card.name=='wanjian'||card.name=='chuqibuyi') return 'zerotarget';
							if(card.name=='nanman'||card.name=='wanjian') return 'zerotarget';
							if(card.name=='sha'){
								var equip1=player.getEquip(1);
								if(equip1&&equip1.name=='zhuque') return 1.9;
								if(!card.nature) return 'zerotarget';
							}
						}
					}
				}
			},
			tengjia2:{
				equipSkill:true,
				trigger:{player:'damageBegin3'},
				filter:function(event,player){
					if(event.nature!='fire') return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				audio:true,
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					fireAttack:true,
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2;
								if(player.hasSkill('zhuque_skill')) return 1.9;
							}
							if(get.tag(card,'fireDamage')&&current<0) return 2;
						}
					}
				}
			},
			tengjia3:{
				equipSkill:true,
				audio:'tengjia1',
				trigger:{target:'shaBefore'},
				forced:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='sha'&&!event.card.nature) return true;
					return false;
				},
				content:function(){
					trigger.cancel();
				},
			},


			wushuang2:{
				audio:'wushuang',
				audioname:['re_lvbu','shen_lvbu','lvlingqi'],
				trigger:{player:'useCardToPlayered',target:'useCardToTargeted'},
				forced:true,
				logTarget:function(trigger,player){
					return player==trigger.player?trigger.target:trigger.player
				},
				filter:function(event,player){
					return event.card.name=='juedou';
				},
				//priority:-1,
				content:function(){
					var id=(player==trigger.player?trigger.target:trigger.player)['playerid'];
					var idt=trigger.target.playerid;
					var map=trigger.getParent().customArgs;
					if(!map[idt]) map[idt]={};
					if(!map[idt].shaReq) map[idt].shaReq={};
					if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
					map[idt].shaReq[id]++;
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!='juedou'||Math.floor(arg.target.countCards('h','sha')/2)>player.countCards('h','sha')) return false;
					}
				}
			},
			zhanshen:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return player.isDamaged()&&game.dead.filter(function(target){
						return target.isFriendOf(player);
					}).length>0
				},
				content:function(){
					player.awakenSkill('zhanshen');
					var card=player.getEquip(1);
					if(card) player.discard(card);
					player.loseMaxHp();
					player.addSkill('mashu');
					player.addSkill('shenji');
				},
				derivation:['mashu','shenji'],
			},
			shenji:{
				mod:{
					selectTarget:function(card,player,range){
						if(range[1]==-1) return;
						if(card.name=='sha') range[1]+=2;
					},
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					}
				},
			},
			lijian:{
				audio:2,
				audioname:['re_diaochan'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.countPlayer(function(current){
						return current!=player&&current.hasSex('male');
					})>1;
				},
				check:function(card){return 10-get.value(card)},
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(!target.hasSex('male')) return false;
					if(ui.selected.targets.length==1){
						return target.canUse({name:'juedou'},ui.selected.targets[0]);
					}
					return true;
				},
				targetprompt:['先出杀','后出杀'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					targets[1].useCard({name:'juedou',isCard:true},'nowuxie',targets[0],'noai').animate=false;
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return -3;
							}
							else{
								return get.effect(target,{name:'juedou'},ui.selected.targets[0],target);
							}
						}
					},
					expose:0.4,
					threaten:3,
				}
			},
			biyue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					player.draw();
				},
			},
			xinbiyue:{
				audio:'biyue',
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				// alter:true,
				content:function(){
					var num=1;
					if(get.is.altered('xinbiyue')&&!player.countCards('h')){
						num=2;
					}
					player.draw(num);
				},
			},
			yaowu:{
				trigger:{player:'damageBegin3'},
				//priority:1,
				audio:2,
				filter:function(event){
					if(event.card&&(event.card.name=='sha')){
						if(get.color(event.card)=='red') return true;
					}
					return false;
				},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					trigger.source.chooseDrawRecover(true);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&(get.color(card)=='red')){
								return [1,-2];
							}
						}
					}
				}
			},
			"new_jiangchi":{
				audio:2,
				trigger:{
					player:"phaseDrawEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					var list=['弃牌','摸牌','取消'];
					if(!player.countCards('he')) list.remove('弃牌');
					player.chooseControl(list,function(){
						var player=_status.event.player;
						if(list.contains('弃牌')){
							if(player.countCards('h')>3&&player.countCards('h','sha')>1){
								return '弃牌';
							}
							if(player.countCards('h','sha')>2){
								return '弃牌';
							}
						}
						if(!player.countCards('h','sha')){
							return '摸牌';
						}
						return 'cancel2';
					}).set('prompt',get.prompt2('new_jiangchi'));
					"step 1"
					if(result.control=='弃牌'){
						player.chooseToDiscard(true,'he');
						player.addTempSkill('jiangchi2','phaseUseEnd');
						player.logSkill('new_jiangchi');
					}
					else if(result.control=='摸牌'){
						player.draw();
						player.addTempSkill('new_jiangchi3','phaseEnd');
						player.logSkill('new_jiangchi');
					}
				},
			},
			new_jiangchi3:{
				mod:{
					cardEnabled:function(card){
						if(card.name=='sha') return false;
					},
					cardRespondable:function(card){
						if(card.name=='sha') return false;
					},
					ignoredHandcard:function(card,player){
						if(get.name(card)=='sha'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&get.name(card)=='sha'){
							return false;
						}
					},
				},
			},
			"xinfu_jijie":{
				enable:"phaseUse",
				usable:1,
				audio:2,
				//filter:function(){
					//return ui.cardPile.hasChildNodes();
				//},
				content:function (){
					'step 0'
					//event.card=ui.cardPile.lastChild;
					event.card=get.bottomCards()[0];
					var content=['牌堆底的一张牌',[event.card]];
					game.log(player,'观看了牌堆底的一张牌');
					player.chooseControl('ok').set('dialog',content);
					'step 1'
					player.chooseTarget('选择获得此牌的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0.5;
								return -att;
							}
						if(att>0){
								if(_status.event.player!=target) att+=2;
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
					}).set('du',event.card.name=='du').set('same',event.same);
					'step 2'
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target,'green');
						player.give(event.card,event.target);
					}
					else ui.cardPile.appendChild(event.card);
					game.updateRoundNumber();
				},
				ai:{
					order:7.2,
					result:{
						player:1,
					},
				},
			},
			"xinfu_jiyuan":{
				trigger:{
					global:"dying",
					source:"gainAfter",
				},
				//priority:6,
				audio:2,
				filter:function (event,player){
					if(event.name=='dying') return true;
					return event.player!=player&&event.bySelf!=true;
				},
				check:function (event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:"player",
				content:function (){
					trigger.player.draw();
				},
			},
		},
		characterReplace:{
			caocao:['re_caocao','caocao'],
			guojia:['re_guojia','guojia'],
			simayi:['re_simayi','simayi'],
			jin_simayi:['jin_simayi','junk_simayi'],
			zhenji:['re_zhenji','zhenji'],
			xuzhu:['re_xuzhu','xuzhu'],
			zhangliao:['re_zhangliao','zhangliao'],
			sp_zhangliao:['sp_zhangliao','yj_zhangliao'],
			xiahoudun:['re_xiahoudun','xin_xiahoudun','xiahoudun'],
			liubei:['re_liubei','liubei'],
			guanyu:['re_guanyu','guanyu'],
			zhangfei:['re_zhangfei','xin_zhangfei','old_zhangfei','zhangfei'],
			zhaoyun:['re_zhaoyun','old_zhaoyun','zhaoyun'],
			sp_zhaoyun:['sp_zhaoyun','jsp_zhaoyun'],
			machao:['re_machao','machao'],
			sp_machao:['sp_machao','old_machao'],
			zhugeliang:['re_zhugeliang','zhugeliang'],
			huangyueying:['re_huangyueying','huangyueying'],
			sunquan:['re_sunquan','sunquan'],
			zhouyu:['re_zhouyu','zhouyu'],
			luxun:['re_luxun','luxun'],
			lvmeng:['re_lvmeng','lvmeng'],
			huanggai:['re_huanggai','huanggai'],
			daqiao:['re_daqiao','daqiao'],
			sunshangxiang:['re_sunshangxiang','sunshangxiang'],
			ganning:['re_ganning','ganning'],
			yj_ganning:['yj_ganning','sp_ganning'],
			lvbu:['re_lvbu','lvbu'],
			diaochan:['re_diaochan','diaochan'],
			huatuo:['re_huatuo','old_huatuo','huatuo'],
			huaxiong:['re_huaxiong','old_huaxiong','huaxiong','ol_huaxiong'],
			yuanshu:['yl_yuanshu','yuanshu','re_yuanshu','old_yuanshu','ol_yuanshu'],
			gongsunzan:['re_gongsunzan','xin_gongsunzan','sp_gongsunzan','gongsunzan'],
		},
		translate:{
			caocao:'曹操',
			hujia:'护驾',
			hujia_info:'主公技，当你需要使用或打出一张【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】。若有角色响应，则你视为使用或打出了一张【闪】。',
			jianxiong:'奸雄',
			jianxiong_info:'当你受到伤害后，你可以获得对你造成伤害的牌。',

			simayi:'司马懿',
			fankui:'反馈',
			fankui_info:'当你受到伤害后，你可以获得伤害来源的一张牌。',
			guicai:'鬼才',
			guicai_info:'一名角色的判定牌生效前，你可以打出一张手牌代替之。',
			guicai_info_guozhan:'一名角色的判定牌生效前，你可以打出一张牌代替之。',

			xiahoudun:'夏侯惇',
			zhangliao:'张辽',
			xuzhu:'许褚',
			guojia:'郭嘉',
			zhenji:'甄姬',
			liubei:'刘备',
			guanyu:'关羽',
			zhangfei:'张飞',
			zhugeliang:'Roars',
			zhaoyun:'Airson',
			machao:'GoldenAge',
			huangyueying:'黄月英',
			sunquan:'X',
			ganning:'Roars GL',
			lvmeng:'Airson GL',
			huanggai:'GoldenAge GL',
			zhouyu:'X GL',
			daqiao:'大乔',
			luxun:'陆逊',
			sunshangxiang:'孙尚香',
			huatuo:'华佗',
			lvbu:'吕布',
			diaochan:'貂蝉',
			huaxiong:'华雄',
			"xf_yiji":"伊籍",
			re_yuanshu:'袁术',
			caozhang:'曹彰',
			
			ganglie:'刚烈',
			tuxi:'突袭',
			luoyi:'裸衣',
			luoyi2:'裸衣',
			tiandu:'天妒',
			yiji:'遗计',
			luoshen:'洛神',
			xinluoshen:'洛神',
			qingguo:'倾国',
			rende:'仁德',
			jijiang:'激将',
			jijiang1:'激将',
			jijiang2:'激将',
			wusheng:'武圣',
			paoxiao:'咆哮',
			guanxing:'观星',
			kongcheng:'空城',
			kongcheng1:'空城',
			longdan:'龙胆',
			longdan1:'龙胆',
			longdan2:'龙胆',
			mashu:'马术',
			mashu2:'马术',
			feiying:'飞影',
			tieji:'铁骑',
			jizhi:'集智',
			qicai:'奇才',
			zhiheng:'制衡',
			jiuyuan:'救援',
			qixi:'奇袭',
			keji:'克己',
			kurou:'苦肉',
			yingzi:'英姿',
			fanjian:'反间',
			guose:'国色',
			liuli:'流离',
			qianxun:'谦逊',
			lianying:'连营',
			xiaoji:'枭姬',
			jieyin:'结姻',
			xinjieyin:'结姻',
	guangshu:'GLYPTIC',
	glyptic:'極鍍',
guangshu_info:'锁定技，游戏开始时，你获得一个体力为4的机甲；你的手牌上限为你和机甲的体力之和；你受到的伤害由机甲承担',
vjijia:'极镀',
			vjijia_info:'锁定技，游戏开始时，你获得一个体力为4的机甲；你的手牌上限为你和机甲的体力之和；你受到的伤害由机甲承担',
			qingnang:'青囊',
			jijiu:'急救',
			wushuang:'无双',
	ex:'无',
			wushuang1:'无双',
			wushuang2:'无双',
			lijian:'离间',
			biyue:'闭月',
			xinbiyue:'闭月',
			pileTop:'牌堆顶',
			pileBottom:'牌堆底',
			ganglie_info:'当你受到伤害后，你可以判定。若结果不为红桃，则伤害来源须弃置两张手牌，否则受到来自你的一点伤害。',
			tuxi_info:'摸牌阶段，你可以改为获得至多两名其他角色的各一张手牌。',
			luoyi_info:'摸牌阶段，你可以少摸一张牌。若如此做，当你本回合内使用【杀】或【决斗】造成伤害时，此伤害+1。',
			tiandu_info:'当你的判定牌生效后，你可以获得之。',
			yiji_info:'当你受到一点伤害后，你可以观看牌堆顶的两张牌，然后将其分配给任意角色。',
			luoshen_info:'准备阶段，你可以判定。若结果为黑色，你获得判定牌。你可重复此流程，直到出现红色的判定结果。',
			luoshen_info_guozhan:'准备阶段，你可以判定。若结果为黑色，则可以继续判定，直到出现红色的判定牌。然后你获得所有黑色的判定牌。（判定结果为黑色的牌在此过程中不会进入弃牌堆）',
			xinluoshen_info:'准备阶段，你可以判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌',
			xinluoshen_info_alter:'准备阶段，你可以判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌。你通过洛神获得的牌，不计入当前回合的手牌上限',
			qingguo_info:'你可以将一张黑色手牌当做【闪】使用或打出。',
			rende_info:'出牌阶段，你可以将任意张手牌交给其他角色。当你以此法于一回合内给出第二张牌时，你回复1点体力。',
			jijiang_info:'主公技，当你需要使用或打出【杀】时，你可以令其他蜀势力角色依次选择是否打出一张【杀】。若有角色响应，则你视为使用或打出了此【杀】。',
			wusheng_info:'你可以将一张红色牌当做【杀】使用或打出。',
			paoxiao_info:'锁定技，出牌阶段，你使用【杀】没有数量限制。',
			guanxing_info:'准备阶段，你可以观看牌堆顶的X张牌，并将其以任意顺序置于牌堆项或牌堆底。（X为存活角色数且至多为5）',
			kongcheng_info:'锁定技，当你没有手牌时，你不能成为【杀】或【决斗】的目标。',
			longdan_info:'你可以将【杀】当做【闪】，或将【闪】当做【杀】使用或打出。',
			mashu_info:'锁定技，你计算与其他角色的距离时-1。',
			mashu2_info:'锁定技，你计算与其他角色的距离时-1。',
			feiying_info:'锁定技，其他角色计算与你的距离时+1。',
			tieji_info:'当你使用【杀】指定目标后，你可以进行判定。若结果为红色，则此【杀】不可被闪避。',
			jizhi_info:'当你使用非转化的普通锦囊牌时，你可以摸一张牌。',
			xinjizhi:'集智',
glyptic_turn:'[GL] ReOrient',
			xinjizhi_info:'当你使用非转化的普通锦囊牌时，你可以摸一张牌。',
			xinjizhi_info_alter:'每当你使用一张非转化的锦囊牌，可以摸一张牌，如果摸到的是基本牌，你可以弃置这张牌，然后本回合手牌上限+1',
			xinqicai:'奇才',
			xinqicai_info:'锁定技，你使用锦囊牌无距离限制。',
			xinqicai_info_alter:'锁定技，你使用的锦囊牌无距离限制，你装备区内的牌不能被弃置',
			qicai_info:'锁定技，你使用锦囊牌无距离限制。',
			zhiheng_info:'出牌阶段一次，你可以弃置任意张牌，然后摸等量的牌。',
			xinzhiheng:'制衡',
			xinzhiheng_info:'出牌阶段限1次，你可以弃置任意张牌并摸等量的牌',
			xinzhiheng_info_alter:'出牌阶段限1次，你可以弃置任意张牌并摸等量的牌，如果在发动制衡时弃置了所有手牌，你额外摸一张牌',
			jiuyuan_info:'主公技，锁定技，其他吴势力角色对你使用的【桃】的回复值+1。',
			xinjiuyuan:'救援',
			xinjiuyuan_info:'主公技，锁定技，濒死阶段，吴势力角色对你使用的[桃]额外回复一点体力',
			xinjiuyuan_info_alter:'主公技，其他吴国角色对自己使用【桃】时，如果他的体力值大于你，他可以选择让你回复1点体力，然后他摸1张牌',
			qixi_info:'你可以将一张黑色牌当做【过河拆桥】使用。',
			keji_info:'弃牌阶段开始时，若你于本回合的出牌阶段内没有过使用或打出过【杀】，则你可以跳过此阶段。',
			kurou_info:'出牌阶段，你可以失去一点体力，然后摸两张牌。',
			yingzi_info:'摸牌阶段，你可以多摸一张牌。',
			fanjian_info:'出牌阶段限一次，你可以令一名角色选择一种花色并展示你的一张手牌，若选择的花色与展示的不同，该角色受到来自你的一点伤害。然后该角色获得展示的牌。',
			guose_info:'你可以将一张方片手牌当做【乐不思蜀】使用。',
			liuli_info:'当你成为【杀】的目标时，你可以弃置一张牌并将此【杀】转移给攻击范围内的一名其他角色（不能是此【杀】的使用者）。',
			qianxun_info:'锁定技，你不能成为【顺手牵羊】和【乐不思蜀】的目标。',
			lianying_info:'当你失去最后的手牌时，你可以摸一张牌。',
			xiaoji_info:'当你失去一张装备区内的牌后，你可以摸两张牌。',
			jieyin_info:'出牌阶段限一次，你可以弃置两张手牌并选择一名已经受伤的男性角色。你与其各回复一点体力。',
			xinjieyin_info:'出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力，每阶段限一次',
			xinjieyin_old_info:'出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力。每阶段限一次。',
			xinjieyin_new_info:'出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力',
			xinjieyin_info_alter:'出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力',
			qingnang_info:'出牌阶段限一次，你可以弃置一张手牌并令一名角色回复一点体力。',
			jijiu_info:'你的回合外，你可以将一张红色牌当做【桃】使用。',
			wushuang_info:'锁定技，当你使用【杀】或【决斗】指定目标后，你令此牌需要依次使用或打出两张【闪】或【杀】响应。',
			lijian_info:'出牌阶段限一次，你可以弃置一张牌，视为一名男性角色对另一名男性角色使用一张【决斗】（不可被【无懈可击】响应）。',
			biyue_info:'结束阶段，你可以摸一张牌。',
			xinbiyue_info:'结束阶段，你可以摸一张牌',
			xinbiyue_info_alter:'结束阶段，你可以摸一张牌，如果你没有手牌，改为摸2张牌',
			yaowu:'耀武',
			yaowu_info:'锁定技，一名角色使用红色【杀】对你造成伤害时，该角色回复1点体力或摸一张牌。',
			"new_jiangchi":"将驰",
			"new_jiangchi_info":"摸牌阶段结束时，你可以选择一项：1、摸一张牌，若如此做，你本回合内不能使用或打出【杀】且【杀】不计入手牌上限。 2、弃置一张牌，若如此做，出牌阶段你使用【杀】无距离限制且你可以额外使用一张【杀】，直到回合结束。",
			"xinfu_jijie":"机捷",
			"xinfu_jijie_info":"出牌阶段限一次。你可以观看牌堆底的一张牌，然后将其交给一名角色。",
			"xinfu_jiyuan":"急援",
			"xinfu_jiyuan_info":"当一名角色进入濒死状态时，或你交给一名其他角色牌时，你可以令其摸一张牌。",
			ganglie_three:'刚烈',
			ganglie_three_info:'当你受到伤害后，你可令一名敌方角色判定。若结果不为♥，其弃置两张牌或受到来自你的1点伤害。',
			zhongyi:'忠义',
			zhongyi2:'忠义',
			zhongyi_info:'限定技，出牌阶段，你可以将一张牌置于武将牌上。你的武将牌上有〖忠义〗牌时，己方角色使用【杀】造成的伤害+1。下轮游戏开始时，你将〖忠义〗牌置入弃牌堆。',
			zhanshen:'战神',
			glyptic_water:'Water',
			glyptic_skyearth:'SkyEarth',
			glyptic_metal:'Metal',
			glyptic_flora:'Flora',
			zhanshen_info:'觉醒技，准备阶段，若场上有已死亡的其他己方角色且你已受伤，则你弃置装备区的武器牌，减1点体力上限，获得技能〖马术〗和〖神戟〗。',
			shenji:'神戟',
			shenji_info:'锁定技，你使用【杀】指定的目标数上限+2，次数上限+1。',
			rewangzun:'妄尊',
			rewangzun2:'妄尊',
			rewangzun_info:'锁定技，一名其他角色的准备阶段开始时，若其体力值大于你，你摸一张牌。然后若其身份为主公/主帅/君主/地主且明置，则你摸一张牌，且其本回合的手牌上限-1。',
			retongji:'同疾',
			retongji_info:'攻击范围内包含你的角色成为【杀】的目标时，若你不是此【杀】的使用者或目标，其可弃置一张牌，然后将此【杀】转移给你。',
			
			standard_2008:"2008版标准包",
			standard_2013:"2013版标准包",
			standard_2019:"2019版标准包",
		},
	};
});

////////////////////////////////////////////////////////////////
///   Black NotePad - 4/20/2022 3:56:07 PM - Not activated   ///
////////////////////////////////////////////////////////////////