import React, { useState, useCallback, memo, useRef, useEffect, useContext } from 'react';
import { Box, Button, } from '@material-ui/core';

import Dialogo from '../Dialogo';
import { Link, useLocation } from 'react-router-dom';
import CampoDeBusca from '../Formulario/Campos/CampoDeBusca';
import Formulario from '../Formulario/Formulario';
import ApiContext from '../../contexts/ApiContext';
import useAuth from '../../hooks/useAuth';
import DialogoInserirMarca from './DialogoInserirMarca';
import DialogoAlterarMarca from './DialogoAlterarMarca';
import Listagem from './ListagemMarcas';
import { useMemo } from 'react';



function DialgoMarcas() {
  const { idOficina } = useAuth();
  const [marcas, setMarcas] = useState([]);
  const formularioBuscaReferencia = useRef();
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();

  const listar = useCallback(async () => {
    const marcas = await get(`/marca?idOficina=${idOficina}`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/marcas") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ descricao }) => {
    const marcas = await get(`/marca/descricao?idOficina=${idOficina}&descricao=${descricao}`);
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Formulario ref={formularioBuscaReferencia} aoEnviar={manipularBusca}>
          <CampoDeBusca
            fullWidth
            nome="descricao"
            label="Buscar"
          />
        </Formulario>
        <Box ml={1}>
          <Button
            style={{ whiteSpace: 'nowrap' }}
            variant="outlined"
            component={Link}
            to={"/marcas/inserir"}
          >Inserir marca</Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <Listagem marcas={marcas} />
    </>
  ), [manipularBusca, marcas])

  return (
    <Dialogo aberto titulo="Marcas">
      {conteudo}
      <DialogoInserirMarca aberto={pathname === "/marcas/inserir"} />
      <DialogoAlterarMarca aberto={pathname === "/marcas/alterar"} />
    </Dialogo>
  );
}

export default memo(DialgoMarcas);