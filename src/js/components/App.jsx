const React         = require('react');
const SmartCSS      = require('smart-css');
const BoardStore    = require('../stores/BoardStore');
const ActionCreator = require('../actions/BoardActionCreators');
const Tile          = require('./Tile.jsx');
const css           = new SmartCSS({name: 'app'});
css.setClass('.root', {
  width  : (64 * 3) + 'px',
  height : (64 * 3) + 'px',
  margin : '0 auto',
})

let App = React.createClass({

  render() {
    let tiles = BoardStore.getTiles();
    let children = [];
    let boardSize = BoardStore.getSize();
    for(let x = 0; x < boardSize; x++) {
      let rowChildren = [];
      for(let y = 0; y < boardSize; y++) {
        rowChildren.push(<Tile owner={tiles[x][y]}></Tile>);
      }
      children[x] = <div>{rowChildren}</div>;
    }
    return (
      <div className={css.getClass("root")}>
        {children}
      </div>
    );
  }

});

module.exports = App;
