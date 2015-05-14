const React         = require('react');
const SmartCSS      = require('smart-css');
const ActionCreator = require('../actions/BoardActionCreators');
const css           = new SmartCSS({name: 'app'});
css.setClass('.root', {
  width   : '64px',
  height  : '64px',
  display : 'inline-block'
})

let Tile = React.createClass({

  render() {
    return (
      <div className={css.getClass("root")}>

      </div>
    );
  }

});

module.exports = Tile;
