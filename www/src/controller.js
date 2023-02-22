export default class Controller {
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.isDeep = false;
        this.isPlaying = false;
        this.intervalId = null;
        
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        
        this.view.renderStartScreen();
    }
    
    update(){
        this.game.movePieceDown();
        this.updateView();
    }
    
    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }
    
    pause(isDeep){
        isDeep = isDeep || false;
        this.isDeep = isDeep;
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }
    
    reset(){
        this.game.reset();
        this.stopTimer();
        this.play();
    }
    
    updateView(){
        const state = this.game.getState();
        
        if(state.isGameOver){
            this.view.renderEndScreen(state);
        }
        else if(!this.isPlaying){
            this.view.renderPauseScreen(this.isDeep);
        }
        else{
            this.view.renderMainScreen(state);
        }
    }
    
    startTimer(){
        const speed = 1000 - this.game.getState().level * 100;
        
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.update();
            },speed > 0 ? speed : 100);
        }
    }
    
    stopTimer(){
        if(this.intervalId){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    handleKeyDown(event){
        const state = this.game.getState();
        
        switch(event.keyCode){
            case 27: // esc
                if(!state.isGameOver){
                    if(this.isPlaying){
                        this.pause(true);
                    }
                    else{
                        this.play();
                    }
                }
                break;
            
            case 13: // enter
                if(state.isGameOver){
                    this.reset();
                }
                else if(this.isPlaying){
                    this.pause();
                }
                else{
                    this.play();
                }
                break;
                
            case 37: //left
                game.movePieceLeft();
                this.updateView();
                break;
                
            case 38: //up
                game.rotatePiece();
                this.updateView();
                break;
                
            case 39: //right
                game.movePieceRight();
                this.updateView();
                break;
                
            case 40: //down
                this.stopTimer();
                game.movePieceDown();
                this.updateView();
                break;
        }
    }
    
    handleKeyUp(event){
        switch(event.keyCode){
            case 40: //down
                this.startTimer();
                break;
        }
    }    
}