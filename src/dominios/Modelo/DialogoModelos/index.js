import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import { Box,} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import ApiContext from '../../../contexts/ApiContext';
import { useLocation, Link } from 'react-router-dom';
import DialogoInserirModelo from '../DialogoInserirModelo';
import DialogoAlterarModelo from '../DialogoAlterarModelo';
import ListagemModelos from '../ListagemModelos';
import BotaoInserir from '../../../componentes/BotaoInserir';
import FormularioConsulta from '../../../componentes/FormularioConsulta';

function DialogoModelos() {
  const { idOficina } = useAuth();
  const [modelos, setModelos] = useState([]);
  const { get } = useContext(ApiContext);
  const { pathname } = useLocation();
  const filtros = ["Descrição", "Marca"]
  const listar = useCallback(async () => {
    const modelos = await get(`/modelo?idOficina=${idOficina}`);
    if (modelos) {
      setModelos(modelos);
    }
  }, [get, idOficina]);

  useEffect(() => {
    if (pathname === "/modelos") {
      listar();
    }
  }, [listar, pathname]);

  const manipularBusca = useCallback(async ({ consulta, tipo }) => {
    const modelos = await get(`/modelo/consulta?idOficina=${idOficina}&consulta=${consulta}&tipo=${tipo}`);
    if (modelos) {
      setModelos(modelos);
    }
  }, [get, idOficina]);

  const conteudo = useMemo(() => (
    <>
      <FormularioConsulta aoEnviar={manipularBusca} filtros={filtros}/>
      <Box display="flex" justifyContent="center" pt={2}>Listagem</Box>
      <ListagemModelos modelos={modelos} />
      <BotaoInserir titulo="Inserir modelo" component={Link} to="modelos/inserir" />
    </>
  ), [filtros, manipularBusca, modelos])


  return (
    <Dialogo maxWidth="sm" fullWidth aberto titulo="Modelos">
      {conteudo}
      <DialogoInserirModelo aberto={pathname === "/modelos/inserir"} />
      <DialogoAlterarModelo aberto={pathname === "/modelos/alterar"} />
    </Dialogo>
  );
}

export default DialogoModelos;