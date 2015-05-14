const React         = require('react');
const BoardStore    = require('../stores/BoardStore');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const css           = new SmartCSS({name: 'app'});
css.setClass('.root', {
  width   : '64px',
  height  : '64px',
  display : 'inline-block'
})

let Tile = React.createClass({

  getDefaultProps() {
    return {
      x: void 0,
      y: void 0
    };
  },

  render() {
    let tiles = BoardStore.getTiles();
    let {x, y} = this.props;
    return (
      <div className={css.getClass("root")}>
        {tiles[x][y]}
      </div>
    );
  }

});

module.exports = Tile;
