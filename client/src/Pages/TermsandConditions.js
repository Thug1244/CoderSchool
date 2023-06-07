import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(4),
  },
  heading: {
    color: "#da4ea2",
  },
  paragraph: {
    color: "#000",
  },
}));

const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h2"
        className={classes.heading}
        gutterBottom
      >
        Terms and Conditions
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        Welcome to Code School! These Terms and Conditions govern your use of
        our website and services. By accessing or using our website, you agree
        to comply with these terms and conditions.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Account Registration:</b> To access certain features or services, you
        may be required to create an account. You are responsible for
        maintaining the confidentiality of your account information and are
        fully responsible for all activities that occur under your account.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Intellectual Property:</b> The content on our website, including
        text, graphics, logos, and images, is the property of Code School and
        protected by intellectual property laws. You may not use, reproduce, or
        distribute any content from our website without prior written
        permission.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Prohibited Activities:</b> You agree not to engage in any activity
        that violates applicable laws, infringes upon the rights of others, or
        interferes with the operation of our website. This includes but is not
        limited to hacking, transmitting malware, or engaging in fraudulent
        activities.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Disclaimer of Warranty:</b> Our website and services are provided on
        an "as is" and "as available" basis. We do not guarantee the accuracy,
        reliability, or availability of our website or services. You use our
        website and services at your own risk.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Limitation of Liability:</b> Code School shall not be liable for any
        direct, indirect, incidental, consequential, or exemplary damages
        arising from your use of our website or services. This includes but is
        not limited to damages for loss of profits, data, or other intangible
        losses.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Indemnification:</b> You agree to indemnify and hold Code School
        harmless from any claims, damages, losses, liabilities, and expenses
        arising out of your use of our website or services or any violation of
        these terms and conditions.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Governing Law:</b> These terms and conditions shall be governed by
        and construed in accordance with the laws of Pakistan. Any legal action
        or proceeding arising out of or relating to these terms and conditions
        shall be brought exclusively in the courts located in Pakistan.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        If you have any questions or concerns about our Terms and Conditions,
        please contact us at terms@codeschool.com.
      </Typography>
    </div>
  );
};

export default TermsAndConditions;
