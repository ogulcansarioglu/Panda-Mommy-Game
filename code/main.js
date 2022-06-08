import kaboom from "kaboom";
import patrol from "./patrol";
import big from "./big";
import loadAssets from "./assets";

//Royalty free beat from "Royalty Free Music from Bensound"

kaboom({
    width: 480,
    height: 320,
    letterbox: true,
    stretch: true,
    scale: 1.5,
    background: [ 0, 0, 255, ],
    //crisp: true,
});

loadAssets();

// define some constants
const JUMP_FORCE = 1000;
const MOVE_SPEED = 180;
const FALL_DEATH = 300;
const vec2 = (1,1);
var locked = false;
var lockedObj;


const LEVELS = [
	[ 
    ".               .",
		".               .",
    ".               .",
		".               .",
		".               .",
		".               .",
		".               .",
		".               .",
    ".               .",
    ".  r    t > ^bt .",
    "======  =========",
    ".               .",
    ".               .",
    "      ==         ",
	],
	[ 
    ".               .",
		".               .",
    ".               .",
		".               .",
		".               .",
		".  d          o .",
		".               .",
		".n              .",
    ".           k   .",
    ".>  >   t  >kk >.",
    "=================",
	],
  [ 
    ".               .",
		".               .",
    ".               .",
		".               .",
		".               .",
		".z              .",
		". > q    v      .",
		".  z           z.",
    ".               .",
    ". > > >  t   >  .",
    "=================",
	],
  [ 
    ".               .",
		".               .",
    ".u              .",
		".      c        .",
		".     z   d     .",
		".          u    .",
		". >    q        .",
		".z    z         .",
    ".               .",
    ". ^ ^ ^ ^ ^ t   .",
    "=================",
	],
  
];

// define what each symbol means in the level graph
const levelConf = {
	// grid size
	width: 32,
	height: 32,
  	"=": () => [
		sprite("grass"),
		area({ width: 20, height: 50 }),
		solid(),
		origin("bot"),
	],
  "r": () => [
		sprite("bigrock"),
		area(),
		solid(),
		origin("bot"),
    scale(2 ,1 ),
    //pos(0, -150),
    body(),
    "bigrock",
	],
  "c": () => [
		sprite("doublerock"),
		area(),
		solid(),
		origin("bot"),
    scale(),
    color(255,0,0),
    //pos(0, -150),
    body(),
    "new",
	],
  "q": () => [
		sprite("doublerock"),
		area(),
		solid(),
		origin("bot"),
    scale(),
    body(),
    "rock",
	],
  "o": () => [
		sprite("level2_branch"),
		area({ width: 120 }),
		solid(),
		origin("bot"),
    "branch",
  ],
  "z": () => [
		sprite("ortauzun"),
		area({ height: 5, width: 80 }),
		solid(),
    scale(2),
		origin("bot"),
    pos(-30,0),
    "branch",
  ],
  "v": () => [
		sprite("ortauzun"),
		area({ height: 5, width: 80 }),
		solid(),
    scale(1,2),
		origin("bot"),
    pos(-30,0),
    "branch",
  ],
  "l": () => [
		sprite("level3_tree"),
    area({ height: 100, width: 600 }),		
    solid(),
    scale(0.5),
		origin("bot"),
    "branch",
  ],
  "u": () => [
		sprite("level3branch_2"),
    area({ height: 20, width: 100 }),		
    solid(),
    scale(0.4),
		origin("bot"),
    "branch",
  ],
  "k": () => [
		sprite("rock"),
		area(),
		solid(),
    body(),
		origin("bot"),
    pos(0, -20),
    "rock",
  ],
  "n": () => [
		sprite("level2_branch2"),
		area({ width: 140 }),
		solid(),
		origin("bot"),
    "branch",
  ],
  "d": () => [
		sprite("doublerock"),
		area(),
		solid(),
    body(),
		origin("bot"),
    "doublerock",
  ],
  "*": () => [
		sprite("bean"),
		area(),
		solid(),
		origin("bot"),
    "bean",
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
		origin("bot"),
		"coin",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
    pos(0,-20),
		origin("bot"),
    scale(2),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("enemy"),
		area(),
		origin("bot"),
		body(),
		patrol(),
    scale(1.2),
		"enemy",
	],
	"@": () => [
		sprite("portal"),
		area({ scale: 0.5, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
  "s": () => [
		sprite("sarmasik"),
    area(),
		origin("bot"),
		pos(0, -12),
		"sarmasik",
	],
  "b": () => [
		sprite("branch"),
    area(),
    body(),
		origin("bot"),
		pos(0, -12),
	],
  "t": () => [
		sprite("tree"),
		area({ width: 20, height: 120 }),
    pos(10, -20),
		origin("bot"),
		body(),
		"tree",
  ],
   "b": () => [
		sprite("branch"),
		area(),
    pos(0, -120),
		origin("bot"),
    solid(),
		//body(),
		"branch",
  ],
  "s": () => [
		sprite("sarmasik"),
		area(),
    pos(5, -70),
		origin("bot"),
		//body(),
		"sarmasik",
  ],
  ".": () => [
		sprite("collision"),
		area(),
    //pos(5, -70),
		origin("bot"),
		solid(),
		"collision",
  ],
};

var levelId = 0;

const startMusic = play("StartScreen", {
    volume: 0.5,
    loop: true
});


scene("start", () => {
	add([
		sprite("StartScene"),
    scale(1),
	]);
  //play("StartScreen");
  keyPress(() => go("instructions"));
});

scene("instructions", () => {
	add([
		sprite("Instructions"),
    scale(1),
	]);
  
  keyPress(() => go("story"));
  
});

scene("story", () => {
	add([
		sprite("storyscene"),
    scale(1),
	]);
  
  keyPress(() => go("game"));
  
});


scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

  add([
  sprite("level1_bg"), 
  ]);

  startMusic.pause();
 
  // play a looping soundtrack 
const music = play("beat", {
    volume: 0.2,
    loop: true
});


	gravity(3200);
  camScale(1, 1);
  camPos(width()/2, height()/2);

	// add level to scene
	const level = addLevel(LEVELS[levelId ?? 2], levelConf);

	// define player object
	const player = add([
		  sprite("PandaAnimDemo", {
      anim: "idleRight",
		}),
      
      "player",
		  pos(30, 10),
		  area(),
      health(100),
		  scale(0.5),
      rotate(),
		  // makes it fall to gravity and jumpable
		  body(),
      { 
      angleRotated : 0,
      name : "player1",
      },
		// the custom component we defined above
		//big(),
		origin("bot"),
	]);

  //player.play("walkLeft");
  //player.stop();

// manually setting a frame
var bDoubleRock = false; 
player.frame = 1;
  
  	const player2 = add([
		sprite("PandaAnimDemo", {
      anim: "idleLeft",
		}),
    rotate(0),
		pos(400, 0),
		area(),
		scale(0.3),
    health(100),
  
		// makes it fall to gravity and jumpable
		body(),
    {
      angleRotated : 0,
      name : "player2",
    },
    
		// the custom component we defined above
		//big(),
		origin("bot"),
	]);
  var countDown = 6;
  var activePlayer = player;
 

var score = add([
    text(countDown),
    pos(24, 24),
    scale(0.4),
    fixed(),
    color(255,255,255),
    ]);

 loop(1, () => {
      countDown -= 1;
      score.text = countDown;
      play("clock");
 
      gravity(3200);
      if (countDown < 1) {
        countDown = 5;
        play("bell");
        
      } 
      if(countDown < 3) {
        score.color = color(255, 0 , 0);
      }
  });

  loop(1, () => {

    player.hurt(1);
    player2.hurt(1);
  });

drawRect(player.pos.x, player.pos.y, 100,100);

  loop(5, (countDown) => {
          countDown -= 1;

    if(activePlayer.name == player.name) {
     
      text()
      activePlayer = player2;
      locked = false; 
      activePlayer.jump(JUMP_FORCE/2);
    } else {
      gravity(3200);
      activePlayer = player;
      activePlayer.jump(JUMP_FORCE/2);
      locked = false;
    };
});

	// action() runs every frame
  
	activePlayer.action(() => {
		// center camera to player
		//camPos(activePlayer.pos);
		// check fall death
		if (activePlayer.pos.y >= FALL_DEATH) {
		go("lose");
    music.pause();
		}
  });
  

	// if player collides with any obj with "danger" tag, lose
	player.collides("danger", () => {
		go("lose");
    music.pause();
		play("hit");
	});
  player2.collides("danger", () => {
		go("lose");
    music.pause();
		play("hit");
	});

	player.collides("portal", () => {
		play("portal");
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			});
		} else {
			go("win");
		}
	});

  player2.collides("portal", () => {
		play("portal");
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			});
		} else {
			go("win");
		}
	});

	player.on("ground", (l) => {
		if (l.is("enemy")) {
			player2.jump(JUMP_FORCE);
			destroy(l);
			addKaboom(player.pos);
			play("powerup");
		}
	});

  player2.on("ground", (l) => {
		if (l.is("enemy")) {
			player2.jump(JUMP_FORCE);
			destroy(l);
			addKaboom(player2.pos);
			play("powerup");
		}
	});


  player.collides("apple", (l) => {
        l.move(player.pos,10);
  });


	player.collides("enemy", (e, side) => {
		if (side !== "bottom") {
			go("lose");
      music.pause();
			play("hit");
		}
	});
  player2.collides("enemy", (e, side) => {
		if (side !== "bottom") {
			go("lose");
      music.pause();
			play("hit");
		}
	});

	let hasApple = false;

	// grow an apple if player's head bumps into an obj with "prize" tag
	player.on("headbutt", (obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1));
			apple.jump();
			hasApple = true;
			play("blip");
		}
	});
  player2.on("headbutt", (obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1));
			apple.jump();
			hasApple = true;
			play("blip");
		}
	});

	// player grows big collides with an "apple" obj

  player2.collides("apple", (a) => {
		destroy(a);

		// as we defined in the big() component
		player.biggify(3);
		hasApple = false;
		play("powerup");
	});

activePlayer.collides("bean", (a) => {
    
    keyPress("c", () => {
    if(locked == false) {
    locked = true;
    lockedObj = a;
    } else {
    locked = false;
    lockedObj = null;
    }
    });
		// as we defined in the big() component
	});

  collides("doublerock", "enemy", (a, b) => {
        if(bDoubleRock == false){
           destroy(b);
           addKaboom(activePlayer.pos);
        }
        bDoubleRock = true;
    
});


  activePlayer.collides("player", () => {
    
		if (levelId + 1 < LEVELS.length) {
      music.pause();
			go("game", {
				levelId: levelId + 1,
				coins: coins,
       
			});
		} else {
      music.pause();
			go("win");
      music.pause();
		}
  })

	let coinPitch = 0;


	action(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100);
		}
	});



	player.collides("coin", (c) => {
		destroy(c);
		play("coin", {
			detune: coinPitch,
		});
		coinPitch += 100;
		coins += 1;
		coinsLabel.text = coins;
	});
  player2.collides("coin", (c) => {
		destroy(c);
		play("coin", {
			detune: coinPitch,
		});
		coinPitch += 100;
		coins += 1;
		coinsLabel.text = coins;
	});

	// jump with space
	keyPress("space", () => {
		// these 2 functions are provided by body() component
    gravity(3200);
		if (activePlayer.grounded()) {
      if(activePlayer == player)
      {
        activePlayer.jump(JUMP_FORCE/3);
        activePlayer.play('jumpRight');
      }
			else{
        activePlayer.jump(JUMP_FORCE/2);
      }
     
		}
	});

  player2.collides("tree", (a) => {
    if (keyIsDown("c"))
    {
        player2.jump(50);
        gravity(0);
        player2.play('climb');
        
    };
  
    if(keyIsReleased("c")) {
        gravity(3200);
      }
      keyPress("j", () => {
      gravity(0);
      player2.jump(-50);
      })
      if (keyIsReleased("j"))
      {
        gravity(3200);
      }
      });
  
	gravity(3200);

  player.collides("rock", (a) => {
    
    keyPress("x", () => {
    if(locked == false) {
    locked = true;
    lockedObj = a;
    } else {
    locked = false;
    lockedObj = null;
    }
    })});

    player.collides("doublerock", (a) => {
    
    keyPress("x", () => {
    if(locked == false) {
    locked = true;
    lockedObj = a;
    } else {
    locked = false;
    lockedObj = null;
    }
    })});

    player.collides("bigrock", (a) => {
    
    keyPress("x", () => {
    if(locked == false) {
    locked = true;
    lockedObj = a;
    } else {
    locked = false;
    lockedObj = null;
    }
    })});

   

    

	keyDown("left", () => {
   if(locked) {
    lockedObj.move(-MOVE_SPEED, 0);
   }
		activePlayer.move(-MOVE_SPEED, 0);
    activePlayer.play('walkLeft');
    
	});

	keyDown("right", () => {
		
    if(locked) {
    lockedObj.move(MOVE_SPEED, 0);
    }
		activePlayer.move(MOVE_SPEED, 0);
    activePlayer.play('walkRight');
	});

	keyPress("down", () => {
		player.weight = 3;
	});

	keyRelease("down", () => {
		player.weight = 1;
	});
keyPress("f", () => {
		fullscreen(!fullscreen());
	});
});

scene("lose", () => {
	add([
		sprite("losescene"),
	]);
	keyPress(() => go("game"));
});

scene("win", (levelId) => {
	add([
		sprite("finalscene"),
	]);
	
});



go("start");

