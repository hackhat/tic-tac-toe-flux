const React         = require('react');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const css           = new SmartCSS({name: 'tileRow'});
css.setClass('.root', {
  width  : (64 * 3) + 'px',
  height : (64 * 1) + 'px',
  float  : 'left'
})

let Tile = React.createClass({

  render() {
    return (
      <div className={css.getClass("root")}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Tile;
