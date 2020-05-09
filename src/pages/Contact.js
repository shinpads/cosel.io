import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { SmallButton } from '../components/Base/Button';
import { SecondaryInput, PrimaryTextArea } from '../components/Base/Input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postContactMessage } from '../api';
import { DotDotDot } from '../components/Base/Loader';
import colors from '../colors';

const styles = {
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    maxWidth: '1000px',
    margin: '0 auto',
    flexGrow: 1,
  },
  title: {
    borderBottom: '1px solid',
    '@media(max-width: 1000px)': {
      padding: '0rem 1rem',
    },
  },
  content: {
    fontSize: '1.5rem',
    '@media(max-width: 1000px)': {
      padding: '0rem 1rem',
    },
  },
  nameEmailContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '@media(max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
    gridGap: '2rem',
    margin: '1rem 0',
  },
  button: {
    '@media(max-width: 600px)': {
      width: '100%',
    },
  },
  snackbarContent: {
    color: colors.primaryContrast,
    backgroundColor: colors.primary,
    fontWeight: 600,
  },
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      snackbarMessage: '',
      submitting: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
  }

  updateForm = (key) => (e) => {
    const { value } = e.currentTarget;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [key]: value,
      },
    }));
  }

  submitForm = async () => {
    this.setState({ submitting: true });
    const { form } = this.state;
    const success = await postContactMessage(form);
    let message = '';
    if (success) {
      message = 'Form submitted';
      this.setState({
        form: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
      });
    } else {
      message = 'An error occured. Please try again later.';
    }
    this.setState({ snackbarOpen: true, snackbarMessage: message, submitting: false });
  }

  render() {
    const { classes } = this.props;
    const {
      snackbarOpen,
      snackbarMessage,
      submitting,
      form,
    } = this.state;
    const {
      name,
      email,
      subject,
      message,
    } = form;
    return (
      <DocumentTitle title="cosel.io - Contact">
        <div className={classes.root}>
          <Snackbar
            open={snackbarOpen}
            onClose={() => this.setState({ snackbarOpen: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            message={snackbarMessage}
            ContentProps={{ className: classes.snackbarContent }}
          />
          <Header minimizable />
          <main className={classes.main}>
            <h2 className={classes.title}>
              Contact
            </h2>
            <div className={classes.content}>
              <p>
                Send any suggestions, questions or issues.
              </p>
              <form onSubmit={e => { e.preventDefault(); this.submitForm(); }}>
                <div className={classes.nameEmailContainer}>
                  <SecondaryInput
                    value={name}
                    onChange={this.updateForm('name')}
                    label="Name"
                    required
                  />
                  <SecondaryInput
                    value={email}
                    onChange={this.updateForm('email')}
                    label="Email"
                    type="email"
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <SecondaryInput
                    value={subject}
                    onChange={this.updateForm('subject')}
                    label="Subject"
                    required
                  />
                </div>
                <div>
                  <PrimaryTextArea
                    value={message}
                    onChange={this.updateForm('message')}
                    label="Message"
                    rows={5}
                    required
                  />
                </div>
                <SmallButton type="submit" className={classes.button}>
                  {submitting
                    ? <DotDotDot />
                    : 'Send'}
                </SmallButton>
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
