import React, { memo, useCallback } from 'react';
import { Dialog, DialogTitle, IconButton, DialogContent, makeStyles, useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  botaofechar: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function Dialogo({aberto, titulo, children }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const manipularFechamento = useCallback(() => {
    history.goBack();
  },[history]);

  return (
    <Dialog fullScreen={fullScreen} maxWidth="lg" open={aberto} onClose={manipularFechamento} disableBackdropClick aria-labelledby="dialogo-titulo">
      <DialogTitle>
        <Typography id="dialogo-titulo">{titulo}</Typography>
        <IconButton aria-label="Fechar" className={classes.botaofechar} onClick={manipularFechamento}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          children
        }
      </DialogContent>
    </Dialog>
  );
}

export default memo(Dialogo);