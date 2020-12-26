import { Box, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BotaoInserir from '../../../componentes/BotaoInserir';
import Dialog from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import useQuery from '../../../hooks/useQuery';
import OrdemDeServico from '../../../Types/OrdemDeServico';
import ItemOrdemDeServico from '../../OrdemDeServico/ItemOrdemDeServico';

const HistoricoVeiculo: React.FC = () => {
  const veiculo = useQuery('veiculo');
  const [ordensDeServico, setOrdensDeServico] = useState<OrdemDeServico[]>();
  const { get } = useContext(ApiContext);

  const listar = useCallback(async () => {
    const resposta = await get(`/ordemdeservico/veiculo?veiculo=${veiculo}`) as any;
    if (resposta) {
      setOrdensDeServico(resposta.ordensDeServico as OrdemDeServico[]);
    }
  }, [get, veiculo]);

  useEffect(() => {
    listar();
  }, [listar]);


  return (
    <Dialog title={`Histórico do veículo ${ordensDeServico ? ordensDeServico[0]?.veiculo.placa : ""}`} open fullScreen>
      <Box mb={2}>
        <Grid container spacing={3} justify="center">
          <Box p={2}>
            <Typography variant="h6">Ordens de Serviço efetuadas neste veículo:</Typography>
          </Box>
          {ordensDeServico?.map((ordemDeServico, index) => (
            <ItemOrdemDeServico ordemDeServico={ordemDeServico} key={index} />
          ))}
        </Grid>
      </Box>
      <BotaoInserir titulo="Inserir ordem de serviço para este veículo" linkTo={`/ordensdeservico/inserir?veiculo=${veiculo}`} />
    </Dialog>
  );
}

export default HistoricoVeiculo;