const React         = require('react');
const BoardStore    = require('../stores/BoardStore');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const css           = new SmartCSS({name: 'app'});

css.setClass('.root', {
  width      : '64px',
  height     : '64px',
  display    : 'inline-block',
  lineHeight : '62px',
  background : 'hsl(0, 0%, 87%)',
  textAlign  : 'center',
  fontSize   : '48px',
  float      : 'left',
  border     : '1px solid white',
  cursor     : 'pointer'
})

var playerToken = {
  0: '',
  1: 'x',
  2: 'o'
}

let Tile = React.createClass({

  getDefaultProps() {
    return {
      x: void 0,
      y: void 0
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
    let tiles = BoardStore.getTiles();
    let {x, y} = this.props;
    return (
      <div className={css.getClass("root")} onClick={this.onTileClick}>
        {playerToken[tiles[x][y]]}
      </div>
    );
  }

});

module.exports = Tile;
