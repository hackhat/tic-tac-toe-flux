const React      = require('react');
const SmartCSS   = require('smart-css');
const tinycolor  = require('tinycolor2');
const BoardStore = require('../stores/BoardStore');
const tileColors = require('../constants/tileColors');
const css        = new SmartCSS({name: 'header'});


css.setClass('.root', {
  width      : (64 * 3) + 'px',
  height     : '64px',
  border     : '1px solid white',
  color      : 'white',
  fontSize   : '22px',
  lineHeight : '62px',
  padding    : '0 10px',
  cursor     : 'default',
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
  background : tileColors[0],
})

let Header = React.createClass({

  getDefaultProps() {
    return {};
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
      })}>
        {text}
      </div>
    );
  }

});

module.exports = Header;
