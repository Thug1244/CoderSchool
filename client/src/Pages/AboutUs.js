import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      maxWidth: 600,
    },
  },
  content: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
      paddingLeft: theme.spacing(4),
    },
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <img
            src="/Images/aboutus.jpg"
            alt="About Us"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.content}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            style={{ color: "#da4ea2" }}
          >
            About Code School
          </Typography>
          <Typography variant="body1" paragraph>
            Code School is an innovative e-learning platform that empowers
            individuals to learn and master coding skills. We provide a wide
            range of comprehensive courses designed to cater to both beginners
            and advanced learners in the world of programming.
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform offers a diverse collection of coding courses,
            meticulously curated by industry experts with extensive experience
            in the field. Whether you are interested in web development, mobile
            app development, data science, or any other coding discipline, we
            have the resources and guidance you need to succeed.
          </Typography>
          <Typography variant="body1" paragraph>
            At Code School, we believe in fostering a supportive learning
            community. Our built-in chat feature, inspired by popular messaging
            apps like WhatsApp, allows students to connect and communicate with
            each other, collaborate on projects, and seek assistance from fellow
            learners.
          </Typography>
          <Typography variant="body1" paragraph>
            Additionally, we provide a dynamic community forum, similar to Stack
            Overflow, where users can ask questions, share knowledge, and
            contribute by providing answers. This collaborative environment
            promotes active learning and enables learners to engage with a
            thriving community of like-minded individuals.s
          </Typography>
          <Typography variant="body1" paragraph>
            To enhance the learning experience, our platform features an
            intuitive online code compiler that enables users to write, compile,
            and run code in real-time. This interactive tool allows learners to
            practice their coding skills, experiment with different algorithms,
            and gain hands-on experience without the need for external software
            installations.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
