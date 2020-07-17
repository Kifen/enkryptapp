import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import DownloadIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<ListIcon />}
        onClick={(event) => {
          event.preventDefault();
          props.getEncryptedFiles();
        }}
      >
        List encrypted files
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<DownloadIcon />}
        onClick={(event) => {
          event.preventDefault();
          props.downloadfile();
        }}
      >
        Download encrypted file
      </Button>
    </div>
  );
}
