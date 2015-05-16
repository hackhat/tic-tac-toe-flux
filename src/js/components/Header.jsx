const React         = require('react');
const SmartCSS      = require('smart-css');
const tinycolor     = require('tinycolor2');
const BoardStore    = require('../stores/BoardStore');
const ActionCreator = require('../actions/BoardActionCreators');
const tileColors    = require('../constants/tileColors');
const css           = new SmartCSS({name: 'header'});


css.setClass('.root', {
  width      : (64 * 3 - 2) + 'px',
  height     : '62px',
  margin     : '1px',
  color      : 'white',
  padding    : '0 10px',
  cursor     : 'pointer',
  transition : '0.3s all',
})
css.setClass('.root:hover', {
  transform: 'translateY(-10px)'
})
css.setClass('.player1', {
  background : tileColors[1],
})
css.setClass('.player1:hover', {
  background : tinycolor(tileColors[1]).brighten(10),
})
css.setClass('.player2', {
  background : tileColors[2],
})
css.setClass('.player2:hover', {
  background : tinycolor(tileColors[2]).brighten(10),
})
css.setClass('.draw', {
  background : tinycolor(tileColors[0]).darken(10),
})
css.setClass('.draw:hover', {
  background : tinycolor(tileColors[0]).darken(20),
})
css.setClass('.title', {
  fontSize   : '22px',
  lineHeight : '22px',
  display    : 'inline-block',
  transition : '0.3s all',
  paddingTop : '10px'
})
css.setClass('.subTitle', {
  transition : '0.3s all',
  fontSize   : '12px'
})
css.setClass('.root:hover .subTitle', {
  letterSpacing: '0.5px'
})
css.setClass('.root:hover .title', {
  letterSpacing: '0.5px'
})

let Header = React.createClass({

  onHeaderHit() {
    if(!BoardStore.gameEnded()) return;
    ActionCreator.restartGame();
  },

  render() {
    let highlightPlayer;
    let titleText;
    let subTitleText = 'Click/tap here to play again';
    if(BoardStore.isDrawGame()){
      titleText = 'Draw game...'
    }else if(BoardStore.gameEnded()){
      titleText = 'Player ' + BoardStore.getWinner() + ' won!';
      highlightPlayer = BoardStore.getWinner();
    }else{
      titleText = 'Player ' + BoardStore.getCurrentPlayer() + '\'s turn';
      highlightPlayer = BoardStore.getCurrentPlayer();
      subTitleText = 'Please click/tap on a tile'
    }
    return (
      <div className={css.getClasses({
        root    : true,
        player1 : highlightPlayer === 1,
        player2 : highlightPlayer === 2,
        draw    : BoardStore.isDrawGame()
      })} onMouseDown={this.onHeaderHit}>
        <span className={css.getClass('title')}>{titleText}</span>
        <span className={css.getClass('subTitle')}>{subTitleText}</span>
      </div>
    );
  }

});

module.exports = Header;
