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

const PrivacyPolicy = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h2"
        className={classes.heading}
        gutterBottom
      >
        Privacy Policy
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        At Code School, we are committed to protecting your privacy and ensuring
        the security of your personal information. This Privacy Policy outlines
        how we collect, use, and disclose your information when you use our
        website and services.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Information Collection:</b> We collect personal information, such as
        your name and email address, when you register an account with us or
        submit information through our contact forms. We may also collect
        non-personal information, such as cookies and usage data, to enhance
        your browsing experience.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Information Usage:</b> We use the collected information to provide
        and improve our services, personalize your user experience, communicate
        with you, and analyze website usage. We may also use the information for
        marketing purposes, such as sending promotional emails or conducting
        surveys.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Information Disclosure:</b> We may disclose your personal information
        to trusted third parties who assist us in operating our website and
        delivering our services, such as payment processors or hosting
        providers. We do not sell or rent your personal information to third
        parties without your consent unless required by law.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Data Security:</b> We implement appropriate security measures to
        protect your personal information from unauthorized access, alteration,
        disclosure, or destruction. However, please note that no method of
        transmission over the internet or electronic storage is 100% secure, and
        we cannot guarantee absolute security.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>External Links:</b> Our website may contain links to external sites
        that are not operated by us. We have no control over the content and
        practices of these sites and are not responsible for their privacy
        policies. We encourage you to review the privacy policies of any
        third-party sites you visit.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        <b>Changes to This Privacy Policy:</b> We may update our Privacy Policy
        from time to time. Any changes will be posted on this page, and the
        revised policy will be effective upon posting. We encourage you to
        review this Privacy Policy periodically for any updates or changes.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        If you have any questions or concerns regarding our Privacy Policy,
        please contact us at privacy@codeschool.com.
      </Typography>
    </div>
  );
};

export default PrivacyPolicy;
