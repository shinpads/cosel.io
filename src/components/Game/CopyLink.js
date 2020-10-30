import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import queryString from 'query-string';
import { copyTextToClipboard } from '../../util/helperFunctions';

import colors from '../../colors';
import { Copy } from '../Base/Icons';

const styles = theme => ({
  url: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.backgroundContrast,
    border: '2px solid',
    borderLeft: '0px',
    padding: '1rem 0.5rem',
    fontSize: '1.25rem',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      border: '2px solid',
      borderRadius: '1rem 0rem 0rem 1rem',
      flexGrow: 0,
      padding: '1rem 4rem',
    },
  },
  root: {
    paddingBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '1rem',
    [theme.breakpoints.up('sm')]: {
      width: 'unset',
    },
  },
  buttonIcon: {
    fill: colors.primary,
    transform: 'scale(1)',
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(1.25)',
    },
  },
  buttonText: {
    marginLeft: '0.5rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    cursor: 'pointer',
    backgroundColor: colors.primaryContrast,
    color: colors.primary,
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 500,
    outline: 0,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      borderRadius: '0rem 1rem 1rem 0rem',
    },
  },
  snackbarContent: {
    color: colors.primaryContrast,
    backgroundColor: colors.primary,
    fontWeight: 600,
  },
});

class CopyLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
    };
  }

  copyUrl = async () => {
    const { url } = this.props;
    await copyTextToClipboard(url);
    this.setState({ snackbarOpen: true });
  }

  render() {
    const { snackbarOpen } = this.state;
    const { classes, displayUrl } = this.props;
    const query = queryString.parse(window.location.search);
    if (query.rocketCrab) {
      return <div style={{ width: '100%', height: '2rem' }} />;
    }
    return (
      <>
        <Snackbar
          open={snackbarOpen}
          onClose={() => this.setState({ snackbarOpen: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message="Link copied to clipboard"
          ContentProps={{ className: classes.snackbarContent }}
        />
        <div className={classes.root}>
          <div className={classes.url}>{displayUrl}</div>
          <div role="button" onClick={this.copyUrl} tabIndex={0} className={classes.button}>
            <Copy size={32} className={classes.buttonIcon} />
            <div className={classes.buttonText}>Copy</div>
          </div>
        </div>
      </>
    );
  }
}

CopyLink.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  displayUrl: PropTypes.string,
};

export default withStyles(styles)(CopyLink);
