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

const Disclaimer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h2"
        className={classes.heading}
        gutterBottom
      >
        Disclaimer
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        Welcome to Code School! The information contained on this website is for
        general informational purposes only. The information is provided by Code
        School and while we endeavor to keep the information up to date and
        correct, we make no representations or warranties of any kind, express
        or implied, about the completeness, accuracy, reliability, suitability,
        or availability with respect to the website or the information,
        products, services, or related graphics contained on the website for any
        purpose. Any reliance you place on such information is therefore
        strictly at your own risk.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        In no event will we be liable for any loss or damage including without
        limitation, indirect or consequential loss or damage, or any loss or
        damage whatsoever arising from loss of data or profits arising out of,
        or in connection with, the use of this website.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        Through this website, you can visit other websites that are not under
        the control of Code School. We have no control over the nature, content,
        and availability of those sites. The inclusion of any links does not
        necessarily imply a recommendation or endorse the views expressed within
        them.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        Every effort is made to keep the website up and running smoothly.
        However, Code School takes no responsibility for, and will not be liable
        for, the website being temporarily unavailable due to technical issues
        beyond our control.
      </Typography>
      <Typography variant="body1" className={classes.paragraph} paragraph>
        If you have any questions or concerns about our Disclaimer, please
        contact us at disclaimer@codeschool.com.
      </Typography>
    </div>
  );
};

export default Disclaimer;
