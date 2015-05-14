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
  lineHeight : '36px',
  display    : 'block'
})

let Header = React.createClass({

  onHeaderClick() {
    ActionCreator.restartGame();
  },

  render() {
    let highlightPlayer;
    let text;
    if(BoardStore.isDrawGame()){
      text = 'Draw game...'
    }else if(BoardStore.gameEnded()){
      text = 'Player ' + BoardStore.getWinner() + ' won!';
      highlightPlayer = BoardStore.getWinner();
    }else{
      text = 'Player ' + BoardStore.getCurrentPlayer() + ' turn.';
      highlightPlayer = BoardStore.getCurrentPlayer();
    }
    return (
      <div className={css.getClasses({
        root    : true,
        player1 : highlightPlayer === 1,
        player2 : highlightPlayer === 2,
        draw    : BoardStore.isDrawGame()
      })} onClick={this.onHeaderClick}>
        <span className={css.getClass('title')}>{text}</span>
        <span>Click to restart the game</span>
      </div>
    );
  }

});

module.exports = Header;
