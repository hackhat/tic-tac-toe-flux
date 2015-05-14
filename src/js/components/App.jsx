const React         = require('react');
const SmartCSS      = require('smart-css');
const BoardStore    = require('../stores/BoardStore');
const ActionCreator = require('../actions/BoardActionCreators');
const Tile          = require('./Tile.jsx');
const css           = new SmartCSS({name: 'app'});
// Size is hard coded, but can be easily expanded to a larger
// board size. This would require more dynamic styles.
// Currently doesn't fill width because would involve calculating
// the available width in js and then set that dynamically. (Because
// the tiles should have 1:1 aspect ratio and just setting a percentage
// on width is not enough).
css.setClass('.root', {
  width  : (64 * 3) + 'px',
  height : (64 * 3) + 'px',
  margin : '0 auto',
})

let App = React.createClass({

  render() {
    let children = [];
    let boardSize = BoardStore.getSize();
    for(let x = 0; x < boardSize; x++) {
      let rowChildren = [];
      for(let y = 0; y < boardSize; y++) {
        rowChildren.push(<Tile x={x} y={y}></Tile>);
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
