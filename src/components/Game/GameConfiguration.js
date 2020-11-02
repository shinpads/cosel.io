import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import colors from '../../colors';
import { updateConfig } from '../../actions/gameActions';

const styles = {
  checkBox: {
    color: `${colors.darkGrey} !important`,
    '&checked': {
      color: `${colors.darkGrey} !important`,
    },
  },
  configContainer: {
    width: '600px',
    padding: '1rem',
    marginTop: '1rem',
    border: '1px dashed',
  },
  options: {
    fontSize: '22px',
    color: '#000',
    fontWeight: 600,
  },
};

const options = [
  {
    name: 'Type Your Own Word',
    label: 'chooseFirstWord',
  },
];

class GameConfiguration extends Component {
  handleChange = (e) => {
    const { dispatch } = this.props;
    console.log('update', e.target.checked);
    dispatch(updateConfig({
      key: e.currentTarget.name,
      value: e.target.checked,
    }));
  }

  render() {
    const { classes, game } = this.props;
    const config = game.config || {};
    return (
      <div className={classes.configContainer}>
        <div className={classes.options}>Options</div>
        {options.map(option => (
          <FormControlLabel
            control={(
              <Checkbox
                checked={config[option.label]}
                disableRipple
                onChange={this.handleChange}
                name={option.label}
                className={classes.checkBox}
              />
            )}
            label={option.name}
          />
        ))}
      </div>
    );
  }
}

GameConfiguration.propTypes = {
  classes: PropTypes.object,
  game: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    game: state.game.game,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(GameConfiguration));
