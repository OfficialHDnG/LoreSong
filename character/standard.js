
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
			//SGS glow color do light concept, 3 ability lol weave, set up who to ult, ult has no elemental,
		//	zhugeliang:['male',' ','2372137/2372137',['roars','XXroundm','los','endgold','comeback','ushone','erbfuture','rvolg','jud','jud','rvol','upp','bosshan','atk','lvroarsha','lvsha','twa','twr','twg','twx','barinit','lowphpd','lowphph','bordert','rbfuture','rba','drawr','scant','ets','styli','xdmgtest','xchk','xbg','pmen','pstart','mcslsecret','pas','pr','cho','pure','conv','xcoinm','conbg','chaoli','infshone','dust','actr','xMV','rcomb','rs','emp','etn','etw','rearthr','renem','turnm','conboss','rearth2','xko','hund','aglyptic_ocean','awind2','glyptic','xglyptic_carve','start','au','gu','xu','xStill','rbg','rsbg','rgibg','abg','asbg','agibg','gbg','gsbg','xbg','xsbg','st','et','nt','ht','introgl','bak']],
			
				//zhaoyun:['female',' ','1357720/1357720',['airson','los','endgold','comeback','uea','jud','abfuture','eabfuture','aedqi','jud','XXedenn','XXaemark','aedep','bosshan','atk','twa','twa','twr','twg','twx','barinit','lowphpd','lowphph','bordert','glinit','aba','drawa','scant','styli','pmen','pstart','mcslsecret','pas','pa','cho','pure','conv','xcoinp','xcoinm','conbg','glinit','infshone','xcoinp','xcoinm','dust','turnm','as','acomb','emp','ets','etn','etw','xairshan','aenem','conboss','glyptic','actw','xko','hund','rearth2','awind2','act','aglyptic_ocean','glyptic_carve','start','gu','ru','xu','xStill','rbg','rsbg','rgibg','abg','asbg','agibg','gbg','gsbg','xbg','xsbg','st','et','nt','ht','introgl','bak']],
			
			//	machao:['male',' ','1971911/1971911',['goldenage','los','endgold','comeback','XGoldCast','jud','gabfuture','egabfuture','gjudp','bosshan','atk','lvsha','twa','twr','twg','twx','barinit','lowphpd','lowphph','bordert','gbfuture','gba','drawg','scant','styli','pmen','pstart','mcslsecret','pas','pg','cho','pure','conv','conbg','infshone','dust','turnm','gs','gcomb','emp','ets','etn','genem','conboss','awind2','xko','hund','rearth2','aglyptic_ocean','glyptic','gb','start','ru','au','glyptic_carve','xu','xStill','rbg','rsbg','rgibg','abg','asbg','agibg','gbg','gsbg','xbg','xsbg','st','et','nt','ht','introgl','bak']],
		
				//sunquan:['female',' ','1182383/1182383',['x','los','endgold','comeback','xbfuture','exbfuture','uhealon','xsolve','jud','xtsup','bosshan','atk','twa','twr','twg','twx','barinit','lowphpd','lowphph','bordert','XXsolve','pin','drawx','XXhpscan','scant','pmen','pstart','mcslsecret','pas','px','cho','pure','conv','conbg','turnm','infshone','dust','xs','xcomb','emp','ets','etw','xenem','conboss','glyptic','awind2','xko','hund','rearth2','start','ru','start','gu','glyptic_carve','au','xStill','rbg','rsbg','rgibg','abg','asbg','agibg','gbg','gsbg','xbg','xsbg','st','et','nt','ht','introgl','bak']],
				zhugeliang:['male',' ','2372137/2372137',['roars','pstart']],
			
				zhaoyun:['male',' ','2372137/2372137',['airson','pstart']],
				machao:['male',' ','2372137/2372137',['goldenage','pstart']],
				sunquan:['male',' ','2372137/2372137',['x','pstart']],
//

				
		},
		characterIntro:{
				zhugeliang:'政落彻 · 정한결</br>',
				zhaoyun:'信基永 · 신기용</br>',
				machao:'金花流年 · 김구</br>',
				sunquan:'玄明准 · 현명준</br>',	}, 
		perfectPair:{
			ganning:['lingtong','xf_sufei'],
		},
		skill:{


			goldd:{
				forced:true,
	filter:function(event,player){
		if(game.countPlayer()==4) return true;
		return false;
	},

			},

roundm:{
	enable:'phaseUse',
	content:function(){		
		ui.roundmenu=ui.create.div('#roundmenu.roundarenabutton.menubutton.round',ui.arena);
		ui.roundmenu._position=[180,210];
		ui.create.div(ui.roundmenu);

},},






			huoxin:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(game.countPlayer()<3) return false;
					for(var i of lib.suit){
						if(player.countCards('h',{suit:i})>1) return true;
					}
					return false;
				},
				complexCard:true,
				position:'h',
				filterCard:function(card,player){
					if(!ui.selected.cards.length){
						var suit=get.suit(card);
						return player.countCards('h',function(card2){
							return card!=card2&&get.suit(card2,player)==suit;
						})>0;
					}
					return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
				},
				selectCard:2,
				selectTarget:2,
				filterTarget:lib.filter.notMe,
				multitarget:true,
				multiline:true,
				delay:false,
				check:function(card){
					return 6-get.value(card);
				},
				targetprompt:['拼点发起人','拼点目标'],
				content:function(){
					'step 0'
					player.showCards(cards);
					'step 1'
					var target=targets[0];
					targets.sortBySeat();
					if(target!=targets[0]) cards.reverse();
					for(var i=0;i<targets.length;i++){
						targets[i].gain(cards[i],player,'visible');
						player.$give(cards[i],targets[i]);
					}
					'step 2'
					if(targets[0].canCompare(targets[1])){
						targets[0].chooseToCompare(targets[1]);
					}
					else event.finish();
					'step 3'
					if(result.winner!==targets[0]) targets[0].addMark('huoxin',1);
					if(result.winner!==targets[1]) targets[1].addMark('huoxin',1);
				},
				marktext:'魅',
				intro:{
					name:'魅惑',
					name2:'魅惑',
					content:'mark',
				},
				group:'huoxin_control',
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.hasMark('huoxin')) return -2;
							return -1;
						},
					},
				},
			},
			huoxin_control:{
				audio:'huoxin',
				forced:true,
				trigger:{global:'phaseBeginStart'},
				filter:function(event,player){
					return player!=event.player&&!event.player._trueMe&&event.player.countMark('huoxin')>0;
				},
				logTarget:'player',
				skillAnimation:true,
				animationColor:'key',
				content:function(){
					trigger.player.removeMark('huoxin',trigger.player.countMark('huoxin'));
					trigger.player._trueMe=player;
					game.addGlobalSkill('autoswap');
					if(trigger.player==game.me){
						game.notMe=true;
						if(!_status.auto) ui.click.auto();
					}
					trigger.player.addSkill('huoxin2');
				},
			},
			huoxin2:{
				trigger:{
					player:['phaseAfter','dieAfter'],
					global:'phaseBefore',
				},
				lastDo:true,
				charlotte:true,
				forceDie:true,
				forced:true,
				silent:true,
				content:function(){
					player.removeSkill('huoxin2');
				},
				onremove:function(player){
					if(player==game.me){
						if(!game.notMe) game.swapPlayerAuto(player._trueMe)
						else delete game.notMe;
						if(_status.auto) ui.click.auto();
					}
					delete player._trueMe;
				},
			},

		
			xgult:{
				audio:2,
				audioname:['re_caiwenji'],
				trigger:{global:'phaseBegin'},
				//filter:function(event,player){
				//	return (event.card&&event.card.name=='sha'&&event.source&&
				//		event.player.classList.contains('dead')==false&&player.countCards('he'));
				//},
				direct:true,
				checkx:function(event,player){
					var att1=get.attitude(player,event.player);
					var att2=get.attitude(player,event.source);
					return att1>0&&att2<=0;
				},
				preHidden:true,
				content:function(){
					"step 0"
					var next=player.chooseToDiscard('he',get.prompt2('beige',trigger.player));
					var check=lib.skill.beige.checkx(trigger,player);
					next.set('ai',function(card){
						if(_status.event.goon) return 8-get.value(card);
						return 0;
					});
					next.set('logSkill','beige');
					next.set('goon',check);
					next.setHiddenSkill('beige');
					"step 1"
					if(result.bool){
						trigger.player.judge();
					}
					else{
						event.finish();
					}
					"step 2"
					switch(result.suit){
						case 'diamond':trigger.player.recover(1000);break;
						case 'club':trigger.player.draw(5);break;
						case 'spade':trigger.player.chooseToDiscard('h',7,true);break;
						case 'heart':trigger.player.damage(3000);break;
					}
				},
				ai:{
					expose:0.3
				}
			},

			xauult:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					var card=get.cards()[0];
					game.cardsGotoOrdering(card);
					event.cards=[card];
					event.num=get.number(card,false);
					player.showCards(card,get.translation(player)+'发动了【吉占】');
					'step 1'
					var str=get.strNumber(num);
					player.chooseControl('>'+str,'<'+str,'cancel2').set('prompt','吉占：猜测下一张牌的点数').set('choice',num<7?0:1).set('ai',()=>_status.event.choice);
					'step 2'
					var card=get.cards()[0];
					game.cardsGotoOrdering(card);
					event.cards.push(card);
					var num=get.number(card,false);
					if(num>event.num&&result.index==0||num<event.num&&result.index==1){
						event.num=num;
						event.goto(1);
					}
					player.showCards(card);
					'step 3'
					player.gain(cards,'gain2');
				},
			},


			xrult:{
				audio:2,
				trigger:{source:'damageAfter'},
				direct:true,
				unique:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('jidian'),function(card,player,target){
						//return get.distance(trigger.player,target)<=1&&trigger.player!=target;
						return get.distance(trigger.player,target)<=9;
					}).ai=function(target){
						return get.damageEffect(target,player,player,'thunder')+0.1;
					}
					"step 1"
					if(result.bool){
						event.target=result.targets[0];
						event.target.judge(function(card){
							return get.color(card)=='red'?0:-1;
						})
						player.logSkill('jidian',event.target,false);
						trigger.player.line(event.target,'thunder');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.color=='black'){
						event.target.damage(700);
					}
				}
			},


			xapult:{
				enable:'phaseUse',
				direct:true,
				filterCard:function(card){
					return get.suit(card)=='club';
				},
				filter:function(event,player){
					return player.countCards('hes',{suit:'club'})>0&&game.hasPlayer(function(current){
						return current!=player&&player.canCompare(current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('nsfeixiong'),function(card,player,target){
						return player!=target&&player.canCompare(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						var hs=player.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						var ts=target.getCards('h').sort(function(a,b){
							return b.number-a.number;
						});
						if(!hs.length||!ts.length) return 0;
						if(hs[0].number>ts[0].number) return get.damageEffect(target,player,player);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('nsfeixiong',target);
						player.chooseToCompare(target);
					}
					else event.finish();
					'step 2'
					if(!result.tie){
						var targets=[player,target];
						if(result.bool) targets.reverse();
						targets[0].damage(targets[0],1000);
					}
				},
			},


			xasult:{
				enable:'phaseUse',
				filterCard:function(card){
					return get.suit(card)=='spade';
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return !current.isUnderControl(true,player)&&current!=player.storage.lieqi&&current.countCards('h')&&player.countCards('hes',{suit:'spade'})>0&&lib.config.rb>=1;
					});
				},
				direct:true,
			
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('lieqi'),function(card,player,target){
						return !target.isUnderControl(true,player)&&target!=player.storage.lieqi&&target.countCards('h');
					}).ai=function(){
						return 1;
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('lieqi',target);
						if(event.triggername=='phaseBegin'){
							player.storage.lieqi=target;
						}
						var hs=target.getCards('h').randomSort();
						if(hs.length){
							var list2=[];
							for(var i=0;i<hs.length;i++){
								if(list2.contains(hs[i].name)){
									hs.splice(i--,1);
								}
								else{
									list2.push(hs[i].name);
								}
							}
							var card=hs.randomGet();
							var list=[];
							for(var i=0;i<lib.inpile.length;i++){
								if(!list2.contains(lib.inpile[i])&&
									(get.type(lib.inpile[i])!='equip'||Math.random()<0.5)){
									list.push(lib.inpile[i]);
								}
							}
							event.card=card;
							player.chooseCardButton(true,'猜测哪张牌为'+get.translation(target)+'的手牌',
							[card,game.createCard(list.randomRemove()),game.createCard(list.randomRemove())].randomSort()).ai=function(button){
								if(get.value(button.link)<0) return -10;
								if(_status.event.getRand()<0.7){
									return button.link==card?1:-1;
								}
								else{
									return button.link==card?-1:1;
								}
							};
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					if(event.triggername=='phaseEnd'){
						delete player.storage.lieqi;
					}
					'step 2'
					if(result.bool&&result.links){
						if(result.links[0]==event.card){
							player.recover(1000);
						}
						else{
							player.viewCards('正确答案',[event.card]);
						}
					}
				},
				ai:{
					threaten:1.5
				}
			},


			


			xayult:{
				//yingbian.js
				audio:2,
				filter:function(event,player){
					return lib.config.rb>=1;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='heart'||'diamond'||'heart'||'spade';
			
				},
				position:'hes',
				viewAs:{name:'chuqibuyi'},
				prompt:'Healon:Gardener',
				//check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},



			xacult:{
				//sp.js
				audio:2,
				filter:function(event,player){
					return player.countCards('hes',{suit:'heart'})>0&&lib.config.rb>=1;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='heart';
				},
				position:'hes',
				viewAs:{name:'fulei'},
				prompt:'Healon:Gardener',
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},




			jianfanCOR:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return target.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					player.chooseControl('heart2','diamond2','club2','spade2').set('ai',function(event){
						switch(Math.floor(Math.random()*6)){
							case 0:return 'heart2';
							case 1:case 4:case 5:return 'diamond2';
							case 2:return 'club2';
							case 3:return 'spade2';
						}
					});
					"step 1"
					game.log(player,'选择了'+get.translation(result.control));
					event.choice=result.control;
					player.popup(event.choice);
					event.card=target.getCards('h').randomGet();
					player.gain(event.card,player,'give');
					game.delay();
					"step 2"
					if(get.suit(event.card)+'2'!=event.choice) player.damage('nocard');
				},
				ai:{
					order:1,
			result:{
						player:function(player,target){
							var eff=get.damageEffect(player,target);
							if(eff>=0) return 1+eff;
							var value=0,i;
							var cards=target.getCards('h');
							for(i=0;i<cards.length;i++){
								value+=get.value(cards[i]);
							}
							value/=target.countCards('h');
							if(player.hp==1) return Math.min(0,value-7);
							return Math.min(0,value-5);
						}
					}
				}
			},





			color:{
				//init:function(player){
				//	player.storage.miejing=false;
				//},
				enable:'phaseUse',
				//filter:function(event,player){
				//	//if(player.maxHp<=1) return false;
				//	return !player.storage.miejing
				//},
				//intro:{
				//	content:'limited'
				//},
				//mark:true,
				line:'thunder',
				filterTarget:function(card,player,target){
					return player!=target;
				},
				selectTarget:1,
				//selectTarget:-1,
				delay:false,
				contentBefore:function(){
					'step 0'
					game.delayx();
					'step 1'
					var cards=player.getCards('hej');
					for(var i=0;i<cards.length;i++){
						if(get.number(cards[i])!='5'){
							cards.splice(i,1);i--;
						}
					}
					cards.sort(lib.sort.random);
					player.discard(cards);
					//player.storage.miejing=true;
					//player.unmarkSkill('miejing');
				},
				content:function(){
					target.draw(4);
				}
			},





		







			ultima_ault:{
				enable:'phaseUse',
 prompt: 'Carve HDnG members GLYPTIC for special effect',
					  content:function(){
					 'step 0'

					 if(player.storage.ultima3>=15){
						var str = 'Choose Direction of Carving - Past: 1 Ocean, 2 Wind, 3 Thunder, 4 Light. Future: 5 StarEarth, 6 Blaze, 7 Flora.';
					  player.chooseControl(['Shones Mastodon'])
					  .set('prompt',str)}

if(player.storage.ultima3<=14&&player.storage.ultima3>=8){
					   var str = 'Choose Direction of Carving - Past: 1 Ocean, 2 Wind, 3 Thunder, 4 Light. Future: 5 StarEarth, 6 Blaze, 7 Flora.';
					 player.chooseControl(['Eas Fat Hamster','Nyeves Panda Team','Healons New Puppies','Ea & Staff Cat','Healons Phoenix'])
					 .set('prompt',str)}

					 if(player.storage.ultima3<=7&&player.storage.ultima3>=3){
						var str = 'Choose Direction of Carving - Past: 1 Ocean, 2 Wind, 3 Thunder, 4 Light. Future: 5 StarEarth, 6 Blaze, 7 Flora.';
					  player.chooseControl(['Nyeves Panda','Healons Bird','Nyeves Seal','Healons Puppy'])
					  .set('prompt',str)}


					  if(player.storage.ultima3>=0&&player.storage.ultima3<=2){
						var str = 'Choose Direction of Carving - Past: 1 Ocean, 2 Wind, 3 Thunder, 4 Light. Future: 5 StarEarth, 6 Blaze, 7 Flora.';
					  player.chooseControl(['Eas Hamster','Eas Cat','Shones Squirrel'])
					  .set('prompt',str)}

					 'step 1'
					 if(result && result.control){
						 var trans = {"Eas Hamster":'apet',"Eas Cat":'bpet',"Shones Squirrel":'cpet',"Nyeves Panda":'dpet',"Healons Bird":'epet',"Nyeves Seal":'fpet',"Healons Puppy":'gpet',"Eas Fat Hamster":'hpet',"Nyeves Panda Team":'ipet',"Healons New Puppies":'jpet',"Ea & Staff Cat":'kpet',"Nyeves Fat Seal":'lpet',"Healons Phoenix":'mpet',"Shones Mastodon":'npet'
						 };
						 player.addTempSkill(trans[result.control],{player:'phaseBegin'});
						 player.storage.ultima3-=2;
						 player.update();     
						
						 
					 }
				 },},




			apet:{
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return event.card.name=='shan';				},
					forced:true,
							content:function(){
						//trigger.directHit.addArray(game.players);
						var targets=player.getEnemies();
						if(targets.length){
							var target=targets.randomGet();
							target.addExpose(0.2);
							player.useCard({name:'juedou'},target,false);
						}					},					ai:{
						order:2.9,						result:{							player:1						}				}
				},

				bpet:{
					trigger:{player:['useCard','respond']},
					filter:function(event,player){
						return event.card.name=='shan';				},
						forced:true,
								content:function(){
							//trigger.directHit.addArray(game.players);
							var targets=player.getEnemies();
							if(targets.length){
								var target=targets.randomGet();
								target.addExpose(0.2);
								player.useCard({name:'sha'},target,false);
							}					},					ai:{
							order:2.9,						result:{							player:1						}				}
					},

			
					cpet:{
						trigger:{player:['useCard','respond']},
						filter:function(event,player){
							return event.card.name=='sha';				},
							forced:true,
									content:function(){
								//trigger.directHit.addArray(game.players);
								var targets=player.getEnemies();
								if(targets.length){
									var target=targets.randomGet();
									target.addExpose(0.2);
									player.useCard({name:'juedou'},target,false);
								}					},					ai:{
								order:2.9,						result:{							player:1						}				}
						},	
				
						dpet:{
							trigger:{player:['useCard','respond']},
							filter:function(event,player){
								return event.card.name=='wanjian';				},
								forced:true,
										content:function(){
									//trigger.directHit.addArray(game.players);
									var targets=player.getEnemies();
									if(targets.length){
										var target=targets.randomGet();
										target.addExpose(0.2);
										player.useCard({name:'juedou'},target,false);
									}					},					ai:{
									order:2.9,						result:{							player:1						}				}
							},	

							epet:{
								trigger:{player:['useCard','respond']},
								filter:function(event,player){
									return event.card.name=='nanman';				},
									forced:true,
											content:function(){
										//trigger.directHit.addArray(game.players);
										var targets=player.getEnemies();
										if(targets.length){
											var target=targets.randomGet();
											target.addExpose(0.2);
											player.useCard({name:'juedou'},target,false);
										}					},					ai:{
										order:2.9,						result:{							player:1						}				}
								},	
								
								fpet:{
									trigger:{player:['useCard','respond']},
									filter:function(event,player){
										return event.card.name=='wanjian';				},
										forced:true,
												content:function(){
											//trigger.directHit.addArray(game.players);
											var targets=player.getEnemies();
											if(targets.length){
												var target=targets.randomGet();
												target.addExpose(0.2);
												player.useCard({name:'sha'},target,false);
											}					},					ai:{
											order:2.9,						result:{							player:1						}				}
									},	



									fpet:{
										trigger:{player:['useCard','respond']},
										filter:function(event,player){
											return event.card.name=='nanman';				},
											forced:true,
													content:function(){
												//trigger.directHit.addArray(game.players);
												var targets=player.getEnemies();
												if(targets.length){
													var target=targets.randomGet();
													target.addExpose(0.2);
													player.useCard({name:'sha'},target,false);
												}					},					ai:{
												order:2.9,						result:{							player:1						}				}
										},	



										gpet:{
											trigger:{player:['useCard','respond']},
											filter:function(event,player){
												return event.card.name=='nanman';				},
												forced:true,
														content:function(){
													//trigger.directHit.addArray(game.players);
													var targets=player.getEnemies();
													if(targets.length){
														var target=targets.randomGet();
														target.addExpose(0.2);
														player.useCard({name:'sha'},target,false);
													}					},					ai:{
													order:2.9,						result:{							player:1						}				}
											},	


											hpet:{
												trigger:{global:['useCard','respond']},
												filter:function(event,player){
													return event.card.name=='shan';				},
													forced:true,
															content:function(){
														//trigger.directHit.addArray(game.players);
														var targets=player.getEnemies();
														if(targets.length){
															var target=targets.randomGet();
															target.addExpose(0.2);
															player.useCard({name:'juedou'},target,false);
														}					},					ai:{
														order:2.9,						result:{							player:1						}				}
												},	

												ipet:{
													trigger:{global:['useCard','respond']},
													filter:function(event,player){
														return event.card.name=='wanjian';				},
														forced:true,
																content:function(){
															//trigger.directHit.addArray(game.players);
															var targets=player.getEnemies();
															if(targets.length){
																var target=targets.randomGet();
																target.addExpose(0.2);
																player.useCard({name:'juedou'},target,false);
															}					},					ai:{
															order:2.9,						result:{							player:1						}				}
													},	


													jpet:{
														trigger:{global:['useCard','respond']},
														filter:function(event,player){
															return event.card.name=='nanman';				},
															forced:true,
																	content:function(){
																//trigger.directHit.addArray(game.players);
																var targets=player.getEnemies();
																if(targets.length){
																	var target=targets.randomGet();
																	target.addExpose(0.2);
																	player.useCard({name:'juedou'},target,false);
																}					},					ai:{
																order:2.9,						result:{							player:1						}				}
														},	

														kpet:{
															trigger:{global:['useCard','respond']},
															filter:function(event,player){
																return event.card.name=='shan';				},
																forced:true,
																		content:function(){
																	//trigger.directHit.addArray(game.players);
																	var targets=player.getEnemies();
																	if(targets.length){
																		var target=targets.randomGet();
																		target.addExpose(0.2);
																		player.useCard({name:'sha'},target,false);
																	}					},					ai:{
																	order:2.9,						result:{							player:1						}				}
															},	



															lpet:{
																trigger:{global:['useCard','respond']},
																filter:function(event,player){
																	return event.card.name=='wanjian';				},
																	forced:true,
																			content:function(){
																		//trigger.directHit.addArray(game.players);
																		var targets=player.getEnemies();
																		if(targets.length){
																			var target=targets.randomGet();
																			target.addExpose(0.2);
																			player.useCard({name:'sha'},target,false);
																		}					},					ai:{
																		order:2.9,						result:{							player:1						}				}
																},	



																
															mpet:{
																trigger:{global:['useCard','respond']},
																filter:function(event,player){
																	return event.card.name=='nanman';				},
																	forced:true,
																			content:function(){
																		//trigger.directHit.addArray(game.players);
																		var targets=player.getEnemies();
																		if(targets.length){
																			var target=targets.randomGet();
																			target.addExpose(0.2);
																			player.useCard({name:'sha'},target,false);
																		}					},					ai:{
																		order:2.9,						result:{							player:1						}				}
																},	

																sha:{
																	trigger:{global:['useCard','respond']},
																	filter:function(event,player){
																		return event.card.name=='nanman';				},
																		forced:true,
																				content:function(){
																			//trigger.directHit.addArray(game.players);
																			var targets=player.getEnemies();
																			if(targets.length){
																				var target=targets.randomGet();
																				target.addExpose(0.2);
																				player.useCard({name:'juedou'},target,false);
																			}					},					ai:{
																			order:2.9,						result:{							player:1						}				}
																	},	








			


		



	








			gbaseup:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
                    if(player==target) return false;
                    return true;
                },
                filter:function(event,player){
                        
                    return (player.countCards('h',{number:'1'})>=2||player.countCards('h',{number:'2'})>=2||player.countCards('h',{number:'3'})>=2||player.countCards('h',{number:'4'})>=2||player.countCards('h',{number:'5'})>=2||player.countCards('h',{number:'6'})>=2||player.countCards('h',{number:'7'})>=2)&& !game.hasPlayer(function(current){
                        return current.name1=='machao'||current.name2=='machao';
                    });
                },
				filterCard:true,
				selectCard:-1,
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					target.gain(cards,player,'giveAuto');
					var x=Math.floor(0.02*target.maxHp);
					target.maxHp-=x;
					//target.maxHp-=40000;
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(player.countCards('h')==player.countCards('h','du')) return -1;
							if(target.hasJudge('lebu')) return 0;
							if(get.attitude(player,target)>3){
								var basis=get.threaten(target);
								if(player==get.zhu(player)&&player.hp<=2&&player.countCards('h','shan')&&!game.hasPlayer(function(current){
									return get.attitude(current,player)>3&&current.countCards('h','tao')>0;
								})) return 0;
								if(target.countCards('h')+player.countCards('h')>target.hp+2) return basis*0.8;
								return basis;
							}
							return 0;
						}
					}
				}
			},



            gbaseupxxx:{
                enable:'phaseUse',
                usable:1,
                prepare:'give2',
                filterTarget:function(card,player,target){
                    if(player==target) return false;
                    return true;
                },
                filter:function(event,player){
                        
                    return (player.countCards('h',{number:'1'})>=2||player.countCards('h',{number:'2'})>=2||player.countCards('h',{number:'3'})>=2||player.countCards('h',{number:'4'})>=2||player.countCards('h',{number:'5'})>=2||player.countCards('h',{number:'6'})>=2||player.countCards('h',{number:'7'})>=2)&& !game.hasPlayer(function(current){
                        return current.name1=='machao'||current.name2=='machao';
                    });
                },
                filterCard:true,
                check:function(card){
                    if(card.name=='du') return 20;
                    return 7-get.value(card);
                },
                discard:false,
                content:function(){
					
                    target.gain(cards,player).delay=false;
                   var x=Math.floor(0.02*target.maxHp);
					//target.maxHp-=x;

                },
                ai:{
                    result:{
                        target:function(player,target){
                            if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
                                return -1;
                            }
                            return 1;
                        },
                    },
                    order:2
                }
            },









			healer:{
				intro:{
					content:'Current Mode：#'
				},
			mark:true,
			init:function(player){
				
				player.storage.healer=0;
				 },
forced:true,
	
				trigger:{global:'recoverAfter'},
				filter:function(event,player){
					return event.player!=player&&_status.currentPhase==player;
				},
				logTarget:'player',
				content:function(){
						player.storage.healer+=1;
					}
	
			},








			ultima3:{
				intro:{
					content:'Current Mode：#'
				},
			mark:true,
forced:true,
	
				trigger:{global:'recoverAfter'},
				filter:function(event,player){
					return event.player!=player&&_status.currentPhase==player;
				},
				logTarget:'player',
				content:function(){
						player.storage.ultima3+=1;
					}
	
			},



			rxult:{
				audio:2,
				forceaudio:true,
				group:['rxult2'],
				trigger:{global:'damageBegin4'},
				
						logTarget:'player',
				filter:function(event,player){
               //if(player.storage.ultima<=19000) return false;
			
                    if(lib.config.rau<=0) return false;
					if(event.source.isEnemyOf(player)) return false;
                return !game.hasPlayer(function(current){
                        return current.name1=='zhugeliang'||current.name2=='zhugeliang';
                   });
                },
		
			content:function(){
					trigger.player=player;
					var x=trigger.num;
					player.storage.ultima2+=x;
					player.storage.ultima-=375;
				},
				
			},


			rxult2:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou');
				},
				content:function(){
					var rxu=Math.floor(0.142857*player.storage.ultima2);
					trigger.getParent().baseDamage+=rxu;
				},
				
			},














ultima:{
	intro:{
		content:'Current Mode：#'
	},
mark:true,
forced:true,
popup:false,
group:['ultima2','ultima3','ultima_ault'],
init:function(player){
player.storage.ultima=1;
player.storage.ultima2=1;
player.storage.ultima3=0;
 },
trigger:{player:'changeHp'},

 content:function(event,player){

if(player.hasSkill('roars')&&player.hp%3==0){
		player.storage.ultima+=176;}

		if(player.hasSkill('roars')&&player.hp%7==0){
			player.storage.ultima+=176;}
			
			if(player.hasSkill('roars')&&player.hp%10==0){
				player.storage.ultima+=176;}

				if(player.hasSkill('airson')&&player.hp%7==0){
					player.storage.ultima+=148;}

					if(player.hasSkill('airson')&&player.hp%3==0){
						player.storage.ultima+=148;}

						if(player.hasSkill('airson')&&player.hp%5==0){
							player.storage.ultima+=148;}


							if(player.hasSkill('x')&&player.hp%3==0){
								player.storage.ultima+=120;}
			
								if(player.hasSkill('x')&&player.hp%2==0){
									player.storage.ultima+=120;}
			
									if(player.hasSkill('goldenage')&&player.hp%7==0){
										player.storage.ultima+=290;}
					
										if(player.hasSkill('goldenage')&&player.hp%9==0){
											player.storage.ultima+=290;}
					
											if(player.hasSkill('goldenage')&&player.hp%11==0){
												player.storage.ultima+=290;}
			

 }, },

 ultima2:{
trigger:{player:'phaseZhunbeiBegin'},
forced:true,
content:function(){
	if(game.roundNumber%4==1){
		player.storage.ultima+=375;}
}, },





rspirit:{
	trigger:{player:['useCard','respond']},
	direct:true,
	filter:function(event,player){
		//if(event.card.name=='sha') return true;
		if(event.card.name=='sha'&&player.countCards('h')>0) return true;
		return false;		
		},
				content:function(){
		'step 0'
		player.chooseToDiscard(get.prompt2('nuhour'),'he').set('ai',function(card){
			return 8-get.useful(card);
		}).set('logSkill','nuhour');
		'step 1'
		if(result.bool){
			var targets=player.getEnemies();
			if(targets.length){
			
				var xx=trigger.player.countCards('h',{name:'sha'});
				var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 1);
				var z=Math.min(lib.config.lvx,7777777);
				var x=Math.pow((Math.floor(Math. sqrt(z/777))),2);
				var target=targets.randomGet();
				game.delay(2);		
				player.line(target,'fire');
				player.$fullscreenpop('Roars SPIRIT!','metal');
					
				target.damage(10333+3333*xx);	
				game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">Roars appears!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/zhugeliang.png" height="106" width="60"></img></span>');	
				game.delay(2);
				target.damage(x+0.07);	



			}
		}
	},		
},

aspirit:{
	trigger:{player:['useCard','respond']},
	direct:true,
	filter:function(event,player){
		if(event.card.name=='shan') return true;
		return false;		
		},
				content:function(){
		'step 0'
		player.chooseToDiscard(get.prompt2('nuhoua'),'he').set('ai',function(card){
			return 8-get.useful(card);
		}).set('logSkill','nuhoua');
		'step 1'
		if(result.bool){
			var targets=player.getEnemies();
			if(targets.length){
								
				var xx=trigger.player.countCards('h',{name:'shan'});
				var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 1);
				var z=Math.min(lib.config.lva,7777777);
				var x=Math.pow((Math.floor(Math. sqrt(z/777))),2);
				var target=targets.randomGet();
				game.delay(2);		
				player.line(target,'fire');
				player.$fullscreenpop('Airson SPIRIT!','metal');
					
				target.damage(10333+7777*xx);	
				game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">Airson appears!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/zhaoyun.png" height="106" width="60"></img></span>');	
					game.delay(2);
				target.damage(x+0.07);	






			}
		}
	},		
},

gspirit:{
	trigger:{player:['useCard']},
	direct:true,
	filter:function(event,player){
		if(event.card.name=='wanjian') return true;
		return false;		
		},
				content:function(){
		'step 0'
		player.chooseToDiscard(get.prompt2('nuhoug'),'he').set('ai',function(card){
			return 8-get.useful(card);
		}).set('logSkill','nuhoug');
		'step 1'
		if(result.bool){
			var targets=player.getEnemies();
			if(targets.length){
				
				
				
				var xx=trigger.player.countCards('h',{name:'wanjian'});
				var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 1);
				var z=Math.min(lib.config.lvg,7777777);
				var x=Math.pow((Math.floor(Math. sqrt(z/777))),2);
				var target=targets.randomGet();
				game.delay(2);		
				player.line(target,'fire');
				player.$fullscreenpop('GoldenAge SPIRIT!','metal');
					
				target.damage(10333+9999*xx);	
				game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">GoldenAge appears!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/machao.png" height="106" width="60"></img></span>');	
					game.delay(2);
				target.damage(x+0.07);	






			}
		}
	},		
},

xspirit:{
	skillAnimation:true,
	animationColor:'fire',
	line:'fire',
	popup:false,
	trigger:{player:['useCard']},
	direct:true,
	filter:function(event,player){
		if(event.card.name=='nanman') return true;
		return false;		
		},
				content:function(){
		'step 0'
		player.chooseToDiscard(get.prompt2('nuhoux'),'he').set('ai',function(card){
			return 8-get.useful(card);
		}).set('logSkill','nuhoux');
		'step 1'
		if(result.bool){
			var targets=player.getEnemies();
			if(targets.length){
				var xx=trigger.player.countCards('h',{name:'nanman'});
				var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 1);
				var z=Math.min(lib.config.lvx,7777777);
				var x=Math.pow((Math.floor(Math. sqrt(z/777))),2);
				var target=targets.randomGet();
				game.delay(2);		
				player.line(target,'fire');
				player.$fullscreenpop('X SPIRIT!','metal');
					
				target.damage(10333+2222*xx);	
				game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">X is here!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/sunquan.png" height="106" width="60"></img></span>');	
				game.delay(2);
				target.damage(x+0.07);	
						
			}
		}
	},		
},










			rinit:{
				trigger:{player:['useCard','respond']},
				//enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha';
								return !game.hasPlayer(function(current){
										return current.name1=='zhaoyun'||current.name2=='zhaoyun';
									});
								},
								content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhour'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhour');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'sha'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},		
			},

	

			rault:{
			
				audio:2,
				usable:1,
				prompt:'Pinnacle to the Stars: Roars of StarEarth can gift all Pinnacle 🜎 LoreSongs to a Member. Star: Roars shares his HP with members; Earth: the member can now save +1 LoreSongs',
				enable:'phaseUse',
					direct:true,
					filter:function(event,player){
									if(lib.config.re<=0) return false;
						if(!player.countCards('he',function(card){
							return get.suit(card)=='spade';	  }))  return false;
							return !game.hasPlayer(function(current){
								return current.name1=='zhugeliang'||current.name2=='zhugeliang';
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
														   return get.suit(card)=='spade';
	
		
							});
							var target=result.targets[0];
							var types=[];
							for(var i=0;i<cards.length;i++){
								types.add(get.type(cards[i],'trick'));
							}
							player.logSkill('xyirang',target);
							target.gain(cards,player,'give');
							var x=Math.floor(player.hp/10);
							player.hp-=x;
							target.changeHujia(x);
							target.changeHujia(x);
							//target.maxHp+=1.5*x;
							//target.hp+=1.5*x;
							game.delay();
						}	
						
				
					}
				},
	
	
	
			

				ainit:{
					trigger:{player:['useCard','respond']},
					//enable:'phaseUse',
					direct:true,
					filter:function(event,player){
						return event.card.name=='shan';
									//return !game.hasPlayer(function(current){
									//		return current.name1=='zhaoyun'||current.name2=='zhaoyun';
									//	});
									},
									content:function(){
						'step 0'
						player.chooseToDiscard(get.prompt2('nuhour'),'he').set('ai',function(card){
							return 8-get.useful(card);
						}).set('logSkill','nuhour');
						'step 1'
	
						if(result.bool){
							var targets=player.getEnemies();
							if(targets.length){
								var xx=trigger.player.countCards('h',{name:'sha'});
								var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
								var target=targets.randomGet();
								player.line(target,'green');
								target.damage(77+475*xx+100*yy);
								
							}
						}
					},		
				},







			xxxainit:{
				trigger:{player:'phaseZhunbei'},
				direct:true,
				
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhoua'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhoua');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'shan'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},
				ai:{
					threaten:0.8,
					maixie:true,
					maixie_hp:true,
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								var nh=target.countCards('he');
								if(player.hasSkillTag('jueqing',false,target)||nh==0) return [1,-2];
								if(!target.hasFriend()||nh<=1) return;
								if(target.hp>=2) return [1,get.tag(card,'damage')*0.5];
							}
						}
					}
				}
			},




			ginit:{
				trigger:{player:['useCard','respond']},
				//enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					return event.card.name=='wanjian';
								//return !game.hasPlayer(function(current){
								//		return current.name1=='zhaoyun'||current.name2=='zhaoyun';
								//	});
								},
								content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhour'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhour');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'sha'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},		
			},





			xxxginit:{
				trigger:{player:'phaseZhunbei'},
				direct:true,
				
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhoug'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhoug');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'wanjian'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},
				ai:{
					threaten:0.8,
					maixie:true,
					maixie_hp:true,
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								var nh=target.countCards('he');
								if(player.hasSkillTag('jueqing',false,target)||nh==0) return [1,-2];
								if(!target.hasFriend()||nh<=1) return;
								if(target.hp>=2) return [1,get.tag(card,'damage')*0.5];
							}
						}
					}
				}
			},



			
			xinit:{
				trigger:{player:['useCard','respond']},
				//enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					return event.card.name=='nanman';
								//return !game.hasPlayer(function(current){
								//		return current.name1=='zhaoyun'||current.name2=='zhaoyun';
								//	});
								},
								content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhour'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhour');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'sha'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},		
			},


			xxxxinit:{
				trigger:{player:'phaseZhunbei'},
				direct:true,
				
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('nuhoux'),'he').set('ai',function(card){
						return 8-get.useful(card);
					}).set('logSkill','nuhoux');
					'step 1'

					if(result.bool){
						var targets=player.getEnemies();
						if(targets.length){
							var xx=trigger.player.countCards('h',{name:'nanman'});
							var yy=Math.min(Math.max(parseInt((game.roundNumber)), 1), 10);
							var target=targets.randomGet();
							player.line(target,'green');
							target.damage(77+475*xx+100*yy);
							
						}
					}
				},
				ai:{
					threaten:0.8,
					maixie:true,
					maixie_hp:true,
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								var nh=target.countCards('he');
								if(player.hasSkillTag('jueqing',false,target)||nh==0) return [1,-2];
								if(!target.hasFriend()||nh<=1) return;
								if(target.hp>=2) return [1,get.tag(card,'damage')*0.5];
							}
						}
					}
				}
			},



			
xflora:{
	//audio:'fengpo',
	//trigger:{player:'useCardToPlayered'},
	//logTarget:'target',
	//filter:function(event,player){
	//	return (event.card.name=='sha'||event.card.name=='juedou')&&event.targets.length==1&&event.target.countCards('h')>0&&lib.config.xf>=0;
	//},
	//onremove:true,
	//content:function(){
	//	'step 0'
	//	event.target=trigger.target;
	//	player.viewHandcards(trigger.target);
	//	'step 1'
		//var num=target.countCards('h',player.storage.twfengpo?{color:'black'}:{suit:'spade'});
	//	var num=target.countCards('h',{color:'black'});
	//	if(!num){
	//		event.finish();
	//		return;
	//	}
	//	event.num=num;
		//player.chooseControl().set('choiceList',[
		//	'摸'+num+'张牌',
		//	'令'+get.translation(trigger.card)+'的伤害值基数+'+num,
		//]);
	//	'step 2'
		//if(result.index==0) player.draw(num);
	//	trigger.getParent().baseDamage+=777*num;
	//},

},



aeath3:{
	
//	enable:'phaseUse',
//	usable:'4',
///	prompt:'If a Nyeve LoreSong is played, or returned, Ea:WishingStar returns 1 Nyeve LoreSong to you once you click Play! Ea:WishingStar can be used up to 4 times in one round. Ea:WishingStar also gives Airson of Earth the Power of Ea:Sisterhood. Each time you play a Strike or SkyWar, the target needs to play 2 LoreSongs to defend successfully.',
//	audio:'dangxian',
//	audioname:['guansuo','xin_liaohua'],
//	content:function(){
//		'step 0'
//		var card=get.discardPile(function(card){
//			return card.name=='wanjian';
//		});
//		if(card) player.gain(card,'gain2');
		
//	},
},

			aearth:{
				audio:'wushuang',
				group:['aearth2','aearth3'],
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target)&&lib.config.ae>=0;
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

	


			aearthX2:{
				audio:'wushuang',
				audioname:['re_lvbu','shen_lvbu','lvlingqi'],
				trigger:{player:'useCardToPlayered',target:'useCardToTargeted'},
				forced:true,
				logTarget:function(trigger,player){
					return player==trigger.player?trigger.target:trigger.player
				},
				filter:function(event,player){
					return event.card.name=='juedou'&&lib.config.ae>=0;
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


			alight:{
				
			},

		


			aocean:{
				
			},




			rthund:{
				
			},


	




			rblaze:{
		
			},


			rwind:{
			
				},
	


			glight:{
			//		trigger:{player:'phaseDrawBegin2'},
			//		//forced:true,
			//		filter:function(event,player){
			////			return !event.numFixed&&lib.config.gl>=0;
			//		},
			//		content:function(){
			//			var num=0;all=player.getAllHistory();
			//			if(all.length>1){
			//				for(var i=all.length-2;i>=0;i--){
			//					if(all[i].isMe){
			//						num+=all[i].useCard.length;
			//						break;
			//					}
			//				}
			//			}
			//			trigger.num+=num;
			//		},
				},



				
			gflora:{
				
				
			},


			gocean:{
				
			},



			xearth:{

			//	enable:'chooseToUse',
			//	content:function(){
			//		player.draw(5);
//
			//	
			//},	
			},


			xblaze:{
			//	audio:2,
			//	trigger:{
			//		player:'loseAfter',
			//		global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
			//	},
			//	frequent:true,
			//	filter:function(event,player){
			//		if(player.countCards('h')) return false;
			//		if(lib.config.xb<=0) return false;
			//		var evt=event.getl(player);
			//		return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
			//	},
			//	content:function(){
			//		player.draw();
			//	},
			//	ai:{
			//		threaten:0.8,
			//		effect:{
			////			target:function(card){
			//				if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
			//			}
			//		},
			//		noh:true,
			//		skillTagFilter:function(player,tag){
			//			if(tag=='noh'){
			//				if(player.countCards('h')!=1) return false;
			//			}
			//		}
			//	}
			},



			dux:{
				type:'basic',
				fullskin:true,
				global:['g_du','g_du_give'],
				content:function(){},
				ai:{
					value:function(card,player,i){
						if(player.hp<=1&&_status.currentPhase==player&&_status.event.getParent('phaseUse').name=='phaseUse'
						&&_status.event.name!='chooseButton'&&_status.event.name!='chooseCard'){
							return 100;
						}
						for(var i=0;i<10;i++){
							if(_status.event.getParent(i)&&_status.event.getParent(i).name=='chooseToCompare') return 100;
						}
						return -5;
					},
					useful:function(card,i){
						var player=_status.event.player
						if(player.hp<=1&&_status.currentPhase==player&&_status.event.getParent('phaseDiscard').name=='phaseDiscard'&&player.countCards('h','tao')+player.countCards('h','jiu')<=0){
							return 11;
						}
						return 6;
					},
					result:{
						player:function(player,target){
							if(player.hasSkillTag('usedu')) return 5;
							return -1;
						}
					},
					order:7.5
				},
			},





			twfengpox:{
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

			},






			hszuzhou_wushushike:{
				type:'hszuzhou',
				fullimage:true,
				vanish:true,
				enable:true,
				derivation:'hs_hajiasha',
				filterTarget:true,
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					event.targets=game.filterPlayer().sortBySeat();
					'step 1'
					if(event.targets.length){
						event.current=event.targets.shift();
						//var cards=event.current.getCards('h','nanman');
						if(cards.length){
							event.current.lose(cards)._triggered=null;
						}
						event.num=cards.length;
					}
					else{
						event.finish();
					}
					'step 2'
					var cards=[];
					for(var i=0;i<event.num;i++){
						cards.push(game.createCard('dux'));
					}
					event.current.directgain(cards);
					event.goto(1);
				},
				ai:{
					order:4,
					value:6,
					result:{
						player:function(player){
							if(!player.hasSha()&&player.countCards('h','shan')&&game.hasPlayer(function(current){
								return player.canUse('sha',current,true,true)&&get.effect(current,{name:'sha'},player,player)>0;
							})){
								return 1;
							}
							return 0;
						}
					}
				}
			},



			dufail:{
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return lib.config.rt>=1;
				},
				forced:true,
				content:function(){
					'step 0'
					var cards=player.getCards('h',function(card){
						return card.name=='hszuzhou_wushushike'||card._wxuying;
					});
					if(cards.length){
						player.lose(cards)._triggered=null;
					}
					'step 1'
					var card=game.createCard('hszuzhou_wushushike');
					card._modUseful=function(){
						return 7;
					};
					card._modValue=function(){
						return 7;
					};
					player.gain(card,'gain2');
				},
			
			},




			xocean:{
				//audio:2,
				//filter:function(event,player){
				//	return player.countCards('hes',{suit:'diamond'})>0&&lib.config.xo>=1;
				//},
				//enable:'chooseToUse',
				//filterCard:function(card){
				//	return get.suit(card)=='diamond';
				//},
			//	position:'hes',
			//	viewAs:{name:'dongzhuxianji'},
			//	prompt:'Healon:Gardener',
			//	check:function(card){return 6-get.value(card)},
			//	ai:{
			//		threaten:1.5
			//	}
			},


			gthund:{
			
			},


			rearthr:{
				trigger:{
                    global:'gameStart',
                    player:'enterGame',
                },
                forced:true,
				content:function(){
					player.storage.re2+=1;
				},
			
			},


			xehand:{
		
			mod:{
				maxHandcard:function(player,num){
					return num-player.hp+1;
				},
				},				
			},


			minhand:{
				mod:{
					maxHandcard:function(player,num){
						return 0;
					},
					
				},		
			},




			rearth2:{
				init:function(player){
				player.storage.re1=4;
				//player.storage.re2=0;
				//player.storage.re2=0;
				player.storage.re2=0;
			},
	
			mod:{
				maxHandcard:function(player,num){
					return num-player.hp+player.storage.re1;
				},
				cardUsable:function(card,player,num){
					if(card.name=='sha') return num+player.storage.re2;
				}
			},		
			
			},


		qiongskner:{
			mod:{
				maxHandcard:function(player,num){
					return num-player.hp+1;
				},
				
			},		

		},

		


		rearth:{
			usable:1,
			charlotte:true,
			skillAnimation:true,
			animationColor:'fire',
		prompt:'【Pinnacle to the Stars】</br></br>Roars can gift all Pinnacle 🜎 LoreSongs for special effect!',
		enable:'phaseUse',
		init:function(player){
			player.storage.rearth=0;
		},
			direct:true,
			filter:function(event,player){
				
				//if(lib.config.coin%47!=0||!_status.connectMode) return false;
				if(!player.countCards('he',function(card){
					return get.suit(card)=='club';	  }))  return false;
				if (lib.config.coin%47==0||_status.connectMode)  return true;	
				//return true;		
			},
			content:function(target,player){
				'step 0'
				player.chooseTarget(get.prompt2('rearth'),function(card,player,target){
					return player!=target;
				}).set('ai',function(target){
					return (get.attitude(_status.event.player,target)-2)*target.maxHp;
				});



				'step 1'
				if(result.bool){
					var cards=player.getCards('he',function(card){
												   return get.suit(card)=='club';

					});
					var target=result.targets[0];
					var types=[];
					for(var i=0;i<cards.length;i++){
						types.add(get.type(cards[i],'trick'));
					}
					player.logSkill('xyirang',target);
					target.gain(cards,player,'give');	

					if(game.roundNumber%2==1&&!target.hasSkill('enemy'))
					{
player.$fullscreenpop('Roars Earth ULT!','metal');
game.delay(2);
player.hp-=500000;
//target.hp+=50000;
target.recover(500000);
game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #ffffff , 0px 0px 7px #ffffff;text-color:black;">Grounded: Shone-Roars shares his HP with you!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/rearth.png" height="106" width="60"></img></span>');  
game.delay(2);
}

if(target.hasSkill('enemy'))
{
	player.$fullscreenpop('Roars ULT: Starfall','metal');
player.$fullscreenpop('黑鑽落徹','metal','dva.png');
game.delay(2);

var x=778*(player.storage.rearth);
target.damage(x);
game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #ffffff , 0px 0px 7px #ffffff;text-color:black;">Shone:"Let me be with you until the end."</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/rearth.png" height="106" width="60"></img></span>');  
game.delay(2);
var y=player.storage.rearth;
player.storage.rearth-=x;

}

if(game.roundNumber%2==0&&!target.hasSkill('enemy'))
{
	player.$fullscreenpop('Roars Star ULT!','metal');
					game.delay(2);
target.storage.re1+=1;
player.storage.rearth+=1;
game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #ffffff , 0px 0px 7px #ffffff;text-color:black;">Potential to the Stars: You can now hold more LoreSongs!</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/rearth.png" height="106" width="60"></img></span>');  
game.delay(2);
}				
			
					game.delay();
				}
			}
		},

				

			awind2:{
				forced:true,
				popup:false,
				trigger:{player:'phaseZhunbeiBegin'},
				init:function(player){
					player.storage.awind=0;
				},
				mark:true,
				filter:function(event,player){
					return player.storage.awind>=1;
					
					},
				content:function(player){
					'step 0'
					var x=player.storage.awind;
					player.recover(x*100);
					var t=x*100;
					game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">' + get.translation(player) + ' is healed by Ea for ' + t + ' HP!</span>');	
					game.delay(2);
					'step 1'
					game.broadcastAll('createDialog',event.videoId,' ');	
				


			},
		},







			awind:{
				direct:true,
				audio:2,
				usable:1,
				direct:true,
				filter:function(event,player){					
					//if(lib.config.coin%47!=0||!_status.connectMode) return false;
					if(!player.countCards('he',function(card){
						return get.suit(card)=='spade';	  }))  return false;
					if (lib.config.coin%53==0||_status.connectMode)  return true;	
					//return true;		
				},
				prompt:'Airson of Wind can gift all Slums ⚶ LoreSongs to a Member. The Member will start heal every round',
				enable:'phaseUse',
			
					content:function(){
						'step 0'
						player.chooseTarget(get.prompt2('awind'),function(card,player,target){
							return player!=target;
						}).set('ai',function(target){
							return (get.attitude(_status.event.player,target)-2)*target.maxHp;
						});
						'step 1'
						if(result.bool){
							var cards=player.getCards('he',function(card){
														   return get.suit(card)=='spade';
	
		
							});
							var target=result.targets[0];
							var types=[];
							for(var i=0;i<cards.length;i++){
								types.add(get.type(cards[i],'trick'));
							}
							player.logSkill('xyirang',target);
							target.gain(cards,player,'give');
							target.storage.awind+=371;
							game.delay();
						}
						'step 2'
					//	game.broadcastAll('createDialog',event.videoId,'<span style"text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;font-size:19px">Airson of Wind ULT</span>');
					//	game.delay(2);


					player.$fullscreenpop('Airson Wind ULT!','metal');
					game.delay(2);
					'step 3'
						game.broadcastAll('createDialog',event.videoId,'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">Ea guards over you..' +get.translation(target) +'</span></br></br><span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;opacity:0.7;"><img src="image/character/awind.png" height="106" width="60"></img></span>');	
						game.delay(2);
						'step 4'
						game.broadcastAll('createDialog',event.videoId,' ');	
						game.delay(1);



					}
				},
	





			xbaser:{
				enable:"phaseUse",
				position:"he",
				usable:3,
				prompt:'X can change 1~3 Pinnacle 🜎 Loresong to a new LoreSong for Roars',
				filter:function(event,player){
					if(lib.config.hausen<=0) return false;
					return !game.hasPlayer(function(current){
							return current.name1=='sunquan'||current.name2=='sunquan';
						});
					},
				filterCard:function (card){
					return get.suit(card)=='club';
				},
				selectCard:function (){
					var player=_status.event.player;
					
				},
				check:function (card){
					return 6-get.value(card)
				},
				delay:false,
				content:function (){
					player.draw(cards.length);
					
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},

			xbasea:{
				enable:"phaseUse",
				position:"he",
				usable:3,
				prompt:'X can change 1~3 Slums ⚶ Loresong to a new LoreSong for Airson',
				filter:function(event,player){
					if(lib.config.hausen<=0) return false;
					return !game.hasPlayer(function(current){
							return current.name1=='sunquan'||current.name2=='sunquan';
						});
					},
				filterCard:function (card){
					return get.suit(card)=='spade';
				},
				selectCard:function (){
					var player=_status.event.player;
					
				},
				check:function (card){
					return 6-get.value(card)
				},
				delay:false,
				content:function (){
					player.draw(cards.length);
					
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},








			heal:{
				enable:'phaseUse',
				usable:20,
				prepare:'give2',
				filterTarget:function(card,player,target){
					if(player==target) return false;
					return true;
				},
				filter:function(event,player){
						return !game.hasPlayer(function(current){
						return current.name1=='machao'||current.name2=='machao';
					});
				},
				filterCard:true,
				check:function(card){
					if(card.name=='du') return 20;
					return 7-get.value(card);
				},
				discard:false,
				content:function(){
					'step 0'
					target.gain(cards,player).delay=false;
					target.recover(1000);
					
				},
				ai:{
					result:{
						target:function(player,target){
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								return -1;
							}
							return 1;
						},
					},
					order:2
				}
			},









			xbaseg:{
				enable:"phaseUse",
				position:"he",
				usable:3,
				prompt:'X can change 1~3 Yemog ♛ Loresong to a new LoreSong for GoldenAge',
				filter:function(event,player){
					if(lib.config.hausen<=0) return false;
					return !game.hasPlayer(function(current){
							return current.name1=='sunquan'||current.name2=='sunquan';
						});
					},
				filterCard:function (card){
					return get.suit(card)=='diamond';
				},
				selectCard:function (){
					var player=_status.event.player;
					
				},
				check:function (card){
					return 6-get.value(card)
				},
				delay:false,
				content:function (){
					player.draw(cards.length);
					
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},




		

			rbase:{
				
				trigger:{player:'shaBegin'},
						
				filter:function(event,player){
								if(lib.config.hausen<=0) return false;
								return !game.hasPlayer(function(current){
										return current.name1=='zhugeliang'||current.name2=='zhugeliang';
									});
								},
				content:function(){
				player.recover(173);
				}
						},

			abase:{
				trigger:{player:['useCard','respond']},
				direct:true,
			
				filter:function(event,player){
					return event.card.name=='shan';
								return !game.hasPlayer(function(current){
										return current.name1=='zhaoyun'||current.name2=='zhaoyun';
									});
								},
								content:function(){
									"step 0"
									player.chooseTarget('Wind of Airson: Brings a LoreSong on the stage to you. Decide from which Member.',true,function(card,player,target){
										return player!=target&&target.countCards('h')>0;
									}).ai=function(target){
										return -get.attitude(player,target);
									};
									"step 1"
									if(result.targets&&result.targets.length){
										player.logSkill('qiangzheng',result.targets);
										player.gain(result.targets[0].getCards('h').randomGet(),result.targets[0]);
										result.targets[0].$give(1,player);
										game.delay();
									}
								},


						},


						glyptic_gbase:{
							enable:'phaseUse',
							usable:1,
							prepare:'give2',
							filterTarget:function(card,player,target){
								if(player==target) return false;
								return true;
							},
							filter:function(event,player){
									return !game.hasPlayer(function(current){
									return current.name1=='machao'||current.name2=='machao';
								});
							},
							filterCard:true,
							check:function(card){
								if(card.name=='du') return 20;
								return 7-get.value(card);
							},
							discard:false,
							content:function(){
								'step 0'
								target.gain(cards,player).delay=false;
								
								'step 1'
								if(target.hp%2==1){
								target.storage.glyptic2-=37		}
								else{
									target.storage.glyptic4-=37}
							},
							ai:{
								result:{
									target:function(player,target){
										if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
											return -1;
										}
										return 1;
									},
								},
								order:2
							}
						},



						xxglyptic_gbase:{
							enable:'phaseUse',
							usable:1,
							prepare:'give2',
							filter:function(event,player){
								if(player==target) return false;
								return !game.hasPlayer(function(current){
										return current.name1=='machao'||current.name2=='machao';
									});
								},
							filter:function(event,player){
								return player.countCards('h')>0;
							},
							filterCard:true,
							check:function(card){
								if(card.name=='du') return 20;
								return 7-get.value(card);
							},
							discard:false,
							content:function(){
								'step 0'
								target.gain(cards,player).delay=false;
								
								'step 1'
								//target.storage.glyptic2-=37;
							},
							ai:{
								result:{
									target:function(player,target){
										if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
											return -1;
										}
										return 1;
									},
								},
								order:2
							}
						},



					



						"xxxinfu_duanfa":{
							init:function (player){
								player.storage.xinfu_duanfa=0;
							},
							audio:2,
							enable:"phaseUse",
							position:"he",
							filter:function (card,player){
								return player.storage.xinfu_duanfa<player.maxHp;
							},
							filterCard:function (card){
								return get.color(card)=='black';
							},
							selectCard:function (){
								var player=_status.event.player;
								return [1,player.maxHp-player.storage.xinfu_duanfa];
							},
							check:function (card){
								return 6-get.value(card)
							},
							delay:false,
							content:function (){
								player.draw(cards.length);
								player.storage.xinfu_duanfa+=cards.length;
							},
							group:"xinfu_duanfa_clear",
							subSkill:{
								clear:{
									trigger:{
										player:"phaseBefore",
									},
									forced:true,
									silent:true,
									popup:false,
									content:function (){
										player.storage.xinfu_duanfa=0;
									},
									sub:true,
								},
							},
							ai:{
								order:1,
								result:{
									player:1,
								},
							},
						},





		
		zonghuo:{
			trigger:{source:'damageBefore'},
			direct:true,
			priority:10,
			filter:function(event){
				return event.nature!='fire';
			},
			content:function(){
				"step 0"
				player.chooseToDiscard(get.prompt('zonghuo')).ai=function(card){
					var att=get.attitude(player,trigger.player);
					if(trigger.player.hasSkillTag('nofire')){
						if(att>0) return 8-get.value(card);
						return -1;
					}
					if(att<0){
						return 7-get.value(card);
					}
					return -1;
				}
				"step 1"
				if(result.bool){
					player.logSkill('zonghuo',trigger.player,'fire');
					trigger.nature='fire';
				}
			}
		},










	bg:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin']},
forced:true,
				direct:true,
				content:function(){
ui.background.setBackgroundImage('image/background/x.jpg');
//game.saveConfig('image_background','z');
game.update;
},},


	gg:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin']},
forced:true,
				direct:true,
				content:function(){
ui.background.setBackgroundImage('image/background/z.jpg');
//game.saveConfig('image_background','z');
game.update;
},},

menu:{
				audio:2,
				unique:true,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				animationStr:'涅盘',
				limited:true,
				animationColor:'metal',
				init:function(player){
					player.storage.olniepan=false;
				},
				content:function(){
					'step 0'
					player.storage.olniepan=true;
					player.discard(player.getCards('hej'));
					'step 1'
					player.link(false);
					'step 2'
					player.turnOver(false);
					'step 3'
					player.draw(1);
					'step 4'
					if(player.hp<3){
						player.recover(3-player.hp);
					}
					'step 5'
					player.chooseControl('bazhen','rehuoji','rekanpo').set('prompt','选择获得一个技能').ai=function(){
						return ['rehuoji','bazhen'].randomGet();
					};
					'step 6'
					player.addSkillLog(result.control);
				},
				ai:{
					order:1,
					skillTagFilter:function(player,tag,target){
						if(player!=target||player.storage.olniepan) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp<=0) return 10;
							if(player.hp<=2&&player.countCards('he')<=1) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.olniepan) return 0.6;
					}
				},
				intro:{
					content:'limited'
				}
			},


gfuhun:{
				enable:'phaseUse',
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('gfuhun'),function(card,player,target){
						return target!=player&&target.countCards('h')>0;
					}).ai=function(target){
						return -get.attitude(player,target);
					}
					'step 1'
					if(result.bool){
						player.logSkill('gfuhun',result.targets);
						event.target=result.targets[0];
						player.chooseToCompare(event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						
	
//player.draw();
ui.clear();
					}
else{
	//target.draw();	
					}

				},
				ai:{
					expose:0.2,
					threaten:1.5
				}
			},


relieren:{
			direct:true,
				filter:function(event,player){
					return game.hasPlayer((current)=>(current!=player&&player.canCompare(current)));
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhibian'),'与一名其他角色进行拼点',function(card,player,target){
						return target!=player&&player.canCompare(target);
					}).set('ai',function(target){
						if(!_status.event.goon) return false;
						var att=get.attitude(player,target);
						if(att<0&&target.countCards('e',function(card){
							return player.canEquip(card)&&get.effect(player,card,target,player)>0;
						})) return -att/Math.sqrt(target.countCards('h'));
						if(!player.isDamaged()) return false;
						if(att<=0) return (1-att)/Math.sqrt(target.countCards('h'));
						return Math.sqrt(2/att*Math.sqrt(target.countCards('h')));
					}).set('goon',function(){
						if(!player.hasCard(function(card){
							return (card.number>=14-player.hp&&get.value(card)<=5);
						})) return false;
						return true;
					}());
				
					"step 1"
					if(result.bool){
						var card1=result.player;
						var card2=result.target;
						if(get.position(card1)=='d') trigger.target.gain(card2,'gain2');
						if(get.position(card2)=='d') player.gain(card1,'gain2');
target.maxHp-=1000;
ui.clear();
					}
					else{
						var card1=result.player;
						var card2=result.target;
						if(get.position(card1)=='d') trigger.target.gain(card2,'gain2');
						if(get.position(card2)=='d') player.gain(card1,'gain2');
player.maxHp-=1000;
					}
				}
			},


telisi:{
				
		trigger:{
					player:"dying",
				},

//
				forced:true,
forceDie:true,
				content:function(){
					'step 0'
					event.targets=player.getFriends();
					event.targets.add(player);
					event.targets.sortBySeat();
					'step 1'
					if(event.targets.length){
						player.line(event.targets.shift().die());
						event.redo();
					}
					'step 2'
					game.delay();
				},
				
				ai:{
					value:10,
					order:1,
					result:{
						player:1
					}
				}
			},


jidian:{
				audio:2,
				trigger:{source:'damageAfter'},
				direct:true,
				unique:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('jidian'),function(card,player,target){
						return get.distance(trigger.player,target)<=1;
					}).ai=function(target){
						return get.damageEffect(target,player,player,'thunder')+0.1;
					}
					"step 1"
					if(result.bool){
						event.target=result.targets[0];
						event.target.judge(function(card){
							return get.color(card)=='red'?0:-1;
						})
						player.logSkill('jidian',event.target,false);
						trigger.player.line(event.target,'thunder');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.color=='black'){
						event.target.damage('thunder');
					}
				}
			},


			xguult:{
				audio:'guanxing',
				audioname:['jiangwei','re_jiangwei','re_zhugeliang','gexuan','ol_jiangwei'],
				trigger:{global:['phaseZhunbeiBegin']},
				frequent:true,
				filter:function(event,player,name){
				
						return player.countCards('h')==4;
				
				
				},
				content:function(){
					"step 0"
player.damage(9999);
					//var num=game.countPlayer()<4?3:5;
					var cards=get.cards(7);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','观星：点击将牌移动到牌堆顶或牌堆底');
					next.processAI=function(list){
						var cards=list[0][1],player=_status.event.player;
						var target=(_status.event.getTrigger().name=='phaseZhunbei')?player:player.next;
						var att=get.sgn(get.attitude(player,target));
						var top=[];
						var judges=target.getCards('j');
						var stopped=false;
						if(player!=target||!target.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return (judge(b)-judge(a))*att;
								});
								if(judge(cards[0])*att<0){
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
								return (get.value(b,player)-get.value(a,player))*att;
							});
							while(cards.length){
								if((get.value(cards[0],player)<=5)==(att>0)) break;
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
					if(event.triggername=='phaseZhunbeiBegin'&&top.length==0){
						
player.recover(11111);
					}
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.updateRoundNumber();
					game.delayx();
				},
				subSkill:{
					on:{}
				}
			},



shuishi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
			filter:function(event,player){
					return player.countCards('h',{number:'7'})==0&&
player.countCards('h',{number:'5'})==0&&
player.countCards('h',{number:'6'})==0&&
player.countCards('h',{number:'10'})==0&&
						player.countCards('h',{number:'1'})==0;
				},
				filterTarget:true,
				content:function(){
					'step 0'
					//target.draw();
					'step 1'
					if(!result||!Array.isArray(result)||result.length!=1||get.itemtype(result[0])!='card'){
						event.finish();
						return;
					}
					var suit=get.suit(result[0]),hs=target.getCards('h');
					for(var i of hs){
						if(i!=result[0]&&get.suit(i,target)==suit){
							player.loseMaxHp();
							target.showHandcards();
							event.finish();
							return;
						}
					}
					player.gainMaxHp();
					'step 2'
					if(player.maxHp<10){
						player.chooseBool('是否继续发动【慧识】？');
					}
					else event.finish();
					'step 3'
					if(result.bool) event.goto(0);
				},
				ai:{
					order:0.5,
					result:{
						target:0.2,
						player:function(player,target){
							var list=[],hs=target.getCards('h');
							for(var i of hs) list.add(get.suit(i,target));
							if(list.length==0) return 0;
							if(list.length==1) return player.maxHp>2?0:-2;
							if(list.length==2) return player.maxHp>3?0:-2;
							return -2;
						},
					},
				},
			},




xruult:{
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





			eixial:{
				trigger:{global:['useCard','respond']},
					filter:function(event,player){
						return event.card&&event.card.color=='red';
					},
					forced:true,
		
					content:function(){
						//trigger.directHit.addArray(game.players);
						var targets=player.getEnemies();
						if(targets.length){
							var target=targets.randomGet();
							target.addExpose(0.2);
							player.useCard({name:'juedou'},target,false);
						}
					},
					ai:{
						order:2.9,
						result:{
							player:1
						}				}
				},
	


	eixiap:{
			trigger:{global:['useCard','respond']},
				filter:function(event,player){
					return event.card&&event.card.number<=7;
				},
				forced:true,
	
				content:function(){
					//trigger.directHit.addArray(game.players);
					var targets=player.getEnemies();
					if(targets.length){
						var target=targets.randomGet();
						target.addExpose(0.2);
						player.useCard({name:'juedou'},target,false);
					}
				},
				ai:{
					order:2.9,
					result:{
						player:1
					}				}
			},



	feixiac:{
		trigger:{global:['useCard','respond']},
		filter:function(event,player){
			return event.card.name=='sha';
		},
			forced:true,

			content:function(){
				//trigger.directHit.addArray(game.players);
				var targets=player.getEnemies();
				if(targets.length){
					var target=targets.randomGet();
					target.addExpose(0.2);
					player.useCard({name:'juedou'},target,false);
				}
			},
			ai:{
				order:2.9,
				result:{
					player:1
				}				}
		},


feixux:{
				trigger:{global:['useCard','respond']},

				filter:function(event,player){
					return event.card&&event.card.number==7;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				
				content:function(){
					//trigger.player.draw();
				},
				ai:{
					mingzhi:false,
					threaten:2,
					expose:0.2,
				}
			},



feixuox:{
				trigger:{global:['useCard','respond']},
	
				filter:function(event,player){
					return event.card&&event.card.number==7;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					//trigger.player.draw();
				},
				ai:{
					mingzhi:false,
					threaten:2,
					expose:0.2,
				}
			},

areal:{
               enable:'phaseUse',
			direct:true,
//filter:function(event,player){
//					return player.storage.glyptic==11;
	//			},
                content:function(){
                    'step 0'
                      var str = '请选择你的初始标记。';
                    player.chooseControl(['【ROARS】','【AIRSON】','【GOLDENAGE】','【X】'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = {                            "Roars":'boss_zhuyin','Airson':'zhaoyun','GoldenAge':'machao','X':'sunquan'
                        };
                        player.reinit(trans[result.control]);
						player.hp=player.maxHp;
player.update();                     
                    }
                },
},

breal:{
               enable:'phaseUse',
			   direct:true,
//filter:function(event,player){/
//					return player.storage.glyptic==9;
//				},
                content:function(){
                    'step 0'
                      var str = '请选择你的初始标记。';
                    player.chooseControl(['【ROARS】','【AIRSON】','【GOLDENAGE】','【X】'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = {                            "Roars":'zhugeliang','Airson':'zhaoyun','GoldenAge':'machao','X':'sunquan'
                        };
                     		
						player.reinit('mystery','machao');
						player.hp=player.maxHp;
player.update();                     
                    }
                },
},




sreal:{
                enable:'phaseUse',
   usable:3,

                content:function(event,player){
       if(player.storage.glyptic==13){              
 'step 0'
                      var str = '请选择你的初始标记。';
                    player.chooseControl(['【ROARS】','【AIRSON】','【GOLDENAGE】','【X】'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = {                            "Roars":'zhugeliang','Airson':'zhaoyun','GoldenAge':'machao','X':'sunquan'
                        };
                        player.reinit(trans[result.control]);
player.update();                     
                    } }

   if(player.storage.glyptic==9){              
 'step 0'
                      var str = '请选择你的初始标记。';
                    player.chooseControl(['【R】','【4】','【v】','【s】'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = {                            "Roars":'zhugeliang','Airson':'zhaoyun','GoldenAge':'machao','X':'sunquan'
                        };
                        player.reinit(trans[result.control]);
player.update();                     
                    } }
else{  player.damage(7); }




                },

},





maoding2:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{suit:'spade'})>1;
				},
				filterCard:{suit:'spade'},
				filterTarget:function(card,player,target){
				//	return !target.hujia; 
return target.hp>=0;
				},
				selectCard:1,
				// usable:1,
				content:function(){
var x=player.storage.glyptic*100;
					target.changeHujia(x);
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return 2/Math.max(1,Math.sqrt(target.hp));
						},
					},
				}
			},


maoding2:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{suit:'spade'})>1;
				},
				filterCard:{suit:'spade'},
				filterTarget:function(card,player,target){
				//	return !target.hujia;
return target.hp>=0;
				},
				selectCard:1,
				// usable:1,
				content:function(){
var x=player.storage.glyptic*100;
					target.changeHujia(x);
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return 2/Math.max(1,Math.sqrt(target.hp));
						},
					},
				}
			},


lanzhi_old:{
				trigger:{source:'damageBefore'},
				logTarget:'player',
				check:function(event,player){
					if(player.hp==1&&event.player.hp>1) return true;
					var eff=get.damageEffect(event.player,player,player);
					if(player.hp==player.maxHp) return eff<0;
					return eff<=0;
				},
				content:function(){
					trigger.num+=player.storage.glyptic;
				
				},
			},


		xuewei:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('xuewei'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						if(player==get.zhu(player)&&player.hp<=2) return 0;
						return get.attitude(player,target)-4;
					}).animate=false;
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xuewei');
						player.addTempSkill('xuewei2',{player:'phaseBegin'});
						player.storage.xuewei2=target;
					}
				},
				ai:{
					threaten:1.05,
				},
			},
			xuewei2:{
				audio:'xuewei',
				forced:true,
				onremove:true,
				trigger:{global:'damageBegin4'},
				charlotte:true,
				filter:function(event,player){
					return event.player==player.storage.xuewei2;
				},
				logTarget:'player',
				content:function(){
					player.removeSkill('xuewei2');
					trigger.cancel();
					player.damage(trigger.num,trigger.source||'nosource');
					if(trigger.source&&trigger.source.isIn()) trigger.source.damage(trigger.num,trigger.nature,player);
				},
			},


sheyi:{
				audio:2,
				trigger:{global:'damageBegin4'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.hp<player.hp&&player.countCards('he')>=Math.max(1,player.hp);
				},
				content:function(){
					'step 0'
					var num=Math.max(1,player.hp),target=trigger.player;
					player.chooseCard('he',get.prompt('sheyi',target),'交给其至少'+get.cnNumber(num)+'张牌，防止即将受到的伤害（'+trigger.num+'点）',[num,player.countCards('h')]).set('goon',function(){
						if(get.attitude(player,target)<0) return false;
						if(trigger.num<target.hp&&get.damageEffect(target,trigger.source,player,trigger.nature)>=0)	return false;
						if(trigger.num<2&&target.hp>trigger.num) return 6/Math.sqrt(num);
						if(target==get.zhu(player)) return 9;
						return 8/Math.sqrt(num);
					}()).set('ai',function(card){
						if(ui.selected.cards.length>=Math.max(1,_status.event.player.hp)) return 0;
						if(typeof _status.event.goon=='number') return _status.event.goon-get.value(card);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('sheyi',target);
						target.gain(result.cards,player,'giveAuto');
						trigger.cancel();
					}
				},
			},


			kuangcai:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return !event.player.isMad();
				},
				content:function(){
					game.broadcastAll(function(player){
						player.forceCountChoose={phaseUse:5};
					},player)
					player.addSkill('kuangcai_use');
					player.addSkill('kuangcai_cancel');
					//ui.auto.hide();
				},
				subSkill:{
					use:{
						mod:{
							cardUsable:function(card){
								if(get.info(card)&&get.info(card).forceUsable) return;
								return Infinity;
							},
							targetInRange:function(){
								return true;
							},
							aiOrder:function(player,card,num){
								var name=get.name(card);
								if(name=='tao') return num+7+Math.pow(player.getDamagedHp(),2);
								if(name=='sha') return num+6;
								if(get.subtype(card)=='equip2') return num+get.value(card)/3;
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(!player.forceCountChoose||!player.forceCountChoose.phaseUse){
								return false;
							}
							return true;
						},
						content:function(){
							//player.draw(5);
							player.storage.glyptic+=100;
player.update();
if(player.forceCountChoose.phaseUse==1){
								var evt=event.getParent('phaseUse');
								if(evt) evt.skipped=true;
							}
							else game.broadcastAll(function(player){
								player.forceCountChoose.phaseUse--;
							},player);
						},
					},
					cancel:{
						trigger:{player:'phaseUseEnd'},
						priority:50,
						silent:true,
						charlotte:true,
						content:function(){
							game.broadcastAll(function(player){
								delete player.forceCountChoose;
							},player);
							//ui.auto.show();
							player.removeSkill('kuangcai_use');
							player.removeSkill('kuangcai_cancel');
						}
					}
				},
				ai:{
					threaten:4.5,
				},
			},


xult:{
enable:'phaseUse',
filter:function(event,player){
					if(game.roundNumber%2!=1) return false;
					if(lib.config.hausen<=0) return false;
				return !game.hasPlayer(function(current){
						return current.name1=='zhugeliang'||current.name2=='zhugeliang';
					});
				},
content:function(){
player.damage(100);
}
		},







xulttwo:{
enable:'phaseUse',
	filter:function(event,player){
					return lib.config.hausen>=100&&player.storage.glyptic==8;
				},
content:function(){
player.damage(100);
}
		},

xultthree:{
enable:'phaseUse',
	filter:function(event,player){
					return lib.config.hausen>=100&&player.storage.glyptic==8;
				},
content:function(){
player.damage(100);
}
		},



eight:{
enable:'phaseUse',
	filter:function(event,player){
					return lib.config.hausen>=100&&player.storage.glyptic==8;
				},
content:function(){
player.damage(100);
}
		},

one:{
enable:'phaseUse',
	filter:function(event,player){
					return lib.config.hausen>=100&&player.storage.glyptic==1;
				},
content:function(){
player.damage(100);
}
		},

three:{
enable:'phaseUse',
	filter:function(event,player){
					return lib.config.hausen>=100&&player.storage.glyptic==3;
				},
content:function(){
player.damage(100);
}
		},






		chaoli:{
			audio:2,
			enable:'phaseUse',
		usable:1,
//skillAnimation:true,
init:function(player){
player.storage.chaoli=1;
},


filter:function(event,player){
	return !game.hasPlayer(function(current){
		return current.name1=='boss_taotie'||current.name2=='boss_taotie'||current.name1=='boss_r'||current.name2=='boss_r'||current.name1=='boss_a'||current.name2=='boss_a'||current.name1=='boss_g'||current.name2=='boss_g'||current.name1=='boss_x'||current.name2=='boss_x';
	});
},	

//filter:function(event,player){
////	return player.storage.chaoli>=0&&game.hasPlayer(function(player){
//		return player.hp<player.maxHp/4;
//	})
//},
//charlotte:true,
prompt:'If there is a Boss in Critical HP on stage, use Roars Power to recovers its Gem! </br></br> Choose a target',

filterTarget:function(card,player,target){
//	if(!target.hasSex('male')) return false;
//if(target.hp>=target.maxHp/4) return false;
if(target==player) return false;
//if(!target.hasSkill('enemy')) return false;
return true;
},
			content:function(){
'step 0'
ui.background.setBackgroundImage('image/background/hdng.jpg');

game.broadcastAll('createDialog',event.videoId,'.');	
game.delay(1);

'step 1'
game.broadcastAll('createDialog',event.videoId,'..');	
game.delay(1);
'step 2'
game.broadcastAll('createDialog',event.videoId,'...');	
game.delay(1);
'step 3'
game.broadcastAll('createDialog',event.videoId,'If you get a gem, you will see it!');	
game.delay(3);


'step 4'

//if(target.group=='re'&&lib.config.coin%47!=0){

	if(target.group=='re'&&target.hp<=target.maxHp/4){
		ui.background.setBackgroundImage('image/background/wind.jpg');
player.$legend;
	var x=lib.config.coin;
	var y=47*x-x;
	game.changeCoin(y);	
//game.delay(3);
target.$dust;
player.$fullscreenpop('You gained NEW GEM!','metal');
game.delay(4);
game.broadcastAll('createDialog',event.videoId,'Find your new gem in Roars Intro!');	
game.delay(1);
}				

//if(target.group=='aw'&&lib.config.coin%53!=0){

	if(target.group=='aw'&&target.hp<=target.maxHp/4){
		ui.background.setBackgroundImage('image/background/wind.jpg');
	player.$legend;
//target.damage(11);
var x=lib.config.coin;
var y=53*x-x;
game.changeCoin(y);
////game.broadcastAll('createDialog',event.videoId,'You gained:');	
//game.delay(3);
target.$dust;
player.$fullscreenpop('You gained NEW GEM!','metal');
game.delay(4);
game.broadcastAll('createDialog',event.videoId,'Find your new gem in Airson Intro!');	
game.delay(1);
}	

else{
		//game.broadcastAll('createDialog',event.videoId,'You did not get a gem this time...');	
}

		
//'step 1'
//player.storage.chaoli-=2;
//ui.background.setBackgroundImage('image/background/wind.jpg');
//game.broadcastAll('createDialog',event.videoId,'<span style="">This target no longer has a gem</span>');

//game.broadcastAll('createDialog',event.videoId,'<span style="opacity: 0.5">  </span>');	
//game.delay(1);

//ui.background.setBackgroundImage('image/background/wind.jpg');

},},




longdan:{
				audio:'longdan_sha',
				audioname:['re_zhaoyun'],
	filter:function(event,player){
					return lib.config.hausen>=100;
				},

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
							//player.draw();
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


	guanxing:{
				audio:2,
				audioname:['jiangwei','re_jiangwei','re_zhugeliang'],
				trigger:{global:'phaseZhunbeiBegin'},
				frequent:true,
				preHidden:true,
		filter:function(event,player){
				
return player.countCards('h')==4;
				},

				content:function(){
					"step 0"
player.damage(9999);
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


glyptic_carve:{
               enable:'phaseUse',
prompt: 'Carve HDnG members GLYPTIC for special effect',
filter:function(event, player){
	return lib.config.coin<=-20;
},
direct:true,
usable:1,
                     content:function(){
                    'step 0'
					//game.animate.flame(10,10,700,'fire');
                      var str = '7 Elements of Yemog';
                    player.chooseControl(['2 Ocean','2 Wind','2 Thunder','2 Light','2 StarEarth','2 Blaze','2 Eden'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = { "2 Ocean":'glyptic_ocean',"2 Thunder":'glyptic_thund',"2 Wind":'glyptic_wind',"2 Light":'glyptic_light',
						"2 StarEarth":'glyptic_earth',"2 Blaze":'glyptic_blaze',"2 Eden":'glyptic_flora'
                        };
                       // player.addTempSkill(trans[result.control],{player:'phaseBegin'});
						player.addTempSkill(trans[result.control]);
						player.update();                     
                    }
                },},




glyptic_light:{
	enable:'phaseUse',
	
	usable:1,
filter:function(event,player){
		return player.countCards('h',{number:'4'})>0;
	},
	filterCard:function(card){
		return get.number(card)==4;
},
filterTarget:function(card,player,target){
	if(target.hasSkill('enemy'))return false;
	return true;

},
	position:'he',
	content:function(target){

	if(target.hasSkill('roars')){

switch(target.storage.glyptic){
			case target.storage.glyptic=77:
target.storage.glyptic-=76;
//target.storage.glyptic2+=37;
target.storage.glyptic25+=1;
target.node.avatar2.setBackground('rearth','character');
target.node.avatar.setBackground('rearth','character');
target.addSkill('earth');
target.addSkill('rearth');
target.update(); break;
			case target.storage.glyptic=1:
target.storage.glyptic+=9;
//target.storage.glyptic2+=37;
target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rwind','character');
target.node.avatar.setBackground('rwind','character');
target.removeSkill('earth');
target.addSkill('wind');
target.removeSkill('rearth');
target.addSkill('rwind');
target.update(); break;
			case target.storage.glyptic=10:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;
target.storage.glyptic26+=1;
target.node.avatar2.setBackground('rblaze','character');
target.node.avatar.setBackground('rblaze','character');
target.removeSkill('wind');
target.addSkill('blaze');
target.removeSkill('rwind');
target.addSkill('rblaze');
target.update(); break;
			case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic2+=37;
target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rthund','character');
target.node.avatar.setBackground('rthund','character');
target.removeSkill('blaze');
target.addSkill('thund');
target.removeSkill('rblaze');
target.addSkill('rthund');
target.update(); break;

			case target.storage.glyptic=7:
target.storage.glyptic-=6;
//target.storage.glyptic2+=37;
target.storage.glyptic25+=1;
target.node.avatar2.setBackground('rearth','character');
target.node.avatar.setBackground('rearth','character');
target.removeSkill('thund');
target.addSkill('earth');
target.removeSkill('rthund');
target.addSkill('rearth');
target.update(); break;	}
}
if(target.hasSkill('airson')){
switch(target.storage.glyptic){
			case target.storage.glyptic=77:
target.storage.glyptic-=70;
target.storage.glyptic22+=1;
target.node.avatar2.setBackground('awind','character');
target.node.avatar.setBackground('awind','character');
target.addSkill('wind');
target.addSkill('awind');
//target.storage.glyptic2+=37;
target.update(); break;
			case target.storage.glyptic=7:
target.storage.glyptic+=13;
//target.storage.glyptic2+=37;
target.storage.glyptic24+=1;
target.node.avatar2.setBackground('alight','character');
target.node.avatar.setBackground('alight','character');
target.removeSkill('wind');
target.addSkill('light');
target.removeSkill('awind');
target.addSkill('alight');
target.update(); break;
			case target.storage.glyptic=20:
target.storage.glyptic-=15;
//target.storage.glyptic2+=37;
target.storage.glyptic21+=1;
target.node.avatar2.setBackground('aocean','character');
target.node.avatar.setBackground('aocean','character');
target.removeSkill('light');
target.addSkill('ocean');
target.removeSkill('alight');
target.addSkill('aocean');

target.update(); break;
			case target.storage.glyptic=5:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('aearth','character');
target.node.avatar.setBackground('aearth','character');
target.removeSkill('ocean');
target.addSkill('earth');
target.removeSkill('aocean');
target.addSkill('aearth');

target.update(); break;
			case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic2+=37;

target.storage.glyptic22+=1;
target.node.avatar2.setBackground('awind','character');
target.node.avatar.setBackground('awind','character');
target.removeSkill('earth');
target.addSkill('wind');
target.removeSkill('aearth');
target.addSkill('awind');

target.update(); break;	}
}
if(target.hasSkill('goldenage')){
switch(target.storage.glyptic){
			case target.storage.glyptic=77:
target.storage.glyptic-=66;
//target.storage.glyptic2+=37;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('gthund','character');
target.node.avatar.setBackground('gthund','character');
target.addSkill('thund');
target.addSkill('gthund');

target.update(); break;
			case target.storage.glyptic=11:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('gflora','character');
target.node.avatar.setBackground('gflora','character');
target.removeSkill('thund');
target.addSkill('Eden');
target.removeSkill('gthund');
target.addSkill('gflora');

target.update(); break;
			case target.storage.glyptic=9:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('glight','character');
target.node.avatar.setBackground('glight','character');
target.removeSkill('Eden');
target.addSkill('light');
target.removeSkill('gflora');
target.addSkill('glight');

target.update(); break;
			case target.storage.glyptic=7:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('gocean','character');
target.node.avatar.setBackground('gocean','character');
target.removeSkill('light');
target.addSkill('ocean');
target.removeSkill('glight');
target.addSkill('gocean');

target.update(); break;
			case target.storage.glyptic=0:
target.storage.glyptic+=11;
//target.storage.glyptic2+=37;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('gthund','character');
target.node.avatar.setBackground('gthund','character');
target.removeSkill('ocean');
target.addSkill('thund');
target.removeSkill('gocean');
target.addSkill('gthund');

target.update(); break;	}
}
		if(target.hasSkill('x')){
switch(target.storage.glyptic){
			case target.storage.glyptic=77:
target.storage.glyptic-=75;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('xocean','character');
target.node.avatar.setBackground('xocean','character');
target.addSkill('ocean');
target.addSkill('xocean');

target.update(); break;
			case target.storage.glyptic=2:
target.storage.glyptic+=6;
//target.storage.glyptic2+=37;

target.storage.glyptic26+=1;
target.node.avatar2.setBackground('xblaze','character');
target.node.avatar.setBackground('xblaze','character');
target.removeSkill('ocean');
target.addSkill('blaze');
target.removeSkill('xocean');
target.addSkill('xblaze');


target.update(); break;
			case target.storage.glyptic=8:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('xflora','character');
target.node.avatar.setBackground('xflora','character');
target.removeSkill('blaze');
target.addSkill('Eden');
target.removeSkill('xblaze');
target.addSkill('xflora');

target.update(); break;
			case target.storage.glyptic=1:
target.storage.glyptic+=2;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('xearth','character');
target.node.avatar.setBackground('xearth','character');
target.removeSkill('Eden');
target.addSkill('earth');
target.removeSkill('xflora');
target.addSkill('xearth');

target.update(); break;
			case target.storage.glyptic=3:
target.storage.glyptic-=1;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('xocean','character');
target.node.avatar.setBackground('xocean','character');
target.removeSkill('earth');
target.addSkill('ocean');
target.removeSkill('xearth');
target.addSkill('xocean');

target.update(); break;
}
} 		
'step 1'
target.storage.glyptic20-=1;
'step 2'
if(target.storage.glyptic20>=0){
target.storage.glyptic2+=37; }   
'step 3'
target.update();    
},
	},







	glyptic_thund:{
		enable:'phaseUse',
		
		usable:1,
	filter:function(event,player){
			return player.countCards('h',{number:'3'})>0;
		},
		filterCard:function(card){
			return get.number(card)==3;
	},
	filterTarget:function(card,player,target){
		if(target.hasSkill('enemy'))return false;
		return true;

	},
		position:'he',
		content:function(target){
	
		if(target.hasSkill('roars')){
	
	switch(target.storage.glyptic){
				case target.storage.glyptic=77:
	target.storage.glyptic-=76;
	//target.storage.glyptic4+=37;
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('rearth','character');
	target.node.avatar.setBackground('rearth','character');
	target.addSkill('earth');
	target.addSkill('rearth');
	target.update(); break;
				case target.storage.glyptic=1:
	target.storage.glyptic+=9;
	//target.storage.glyptic4+=37;
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('rwind','character');
	target.node.avatar.setBackground('rwind','character');
	target.removeSkill('earth');
	target.addSkill('wind');
	target.removeSkill('rearth');
	target.addSkill('rwind');
	target.update(); break;
				case target.storage.glyptic=10:
	target.storage.glyptic-=7;
	//target.storage.glyptic4+=37;
	target.storage.glyptic26+=1;
	target.node.avatar2.setBackground('rblaze','character');
	target.node.avatar.setBackground('rblaze','character');
	target.removeSkill('wind');
	target.addSkill('blaze');
	target.removeSkill('rwind');
	target.addSkill('rblaze');
	target.update(); break;
				case target.storage.glyptic=3:
	target.storage.glyptic+=4;
	//target.storage.glyptic2+=37;
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('rthund','character');
	target.node.avatar.setBackground('rthund','character');
	target.removeSkill('blaze');
	target.addSkill('thund');
	target.removeSkill('rblaze');
	target.addSkill('rthund');
	target.update(); break;
	
				case target.storage.glyptic=7:
	target.storage.glyptic-=6;
	//target.storage.glyptic4+=37;
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('rearth','character');
	target.node.avatar.setBackground('rearth','character');
	target.removeSkill('thund');
	target.addSkill('earth');
	target.removeSkill('rthund');
	target.addSkill('rearth');
	target.update(); break;	}
	}
	if(target.hasSkill('airson')){
	switch(target.storage.glyptic){
				case target.storage.glyptic=77:
	target.storage.glyptic-=70;
	target.storage.glyptic22+=1;
	target.node.avatar2.setBackground('awind','character');
	target.node.avatar.setBackground('awind','character');
	target.addSkill('wind');
	target.addSkill('awind');
	//target.storage.glyptic4+=37;
	target.update(); break;
				case target.storage.glyptic=7:
	target.storage.glyptic+=13;
	//target.storage.glyptic4+=37;
	target.storage.glyptic24+=1;
	target.node.avatar2.setBackground('alight','character');
	target.node.avatar.setBackground('alight','character');
	target.removeSkill('wind');
	target.addSkill('light');
	target.removeSkill('awind');
	target.addSkill('alight');
	target.update(); break;
				case target.storage.glyptic=20:
	target.storage.glyptic-=15;
	//target.storage.glyptic4+=37;
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('aocean','character');
	target.node.avatar.setBackground('aocean','character');
	target.removeSkill('light');
	target.addSkill('ocean');
	target.removeSkill('alight');
	target.addSkill('aocean');
	
	target.update(); break;
				case target.storage.glyptic=5:
	target.storage.glyptic-=2;
	//target.storage.glyptic2+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('aearth','character');
	target.node.avatar.setBackground('aearth','character');
	target.removeSkill('ocean');
	target.addSkill('earth');
	target.removeSkill('aocean');
	target.addSkill('aearth');
	
	target.update(); break;
				case target.storage.glyptic=3:
	target.storage.glyptic+=4;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic22+=1;
	target.node.avatar2.setBackground('awind','character');
	target.node.avatar.setBackground('awind','character');
	target.removeSkill('earth');
	target.addSkill('wind');
	target.removeSkill('aearth');
	target.addSkill('awind');
	
	target.update(); break;	}
	}
	if(target.hasSkill('goldenage')){
	switch(target.storage.glyptic){
				case target.storage.glyptic=77:
	target.storage.glyptic-=66;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('gthund','character');
	target.node.avatar.setBackground('gthund','character');
	target.addSkill('thund');
	target.addSkill('gthund');
	
	target.update(); break;
				case target.storage.glyptic=11:
	target.storage.glyptic-=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic27+=1;
	target.node.avatar2.setBackground('gflora','character');
	target.node.avatar.setBackground('gflora','character');
	target.removeSkill('thund');
	target.addSkill('Eden');
	target.removeSkill('gthund');
	target.addSkill('gflora');
	
	target.update(); break;
				case target.storage.glyptic=9:
	target.storage.glyptic-=2;
	//target.storage.glyptic2+=37;
	
	target.storage.glyptic24+=1;
	target.node.avatar2.setBackground('glight','character');
	target.node.avatar.setBackground('glight','character');
	target.removeSkill('Eden');
	target.addSkill('light');
	target.removeSkill('gflora');
	target.addSkill('glight');
	
	target.update(); break;
				case target.storage.glyptic=7:
	target.storage.glyptic-=7;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic24+=1;
	target.node.avatar2.setBackground('gocean','character');
	target.node.avatar.setBackground('gocean','character');
	target.removeSkill('light');
	target.addSkill('ocean');
	target.removeSkill('glight');
	target.addSkill('gocean');
	
	target.update(); break;
				case target.storage.glyptic=0:
	target.storage.glyptic+=11;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('gthund','character');
	target.node.avatar.setBackground('gthund','character');
	target.removeSkill('ocean');
	target.addSkill('thund');
	target.removeSkill('gocean');
	target.addSkill('gthund');
	
	target.update(); break;	}
	}
			if(target.hasSkill('x')){
	switch(target.storage.glyptic){
				case target.storage.glyptic=77:
	target.storage.glyptic-=75;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('xocean','character');
	target.node.avatar.setBackground('xocean','character');
	target.addSkill('ocean');
	target.addSkill('xocean');
	
	target.update(); break;
				case target.storage.glyptic=2:
	target.storage.glyptic+=6;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic26+=1;
	target.node.avatar2.setBackground('xblaze','character');
	target.node.avatar.setBackground('xblaze','character');
	target.removeSkill('ocean');
	target.addSkill('blaze');
	target.removeSkill('xocean');
	target.addSkill('xblaze');
	
	
	target.update(); break;
				case target.storage.glyptic=8:
	target.storage.glyptic-=7;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic27+=1;
	target.node.avatar2.setBackground('xflora','character');
	target.node.avatar.setBackground('xflora','character');
	target.removeSkill('blaze');
	target.addSkill('Eden');
	target.removeSkill('xblaze');
	target.addSkill('xflora');
	
	target.update(); break;
				case target.storage.glyptic=1:
	target.storage.glyptic+=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('xearth','character');
	target.node.avatar.setBackground('xearth','character');
	target.removeSkill('Eden');
	target.addSkill('earth');
	target.removeSkill('xflora');
	target.addSkill('xearth');
	
	target.update(); break;
				case target.storage.glyptic=3:
	target.storage.glyptic-=1;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('xocean','character');
	target.node.avatar.setBackground('xocean','character');
	target.removeSkill('earth');
	target.addSkill('ocean');
	target.removeSkill('xearth');
	target.addSkill('xocean');
	
	target.update(); break;
	}
	} 		
	'step 1'
	target.storage.glyptic20-=1;
	'step 2'
	if(target.storage.glyptic20>=0){
	target.storage.glyptic4+=37; }   
	'step 3'
	target.update();    
	},
		},


		glinitold:{
			enable:'phaseUse',
			prompt:'Carve with a LoreSong, and choose a Members to carve their GLYPTIC',
			usable:1,
		filter:function(event,player){
				return player.countCards('h',{number:'2'})>0||player.countCards('h',{number:'1'})>0||player.countCards('h',{number:'3'})>0||player.countCards('h',{number:'4'})>0;
			},
			filterCard:function(card){
				return get.number(card)==1||get.number(card)==2||get.number(card)==3||get.number(card)==4;
								
		},
		filterTarget:function(card,player,target){
			if(target.hasSkill('enemy'))return false;
			return true;
	
		},
			position:'he',
			content:function(target){
		
			if(target.hasSkill('roars')){
		
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=76;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic25+=1;

		game.broadcastAll(function(target){
							
															
	
			target.node.avatar2.setBackground('rearth','character');
			target.node.avatar.setBackground('rearth','character');
	
			
			target.update();},target);		

		target.node.avatar2.setBackground('rearth','character');
		target.node.avatar.setBackground('rearth','character');


		target.addSkill('conrearth');
		target.addSkill('earth');
		target.addSkill('rearth');
		target.update(); break;
					case target.storage.glyptic=1:
		target.storage.glyptic+=9;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic23+=1;
		//target.node.avatar2.setBackground('rwind','character');
		//target.node.avatar.setBackground('rwind','character');
		//target.removeSkill('earth');
		//target.addSkill('wind');
		//target.removeSkill('rearth');
		//target.addSkill('rwind');
		target.update(); break;
					case target.storage.glyptic=10:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		//target.storage.glyptic26+=1;
		//target.node.avatar2.setBackground('rblaze','character');
		//target.node.avatar.setBackground('rblaze','character');
		//target.removeSkill('wind');
		//target.addSkill('blaze');
		//target.removeSkill('rwind');
		//target.addSkill('rblaze');
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic+=4;
		////target.storage.glyptic3-=0.073;
		//target.storage.glyptic23+=1;
		//target.node.avatar2.setBackground('rthund','character');
		//target.node.avatar.setBackground('rthund','character');
		//target.removeSkill('blaze');
		//target.addSkill('thund');
		//target.removeSkill('rblaze');
		//target.addSkill('rthund');
		target.update(); break;
		
					case target.storage.glyptic=7:
		target.storage.glyptic-=6;
		////target.storage.glyptic3-=0.073;
		//target.storage.glyptic25+=1;
		//target.node.avatar2.setBackground('rearth','character');
		//target.node.avatar.setBackground('rearth','character');
		//target.removeSkill('thund');
		////target.addSkill('earth');
		//target.removeSkill('rthund');
		//target.addSkill('rearth');
		target.update(); break;	}
		}
		if(target.hasSkill('airson')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=70;
		target.storage.glyptic22+=1;


		game.broadcastAll(function(target){
							
															
			target.node.avatar2.setBackground('awind','character');
			target.node.avatar.setBackground('awind','character');
	
			
			target.update();},target);		

		target.node.avatar2.setBackground('awind','character');
		target.node.avatar.setBackground('awind','character');

		target.addSkill('conawind');
		target.addSkill('wind');
		target.addSkill('awind');
		////target.storage.glyptic3-=0.073;
		target.update(); break;
					case target.storage.glyptic=7:
		target.storage.glyptic+=13;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic24+=1;
		//target.node.avatar2.setBackground('alight','character');
		//target.node.avatar.setBackground('alight','character');
		//target.removeSkill('wind');
		//target.addSkill('light');
		//target.removeSkill('awind');
		//target.addSkill('alight');
		target.update(); break;
					case target.storage.glyptic=20:
		target.storage.glyptic-=15;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic21+=1;
		//target.node.avatar2.setBackground('aocean','character');
		//target.node.avatar.setBackground('aocean','character');
		//target.removeSkill('light');
		//target.addSkill('ocean');
		//target.removeSkill('alight');
		//target.addSkill('aocean');
		
		target.update(); break;
					case target.storage.glyptic=5:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic25+=1;
		//target.node.avatar2.setBackground('aearth','character');
		//target.node.avatar.setBackground('aearth','character');
		//target.removeSkill('ocean');
		//target.addSkill('earth');
		//target.removeSkill('aocean');
		//target.addSkill('aearth');
		
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic+=4;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic22+=1;
		//target.node.avatar2.setBackground('awind','character');
		//target.node.avatar.setBackground('awind','character');
		//target.removeSkill('earth');
		//target.addSkill('wind');
		//target.removeSkill('aearth');
		//target.addSkill('awind');
		
		target.update(); break;	}
		}
		if(target.hasSkill('goldenage')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=66;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic23+=1;
		//target.node.avatar2.setBackground('gthund','character');
		//target.node.avatar.setBackground('gthund','character');
		//target.addSkill('thund');
		//target.addSkill('gthund');
		
		target.update(); break;
					case target.storage.glyptic=11:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic27+=1;
		//target.node.avatar2.setBackground('gflora','character');
		//target.node.avatar.setBackground('gflora','character');
		//target.removeSkill('thund');
		//target.addSkill('Eden');
		//target.removeSkill('gthund');
		//target.addSkill('gflora');
		
		target.update(); break;
					case target.storage.glyptic=9:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic24+=1;
		//target.node.avatar2.setBackground('glight','character');
		//target.node.avatar.setBackground('glight','character');
		//target.removeSkill('Eden');
		//target.addSkill('light');
		//target.removeSkill('gflora');
		//target.addSkill('glight');
		
		target.update(); break;
					case target.storage.glyptic=7:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic24+=1;
		//target.node.avatar2.setBackground('gocean','character');
		//target.node.avatar.setBackground('gocean','character');
		//target.removeSkill('light');
		//target.addSkill('ocean');
		//target.removeSkill('glight');
		//target.addSkill('gocean');
		
		target.update(); break;
					case target.storage.glyptic=0:
		target.storage.glyptic+=11;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic23+=1;
		//target.node.avatar2.setBackground('gthund','character');
		//target.node.avatar.setBackground('gthund','character');
		//target.removeSkill('ocean');
		//target.addSkill('thund');
		//target.removeSkill('gocean');
		//target.addSkill('gthund');
		
		target.update(); break;	}
		}
				if(target.hasSkill('x')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=75;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic21+=1;
		//target.node.avatar2.setBackground('xocean','character');
		//target.node.avatar.setBackground('xocean','character');
		//target.addSkill('ocean');
		//target.addSkill('xocean');
		
		target.update(); break;
					case target.storage.glyptic=2:
		target.storage.glyptic+=6;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic26+=1;
		//target.node.avatar2.setBackground('xblaze','character');
		//target.node.avatar.setBackground('xblaze','character');
		//target.removeSkill('ocean');
		//target.addSkill('blaze');
		//target.removeSkill('xocean');
		//target.addSkill('xblaze');
		
		
		target.update(); break;
					case target.storage.glyptic=8:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic27+=1;
		//target.node.avatar2.setBackground('xflora','character');
		//target.node.avatar.setBackground('xflora','character');
		//target.removeSkill('blaze');
		//target.addSkill('Eden');
		//target.removeSkill('xblaze');
		//target.addSkill('xflora');
		
		target.update(); break;
					case target.storage.glyptic=1:
		target.storage.glyptic+=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic25+=1;
		//target.node.avatar2.setBackground('xearth','character');
		//target.node.avatar.setBackground('xearth','character');
		//target.removeSkill('Eden');
		//target.addSkill('earth');
		//target.removeSkill('xflora');
		//target.addSkill('xearth');
		
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic-=1;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic21+=1;
		//target.node.avatar2.setBackground('xocean','character');
		//target.node.avatar.setBackground('xocean','character');
		//target.removeSkill('earth');
		//target.addSkill('ocean');
		//target.removeSkill('xearth');
		//target.addSkill('xocean');
		
		target.update(); break;
		}
		} 		
		'step 1'
		target.storage.glyptic20-=1;
		'step 2'
		if(target.storage.glyptic20>=0){
		target.storage.glyptic3-=0.1237; }   
		'step 3'
		target.update();    
		'step 4'
		player.$fullscreenpop('NEW MODE!','metal');
		},
			},



			glinit:{
				enable:'phaseUse',
				prompt:'Carve with a LoreSong, and choose a Members to carve their GLYPTIC',
				usable:1,
			filter:function(event,player){
					if(lib.config.coin%53==0) return true;
					if(lib.config.coin%47==0) return true;
					return false;
				},
				filterCard:function(card){
					return true;
									
			},
			filterTarget:function(card,player,target){
				if(target.hasSkill('enemy'))return false;
				return true;
		
			},
				position:'he',
				content:function(target,game,gameconfig){
			
				if(target.hasSkill('roars')&&lib.config.coin%47==0){
			
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=76;
			////target.storage.glyptic3-=0.073;
			target.storage.glyptic25+=1;
	
			game.broadcastAll(function(target){
								
																
		
				target.node.avatar2.setBackground('rearth','character');
				target.node.avatar.setBackground('rearth','character');
		
				
				target.update();},target);		
	
			target.node.avatar2.setBackground('rearth','character');
			target.node.avatar.setBackground('rearth','character');
	
	
			target.addSkill('conrearth');
			target.addSkill('earth');
			target.addSkill('rearth');
			target.update(); break;
						case target.storage.glyptic=1:
			target.storage.glyptic+=9;
			////target.storage.glyptic3-=0.073;
			target.storage.glyptic23+=1;
			//target.node.avatar2.setBackground('rwind','character');
			//target.node.avatar.setBackground('rwind','character');
			//target.removeSkill('earth');
			//target.addSkill('wind');
			//target.removeSkill('rearth');
			//target.addSkill('rwind');
			target.update(); break;
						case target.storage.glyptic=10:
			target.storage.glyptic-=7;
			////target.storage.glyptic3-=0.073;
			//target.storage.glyptic26+=1;
			//target.node.avatar2.setBackground('rblaze','character');
			//target.node.avatar.setBackground('rblaze','character');
			//target.removeSkill('wind');
			//target.addSkill('blaze');
			//target.removeSkill('rwind');
			//target.addSkill('rblaze');
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic+=4;
			////target.storage.glyptic3-=0.073;
			//target.storage.glyptic23+=1;
			//target.node.avatar2.setBackground('rthund','character');
			//target.node.avatar.setBackground('rthund','character');
			//target.removeSkill('blaze');
			//target.addSkill('thund');
			//target.removeSkill('rblaze');
			//target.addSkill('rthund');
			target.update(); break;
			
						case target.storage.glyptic=7:
			target.storage.glyptic-=6;
			////target.storage.glyptic3-=0.073;
			//target.storage.glyptic25+=1;
			//target.node.avatar2.setBackground('rearth','character');
			//target.node.avatar.setBackground('rearth','character');
			//target.removeSkill('thund');
			////target.addSkill('earth');
			//target.removeSkill('rthund');
			//target.addSkill('rearth');
			target.update(); break;	}
			}
			if(target.hasSkill('airson')&&lib.config.coin%53==0){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=70;
			target.storage.glyptic22+=1;
	
	
			game.broadcastAll(function(target){
								
																
				target.node.avatar2.setBackground('awind','character');
				target.node.avatar.setBackground('awind','character');
		
				
				target.update();},target);		
	
			target.node.avatar2.setBackground('awind','character');
			target.node.avatar.setBackground('awind','character');
	
			target.addSkill('conawind');
			target.addSkill('wind');
			target.addSkill('awind');
			////target.storage.glyptic3-=0.073;
			target.update(); break;
						case target.storage.glyptic=7:
			target.storage.glyptic+=13;
			////target.storage.glyptic3-=0.073;
			target.storage.glyptic24+=1;
			//target.node.avatar2.setBackground('alight','character');
			//target.node.avatar.setBackground('alight','character');
			//target.removeSkill('wind');
			//target.addSkill('light');
			//target.removeSkill('awind');
			//target.addSkill('alight');
			target.update(); break;
						case target.storage.glyptic=20:
			target.storage.glyptic-=15;
			////target.storage.glyptic3-=0.073;
			target.storage.glyptic21+=1;
			//target.node.avatar2.setBackground('aocean','character');
			//target.node.avatar.setBackground('aocean','character');
			//target.removeSkill('light');
			//target.addSkill('ocean');
			//target.removeSkill('alight');
			//target.addSkill('aocean');
			
			target.update(); break;
						case target.storage.glyptic=5:
			target.storage.glyptic-=2;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic25+=1;
			//target.node.avatar2.setBackground('aearth','character');
			//target.node.avatar.setBackground('aearth','character');
			//target.removeSkill('ocean');
			//target.addSkill('earth');
			//target.removeSkill('aocean');
			//target.addSkill('aearth');
			
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic+=4;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic22+=1;
			//target.node.avatar2.setBackground('awind','character');
			//target.node.avatar.setBackground('awind','character');
			//target.removeSkill('earth');
			//target.addSkill('wind');
			//target.removeSkill('aearth');
			//target.addSkill('awind');
			
			target.update(); break;	}
			}
			if(target.hasSkill('goldenage')){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=66;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic23+=1;
			//target.node.avatar2.setBackground('gthund','character');
			//target.node.avatar.setBackground('gthund','character');
			//target.addSkill('thund');
			//target.addSkill('gthund');
			
			target.update(); break;
						case target.storage.glyptic=11:
			target.storage.glyptic-=2;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic27+=1;
			//target.node.avatar2.setBackground('gflora','character');
			//target.node.avatar.setBackground('gflora','character');
			//target.removeSkill('thund');
			//target.addSkill('Eden');
			//target.removeSkill('gthund');
			//target.addSkill('gflora');
			
			target.update(); break;
						case target.storage.glyptic=9:
			target.storage.glyptic-=2;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic24+=1;
			//target.node.avatar2.setBackground('glight','character');
			//target.node.avatar.setBackground('glight','character');
			//target.removeSkill('Eden');
			//target.addSkill('light');
			//target.removeSkill('gflora');
			//target.addSkill('glight');
			
			target.update(); break;
						case target.storage.glyptic=7:
			target.storage.glyptic-=7;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic24+=1;
			//target.node.avatar2.setBackground('gocean','character');
			//target.node.avatar.setBackground('gocean','character');
			//target.removeSkill('light');
			//target.addSkill('ocean');
			//target.removeSkill('glight');
			//target.addSkill('gocean');
			
			target.update(); break;
						case target.storage.glyptic=0:
			target.storage.glyptic+=11;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic23+=1;
			//target.node.avatar2.setBackground('gthund','character');
			//target.node.avatar.setBackground('gthund','character');
			//target.removeSkill('ocean');
			//target.addSkill('thund');
			//target.removeSkill('gocean');
			//target.addSkill('gthund');
			
			target.update(); break;	}
			}
					if(target.hasSkill('x')){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=75;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic21+=1;
			//target.node.avatar2.setBackground('xocean','character');
			//target.node.avatar.setBackground('xocean','character');
			//target.addSkill('ocean');
			//target.addSkill('xocean');
			
			target.update(); break;
						case target.storage.glyptic=2:
			target.storage.glyptic+=6;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic26+=1;
			//target.node.avatar2.setBackground('xblaze','character');
			//target.node.avatar.setBackground('xblaze','character');
			//target.removeSkill('ocean');
			//target.addSkill('blaze');
			//target.removeSkill('xocean');
			//target.addSkill('xblaze');
			
			
			target.update(); break;
						case target.storage.glyptic=8:
			target.storage.glyptic-=7;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic27+=1;
			//target.node.avatar2.setBackground('xflora','character');
			//target.node.avatar.setBackground('xflora','character');
			//target.removeSkill('blaze');
			//target.addSkill('Eden');
			//target.removeSkill('xblaze');
			//target.addSkill('xflora');
			
			target.update(); break;
						case target.storage.glyptic=1:
			target.storage.glyptic+=2;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic25+=1;
			//target.node.avatar2.setBackground('xearth','character');
			//target.node.avatar.setBackground('xearth','character');
			//target.removeSkill('Eden');
			//target.addSkill('earth');
			//target.removeSkill('xflora');
			//target.addSkill('xearth');
			
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic-=1;
			////target.storage.glyptic3-=0.073;
			
			target.storage.glyptic21+=1;
			//target.node.avatar2.setBackground('xocean','character');
			//target.node.avatar.setBackground('xocean','character');
			//target.removeSkill('earth');
			//target.addSkill('ocean');
			//target.removeSkill('xearth');
			//target.addSkill('xocean');
			
			target.update(); break;
			}
			} 		
			'step 1'
			target.storage.glyptic20-=1;
			'step 2'
			if(target.storage.glyptic20>=0){
			target.storage.glyptic3-=0.1237; }   
			'step 3'
			target.update();    
			'step 4'
			player.$fullscreenpop('NEW MODE!','metal');
			},
				},



		glyptic_wind:{
			enable:'phaseUse',
			
			usable:1,
		filter:function(event,player){
				return player.countCards('h',{number:'2'})>0;
			},
			filterCard:function(card){
				return get.number(card)==2;
				
		},
		filterTarget:function(card,player,target){
			if(target.hasSkill('enemy'))return false;
			return true;
	
		},
			position:'he',
			content:function(target){
		
			if(target.hasSkill('roars')){
		
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=76;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic25+=1;
		target.node.avatar2.setBackground('rearth','character');
		target.node.avatar.setBackground('rearth','character');
		target.addSkill('earth');
		target.addSkill('rearth');
		target.update(); break;
					case target.storage.glyptic=1:
		target.storage.glyptic+=9;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic23+=1;
		target.node.avatar2.setBackground('rwind','character');
		target.node.avatar.setBackground('rwind','character');
		target.removeSkill('earth');
		target.addSkill('wind');
		target.removeSkill('rearth');
		target.addSkill('rwind');
		target.update(); break;
					case target.storage.glyptic=10:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic26+=1;
		target.node.avatar2.setBackground('rblaze','character');
		target.node.avatar.setBackground('rblaze','character');
		target.removeSkill('wind');
		target.addSkill('blaze');
		target.removeSkill('rwind');
		target.addSkill('rblaze');
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic+=4;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic23+=1;
		target.node.avatar2.setBackground('rthund','character');
		target.node.avatar.setBackground('rthund','character');
		target.removeSkill('blaze');
		target.addSkill('thund');
		target.removeSkill('rblaze');
		target.addSkill('rthund');
		target.update(); break;
		
					case target.storage.glyptic=7:
		target.storage.glyptic-=6;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic25+=1;
		target.node.avatar2.setBackground('rearth','character');
		target.node.avatar.setBackground('rearth','character');
		target.removeSkill('thund');
		target.addSkill('earth');
		target.removeSkill('rthund');
		target.addSkill('rearth');
		target.update(); break;	}
		}
		if(target.hasSkill('airson')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=70;
		target.storage.glyptic22+=1;
		target.node.avatar2.setBackground('awind','character');
		target.node.avatar.setBackground('awind','character');
		target.addSkill('wind');
		target.addSkill('awind');
		////target.storage.glyptic3-=0.073;
		target.update(); break;
					case target.storage.glyptic=7:
		target.storage.glyptic+=13;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic24+=1;
		target.node.avatar2.setBackground('alight','character');
		target.node.avatar.setBackground('alight','character');
		target.removeSkill('wind');
		target.addSkill('light');
		target.removeSkill('awind');
		target.addSkill('alight');
		target.update(); break;
					case target.storage.glyptic=20:
		target.storage.glyptic-=15;
		////target.storage.glyptic3-=0.073;
		target.storage.glyptic21+=1;
		target.node.avatar2.setBackground('aocean','character');
		target.node.avatar.setBackground('aocean','character');
		target.removeSkill('light');
		target.addSkill('ocean');
		target.removeSkill('alight');
		target.addSkill('aocean');
		
		target.update(); break;
					case target.storage.glyptic=5:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic25+=1;
		target.node.avatar2.setBackground('aearth','character');
		target.node.avatar.setBackground('aearth','character');
		target.removeSkill('ocean');
		target.addSkill('earth');
		target.removeSkill('aocean');
		target.addSkill('aearth');
		
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic+=4;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic22+=1;
		target.node.avatar2.setBackground('awind','character');
		target.node.avatar.setBackground('awind','character');
		target.removeSkill('earth');
		target.addSkill('wind');
		target.removeSkill('aearth');
		target.addSkill('awind');
		
		target.update(); break;	}
		}
		if(target.hasSkill('goldenage')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=66;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic23+=1;
		target.node.avatar2.setBackground('gthund','character');
		target.node.avatar.setBackground('gthund','character');
		target.addSkill('thund');
		target.addSkill('gthund');
		
		target.update(); break;
					case target.storage.glyptic=11:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic27+=1;
		target.node.avatar2.setBackground('gflora','character');
		target.node.avatar.setBackground('gflora','character');
		target.removeSkill('thund');
		target.addSkill('Eden');
		target.removeSkill('gthund');
		target.addSkill('gflora');
		
		target.update(); break;
					case target.storage.glyptic=9:
		target.storage.glyptic-=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic24+=1;
		target.node.avatar2.setBackground('glight','character');
		target.node.avatar.setBackground('glight','character');
		target.removeSkill('Eden');
		target.addSkill('light');
		target.removeSkill('gflora');
		target.addSkill('glight');
		
		target.update(); break;
					case target.storage.glyptic=7:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic24+=1;
		target.node.avatar2.setBackground('gocean','character');
		target.node.avatar.setBackground('gocean','character');
		target.removeSkill('light');
		target.addSkill('ocean');
		target.removeSkill('glight');
		target.addSkill('gocean');
		
		target.update(); break;
					case target.storage.glyptic=0:
		target.storage.glyptic+=11;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic23+=1;
		target.node.avatar2.setBackground('gthund','character');
		target.node.avatar.setBackground('gthund','character');
		target.removeSkill('ocean');
		target.addSkill('thund');
		target.removeSkill('gocean');
		target.addSkill('gthund');
		
		target.update(); break;	}
		}
				if(target.hasSkill('x')){
		switch(target.storage.glyptic){
					case target.storage.glyptic=77:
		target.storage.glyptic-=75;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic21+=1;
		target.node.avatar2.setBackground('xocean','character');
		target.node.avatar.setBackground('xocean','character');
		target.addSkill('ocean');
		target.addSkill('xocean');
		
		target.update(); break;
					case target.storage.glyptic=2:
		target.storage.glyptic+=6;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic26+=1;
		target.node.avatar2.setBackground('xblaze','character');
		target.node.avatar.setBackground('xblaze','character');
		target.removeSkill('ocean');
		target.addSkill('blaze');
		target.removeSkill('xocean');
		target.addSkill('xblaze');
		
		
		target.update(); break;
					case target.storage.glyptic=8:
		target.storage.glyptic-=7;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic27+=1;
		target.node.avatar2.setBackground('xflora','character');
		target.node.avatar.setBackground('xflora','character');
		target.removeSkill('blaze');
		target.addSkill('Eden');
		target.removeSkill('xblaze');
		target.addSkill('xflora');
		
		target.update(); break;
					case target.storage.glyptic=1:
		target.storage.glyptic+=2;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic25+=1;
		target.node.avatar2.setBackground('xearth','character');
		target.node.avatar.setBackground('xearth','character');
		target.removeSkill('Eden');
		target.addSkill('earth');
		target.removeSkill('xflora');
		target.addSkill('xearth');
		
		target.update(); break;
					case target.storage.glyptic=3:
		target.storage.glyptic-=1;
		////target.storage.glyptic3-=0.073;
		
		target.storage.glyptic21+=1;
		target.node.avatar2.setBackground('xocean','character');
		target.node.avatar.setBackground('xocean','character');
		target.removeSkill('earth');
		target.addSkill('ocean');
		target.removeSkill('xearth');
		target.addSkill('xocean');
		
		target.update(); break;
		}
		} 		
		'step 1'
		target.storage.glyptic20-=1;
		'step 2'
		if(target.storage.glyptic20>=0){
		target.storage.glyptic3-=0.1237; }   
		'step 3'
		target.update();    
		},
			},




			glyptic_ocean:{
				enable:'phaseUse',
				
				usable:1,
			filter:function(event,player){
					return player.countCards('h',{number:'1'})>0;
				},
				filterCard:function(card){
					return get.number(card)=='1';
			},
				filterTarget:function(card,player,target){
					if(target.hasSkill('enemy'))return false;
					return true;
			
				},
				position:'he',
				content:function(target){
			
				if(target.hasSkill('roars')){
			
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=76;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic25+=1;
			target.node.avatar2.setBackground('rearth','character');
			target.node.avatar.setBackground('rearth','character');
			target.addSkill('earth');
			target.addSkill('rearth');
			target.update(); break;
						case target.storage.glyptic=1:
			target.storage.glyptic+=9;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic23+=1;
			target.node.avatar2.setBackground('rwind','character');
			target.node.avatar.setBackground('rwind','character');
			target.removeSkill('earth');
			target.addSkill('wind');
			target.removeSkill('rearth');
			target.addSkill('rwind');
			target.update(); break;
						case target.storage.glyptic=10:
			target.storage.glyptic-=7;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic26+=1;
			target.node.avatar2.setBackground('rblaze','character');
			target.node.avatar.setBackground('rblaze','character');
			target.removeSkill('wind');
			target.addSkill('blaze');
			target.removeSkill('rwind');
			target.addSkill('rblaze');
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic+=4;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic23+=1;
			target.node.avatar2.setBackground('rthund','character');
			target.node.avatar.setBackground('rthund','character');
			target.removeSkill('blaze');
			target.addSkill('thund');
			target.removeSkill('rblaze');
			target.addSkill('rthund');
			target.update(); break;
			
						case target.storage.glyptic=7:
			target.storage.glyptic-=6;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic25+=1;
			target.node.avatar2.setBackground('rearth','character');
			target.node.avatar.setBackground('rearth','character');
			target.removeSkill('thund');
			target.addSkill('earth');
			target.removeSkill('rthund');
			target.addSkill('rearth');
			target.update(); break;	}
			}
			if(target.hasSkill('airson')){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=70;
			target.storage.glyptic22+=1;
			target.node.avatar2.setBackground('awind','character');
			target.node.avatar.setBackground('awind','character');
			target.addSkill('wind');
			target.addSkill('awind');
			//target.storage.glyptic5-=0.073;
			target.update(); break;
						case target.storage.glyptic=7:
			target.storage.glyptic+=13;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic24+=1;
			target.node.avatar2.setBackground('alight','character');
			target.node.avatar.setBackground('alight','character');
			target.removeSkill('wind');
			target.addSkill('light');
			target.removeSkill('awind');
			target.addSkill('alight');
			target.update(); break;
						case target.storage.glyptic=20:
			target.storage.glyptic-=15;
			//target.storage.glyptic5-=0.073;
			target.storage.glyptic21+=1;
			target.node.avatar2.setBackground('aocean','character');
			target.node.avatar.setBackground('aocean','character');
			target.removeSkill('light');
			target.addSkill('ocean');
			target.removeSkill('alight');
			target.addSkill('aocean');
			
			target.update(); break;
						case target.storage.glyptic=5:
			target.storage.glyptic-=2;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic25+=1;
			target.node.avatar2.setBackground('aearth','character');
			target.node.avatar.setBackground('aearth','character');
			target.removeSkill('ocean');
			target.addSkill('earth');
			target.removeSkill('aocean');
			target.addSkill('aearth');
			
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic+=4;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic22+=1;
			target.node.avatar2.setBackground('awind','character');
			target.node.avatar.setBackground('awind','character');
			target.removeSkill('earth');
			target.addSkill('wind');
			target.removeSkill('aearth');
			target.addSkill('awind');
			
			target.update(); break;	}
			}
			if(target.hasSkill('goldenage')){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=66;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic23+=1;
			target.node.avatar2.setBackground('gthund','character');
			target.node.avatar.setBackground('gthund','character');
			target.addSkill('thund');
			target.addSkill('gthund');
			
			target.update(); break;
						case target.storage.glyptic=11:
			target.storage.glyptic-=2;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic27+=1;
			target.node.avatar2.setBackground('gflora','character');
			target.node.avatar.setBackground('gflora','character');
			target.removeSkill('thund');
			target.addSkill('Eden');
			target.removeSkill('gthund');
			target.addSkill('gflora');
			
			target.update(); break;
						case target.storage.glyptic=9:
			target.storage.glyptic-=2;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic24+=1;
			target.node.avatar2.setBackground('glight','character');
			target.node.avatar.setBackground('glight','character');
			target.removeSkill('Eden');
			target.addSkill('light');
			target.removeSkill('gflora');
			target.addSkill('glight');
			
			target.update(); break;
						case target.storage.glyptic=7:
			target.storage.glyptic-=7;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic24+=1;
			target.node.avatar2.setBackground('gocean','character');
			target.node.avatar.setBackground('gocean','character');
			target.removeSkill('light');
			target.addSkill('ocean');
			target.removeSkill('glight');
			target.addSkill('gocean');
			
			target.update(); break;
						case target.storage.glyptic=0:
			target.storage.glyptic+=11;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic23+=1;
			target.node.avatar2.setBackground('gthund','character');
			target.node.avatar.setBackground('gthund','character');
			target.removeSkill('ocean');
			target.addSkill('thund');
			target.removeSkill('gocean');
			target.addSkill('gthund');
			
			target.update(); break;	}
			}
					if(target.hasSkill('x')){
			switch(target.storage.glyptic){
						case target.storage.glyptic=77:
			target.storage.glyptic-=75;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic21+=1;
			target.node.avatar2.setBackground('xocean','character');
			target.node.avatar.setBackground('xocean','character');
			target.addSkill('ocean');
			target.addSkill('xocean');
			
			target.update(); break;
						case target.storage.glyptic=2:
			target.storage.glyptic+=6;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic26+=1;
			target.node.avatar2.setBackground('xblaze','character');
			target.node.avatar.setBackground('xblaze','character');
			target.removeSkill('ocean');
			target.addSkill('blaze');
			target.removeSkill('xocean');
			target.addSkill('xblaze');
			
			
			target.update(); break;
						case target.storage.glyptic=8:
			target.storage.glyptic-=7;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic27+=1;
			target.node.avatar2.setBackground('xflora','character');
			target.node.avatar.setBackground('xflora','character');
			target.removeSkill('blaze');
			target.addSkill('Eden');
			target.removeSkill('xblaze');
			target.addSkill('xflora');
			
			target.update(); break;
						case target.storage.glyptic=1:
			target.storage.glyptic+=2;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic25+=1;
			target.node.avatar2.setBackground('xearth','character');
			target.node.avatar.setBackground('xearth','character');
			target.removeSkill('Eden');
			target.addSkill('earth');
			target.removeSkill('xflora');
			target.addSkill('xearth');
			
			target.update(); break;
						case target.storage.glyptic=3:
			target.storage.glyptic-=1;
			//target.storage.glyptic5-=0.073;
			
			target.storage.glyptic21+=1;
			target.node.avatar2.setBackground('xocean','character');
			target.node.avatar.setBackground('xocean','character');
			target.removeSkill('earth');
			target.addSkill('ocean');
			target.removeSkill('xearth');
			target.addSkill('xocean');
			
			target.update(); break;
			}
			} 		
			'step 1'
			target.storage.glyptic20-=1;
			//target.storage.glyptic5-=0.073;
			'step 2'
			if(target.storage.glyptic20>=0){
			target.storage.glyptic5-=0.1237;	} 	
			'step 3'
			target.update();	
			},
				},










hptest:{
                trigger:{
                    global:'gameStart',
                    player:'enterGame',
                },
                forced:true,
usable:1,
		
                content:function(){
               player.hp-=9999;
               player.maxHp-=17500;           
player.update();                     
                    }
                },


tianshex:{
				group:['tianshe2'],
				trigger:{player:'damageBefore'},
				filter:function(event){
					if(event.nature) return false;
					return true;
				},
				forced:true,


				content:function(player){

if (player.phaseNumber<=7){
					trigger.cancel();}

				},
				ai:{
					nofire:true,
					nothunder:true,
					effect:{
						target:function(card,player,target,current){
							if(card.name=='tiesuo') return 0;
							if(get.tag(card,'fireDamage')) return 0;
							if(get.tag(card,'thunderDamage')) return 0;
						}
					}
				}
			},




yinyix:{
				audio:2,
				trigger:{player:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					return player.phaseNumber<=7;
				},
				content:function(event){

if (!event.nature=='fire'){
					trigger.cancel();}
				},
				
			},

real:{
                trigger:{
                    global:'gameStart',
                    player:'enterGame',
                },
                forced:true,
usable:1,
limited:true,
                content:function(){
                    'step 0'
                      var str = '请选择你的初始标记。';
                    player.chooseControl(['【ROARS】','【AIRSON】','【GOLDENAGE】','【X】'])
                    .set('prompt',str)
                    'step 1'
                    if(result && result.control){
                        var trans = {                            "Roars":'zhugeliang','Airson':'zhaoyun','GoldenAge':'machao','X':'sunquan'
                        };
                        player.reinit(trans[result.control]);
player.update();                     
                    }
                },

},


			nscongjun:{
filter:function(event,player){
return player.identity=='fan';
},
				forbid:['guozhan'],
	trigger:{player:'phaseZhunbeiBegin'},
				unique:true,
				forceunique:true,
				init:function(player){
				
					var change=function(target){
						if(target==player){
							var list;
							if(_status.connectMode){
								list=get.charactersOL(function(i){
									return lib.character[i][0]!='male';
								});
							}
							else{
								list=get.gainableCharacters(function(info){
									return info[0]=='male';
								});
							}
							var name=list.randomGet();
							target.reinit('ns_huamulan',name,'nosmooth');
										
							player._inits.remove(change);
							player.hp=player.maxHp;
							player.update();
						}
					}
					if(!player._inits){
						player._inits=[];
					}
					player._inits.push(change);
				},
				
			},



spjincui:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				limited:true,
				skillAnimation:true,
				animationColor:'metal',
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.awakenSkill('spjincui');
					game.broadcastAll(function(target1,target2){
						game.swapSeat(target1,target2);
					},player,target);
					'step 1'
					if(player.hp>0) player.loseHp(player.hp);
				},
				ai:{
					order:5,
					result:{
						player:function(player,target){
							if(player.hasUnknown()) return 0;
							if(!player.countCards('h',{name:['tao','jiu']})) return 0;
							var num=0,current=player.next;
							while(true){
								num-=get.sgn(get.attitude(player,current));
								if(current==target) break;
								current=current.next;
							}
							while(true){
								if(current==player) break;
								num+=get.sgn(get.attitude(player,current))*1.1;
								current=current.next;
							}
							if(num<player.hp) return 0;
							return num+1-player.hp;
						},
					},
				},
			},




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
						return lib.config.coin == 20;
					},
filterTarget:function(card,player,target){
					


				},
					content:function(){
						'step 0'
						event.list = ['30金币: 手牌上限+1 (当前为+'+player.storage.chaoneng1+')'];
						if (lib.config.coin >= 0) event.list.push('50金币：灵力上限+1');
						if (lib.config.coin >= 70) event.list.push('70金币：体力上限+1');
						if (lib.config.coin >= 100) event.list.push('100金币：摸牌数+1 (当前为+'+player.storage.chaoneng2+')');
						if (lib.config.coin >= 150) event.list.push ('150金币：【轰！】伤害+1 (当前为+'+player.storage.chaoneng3+')');
						player.chooseControlList(event.list, '想要买哪一个外挂？');
						'step 1'
						if (result.index == 0){
							game.changeCoin(1);
							target.damage(); 
						} else if (result.index == 1){
							game.changeCoin(-50);
							player.recover(1);
						} else if (result.index == 2){
							game.changeCoin(-70);
							player.gainMaxHp();
						} else if (result.index == 3){
							game.changeCoin(-100);
							player.storage.chaoneng2 ++;
						} else if (result.index == 4){
							game.changeCoin(-150);
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












				

aol:{
					audio:2,
					enable:'phaseUse',

					
					content:function(){
lib.config.connect_identity_banned.remove("caorui");
game.saveConfig('connect_identity_banned',lib.config.connect_identity_banned);
			},
				
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
					//player.draw();
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

var z=Math.min(lib.config.lvg,338351);
var x=(Math.floor(Math. sqrt(z/777)));
var y=((x*x*120/38.7)-0.01);
var empire = Math.min(Math.max(parseInt((player.hp/player.maxHp)*247+y), 1), 2847);

if(index==0){
game.log(trigger.card,'Initial');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(empire);
}

else{
game.log(trigger.card,'COMBO');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(5*empire);
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

var z=Math.min(lib.config.lvx,338351);
var x=(Math.floor(Math. sqrt(z/777)));
var y=((x*x*180/38.7)-0.01);
var calm = Math.min(Math.max(parseInt((1.01-(player.hp/player.maxHp))*677+y), 1), 5847);

if(index==0){
game.log(trigger.card,'Initial');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;


trigger.baseDamage*=Math.floor(calm);
}

else{
game.log(trigger.card,'COMBO');
if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
trigger.baseDamage*=Math.floor(3.5*calm);
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
				animationColor:'metal',
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
			forced:true,
			trigger:{				 global:'gameStart',
							   player:'enterGame',
						   },
			 content:function(){
							//player.storage.glyptic5+=12;
						},			
			},


		airson:{
	forced:true,
			trigger:{
							   global:'gameStart',
							   player:'enterGame',
						   },
			 content:function(){
							//player.storage.glyptic5+=0.12;
						},	
			
			
			
			},

		goldenage:{
			forced:true,
			trigger:{
							   global:'gameStart',
							   player:'enterGame',
						   },
			 content:function(){
							//player.storage.glyptic5+=1;
						},			
			
			},

		x:{
			forced:true,
			trigger:{
							   global:'gameStart',
							   player:'enterGame',
						   },
			 content:function(){
							//player.storage.glyptic5+=112;
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
						  	return get.suit(card)=='spade';


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



work:{
trigger:{player:'damageBegin1'},
content:function(){
'step 0'
var x=trigger.num;
var y=x*player.storage.glyptic;
trigger.num+=y;
'step 1'
var z=player.storage.glyptic;
player.storage.glyptic-=z;
player.update();

}
},

		tianxiang:{
				audio:2,
				audioname:['daxiaoqiao','re_xiaoqiao','ol_xiaoqiao'],
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h',{suit:'heart'})>0&&event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card,player){
							return get.suit(card)=='heart'&&lib.filter.cardDiscardable(card,player);
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
					player.removeSkill('tianxiang2');
					player.popup('tianxiang');
				}
			},

xzhanyuan:{
				unique:true,
				audio:2,
				derivation:'xweiwu',
				skillAnimation:true,
				animationColor:'metal',
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
				animationColor:'metal',
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
				animationColor:'metal',
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



glyptic_skyw:{

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
//if(player.hasSkill('rec2')){
//player.storage.glyptic8+=2.7;
//player.storage.glyptic10+=2;
//}


'step 2'
 
var num2=player.storage.glyptic2;
var num3=target.storage.glyptic3;
var num8=player.storage.glyptic8;
var num9=target.storage.glyptic9;
event.num=Math.floor(2.5*num2*num3*num8*num9);

'step 3'



trigger.getParent().baseDamage+=num;


'step 4'

if(player.hasSkill('roars')){
player.storage.glyptic2-=304;
player.storage.glyptic8+=0;
}

if(player.hasSkill('airson')){
player.storage.glyptic2-=440;
player.storage.glyptic8+=0;
}

if(player.hasSkill('goldenage')){
player.storage.glyptic2-=463;
player.storage.glyptic8+=0;
}

if(player.hasSkill('x')){
player.storage.glyptic2-=373;
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


sma:{},




glyptic_phys:{

trigger:{player:'useCardToPlayered'},
forced:true,
logTarget:'target',
filter:function(event,player){
return (event.card.name=='sha'||event.card.name=='mha');
},
onremove:true,
content:function(){
'step 0'
event.target=trigger.target;
//if(player.storage.glyptic10==0.4){
//	player.storage.glyptic10+=0.6;
//}
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

if(game.roundNumber%3==0) {event.num=Math.floor(1.25*num4*num5*num10*num11)}
else {event.num=Math.floor(2.5*num4*num5*num10*num11)}
event.num=Math.floor(2.5*num4*num5*num10*num11);

'step 3'
trigger.getParent().baseDamage+=num;

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

 trigger:{
                    global:'gameStart',
                    player:'enterGame',
                },

content:function(){

if(player.hasSkill('roars')){
player.storage.glyptic21+=1;

					}

if(player.hasSkill('airson')){
player.storage.glyptic21+=7;

					}

if(player.hasSkill('goldenage')){
player.storage.glyptic21+=11;

					}

if(player.hasSkill('x')){
player.storage.glyptic21+=2;

					}

				},
	},



glyptic:{
//mark:true,
group:['glyptic_phys','glyptic_carve','glyptic_skyw','glyptic_roars','glyptic_j','glyptic_m'],
			init:function(player){
					player.storage.glyptic=77;
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
player.storage.glyptic19=200;
player.storage.glyptic20=6;
player.storage.glyptic21=0;
player.storage.glyptic22=0;
player.storage.glyptic23=0;
player.storage.glyptic24=0;
player.storage.glyptic25=0;
player.storage.glyptic26=0;
player.storage.glyptic27=0;


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





























ocean:{
	//group:['ocean2','ocean3','ocean5','ocean4','ocean6','ocean7','ocean8','ocean9'],

	init:function(player){
	 player.storage.ocean=1;
 },
 mark:true,

},  

ocean2:{  
 enable:'chooseToUse',
 filter:function(event,player){
	 if(!player.countCards('he',function(card){
			   return get.number(card)=='7'||get.number(card)=='1'||get.number(card)=='2';
	 })){
		 return false;
	 }
	 return game.hasPlayer(function(current){
		 return current.maxHp>=1;
	 });
 },
 filterCard:function(card){
	 return get.number(card)=='7'||get.number(card)=='1'||get.number(card)=='1'
 },
 position:'he',
 viewAs:{name:'juedou'},
 viewAsFilter:function(player){
	 if(player.countCards('he',{number:'7'})) return true;
	 if(player.countCards('he',{number:'1'})) return true;
	 if(player.countCards('he',{number:'2'})) return true;
 },
 prompt:'Play a LoreSong as Skywar',
 check:function(card){return 5-get.value(card)},
									
},

ocean3:{
	trigger:{player:'damageBefore'},

	filter:function(event,player,source){
		if(player==source) return false;
		if(!event.source.hasSkill('blaze')) return false;
		return true;
		},
	forced:true,
	filter:function(event){
	   return event.source&&event.source.hasSkill('blaze');
   },
content:function(player,event,trigger,source){
   trigger.cancel();
   },},


 ocean4:{
	 trigger:{player:'damageBefore'},

	 filter:function(event,player,source){
		 if(player==event.source) return false;
		 if(!event.source.hasSkill('light')) return false;
		 return true;
		 },
	 forced:true,
	 filter:function(event){
		return event.source&&event.source.hasSkill('light');
	},
content:function(player,event,trigger,source){
	trigger.cancel();
	},},


	ocean5:{
		trigger:{player:'damageBefore'},
   
		filter:function(event,player,source){
			if(player==source) return false;
			if(!event.source.hasSkill('ocean')) return false;
			return true;
			},
		forced:true,
		filter:function(event){
		   return event.source&&event.source.hasSkill('ocean');
	   },
   content:function(player,event,trigger,source){
	   trigger.cancel();
	   },},




ocean6:{
	 trigger:{player:'damageBefore'},

	 forced:true,
		 filter:function(event,player,source){
		 return event.source.hasSkill('thund');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.ocean>=1){
 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.ocean-=1;
 }},    
	},

	ocean7:{
	 trigger:{player:'damageBefore'},
	 forced:true,
	 filter:function(event,player,source){
		 return event.source.hasSkill('Eden');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.ocean>=1){
	 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.ocean-=1;

}}    },

	ocean8:{ },
ocean9:{
 trigger:{player:'damageEnd'},
 forced:true,
   content:function(player,event,trigger,source){              
	 player.storage.ocean+=1;
	 }},





wind:{
	group:['wind2','wind3','wind5','wind4','wind6','wind7','wind8','wind9'],

	init:function(player){
	 player.storage.wind=1;
 },
 mark:true,

},  

wind2:{  
 enable:'chooseToUse',
 filter:function(event,player){
	//if(lib.config.coin%47!=0) return false;
	 if(!player.countCards('he',function(card){
			   return get.number(card)=='1'||get.number(card)=='2'||get.number(card)=='3';
	 })){
		 return false;
	 }	 
	 if (lib.config.coin%53==0||_status.connectMode)  return true;	
 },
 filterCard:function(card){
	 return get.number(card)=='1'||get.number(card)=='2'||get.number(card)=='3'
 },
 position:'he',
 viewAs:{name:'juedou'},
 viewAsFilter:function(player){
	 if(player.countCards('he',{number:'1'})) return true;
	 if(player.countCards('he',{number:'2'})) return true;
	 if(player.countCards('he',{number:'3'})) return true;
 },
 prompt:'Play a LoreSong as Skywar',
 check:function(card){return 5-get.value(card)},
									
},

wind3:{
  trigger:{player:'damageBefore'},
  forced:true,
  filter:function(event,player,source){
	 if(player==event.source) return false;
	 if(event.source.hasSkill('enemy')) return false;
	 if(!event.source.hasSkill('ocean')) return false;
	 return true;
	 },
content:function(player,event,trigger,source){
 trigger.cancel();
 var x=trigger.num+1270-1100*player.storage.glyptic3;
	  player.recover(Math.floor(x));
	 player.update();  
 },},


 wind4:{
	 trigger:{player:'damageBefore'},

	// filter:function(event,player,source){
	//	 if(player==event.source) return false;
	//	 //if(source.hasSkill('enemy')) return false;
	//	 if(!event.source.hasSkill('wind')) return false;
	//	 return true;
	//	 },
	 forced:true,
	 filter:function(event){
		//return event.source&&!event.nature=='fire'&&event.source.hasSkill('wind');
		return event.source&&event.source.hasSkill('wind');
	},
content:function(player,event,trigger,source){
	trigger.cancel();
	},},

wind5:{
	 trigger:{player:'damageBefore'},

	 forced:true,
		 filter:function(event,player,source){
		 return event.source.hasSkill('blaze');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.wind>=1){
 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.wind-=1;
 }},    
	},

	wind6:{
	 trigger:{player:'damageBefore'},
	 forced:true,
	 filter:function(event,player,source){
		 return event.source.hasSkill('Eden');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.wind>=1){
	 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.wind-=1;

}}    },



wind7:{
	trigger:{player:'damageBefore'},

	filter:function(event,player,source){
		if(player==source) return false;
		if(!event.source.hasSkill('light')) return false;
		return true;
		},
	forced:true,
	filter:function(event){
	   return event.source&&event.source.hasSkill('light');
   },
content:function(player,event,trigger,source){
   trigger.cancel();
   },},
	wind8:{ },



wind9:{
 trigger:{player:'damageEnd'},
 forced:true,
   content:function(player,event,trigger,source){              
	 player.storage.wind+=1;
	 }},














thund:{
	//group:['thund2','thund3','thund5','thund4','thund6','thund7','thund8','thund9'],

	init:function(player){
	 player.storage.thund=1;
 },
 mark:true,

},  

thund2:{  
 enable:'chooseToUse',
 filter:function(event,player){
	 if(!player.countCards('he',function(card){
			   return get.number(card)=='2'||get.number(card)=='3'||get.number(card)=='4';
	 })){
		 return false;
	 }
	 return game.hasPlayer(function(current){
		 return current.maxHp>=1;
	 });
 },
 filterCard:function(card){
	 return get.number(card)=='2'||get.number(card)=='3'||get.number(card)=='4'
 },
 position:'he',
 viewAs:{name:'juedou'},
 viewAsFilter:function(player){
	 if(player.countCards('he',{number:'2'})) return true;
	 if(player.countCards('he',{number:'3'})) return true;
	 if(player.countCards('he',{number:'4'})) return true;
 },
 prompt:'Play a LoreSong as Skywar',
 check:function(card){return 5-get.value(card)},
									
},

thund3:{
  trigger:{player:'damageBefore'},
  forced:true,
  filter:function(event,player,source){
	 if(player==event.source) return false;
	 if(event.source.hasSkill('enemy')) return false;
	 if(!event.source.hasSkill('wind')) return false;
	 return true;
	 },
content:function(player,event,trigger,source){
 trigger.cancel();
 var x=trigger.num+1270-1100*player.storage.glyptic5;
	  player.recover(Math.floor(x));
	 player.update();  
 },},


 thund4:{
	 trigger:{player:'damageBefore'},

	 filter:function(event,player,source){
		 if(player==event.source) return false;
		 if(!event.source.hasSkill('thund')) return false;
		 return true;
		 },
	 forced:true,
	 filter:function(event){
		return event.source&&event.source.hasSkill('thund');
	},
content:function(player,event,trigger,source){
	trigger.cancel();
	},},



	thund5:{
		trigger:{player:'damageBefore'},
   
		filter:function(event,player,source){
			if(player==source) return false;
			if(!event.source.hasSkill('thund')) return false;
			return true;
			},
		forced:true,
		filter:function(event){
		   return event.source&&event.source.hasSkill('ocean');
	   },
   content:function(player,event,trigger,source){
	   trigger.cancel();
	   },},

	   



thund6:{
	 trigger:{player:'damageBefore'},

	 forced:true,
		 filter:function(event,player,source){
		 return event.source.hasSkill('earth');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.thund>=1){
 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.thund-=1;
 }},    
	},

	thund7:{ },
	thund8:{ },
thund9:{
 trigger:{player:'damageEnd'},
 forced:true,
   content:function(player,event,trigger,source){              
	 player.storage.thund+=1;
	 }},



 
light:{
	//group:['light2','light3','light5','light4','light6','light7','light8','light9'],

	init:function(player){
	 player.storage.light=1;
 },
 mark:true,

},  

light2:{  
 enable:'chooseToUse',
 filter:function(event,player){
	 if(!player.countCards('he',function(card){
			   return get.number(card)=='4'||get.number(card)=='5'||get.number(card)=='3';
	 })){
		 return false;
	 }
	 return game.hasPlayer(function(current){
		 return current.maxHp>=1;
	 });
 },
 filterCard:function(card){
	 return get.number(card)=='3'||get.number(card)=='5'||get.number(card)=='4'
 },
 position:'he',
 viewAs:{name:'juedou'},
 viewAsFilter:function(player){
	 if(player.countCards('he',{number:'3'})) return true;
	 if(player.countCards('he',{number:'4'})) return true;
	 if(player.countCards('he',{number:'5'})) return true;
 },
 prompt:'Play a LoreSong as Skywar',
 check:function(card){return 5-get.value(card)},
								   
},

light3:{
  trigger:{player:'damageBefore'},
  forced:true,
  filter:function(event,player,source){
	 if(player==event.source) return false;
	 if(event.source.hasSkill('enemy')) return false;
	 if(!event.source.hasSkill('earth')) return false;
	 return true;
	 },
content:function(player,event,trigger,source){
 trigger.cancel();
 var x=trigger.num+1270-1100*player.storage.glyptic3;
	  player.recover(Math.floor(x));
	 player.update();  
 },},



 light4:{
	trigger:{player:'damageBefore'},
	forced:true,
	filter:function(event,player,source){
	   if(player==event.source) return false;
	   if(event.source.hasSkill('enemy')) return false;
	   if(!event.source.hasSkill('blaze')) return false;
	   return true;
	   },
content:function(player,event,trigger,source){
   trigger.cancel();
   var x=trigger.num+1270-1100*player.storage.glyptic3;
		player.recover(Math.floor(x));
	   player.update();  
   },},

   light5:{
	trigger:{player:'damageBefore'},
	forced:true,
	filter:function(event,player,source){
	   if(player==event.source) return false;
	   if(event.source.hasSkill('enemy')) return false;
	   if(!event.source.hasSkill('thund')) return false;
	   return true;
	   },
content:function(player,event,trigger,source){
   trigger.cancel();
   var x=trigger.num+1270-1100*player.storage.glyptic3;
		player.recover(Math.floor(x));
	   player.update();  
   },},



 light6:{
	 trigger:{player:'damageBefore'},

	 filter:function(event,player,source){
		 if(player==event.source) return false;
		 if(!event.source.hasSkill('light')) return false;
		 return true;
		 },
	 forced:true,
	 filter:function(event){
		return event.source&&event.source.hasSkill('light');
	},
content:function(player,event,trigger,source){
	trigger.cancel();
	},},

	light8:{
		trigger:{player:'damageBefore'},
   
		filter:function(event,player,source){
			if(player==source) return false;
			if(!event.source.hasSkill('wind')) return false;
			return true;
			},
		forced:true,
		filter:function(event){
		   return event.source&&event.source.hasSkill('wind');
	   },
   content:function(player,event,trigger,source){
	   trigger.cancel();
	   },},



light7:{
	 trigger:{player:'damageBefore'},

	 forced:true,
		 filter:function(event,player,source){
		 return event.source.hasSkill('Eden');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.light>=1){
 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.light-=1;
 }},    
	},




light9:{
 trigger:{player:'damageEnd'},
 forced:true,
   content:function(player,event,trigger,source){              
	 player.storage.light+=1;
	 }},






earth:{
	group:['earth2','earth3','earth5','earth4','earth6','earth7','earth8','earth9'],

	init:function(player){
	 player.storage.earth=1;
 },
 mark:true,

},  

earth2:{  
 enable:'chooseToUse',
 filter:function(event,player){
	//if(lib.config.coin%47!=0) return false;
	 if(!player.countCards('he',function(card){
			   return get.number(card)=='4'||get.number(card)=='5'||get.number(card)=='6';
	 })){
		 return false;
	 }	 
	 if (lib.config.coin%47==0||_status.connectMode)  return true;	
 },
 filterCard:function(card){
	 return get.number(card)=='4'||get.number(card)=='5'||get.number(card)=='6'
 },
 position:'he',
 viewAs:{name:'juedou'},
 viewAsFilter:function(player){
	 if(player.countCards('he',{number:'4'})) return true;
	 if(player.countCards('he',{number:'5'})) return true;
	 if(player.countCards('he',{number:'6'})) return true;
 },
 prompt:'Play a LoreSong as Skywar',
 //check:function(card){return 5-get.value(card)},
 ai:{	
	order:12,}
									
},






earth3:{
  trigger:{player:'damageBefore'},
  forced:true,
  filter:function(event,player,source){
	if(player==event.source) return false;
	 if(event.source.hasSkill('enemy')) return false;
	 if(!event.source.hasSkill('blaze')) return false;
	 return true;
	 },
content:function(player,event,trigger,source){
'step 0'
if(trigger.source.hasSkill('roars')){
	trigger.source.storage.glyptic3+=0.07;
	trigger.source.storage.glyptic11+=0;
 }
if(trigger.source.hasSkill('airson')){
	trigger.source.storage.glyptic3-=0.09;
	trigger.source.storage.glyptic11+=0;}
if(trigger.source.hasSkill('goldenage')){
	trigger.source.storage.glyptic3-=0.03;
	trigger.source.storage.glyptic11+=0; }
if(trigger.source.hasSkill('x')){
	trigger.source.storage.glyptic3+=0.02;
	trigger.source.storage.glyptic11+=0;}

'step 1'
	var a=trigger.source.storage.glyptic3;
	var x=Math.floor(trigger.num*(1-a)*140);
	//.broadcastAll('createDialog',event.videoId,'STAREARTH GEM:'+a+' Immune!');
	game.delay(2);
 trigger.cancel();
	  player.recover(x);
	  'step 2'
	
	  if(trigger.source.hasSkill('roars')){
		trigger.source.storage.glyptic3-=0.07;
		trigger.source.storage.glyptic11+=0;
	 }
	if(trigger.source.hasSkill('airson')){
		trigger.source.storage.glyptic3+=0.09;
		trigger.source.storage.glyptic11+=0;}
	if(trigger.source.hasSkill('goldenage')){
		trigger.source.storage.glyptic3+=0.03;
		trigger.source.storage.glyptic11+=0; }
	if(trigger.source.hasSkill('x')){
		trigger.source.storage.glyptic3-=0.02;
		trigger.source.storage.glyptic11+=0;}

		'step 3'
		game.broadcastAll('createDialog',event.videoId,'STAREARTH SOUL: The Flame & Lava Births Dust & Land!');
game.delay(3);

 },},


 earth4:{
	 trigger:{player:'damageBefore'},
	 filter:function(event,player,source){
		 if(player==event.source) return false;
		 if(!event.source.hasSkill('earth')) return false;
		 return true;
		 },
	 forced:true,

content:function(player,event,trigger,source){
	var x=trigger.num;
var y=Math.floor(x);
var z=(x/y);
if(z==1){
	trigger.cancel();
	game.broadcastAll('createDialog',event.videoId,'STAREARTH GEM: Immune!');
	game.delay(1);}
	},},


	earth5:{
		trigger:{player:'damageBefore'},
   
		filter:function(event,player,source){
			if(player==event.source) return false;
			if(!event.source.hasSkill('thund')) return false;
			return true;
			},
		forced:true,
	
   content:function(player,event,trigger,source){
	   trigger.cancel();
	   },},
   

	earth6:{
	 trigger:{player:'damageBefore'},
	 forced:true,
	 filter:function(event,player,source){
		 return event.source.hasSkill('ocean');
		 return false;
		 },
content:function(player,event,trigger,source){
 'step 0'
 if(player.storage.earth>=1){
	 trigger.num*=3;
 //trigger.cancel();
 //var y=trigger.num*3;
 //player.damage(y);
 game.delay(2);
 player.storage.earth-=1;

}}    },


earth7:{
	trigger:{player:'damageBefore'},
	forced:true,
	filter:function(event,player,source){
		return event.source.hasSkill('wind');
		return false;
		},
content:function(event,game,config,source,nature){
var x=trigger.num;
var y=Math.floor(x);
var z=(x/y);
if(z==1&&trigger.source.hasSkill('airson')&&!trigger.source.hasSkill('enemy')){

	game.broadcastAll('createDialog',event.videoId, 'Airsons WIND GEM: The Storm moves the Dust!');
	game.delay(2);
	var a=2.25+lib.config.lvaw*0.0225;
trigger.num*=a;



}

if(z==1&&trigger.source.hasSkill('roars')&&!trigger.source.hasSkill('enemy')){
	game.broadcastAll('createDialog',event.videoId, 'Roars WIND GEM: The WindRider saves you from Gravity!');
	game.delay(2);
	var b=2.25+lib.config.lvrw*0.0225;
trigger.num*=b;
ui.clear();
}

if(z==1&&trigger.source.hasSkill('enemy')){
	game.broadcastAll('createDialog',event.videoId, 'Boss WIND GEM!');
	game.delay(2);
	
trigger.num*=3;
}

if(z!=1){
	trigger.num*=1;
	}	}
},




earth8:{
	trigger:{player:'damageBefore'},
	forced:true,
	filter:function(event,player,source){
		return event.source.hasSkill('light');
		return false;
		},
content:function(player,event,trigger,source){
'step 0'
if(player.storage.earth>=1){
	trigger.num*=1;
//trigger.cancel();
//var y=trigger.num*3;
//player.damage(y);

player.storage.earth-=1;

}}    },


earth9:{
 trigger:{player:'damageEnd'},
 forced:true,
   content:function(player,event,trigger,source){              
	 player.storage.earth+=1;
	 }},




 
blaze:{
      // group:['blaze2','blaze3','blaze5','blaze4','blaze6','blaze7','blaze8','blaze9'],
	
       init:function(player){
		player.storage.blaze=1;
	},
	mark:true,
    
},  
 
blaze2:{  
	enable:'chooseToUse',
    filter:function(event,player){
        if(!player.countCards('he',function(card){
                  return get.number(card)=='7'||get.number(card)=='5'||get.number(card)=='6';
        })){
            return false;
        }
        return game.hasPlayer(function(current){
            return current.maxHp>=1;
        });
    },
    filterCard:function(card){
        return get.number(card)=='7'||get.number(card)=='5'||get.number(card)=='6'
    },
    position:'he',
    viewAs:{name:'juedou'},
    viewAsFilter:function(player){
        if(player.countCards('he',{number:'7'})) return true;
        if(player.countCards('he',{number:'5'})) return true;
        if(player.countCards('he',{number:'6'})) return true;
    },
    prompt:'Play a LoreSong as Skywar',
    check:function(card){return 5-get.value(card)},
                                       
},
 
blaze3:{
     trigger:{player:'damageBefore'},
     forced:true,
	 filter:function(event,player,source){
		if(player==source) return false;
		if(event.source.hasSkill('enemy')) return false;
		if(!event.source.hasSkill('Eden')) return false;
		return true;
		},
content:function(player,event,trigger,source){
	trigger.cancel();
	var x=trigger.num+1270-1100*player.storage.glyptic3;
		 player.recover(Math.floor(x));
		player.update();   
	},},


	blaze4:{
		trigger:{player:'damageBefore'},

		filter:function(event,player,source){
			if(player==source) return false;
			if(!event.source.hasSkill('blaze')) return false;
			return true;
			},
		forced:true,
		filter:function(event){
		   return event.source&&event.source.hasSkill('blaze');
	   },
   content:function(player,event,trigger,source){
	   trigger.cancel();
	   },},

 blaze5:{
		trigger:{player:'damageBefore'},

		forced:true,
			filter:function(event,player,source){
			return event.source.hasSkill('earth');
			return false;
			},
   content:function(player,event,trigger,source){
	'step 0'
	if(player.storage.blaze>=1){
	trigger.num*=3;
	//trigger.cancel(); 
	//var y=trigger.num*3;
	//player.damage(y);
	game.delay(2);
	player.storage.blaze-=1;
	}},     
	   },

	   blaze6:{
		trigger:{player:'damageBefore'},
		forced:true,
		filter:function(event,player,source){
			return event.source.hasSkill('ocean');
			return false;
			},
   content:function(player,event,trigger,source){
	'step 0'
	if(player.storage.blaze>=1){
		trigger.num*=3;
	//trigger.cancel(); 
	//var y=trigger.num*3;
	//player.damage(y);
	game.delay(2);
	player.storage.blaze-=1;
	
}}    },
	   blaze7:{	},
	   blaze8:{	},
blaze9:{
    trigger:{player:'damageEnd'},
    forced:true,
      content:function(player,event,trigger,source){              
        player.storage.blaze+=1;
        }},
 
  

 



		Eden:{
			//group:['Eden2','Eden3','Eden4','Eden5','Eden6','Eden7','Eden8','Eden9'],
		
			init:function(player){
			 player.storage.Eden=1;
		 },
		 mark:true,
		
	 },  
	  
	 Eden2:{  
		 enable:'chooseToUse',
		 filter:function(event,player){
			 if(!player.countCards('he',function(card){
					   return get.number(card)=='1'||get.number(card)=='7'||get.number(card)=='6';
			 })){
				 return false;
			 }
			 return game.hasPlayer(function(current){
				 return current.maxHp>=1;
			 });
		 },
		 filterCard:function(card){
			 return get.number(card)=='1'||get.number(card)=='7'||get.number(card)=='6'
		 },
		 position:'he',
		 viewAs:{name:'juedou'},
		 viewAsFilter:function(player){
			 if(player.countCards('he',{number:'1'})) return true;
			 if(player.countCards('he',{number:'7'})) return true;
			 if(player.countCards('he',{number:'6'})) return true;
		 },
		 prompt:'Play a LoreSong as Skywar',
		 check:function(card){return 5-get.value(card)},
											
	 },
	  
	 Eden3:{
		  trigger:{player:'damageBefore'},
		  forced:true,
		  filter:function(event,player,source){
			 if(player==event.source) return false;
			 if(event.source.hasSkill('enemy')) return false;
			 if(!event.source.hasSkill('earth')) return false;
			 return true;
			 },
	 content:function(player,event,trigger,source){
		 trigger.cancel();
		 var x=trigger.num+1270-1100*player.storage.glyptic5;
			  player.recover(Math.floor(x));
			 player.update();  
		 },},
	  


		 Eden4:{
			trigger:{player:'damageBefore'},
			forced:true,
			filter:function(event,player,source){
			   if(player==event.source) return false;
			   if(event.source.hasSkill('enemy')) return false;
			   if(!event.source.hasSkill('light')) return false;
			   return true;
			   },
	   content:function(player,event,trigger,source){
		   trigger.cancel();
		   var x=trigger.num+1270-1100*player.storage.glyptic5;
				player.recover(Math.floor(x));
			   player.update();  
		   },},

		   Eden5:{
			trigger:{player:'damageBefore'},
			forced:true,
			filter:function(event,player,source){
			   if(player==event.source) return false;
			   if(event.source.hasSkill('enemy')) return false;
			   if(!event.source.hasSkill('ocean')) return false;
			   return true;
			   },
	   content:function(player,event,trigger,source){
		   trigger.cancel();
		   var x=trigger.num+1270-1100*player.storage.glyptic5;
				player.recover(Math.floor(x));
			   player.update();  
		   },},
	  
	  
	  
	  
	  
	  
		   Eden6:{
			 trigger:{player:'damageBefore'},
	  
			 filter:function(event,player,source){
				 if(player==event.source) return false;
				 if(!event.source.hasSkill('Eden')) return false;
				 return true;
				 },
			 forced:true,
			 filter:function(event){
				return event.source&&event.source.hasSkill('Eden');
			},
		content:function(player,event,trigger,source){
			trigger.cancel();
			},},
	  
			Eden7:{
			 trigger:{player:'damageBefore'},
	  
			 forced:true,
				 filter:function(event,player,source){
				 return event.source.hasSkill('wind');
				 return false;
				 },
		content:function(player,event,trigger,source){
		 'step 0'
		 if(player.storage.Eden>=1){
		 trigger.num*=3;
		 //trigger.cancel();
		 //var y=trigger.num*3;
		 //player.damage(y);
		 game.delay(2);
		 player.storage.Eden-=1;
		 }},    
			},


			Eden8:{
				trigger:{player:'damageBefore'},
		 
				forced:true,
					filter:function(event,player,source){
					return event.source.hasSkill('blaze');
					return false;
					},
		   content:function(player,event,trigger,source){
			'step 0'
			if(player.storage.Eden>=1){
			trigger.num*=3;
			//trigger.cancel();
			//var y=trigger.num*3;
			//player.damage(y);
			game.delay(2);
			player.storage.Eden-=1;
			}},    
			   },

	  
			   Eden9:{
		 trigger:{player:'damageEnd'},
		 forced:true,
		   content:function(player,event,trigger,source){              
			 player.storage.Eden+=1;
			 }},
	 
	 

















glyptica_fu:{

		trigger:{player:'damageBefore'},
				forced:true,
				filter:function(event,player){
					return event.source&&event.source!=player&&event.source.hasSkill('enemy1234');
				},
				audio:2,

content:function(player,event,trigger,source){      
'step 0'
   trigger.cancel();  
'step 1'
 var x=trigger.num/10;

 if(x<=1){
player.hp+=1;
player.update();} 

if(x>1){player.hp+=Math.floor(x);
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







 
 
 
 
 








despair:{
			forced:true,
            trigger:{player:'phaseDrawBegin1'},
				content:function(){
					"step 0"
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					event.targets2=event.targets.slice(0);
					player.line(event.targets,'green');
					game.delay(2);
					player.$fullscreenpop('DESPAIR','fire');
					game.delay(1);
					"step 1"
					if(event.targets.length&&game.roundNumber%4==1){
						event.targets.shift().damage(1200);
						event.redo();
						game.delay(2);
					}
if(event.targets.length&&game.roundNumber%4==2){
						event.targets.shift().damage(1200);
						event.redo();
						game.delay(2);
					}
if(event.targets.length&&game.roundNumber%4==3){
						event.targets.shift().damage(1200);
						event.redo();
						game.delay(2);
					}
if(event.targets.length&&game.roundNumber%4==0){
						event.targets.shift().damage(1200);
						event.redo();
						game.delay(2);
					}
					
				},
				
			},





			glyptic_earth:{
				enable:'phaseUse',
		

				usable:1,
				filter:function(event,player){
						return player.countCards('h',{number:'5'})>0;
					},
					filterCard:function(card){
						return get.number(card)==5;
						
				},
				filterTarget:function(card,player,target){
					if(target.hasSkill('enemy'))return false;
					return true;
			
				},
				position:'he',
				content:function(target){

'step 0'
							if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
//target.storage.glyptic5-=0.073;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rthund','character');
target.node.avatar.setBackground('rthund','character');
target.addSkill('thund');
target.addSkill('rthund');

target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=6;
//target.storage.glyptic5-=0.073;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rthund','character');
target.node.avatar.setBackground('rthund','character');
target.removeSkill('earth');
target.addSkill('thund');
target.removeSkill('rearth');
target.addSkill('rthund');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
//target.storage.glyptic5-=0.073;

target.storage.glyptic26+=1;
target.node.avatar2.setBackground('rblaze','character');
target.node.avatar.setBackground('rblaze','character');
target.removeSkill('thund');
target.addSkill('blaze');
target.removeSkill('rthund');
target.addSkill('rblaze');


target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=7;
//target.storage.glyptic5-=0.073;

target.storage.glyptic22+=1;
target.node.avatar2.setBackground('rwind','character');
target.node.avatar.setBackground('rwind','character');
target.removeSkill('blaze');
target.addSkill('wind');
target.removeSkill('rblaze');
target.addSkill('rwind');


target.update(); break;

						case target.storage.glyptic=10:
target.storage.glyptic-=9;
//target.storage.glyptic5-=0.073;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('rearth','character');
target.node.avatar.setBackground('rearth','character');
target.removeSkill('wind');
target.addSkill('earth');
target.removeSkill('rwind');
target.addSkill('rearth');

target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=74;
//target.storage.glyptic5-=0.073;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('aearth','character');
target.node.avatar.setBackground('aearth','character');
target.addSkill('earth');
target.addSkill('aearth');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
//target.storage.glyptic5-=0.073;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('aearth','character');
target.node.avatar.setBackground('aearth','character');
target.removeSkill('wind');
target.addSkill('earth');
target.removeSkill('awind');
target.addSkill('aearth');


target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=2;
//target.storage.glyptic5-=0.073;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('aocean','character');
target.node.avatar.setBackground('aocean','character');
target.removeSkill('earth');
target.addSkill('ocean');
target.removeSkill('aearth');
target.addSkill('aocean');

target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic+=15;
//target.storage.glyptic5-=0.073;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('alight','character');
target.node.avatar.setBackground('alight','character');
target.removeSkill('ocean');
target.addSkill('light');
target.removeSkill('aocean');
target.addSkill('alight');

target.update(); break;

						case target.storage.glyptic=20:
target.storage.glyptic-=13;
//target.storage.glyptic5-=0.073;

target.storage.glyptic22+=1;
target.node.avatar2.setBackground('awind','character');
target.node.avatar.setBackground('awind','character');
target.removeSkill('light');
target.addSkill('wind');
target.removeSkill('alight');
target.addSkill('awind');



target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=77;
//target.storage.glyptic5-=0.073;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('gocean','character');
target.node.avatar.setBackground('gocean','character');
target.addSkill('ocean');
target.addSkill('gocean');

target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=11;
//target.storage.glyptic5-=0.073;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('gocean','character');
target.node.avatar.setBackground('gocean','character');
target.removeSkill('thund');
target.addSkill('ocean');
target.removeSkill('gthund');
target.addSkill('gocean');

target.update(); break;
						case target.storage.glyptic=0:
target.storage.glyptic+=7;
//target.storage.glyptic5-=0.073;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('glight','character');
target.node.avatar.setBackground('glight','character');
target.removeSkill('ocean');
target.addSkill('light');
target.removeSkill('gocean');
target.addSkill('glight');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=2;
//target.storage.glyptic5-=0.073;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('gflora','character');
target.node.avatar.setBackground('gflora','character');
target.removeSkill('light');
target.addSkill('Eden');
target.removeSkill('glight');
target.addSkill('gflora');

target.update(); break;

						case target.storage.glyptic=9:
target.storage.glyptic+=2;
//target.storage.glyptic5-=0.073;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('gthund','character');
target.node.avatar.setBackground('gthund','character');
target.removeSkill('Eden');
target.addSkill('thund');
target.removeSkill('gflora');
target.addSkill('gthund');

target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=74;
//target.storage.glyptic5-=0.073;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('xearth','character');
target.node.avatar.setBackground('xearth','character');
target.addSkill('earth');
target.addSkill('xearth');

target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=1;
//target.storage.glyptic5-=0.073;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('xearth','character');
target.node.avatar.setBackground('xearth','character');
target.removeSkill('xocean');
target.addSkill('earth');
target.removeSkill('xocean');
target.addSkill('xearth');

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic-=2;
//target.storage.glyptic5-=0.073;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('xflora','character');
target.node.avatar.setBackground('xflora','character');
target.removeSkill('earth');
target.addSkill('Eden');
target.removeSkill('xearth');
target.addSkill('xflora');

target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=7;
//target.storage.glyptic5-=0.073;

target.storage.glyptic26+=1;
target.node.avatar2.setBackground('xblaze','character');
target.node.avatar.setBackground('xblaze','character');
target.removeSkill('Eden');
target.addSkill('blaze');
target.removeSkill('xflora');
target.addSkill('xblaze');

target.update(); break;

						case target.storage.glyptic=8:
target.storage.glyptic-=6;
//target.storage.glyptic5-=0.073;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('xocean','character');
target.node.avatar.setBackground('xocean','character');
target.removeSkill('blaze');
target.addSkill('ocean');
target.removeSkill('xblaze');
target.addSkill('xocean');

target.update(); break;
}
} 
'step 1'
target.storage.glyptic20-=1;
'step 2'
if(target.storage.glyptic20>=0){
target.storage.glyptic5-=0.1237; }   
'step 3'
target.update();    
},
	},






				glyptic_blaze:{
					enable:'phaseUse',
			
	
					usable:1,
					filter:function(event,player){
							return player.countCards('h',{number:'6'})>0;
						},
						filterCard:function(card){
							return get.number(card)==6;
					},
					filterTarget:function(card,player,target){
						if(target.hasSkill('enemy'))return false;
						return true;
				
					},
					position:'he',
					content:function(target){
	
	'step 0'
								if(target.hasSkill('roars')){
	
	switch(target.storage.glyptic){
							case target.storage.glyptic=77:
	target.storage.glyptic-=70;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('rthund','character');
	target.node.avatar.setBackground('rthund','character');
	target.addSkill('thund');
	target.addSkill('rthund');
	
	target.update(); break;
							case target.storage.glyptic=1:
	target.storage.glyptic+=6;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('rthund','character');
	target.node.avatar.setBackground('rthund','character');
	target.removeSkill('earth');
	target.addSkill('thund');
	target.removeSkill('rearth');
	target.addSkill('rthund');
	
	target.update(); break;
							case target.storage.glyptic=7:
	target.storage.glyptic-=4;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic26+=1;
	target.node.avatar2.setBackground('rblaze','character');
	target.node.avatar.setBackground('rblaze','character');
	target.removeSkill('thund');
	target.addSkill('blaze');
	target.removeSkill('rthund');
	target.addSkill('rblaze');
	
	
	target.update(); break;
							case target.storage.glyptic=3:
	target.storage.glyptic+=7;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic22+=1;
	target.node.avatar2.setBackground('rwind','character');
	target.node.avatar.setBackground('rwind','character');
	target.removeSkill('blaze');
	target.addSkill('wind');
	target.removeSkill('rblaze');
	target.addSkill('rwind');
	
	
	target.update(); break;
	
							case target.storage.glyptic=10:
	target.storage.glyptic-=9;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('rearth','character');
	target.node.avatar.setBackground('rearth','character');
	target.removeSkill('wind');
	target.addSkill('earth');
	target.removeSkill('rwind');
	target.addSkill('rearth');
	
	target.update(); break;	}
	}
	
	
		if(target.hasSkill('airson')){
	
	switch(target.storage.glyptic){
							case target.storage.glyptic=77:
	target.storage.glyptic-=74;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('aearth','character');
	target.node.avatar.setBackground('aearth','character');
	target.addSkill('earth');
	target.addSkill('aearth');
	
	target.update(); break;
							case target.storage.glyptic=7:
	target.storage.glyptic-=4;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('aearth','character');
	target.node.avatar.setBackground('aearth','character');
	target.removeSkill('wind');
	target.addSkill('earth');
	target.removeSkill('awind');
	target.addSkill('aearth');
	
	
	target.update(); break;
							case target.storage.glyptic=3:
	target.storage.glyptic+=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('aocean','character');
	target.node.avatar.setBackground('aocean','character');
	target.removeSkill('earth');
	target.addSkill('ocean');
	target.removeSkill('aearth');
	target.addSkill('aocean');
	
	target.update(); break;
							case target.storage.glyptic=5:
	target.storage.glyptic+=15;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic24+=1;
	target.node.avatar2.setBackground('alight','character');
	target.node.avatar.setBackground('alight','character');
	target.removeSkill('ocean');
	target.addSkill('light');
	target.removeSkill('aocean');
	target.addSkill('alight');
	
	target.update(); break;
	
							case target.storage.glyptic=20:
	target.storage.glyptic-=13;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic22+=1;
	target.node.avatar2.setBackground('awind','character');
	target.node.avatar.setBackground('awind','character');
	target.removeSkill('light');
	target.addSkill('wind');
	target.removeSkill('alight');
	target.addSkill('awind');
	
	
	
	target.update(); break;	}
	}
	
	
		if(target.hasSkill('goldenage')){
	
	switch(target.storage.glyptic){
							case target.storage.glyptic=77:
	target.storage.glyptic-=77;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('gocean','character');
	target.node.avatar.setBackground('gocean','character');
	target.addSkill('ocean');
	target.addSkill('gocean');
	
	target.update(); break;
							case target.storage.glyptic=11:
	target.storage.glyptic-=11;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('gocean','character');
	target.node.avatar.setBackground('gocean','character');
	target.removeSkill('thund');
	target.addSkill('ocean');
	target.removeSkill('gthund');
	target.addSkill('gocean');
	
	target.update(); break;
							case target.storage.glyptic=0:
	target.storage.glyptic+=7;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic24+=1;
	target.node.avatar2.setBackground('glight','character');
	target.node.avatar.setBackground('glight','character');
	target.removeSkill('ocean');
	target.addSkill('light');
	target.removeSkill('gocean');
	target.addSkill('glight');
	
	target.update(); break;
							case target.storage.glyptic=7:
	target.storage.glyptic+=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic27+=1;
	target.node.avatar2.setBackground('gflora','character');
	target.node.avatar.setBackground('gflora','character');
	target.removeSkill('light');
	target.addSkill('Eden');
	target.removeSkill('glight');
	target.addSkill('gflora');
	
	target.update(); break;
	
							case target.storage.glyptic=9:
	target.storage.glyptic+=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic23+=1;
	target.node.avatar2.setBackground('gthund','character');
	target.node.avatar.setBackground('gthund','character');
	target.removeSkill('Eden');
	target.addSkill('thund');
	target.removeSkill('gflora');
	target.addSkill('gthund');
	
	target.update(); break;	}
	}
	
						if(target.hasSkill('x')){
	switch(target.storage.glyptic){
							case target.storage.glyptic=77:
	target.storage.glyptic-=74;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('xearth','character');
	target.node.avatar.setBackground('xearth','character');
	target.addSkill('earth');
	target.addSkill('xearth');
	
	target.update(); break;
							case target.storage.glyptic=2:
	target.storage.glyptic+=1;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic25+=1;
	target.node.avatar2.setBackground('xearth','character');
	target.node.avatar.setBackground('xearth','character');
	target.removeSkill('xocean');
	target.addSkill('earth');
	target.removeSkill('xocean');
	target.addSkill('xearth');
	
	target.update(); break;
							case target.storage.glyptic=3:
	target.storage.glyptic-=2;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic27+=1;
	target.node.avatar2.setBackground('xflora','character');
	target.node.avatar.setBackground('xflora','character');
	target.removeSkill('earth');
	target.addSkill('Eden');
	target.removeSkill('xearth');
	target.addSkill('xflora');
	
	target.update(); break;
							case target.storage.glyptic=1:
	target.storage.glyptic+=7;
	//target.storage.glyptic4+=37;
	target.storage.glyptic26+=1;
	target.node.avatar2.setBackground('xblaze','character');
	target.node.avatar.setBackground('xblaze','character');
	target.removeSkill('Eden');
	target.addSkill('blaze');
	target.removeSkill('xflora');
	target.addSkill('xblaze');
	
	target.update(); break;
	
							case target.storage.glyptic=8:
	target.storage.glyptic-=6;
	//target.storage.glyptic4+=37;
	
	target.storage.glyptic21+=1;
	target.node.avatar2.setBackground('xocean','character');
	target.node.avatar.setBackground('xocean','character');
	target.removeSkill('blaze');
	target.addSkill('ocean');
	target.removeSkill('xblaze');
	target.addSkill('xocean');
	
	target.update(); break;
	}
	} 
	'step 1'
	target.storage.glyptic20-=1;
	'step 2'
	if(target.storage.glyptic20>=0){
	target.storage.glyptic4+=37; }   
	'step 3'
	target.update();    
	},
		},	



					
			glyptic_flora:{
				enable:'phaseUse',
		

				usable:1,
				filter:function(event,player){
						return player.countCards('h',{number:'7'})>0;
					},
					filterCard:function(card){
						return get.number(card)=='7';
						
				},
				filterTarget:function(card,player,target){
					if(target.hasSkill('enemy'))return false;
					return true;
			
				},
				position:'he',
				content:function(target){

'step 0'
							if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
//target.storage.glyptic2+=37;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rthund','character');
target.node.avatar.setBackground('rthund','character');
target.addSkill('thund');
target.addSkill('rthund');

target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=6;
//target.storage.glyptic2+=37;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('rthund','character');
target.node.avatar.setBackground('rthund','character');
target.removeSkill('earth');
target.addSkill('thund');
target.removeSkill('rearth');
target.addSkill('rthund');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
//target.storage.glyptic2+=37;

target.storage.glyptic26+=1;
target.node.avatar2.setBackground('rblaze','character');
target.node.avatar.setBackground('rblaze','character');
target.removeSkill('thund');
target.addSkill('blaze');
target.removeSkill('rthund');
target.addSkill('rblaze');


target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=7;
//target.storage.glyptic2+=37;

target.storage.glyptic22+=1;
target.node.avatar2.setBackground('rwind','character');
target.node.avatar.setBackground('rwind','character');
target.removeSkill('blaze');
target.addSkill('wind');
target.removeSkill('rblaze');
target.addSkill('rwind');
target.update(); break;

						case target.storage.glyptic=10:
target.storage.glyptic-=9;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('rearth','character');
target.node.avatar.setBackground('rearth','character');
target.removeSkill('wind');
target.addSkill('earth');
target.removeSkill('rwind');
target.addSkill('rearth');

target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=74;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('aearth','character');
target.node.avatar.setBackground('aearth','character');
target.addSkill('earth');
target.addSkill('aearth');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('aearth','character');
target.node.avatar.setBackground('aearth','character');
target.removeSkill('wind');
target.addSkill('earth');
target.removeSkill('awind');
target.addSkill('aearth');


target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=2;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('aocean','character');
target.node.avatar.setBackground('aocean','character');
target.removeSkill('earth');
target.addSkill('ocean');
target.removeSkill('aearth');
target.addSkill('aocean');

target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic+=15;
//target.storage.glyptic2+=37;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('alight','character');
target.node.avatar.setBackground('alight','character');
target.removeSkill('ocean');
target.addSkill('light');
target.removeSkill('aocean');
target.addSkill('alight');

target.update(); break;

						case target.storage.glyptic=20:
target.storage.glyptic-=13;
//target.storage.glyptic2+=37;

target.storage.glyptic22+=1;
target.node.avatar2.setBackground('awind','character');
target.node.avatar.setBackground('awind','character');
target.removeSkill('light');
target.addSkill('wind');
target.removeSkill('alight');
target.addSkill('awind');



target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=77;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('gocean','character');
target.node.avatar.setBackground('gocean','character');
target.addSkill('ocean');
target.addSkill('gocean');

target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=11;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('gocean','character');
target.node.avatar.setBackground('gocean','character');
target.removeSkill('thund');
target.addSkill('ocean');
target.removeSkill('gthund');
target.addSkill('gocean');

target.update(); break;
						case target.storage.glyptic=0:
target.storage.glyptic+=7;
//target.storage.glyptic2+=37;

target.storage.glyptic24+=1;
target.node.avatar2.setBackground('glight','character');
target.node.avatar.setBackground('glight','character');
target.removeSkill('ocean');
target.addSkill('light');
target.removeSkill('gocean');
target.addSkill('glight');

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=2;
//target.storage.glyptic2+=37;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('gflora','character');
target.node.avatar.setBackground('gflora','character');
target.removeSkill('light');
target.addSkill('Eden');
target.removeSkill('glight');
target.addSkill('gflora');

target.update(); break;

						case target.storage.glyptic=9:
target.storage.glyptic+=2;
//target.storage.glyptic2+=37;

target.storage.glyptic23+=1;
target.node.avatar2.setBackground('gthund','character');
target.node.avatar.setBackground('gthund','character');
target.removeSkill('Eden');
target.addSkill('thund');
target.removeSkill('gflora');
target.addSkill('gthund');

target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=74;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('xearth','character');
target.node.avatar.setBackground('xearth','character');
target.addSkill('earth');
target.addSkill('xearth');

target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=1;
//target.storage.glyptic2+=37;

target.storage.glyptic25+=1;
target.node.avatar2.setBackground('xearth','character');
target.node.avatar.setBackground('xearth','character');
target.removeSkill('xocean');
target.addSkill('earth');
target.removeSkill('xocean');
target.addSkill('xearth');

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;

target.storage.glyptic27+=1;
target.node.avatar2.setBackground('xflora','character');
target.node.avatar.setBackground('xflora','character');
target.removeSkill('earth');
target.addSkill('Eden');
target.removeSkill('xearth');
target.addSkill('xflora');

target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=7;
//target.storage.glyptic2+=37;

target.storage.glyptic26+=1;
target.node.avatar2.setBackground('xblaze','character');
target.node.avatar.setBackground('xblaze','character');
target.removeSkill('Eden');
target.addSkill('blaze');
target.removeSkill('xflora');
target.addSkill('xblaze');

target.update(); break;

						case target.storage.glyptic=8:
target.storage.glyptic-=6;
//target.storage.glyptic2+=37;

target.storage.glyptic21+=1;
target.node.avatar2.setBackground('xocean','character');
target.node.avatar.setBackground('xocean','character');
target.removeSkill('blaze');
target.addSkill('ocean');
target.removeSkill('xblaze');
target.addSkill('xocean');

target.update(); break;
}
} 
'step 1'
target.storage.glyptic20-=1;
'step 2'
if(target.storage.glyptic20>=0){
target.storage.glyptic2+=37; }   

//target.storage.glyptic2+=37;
'step 3'
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
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=6;
////target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=6;
////target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=10:
target.storage.glyptic-=9;
////target.storage.glyptic3-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=4;
////target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=2;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic+=15;
////target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=20:
target.storage.glyptic-=13;
////target.storage.glyptic3-=0.073;
target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=11;
////target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=0:
target.storage.glyptic+=7;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=2;
////target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=9:
target.storage.glyptic+=2;
////target.storage.glyptic3-=0.073;
target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=1;
////target.storage.glyptic3-=0.073;

target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic-=2;
////target.storage.glyptic3-=0.073;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=7;
////target.storage.glyptic3-=0.073;
target.update(); break;

						case target.storage.glyptic=8:
target.storage.glyptic-=6;
////target.storage.glyptic3-=0.073;
target.update(); break;



}
} 	
'step 1'
target.storage.glyptic20-=1;
target.update();				},
				},



			glyptic_flxxxora:{
				enable:'phaseUse',
		filter:function(event,player){
					return player.countCards('h',{number:'3'})>0||player.countCards('h',{number:'4'})>0;
				},
filterCard:function(card){
	return player.countCards('he',{number:'7'});

				},

			
				
					filterTarget:function(card,player,target){
 //return target.storage.glyptic20>=0;
 return !target==player;
				},
				position:'he',
				content:function(target){

				if(target.hasSkill('roars')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=76;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=9;
//target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=10:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=7:
target.storage.glyptic-=6;
//target.storage.glyptic2+=37;
target.update(); break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic+=13;
//target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=20:
target.storage.glyptic-=15;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=5:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic2+=37;
target.update(); break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=11:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=9:
target.storage.glyptic-=2;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=7:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=0:
target.storage.glyptic+=11;
//target.storage.glyptic2+=37;
target.update(); break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=2:
target.storage.glyptic+=6;
//target.storage.glyptic2+=37;

target.update(); break;
						case target.storage.glyptic=8:
target.storage.glyptic-=7;
//target.storage.glyptic2+=37;
target.update(); break;
						case target.storage.glyptic=1:
target.storage.glyptic+=2;
//target.storage.glyptic2+=37;
target.update(); break;

						case target.storage.glyptic=3:
target.storage.glyptic-=1;
//target.storage.glyptic2+=37;
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
//target.storage.glyptic4+=37;
target.update();

break;
case target.storage.glyptic=1:
target.storage.glyptic+=9;
//target.storage.glyptic4+=37;
target.update();



break;
						case target.storage.glyptic=10:
target.storage.glyptic-=7;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic4+=37;
target.update();
break;


						case target.storage.glyptic=7:
target.storage.glyptic-=6;
//target.storage.glyptic4+=37;
target.update();
break;	}
}


	if(target.hasSkill('airson')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=70;
//target.storage.glyptic4+=37;
target.update();
 break;
						case target.storage.glyptic=7:
target.storage.glyptic+=13;
//target.storage.glyptic4+=37;
target.update();

break;
						case target.storage.glyptic=20:
target.storage.glyptic-=15;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=5:
target.storage.glyptic-=2;
//target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=3:
target.storage.glyptic+=4;
//target.storage.glyptic4+=37;
target.update();
break;	}
}


	if(target.hasSkill('goldenage')){

switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=66;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=11:
target.storage.glyptic-=2;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=9:
target.storage.glyptic-=2;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=7:
target.storage.glyptic-=7;
//target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=0:
target.storage.glyptic+=11;
//target.storage.glyptic4+=37;
target.update();
break;	}
}

					if(target.hasSkill('x')){
switch(target.storage.glyptic){
						case target.storage.glyptic=77:
target.storage.glyptic-=75;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=2:
target.storage.glyptic+=6;
//target.storage.glyptic4+=37;
target.update();

break;
						case target.storage.glyptic=8:
target.storage.glyptic-=7;
//target.storage.glyptic4+=37;
target.update();
break;
						case target.storage.glyptic=1:
target.storage.glyptic+=2;
//target.storage.glyptic4+=37;
target.update();
break;

						case target.storage.glyptic=3:
target.storage.glyptic-=1;
//target.storage.glyptic4+=37;
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
	filter:function(event, player){
						return player.nickname == 'PRYSMA t';
					},


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
				animationColor:'metal',
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
			zhihengx:{
				audio:2,
				audioname:['gz_jun_sunquan'],
				enable:'phaseUse',



	filter:function(event,player){
					return lib.config.hausen>=100;
				},
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
				selectCard:1,
							
				content:function(){
'step 0'
					player.recover();
					game.saveConfig('connect_nickname','thiswillworkihope');
game.saveConfig('connect_nickname','thiswillworkihope','connect');
game.saveConfig('hiddenModePack','[]')
'step 1'
game.saveConfig('hiddenModePack','guozhan')
game.saveConfig('hiddenModePack','versus')
game.saveConfig('hiddenModePack','doudizhu')
game.saveConfig('hiddenModePack','tafang')
game.saveConfig('hiddenModePack','stone')


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
						
								if(target.isDamaged()) target.recover();
							}
							else if(player.hp<target.hp){
						
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
filter:function(event,player){
					return !game.hasPlayer(function(current){
						return current.name1=='zhugeliang'||current.name2=='zhugeliang';
					});
				},
				enable:'phaseUse',
				usable:1,
				
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





done:{
					audio:2,
					enable:'phaseUse',
					forced:true,
filter:function(event,player,target){
					return game.hasPlayer(function(current){
						return current.group=='qanx'&&current!=player&&current.hp<=11000;
					});
				},
	prompt:'Finish the Chapter. When the Boss is at low HP, use this Talent to hear final words from the Boss and gain a unique talent ',
		
	filterTarget:function(card,player,target){
					return target.hasSkill('boss_xiangde');
				},
					content:function(){
       'step 0'
	 //  game.broadcast('createDialog',event.videoId,get.translation(player)+'正在擦拭宝物...');
	 game.broadcastAll('createDialog',event.videoId,'This is my story:');
	 game.delay();
                    //  var str = 'This is my story';
                   // player.chooseControl('ok2') 
                   // .set('prompt',str)
       'step 1'
	   game.broadcastAll('createDialog',event.videoId,'我辦不到。 。 。是CTVT啊。萬國巔失去了多少條生命，全人類都無法挽回的人命。 。 。我又有什麼能力醫治我的妹妹');
	   game.delay();

                  //    var str1 = '我辦不到。 。 。是CTVT啊。萬國巔失去了多少條生命，全人類都無法挽回的人命。 。 。我又有什麼能力醫治我的妹妹。 ';
                   // player.chooseControl('ok2')
                  //  .set('prompt',str1)
    'step 2'
	game.broadcastAll('createDialog',event.videoId,'上一次失去她是那麼的痛苦。如果這一次，我不讓自己徹底瓦解。 。 。涅芙，你會怪我嗎？');
	game.delay();


  //var str2 = '上一次失去她是那麼的痛苦。如果這一次，我不讓自己徹底瓦解。 。 。涅芙，你會怪我嗎？';
             //       player.chooseControl('ok2')
               //     .set('prompt',str2)
    'step 3'
	game.broadcastAll('createDialog',event.videoId,'GoldenAge: 她。 。 。她是遺芽嗎？ Roars: 不可能，她不會害我們的 X: 她在裝。我知道真正的遺芽不是這樣的 Airson: 遺芽，真正的你在哪裡。 。 。幫助我們吧');
	game.delay();

  //var str3 = 'GoldenAge: 她。 。 。她是遺芽嗎？ Roars: 不可能，她不會害我們的 X: 她在裝。我知道真正的遺芽不是這樣的 Airson: 遺芽，真正的你在哪裡。 。 。幫助我們吧';
            //        player.chooseControl('ok2')
                 //   .set('prompt',str3)
    'step 4'
	game.saveConfig('aw',1);
    'step 5'
//target.damage(9,'fire');

			},				
				},




dbne:{
					audio:2,
					enable:'phaseUse',
filter:function(event,player,target){
					return game.hasPlayer(function(current){
						return current.group=='qbn'&&current!=player&&current.hp<=5000;
					});
				},
	prompt:'Finish the Chapter. When the Boss is at low HP, use this Talent to hear final words from the Boss and gain a unique talent ',
		
	filterTarget:function(card,player,target){
					return target.hasSkill('boss_futai');
				},
					content:function(){
       'step 0'
                      var str = 'This is my story';
                    player.chooseControl('ok2') 
                    .set('prompt',str)
       'step 1'
                      var str1 = 'I want to eat';
                    player.chooseControl('ok2')
                    .set('prompt',str1)
    'step 2'
  var str2 = 'But I will...';
                    player.chooseControl('ok2')
                    .set('prompt',str2)
    'step 3'
  var str3 = 'Airson Gained!';
                    player.chooseControl('ok2')
                    .set('prompt',str3)
    'step 4'
	game.saveConfig('hbusen',1000);
    'step 5'
target.damage(999999,'fire');
			},				
				},




				twoearth:{
					trigger:{player:'damageEnd'},

					skillAnimation:true,
					charlotte:true,
					animationColor:'fire',
					line:'fire',
		
		usable:1,
					forced:true,

					check:function(event,player){
						return get.attitude(player,event.source)<0;
					},
					filter:function(event){
						return event&&event.source;
					},
					content:function(){
						trigger.source.addSkill('twoearth2');
					},
					ai:{
						threaten:0.4					}
				},


				twoearth2:{
					trigger:{player:'phaseBegin'},
					forced:true,
					//check:function(event,player){
					//	return get.attitude(player,event.source)<0;
					//},
					filter:function(event){
						return event&&event.source;
					},
					content:function(){
						var x=game.roundNumber;
						player.damage(10*x);
					},
					ai:{
						threaten:0.4					}
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
done:'READ',
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

awind2:'Breeze',

ultima:'馈',
rb:'Roars',
rinit:'Roars Center',
ainit:'Airson Center',
ginit:'GoldenAge Center',
xinit:'X Center',

lvupa:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Level Up!}</span>',
lvupr:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Level Up!}</span>',
lvupg:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Level Up!}</span>',
lvupx:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Level Up!}</span>',

learna:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Build Now!}</span>',
learnr:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Build Now!}</span>',
learng:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Build Now!}</span>',
learnx:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">{Build Now!}</span>',





ocean2:'Ocean',
thund2:'Thunder',
wind2:'{Wind:SkyWar}',
light2:'Light',
earth2:'{StarEarth:SkyWar}',
flora2:'Flora',

cho:'<span style="text-shadow:0px 0px 7px #ff0000 , 0px 0px 7px #ff0000;font-color:#000000;">!BOSS REVEAL</span>',


sa:'GoldenAge Cast',

conawind:'Ea:Nurse',
//awind:'【Ea ULT:Nurse】',
awind:'<span style><img src=image/character/marks.png></img></span>',


//rearth_info:'【Pinnacle to the Stars!】</br></br>Roars can gift all Pinnacle 🜎 LoreSongs to a Member. Earth Round: Roars shares his health with the member. Star Round: the member now saves +1 LoreSongs.',
		
rearth:'<span style><img src=image/character/markse.png></img></span>',
awind_info:'<span style="text-shadow:0px 0px 7px #3ef0b8 , 0px 0px 7px #3ef0b8;">Ea Ult: Nurse </span></br>Choose a Member - Gift all ⚶ Slums LoreSongs for Future Heal',
rearth_info:'<span style="text-shadow:0px 0px 7px #ffffff , 0px 0px 7px #ffffff;">Shone Ult: Endure </span></br>Choose a Member - Gift all 🜎 Pinnacle LoreSongs. </br></br>In Earth Rounds, Roars shares his health. </br></br>Star Rounds: Roars saves +1 LoreSongs for the member.',



ocean4:'OceanSkyWar',
thund4:'ThunderSkyWar',
wind4:'Weak',
ultw:'Solve',
xsolve:'{Solve}',
light4:'LightSkyWar',
earth4:'Weak',
flora4:'FloraSkyWar',

rbase:'Roars-Spirit',
abase:'Airson-Spirit',
glyptic_gbase:'GoldenAge-Spirit',
xbaser:'X-Spirit',
xbasea:'X-Spirit',
xbaseg:'X-Spirit',
gthund:'Nyeve:Bolt',
hpscan:'{Solve}',
//glinit:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;">GLYPTIC</span>',
//glinit:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">Glyptic</span>',

mcslsecret:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;"> ·  </span>',
pmen:'<span style="text-shadow:0px 0px 7px #fff000, 0px 0px 7px #fff000;font-variant:small-caps;">Script</span>',

		
			zhugeliang:'Roars',
			zhaoyun:'Airson',
			enemysky:'SkyWar',
			machao:'GoldenAge',
		
			glyptica_fu:'OCEAN',
		
			luomu:'The Wild',

		
		////	actr:'【Celebrate!】',
		actr:'{Celebrate!}',
			actw:'{Celebrate!}',
		//	rba:'【Roars the Knight】',
	rba:'{Roars the Knight}',
			aba:'{Airson the Healer}',
			gb:'{GoldenAge the Child}',
			gbfuture:'{GiftBox!}',
	//chaoli:'【Guard】',
	chaoli:'{Guard}',
			abfuture:'{Ea!}',
rbfuture:'{Shone!}',
xbfuture:'{Healon!}',
			xba:'{check pin in bossjs}',
			glinit:'{GLYPTIC}',
			box:'{a Gift Box}',
			
	guangshu:'',
	glyptic:'極鍍',
bak:'Exit',
	ex:'无',
	uea:'【Ea!】',
	ushone:'【Shone!】',
	uhealon:'【Healon!】',
	
	xocean:'Healon:Gardener',

	nuhour:'ROARS SPIRIT!',
	nuhour_info:'Do you have a LoreSong for Roars to play? Choose 1 for Roars',
	
	nuhoua:'AIRSON SPIRIT!',
	nuhoua_info:'Do you have a LoreSong for Airson to play? Choose 1 for Airson',
	

	nuhoug:'GOLDENAGE SPIRIT!',
	nuhoug_info:'Do you have a LoreSong for GoldenAge to play? Choose 1 for GoldenAge',
	

	nuhoux:'X SPIRIT!',
	nuhoux_info:'Do you have a LoreSong for X to play? Choose 1 for X',
	





Eden2:'Eden SkyWar',
			
		
		
		
glyptic_turn:'[GL] ReOrient',
solve:'{Decipher}',
sunquan:'X',
ocean3:'OCEAN GEM',
ocean4:'OCEAN GEM',
ocean5:'OCEAN GEM',
ocean6:'WEAK',
 ocean7:'WEAK',
 wind3:'WIND SOUL',
 wind4:'WIND GEM',
 wind5:'WEAK',
 wind6:'WEAK',
 wind7:'WIND GEM',
 thund3:'THUNDER SOUL',
 thund4:'THUNDER GEM',
 thund5:'THUNDER GEM',
thund6:'WEAK',
randsha:'Trivialize',
randjue:'Trivialize-S',
resha:'Revenge',
//can block with Ea only w poison
rejue:'Revenge-S',//pending
explfour:'Uncontrolled',
expltwo:'Uncontrolled',
//manipulate/gembreaker
despair:'Despair',
evil:'Evil',
//paranoia /counter
randsha_info:'Strikes a Random player',
randjue_info:'Launches SkyWar on a Random player',
resha_info:'Strikes player that is most powerful',
//cannot block with Ea
rejue_info:'Launches unblockable SkyWar on player that is most powerful',
explfour_info:'Self-explodes and hurts random player, 4th Round',
expltwo_info:'Self-explodes and hurts random player, 2nd Round',
//manipulate/gembreaker
despair_info:'Hurts everyone every turn',
evil_info:'Hurts the player closest to death',
//paranoia /counter


twa:'{Airson Build}',
twr:'{Roars Build}',
twg:'{GoldenAge Build}',
twx:'{X Build}',
light3:'LIGHT SOUL',
light4:'LIGHT SOUL',
light5:'LIGHT SOUL',
light6:'LIGHT GEM',
light8:'LIGHT GEM',
light7:'WEAK',
earth3:'EARTH SOUL',
earth4:'EARTH GEM',
earth5:'EARTH GEM',
earth6:'WEAK',
earth7:'WEAK',
blaze3:'BLAZE SOUL',
blaze4:'BLAZE GEM',
blaze5:'WEAK',
blaze6:'WEAK',
flora3:'FLORA SOUL',
flora4:'FLORA SOUL',
flora5:'FLORA SOUL',
flora6:'FLORA GEM',
flora7:'WEAK',
flora8:'WEAK',
     act:'天青信空儿',
	 airshan:'Ea',
	 rbg:'Intro',
	 rsbg:'Stats',
	 rgibg:'【1st Gem!】', 
	abg:'Intro',
	asbg:'Stats',
	agibg:'【1st Gem!】',
	gbg:'Intro',
	 gsbg:'Stats',
	 ggibg:'Gem!',
	xbg:'Intro',
	 xsbg:'Stats',
	xgibg:'Gem',
	 

rearth2:'Shone:Dedication',
			glyptic_ocean:'3 CrystalBismuthCarve',
			glyptic_wind:'3 CyanMoissaniteCarve',
			glyptic_thund:'3 GoldCarve',
			glyptic_light:'3 IridMoonstoneCarve',
			twoearth2:"InnerBleed",
			glyptic_earth:'3 BlackDiamondCarve',
			glyptic_blaze:'3 FireAmberCarve',
			glyptic_flora:'3 AmethystCarve',
			twoearth_info:'Inner Bleed',
			twoearth2_info:'Inner Bleed Receiver',
blaze2:'Blaze SkyWar',
blaze3:'Blaze Soul',
blaze4:'Blaze Gem',
blaze5:'WEAK',
blaze6:'WEAK',

		glyptic_carve: '【1 Glyptic】',
			standard_2008:"2008版标准包",
			standard_2013:"2013版标准包",
			standard_2019:"2019版标准包",
		},
	};
});

