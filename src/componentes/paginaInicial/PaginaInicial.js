import React, { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import Botao from '../IconButton';
import { Link } from 'react-router-dom';
import Slide from '../Slide/';

export default function PaginaInicial({ setItensBarraNavegacao, ...props }) {
  useEffect(() => {
    setItensBarraNavegacao({
      itens: {
        botoes: (
          <Botao tooltip="Cadastrar Oficina" component={Link} to="/oficina/cadastro/">
            <AddCircle />
          </Botao>
        )
      }
    });
  }, []);

  return (
    <>
      <Box display="flex" className="h-min-barra-rodape" alignItems="center" justifyContent="center">
      <Slide/>
      </Box>
    </>
  );
}
