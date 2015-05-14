const React         = require('react');
const SmartCSS      = require('smart-css');
const BoardStore    = require('../stores/BoardStore');
const ActionCreator = require('../actions/BoardActionCreators');
const css           = new SmartCSS({name: 'app'});
css.setClass('.root', {
  maxWidth   : '640px',
  margin     : '0 auto',
})

let App = React.createClass({

  render() {
    return (
      <div className={css.getClass("root")}>
        {BoardStore.getSize()}
      </div>
    );
  }

});

module.exports = App;
