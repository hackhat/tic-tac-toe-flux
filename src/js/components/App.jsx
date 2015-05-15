const React      = require('react');
const SmartCSS   = require('smart-css');
const BoardStore = require('../stores/BoardStore');
const Tile       = require('./Tile.jsx');
const TileRow    = require('./TileRow.jsx');
const Header     = require('./Header.jsx');
const tinycolor  = require('tinycolor2');
const tileColors = require('../constants/tileColors');
const css        = new SmartCSS({name: 'app'});
// Size is hard coded, but can be easily expanded to a larger
// board size. This would require more dynamic styles.
// Currently doesn't fill width because would involve calculating
// the available width in js and then set that dynamically. (Because
// the tiles should have 1:1 aspect ratio and just setting a percentage
// on width is not enough).
css.setClass('.root', {
  top        : '0',
  right      : '0',
  bottom     : '0',
  left       : '0',
  minHeight  : '100%',
  transition : '0.5s all',
  padding    : '60px 0 20px 0',
})
css.setClass('.player1', {
  background : tinycolor(tileColors[1]).setAlpha(0.2),
})
css.setClass('.player2', {
  background : tinycolor(tileColors[2]).setAlpha(0.2),
})
css.setClass('.gameContainer', {
  width    : (64 * 3) + 'px',
  margin   : ' 0 auto',
  position : 'relative',
})
css.setClass('.board', {
  transition : '0.5s all',
  transform  : 'scaleY(1) rotateZ(0)'
})
css.setClass('.endGame', {
  transform: 'scaleY(0.5) rotateZ(-45deg)'
})

let App = React.createClass({

  _onChange() {
    this.forceUpdate();
  },

  componentDidMount() {
    BoardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BoardStore.removeChangeListener(this._onChange);
  },

  render() {
    let children = [];
    let boardSize = BoardStore.getSize();
    let tiles = BoardStore.getTiles();
    for(let x = 0; x < boardSize; x++) {
      let rowChildren = [];
      for(let y = 0; y < boardSize; y++) {
        rowChildren.push(<Tile x={x} y={y} owner={tiles[x][y]} isWinnerTile={BoardStore.isWinnerTile(x, y)}></Tile>);
      }
      children[x] = <TileRow>{rowChildren}</TileRow>;
    }
    let highlightPlayer;
    if(BoardStore.gameEnded()){
      highlightPlayer = BoardStore.getWinner();
    }else{
      highlightPlayer = BoardStore.getCurrentPlayer();
    }
    return (
      <div className={css.getClasses({
        root    : true,
        player1 : highlightPlayer === 1,
        player2 : highlightPlayer === 2,
      })}>
        <div className={css.getClasses({
          gameContainer : true,
        })}>
          <Header></Header>
          <div className={css.getClasses({
            board   : true,
            endGame : BoardStore.gameEnded(),
          })}>
            {children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = App;
