const React         = require('react');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const BoardStore    = require('../stores/BoardStore');
const tinycolor     = require('tinycolor2');
const tileColors    = require('../constants/tileColors');
const css           = new SmartCSS({name: 'tile'});

var playerToken = {
  0: '',
  1: 'x',
  2: 'o'
}

css.setClass('.root', {
  width      : '62px',
  height     : '62px',
  display    : 'inline-block',
  lineHeight : '62px',
  textAlign  : 'center',
  fontSize   : '48px',
  float      : 'left',
  cursor     : 'pointer',
  transition : '0.3s all',
  background : 'white',
  margin     : '1px'
})
css.setClass('.blocked', {
  cursor : 'not-allowed',
})
css.setClass('.winnerTile', {
  '-webkit-animation': 'winnerTileAnimation 0.5s linear infinite alternate'
})
css.setClass('.currentPlayer1:hover', {
  background : tinycolor(tileColors[1]).brighten(10),
})
css.setClass('.currentPlayer2:hover', {
  background : tinycolor(tileColors[2]).brighten(10),
})
css.setClass('.ownedByPlayer1', {
  background : tileColors[1],
})
css.setClass('.ownedByPlayer1:hover', {
  background : tinycolor(tileColors[1]).brighten(10),
})
css.setClass('.ownedByPlayer2', {
  background : tileColors[2],
})
css.setClass('.ownedByPlayer2:hover', {
  background : tinycolor(tileColors[2]).brighten(10),
})

let Tile = React.createClass({

  getDefaultProps() {
    return {
      x            : void 0,
      y            : void 0,
      owner        : void 0,
      isWinnerTile : false,
    };
  },

  onTileHit() {
    let {x, y} = this.props;
    ActionCreator.playPosition({
      x : x,
      y : y
    });
  },

  render() {
    let {x, y, owner} = this.props;
    let blocked = owner !== 0 || BoardStore.gameEnded()
    return (
      <div className={css.getClasses({
        root           : true,
        ownedByPlayer1 : owner === 1,
        ownedByPlayer2 : owner === 2,
        blocked        : blocked,
        currentPlayer1 : !blocked && BoardStore.getCurrentPlayer() === 1,
        currentPlayer2 : !blocked && BoardStore.getCurrentPlayer() === 2,
        winnerTile     : this.props.isWinnerTile
      })} onMouseDown={this.onTileHit}>
        {playerToken[owner]}
      </div>
    );
  }

});

module.exports = Tile;
