const React         = require('react');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const tinycolor     = require('tinycolor2');
const tileColors    = require('../constants/tileColors');
const css           = new SmartCSS({name: 'tile'});

var playerToken = {
  0: '',
  1: 'x',
  2: 'o'
}

css.setClass('.root', {
  width      : '64px',
  height     : '64px',
  display    : 'inline-block',
  lineHeight : '62px',
  textAlign  : 'center',
  fontSize   : '48px',
  float      : 'left',
  border     : '1px solid white',
  cursor     : 'pointer',
  transition : '0.3s all',
  background : tileColors[0],
  color      : 'white',
})
css.setClass('.root:hover', {
  background : tinycolor(tileColors[0]).brighten(10),
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

let Tile = React.createClass({

  getDefaultProps() {
    return {
      x     : void 0,
      y     : void 0,
      owner : void 0,
    };
  },

  onTileClick() {
    let {x, y} = this.props;
    ActionCreator.playPosition({
      x : x,
      y : y
    });
  },

  render() {
    let {x, y, owner} = this.props;
    return (
      <div className={css.getClasses({
        root    : true,
        player1 : owner === 1,
        player2 : owner === 2,
      })} onClick={this.onTileClick}>
        {playerToken[owner]}
      </div>
    );
  }

});

module.exports = Tile;
