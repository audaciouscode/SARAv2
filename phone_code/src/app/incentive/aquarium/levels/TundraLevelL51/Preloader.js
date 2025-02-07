export class PreloaderTundraL51 extends Phaser.State {
	
	preload(){

		console.log("Preload called");
		this.input.addPointer();
		

		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
        
        //---- both aquariums
        this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
		this.load.json('fishpoints', 'assets/game/fishpoints.json');//fish json, points
		this.load.image('fish_progress', 'assets/game/sprite/fish_progress_s.png');
		
		this.add.text(0, 0, "hack", {font:"1px dumbo_regular", fill:"#FFFFFF"});
		//this.load.spritesheet('timer', 'assets/game/sprite/timer.png', 150, 20);
		this.load.spritesheet('timer', 'assets/img/timer_red.png', 150, 20);
		this.load.image('points_progress_2', 'assets/img/points_progress_2.png');
		this.load.image('levels_progress', 'assets/img/levels_progress_2.png');
		this.load.image('streak_info', 'assets/img/streak_info_2.png');
		this.load.spritesheet('timer_grey', 'assets/img/timer_grey.png', 150, 20);
		this.load.spritesheet('timer_yellow', 'assets/img/timer_yellow.png', 150, 20);
		this.load.spritesheet('timer_pumpkin', 'assets/img/timer_pumpkin.png', 150, 20);
		this.load.image('alt_icon', 'assets/img/heart.png');
		this.load.image('next_fish_icon', 'assets/img/fish_icon_2.png');
		this.load.image('meme_icon', 'assets/img/smiley_face.png');
		this.load.spritesheet('level_up_progress', 'assets/img/level_up.png', 150, 20);
		this.load.image('level_up_icon', 'assets/img/level_icon.png');
		this.load.image('level_up_2', 'assets/img/level_up_2.png');
		this.load.image('streak_green', 'assets/img/streak_green.png');
		this.load.image('streak_red', 'assets/img/streak_red_2.png');
		this.load.image('streak_grey', 'assets/img/streak_grey.png');
		this.load.image('star_point', 'assets/img/star.png');
		this.load.atlasJSONArray('info_sprite', 'assets/game/sprite/info_sprite.png', 'assets/game/sprite/info_sprite.json');
		

		this.load.image('diamond', 'assets/img/diamond.png');


		//----
		var next_fish = window.localStorage['next_fish'] || 'assets/img/aquarium_grey/clownfish.png';
		this.load.image('clownfish_grey', next_fish);


		var progressDisplay = 0;
		var timerEvt = this.time.events.loop(100, function (){
            if(this.load.progress < 100){
            	progressDisplay++;
                console.log('loading... '+(this.load.progress)+'%' + "; " + (100*progressDisplay));
            }else{
                //loadingText.text = 'Ready, Go!';
                console.log('Ready, Go!');
                this.time.events.remove(timerEvt);
            }

		}, this);

		

		//this.game.load.image('tundra1','assets/pics/bg-tundra.png');
		this.game.load.image('tundra1','assets/pics/bg-top-tundra.png');
		this.load.image('titlescreen', 'assets/pics/bg-bottom-tundra.png'); 
        
		this.game.load.atlasJSONArray('penguin', 'assets/game/sprite/penguin_sprite.png', 'assets/game/sprite/penguin_sprite.json');
		this.game.load.atlasJSONArray('sea_lion_silver', 'assets/game/sprite/sea_lion_silver_sprite.png', 'assets/game/sprite/sea_lion_silver_sprite.json');
		this.game.load.atlasJSONArray('sea_lion_brown', 'assets/game/sprite/sea_lion_brown_sprite.png', 'assets/game/sprite/sea_lion_brown_sprite.json');
		this.game.load.atlasJSONArray('sea_lion_pink', 'assets/game/sprite/PinkSeal.png', 'assets/game/sprite/PinkSeal.json');
		//
		this.game.load.atlasJSONArray('wolf_walk', 'assets/game/sprite/wolf_walk_sprite.png', 'assets/game/sprite/wolf_walk_sprite.json');

		//
		this.game.load.atlasJSONArray('bird_fly', 'assets/game/sprite/bird_tundra_sprite.png', 'assets/game/sprite/bird_tundra_sprite.json');
		this.game.load.atlasJSONArray('blue_jay', 'assets/game/sprite/BlueJay.png', 'assets/game/sprite/BlueJay.json');

		//
		this.game.load.atlasJSONArray('hare', 'assets/game/sprite/hare_tundra_sprite.png', 'assets/game/sprite/hare_tundra_sprite.json');
		this.game.load.atlasJSONArray('pingu', 'assets/game/sprite/pingu_tundra_sprite.png', 'assets/game/sprite/pingu_tundra_sprite.json');
		this.game.load.atlasJSONArray('coyote', 'assets/game/sprite/coyote_tundra_sprite.png', 'assets/game/sprite/coyote_tundra_sprite.json');
		
		
    
        //
        this.game.load.atlasJSONArray('grey_husky', 'assets/game/sprite/husky_grey_tundra_sprite.png', 'assets/game/sprite/husky_grey_tundra_sprite.json');
        this.game.load.atlasJSONArray('white_husky', 'assets/game/sprite/husky_white_tundra_sprite.png', 'assets/game/sprite/husky_white_tundra_sprite.json');

		//
		this.game.load.atlasJSONArray('yeti_walk', 'assets/game/sprite/yeti_walk_sprite.png', 'assets/game/sprite/yeti_walk_sprite.json');
		this.game.load.atlasJSONArray('yeti_laugh', 'assets/game/sprite/yeti_laugh_sprite.png', 'assets/game/sprite/yeti_laugh_sprite.json');
		

		//
		this.game.load.atlasJSONArray('brown_bear', 'assets/game/sprite/brown_bear.png', 'assets/game/sprite/brown_bear.json');
		this.game.load.atlasJSONArray('rabbit', 'assets/game/sprite/rabbit.png', 'assets/game/sprite/rabbit.json');
		this.game.load.atlasJSONArray('reindeer', 'assets/game/sprite/reindeer.png', 'assets/game/sprite/reindeer.json');

		//
		this.game.load.atlasJSONArray('duck', 'assets/game/sprite/Duck.png', 'assets/game/sprite/Duck.json');
		this.game.load.atlasJSONArray('polar_bear_cub', 'assets/game/sprite/PolarBear.png', 'assets/game/sprite/PolarBear.json');


		//
		this.game.load.atlasJSONArray('black_tundra_owl', 'assets/game/sprite/black_tundra_owl.png', 'assets/game/sprite/black_tundra_owl.json');
		this.game.load.atlasJSONArray('brown_tundra_owl', 'assets/game/sprite/brown_tundra_owl.png', 'assets/game/sprite/brown_tundra_owl.json');
		this.game.load.atlasJSONArray('grey_tundra_owl', 'assets/game/sprite/grey_tundra_owl.png', 'assets/game/sprite/grey_tundra_owl.json');
		//this.game.load.atlasJSONArray('light_brown_tundra_owl', 'assets/game/sprite/light_brown_tundra_owl.png', 'assets/game/sprite/light_brown_tundra_owl.json');
		this.game.load.atlasJSONArray('white_tundra_owl', 'assets/game/sprite/white_tundra_owl.png', 'assets/game/sprite/white_tundra_owl.json');


		//mountain goat
		this.game.load.atlasJSONArray('black_mountain_goat', 'assets/game/sprite/black_mountain_goat.png', 'assets/game/sprite/black_mountain_goat.json');
		this.game.load.atlasJSONArray('brown_mountain_goat', 'assets/game/sprite/brown_mountain_goat.png', 'assets/game/sprite/brown_mountain_goat.json');
		this.game.load.atlasJSONArray('white_mountain_goat', 'assets/game/sprite/white_mountain_goat.png', 'assets/game/sprite/white_mountain_goat.json');


		//
		this.load.image('treasure_tundra', 'assets/img/tundra_treasure_chest.png');

		//
		this.load.image('yeti_standing', 'assets/game/sprite/yeti_standing.png');

		//
		//this.load.image('snowgswitch', 'assets/img/snowglobe.png');
		this.load.image('snow_start', 'assets/img/start_snow.png');
		this.load.image('snow_end', 'assets/img/stop_snow.png');

		//
		this.game.load.spritesheet('snowflakes', 'assets/game/sprite/snowflakes.png', 17, 17);
		//snowflakes.png
	}

	create(){
		console.log("Preloader: create called");
		this.preloadBar.cropEnabled = false;
	}

	update(){
		console.log("update: "+ 'TundraLevel2');
		this.state.start('TundraLevel2');
	}

	onLoadComplete(){
	    console.log("Load complete");
	    this.ready = true;
	}

	
}