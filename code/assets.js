export default function loadAssets() {
	loadSprite("bean", "sprites/bean.png");
	loadSprite("googoly", "sprites/googoly.png");
	loadSprite("spike", "sprites/spike.png");
	loadSprite("grass", "sprites/grass.png"); 
	loadSprite("prize", "sprites/jumpy.png");
	loadSprite("apple", "sprites/apple.png");
	loadSprite("portal", "sprites/portal.png");
	loadSprite("coin", "sprites/coin.png");
  loadSprite("bigpanda", "sprites/bigpanda.png");
  loadSprite("bigrock", "sprites/bigrock.png");
  loadSprite("branch", "sprites/branch.png");
  loadSprite("ground", "sprites/ground.png");
  loadSprite("level1_bg", "sprites/level1_bg.png");
  loadSprite("rock", "sprites/rock.png");
   loadSprite("final", "sprites/Final.png");
  loadSound("beat", "sounds/beat.mp3");
   loadSound("StartScreen", "sounds/StartScreen.mp3");
  loadSound("clock", "sounds/ClockSound.mp3");
  loadSound("bell", "sounds/Bell.mp3");
  loadSprite("sarmasik", "sprites/sarmasik.png");
  loadSprite("tree", "sprites/tree.png");
  loadSprite("small_panda", "sprites/small_panda.png");
  loadSprite("StartScene", "sprites/StartScene.png");
  loadSprite("Instructions", "sprites/Instructions.png");
  loadSprite("level2bg", "sprites/level2bg.png");
  loadSprite("level2_branch", "sprites/level2_branch.png");
  loadSprite("level2_branch2", "sprites/level2_branch2.png");
  loadSprite("doublerock", "sprites/doublerock.png");
  loadSprite("level3_tree", "sprites/level3_tree.png");
  loadSprite("level3branch_2", "sprites/level3branch_2.png");
  loadSprite("ortauzun", "sprites/ortauzun.png");
  loadSprite("enemy", "sprites/enemy.png");
  loadSprite("finalscene", "sprites/finalscene.png");
  loadSprite("losescene", "sprites/losescene.png");
  loadSprite("storyscene", "sprites/storyscene.png");
  loadSprite("Play_Text", "sprites/Play_Text.png");
  
 loadSprite("PandaAnimDemo", "sprites/PandaAnimDemo.png", {
    sliceX: 9,
    sliceY: 7,
    anims: {
        idleRight: {
            from: 0,
            to: 1,
        },
        walkRight: {
            from: 0,
            to: 8,
        },
        idleLeft: {
            from: 10,
            to: 11,
        },
        walkLeft: {
            from: 9,
            to: 17,
        },
        jumpRight: {
          from: 18,
          to: 26,
        },
        jumpLeft: {
          from: 27,
          to: 35,
        },
        pushRight: {
          from: 36,
          to: 44,
        },
        pushLeft: {
          from: 45,
          to: 53,
        },
        climb: {
          from: 54,
          to: 58,
        },
}});

  loadSprite("collision", "sprites/collision.png");
	loadSound("coin", "sounds/score.mp3");
	loadSound("powerup", "sounds/powerup.mp3");
	loadSound("blip", "sounds/blip.mp3");
	loadSound("hit", "sounds/hit.mp3");
	loadSound("portal", "sounds/portal.mp3");
}