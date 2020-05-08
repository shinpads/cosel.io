import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { SmallButton } from '../components/Base/Button';
import { SecondaryInput, PrimaryTextArea } from '../components/Base/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = {
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    maxWidth: '1000px',
    width: '1000px',
    margin: '0 auto',
    flexGrow: 1,
  },
  title: {
    borderBottom: '1px solid',
  },
  content: {
    fontSize: '1.5rem',
  },
  nameEmailContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '2rem',
    margin: '1rem 0',
  },
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <DocumentTitle title="cosel.io - Contact">
        <div className={classes.root}>
          <Header minimizable />
          <main className={classes.main}>
            <h2 className={classes.title}>
              Contact
            </h2>
            <div className={classes.content}>
              <p>
                Send any suggestions, questions or issues.
              </p>
              <form>
                <div className={classes.nameEmailContainer}>
                  <SecondaryInput label="Name" />
                  <SecondaryInput label="Email" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <SecondaryInput label="Subject" />
                </div>
                <div>
                  <PrimaryTextArea label="Message" rows={5} />
                </div>
                <SmallButton>Send</SmallButton>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object,
};

export default connect()(withStyles(styles)(Contact));
