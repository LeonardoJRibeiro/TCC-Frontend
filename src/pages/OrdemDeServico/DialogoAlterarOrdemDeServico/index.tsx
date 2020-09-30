import React, { memo, useContext, useEffect } from 'react';
import Dialog from '../../../componentes/Dialog';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, } from '@material-ui/core';
import OrdemDeServicoContext from '../OrdemDeServicoContext';
import FormOrdemDeServico from '../FormOrdemDeServico';
import FrameItensDePeca from '../../ItensDePeca/FrameItensDePeca';
import FrameItensDeServico from '../../ItensDeServico/FrameItensDeServico';
import useQuery from '../../../hooks/useQuery';
import SwipeableContext from '../../../contexts/SwipeableContext';

const DialogAlterarOrdemDeServico: React.FC = () => {
  const { getOrdemDeServico } = useContext(OrdemDeServicoContext);
  const {activeIndex, setActiveIndex} = useContext(SwipeableContext);
  const id = useQuery("id");

  useEffect(() => {
    if (id) {
      getOrdemDeServico(id);
    }
  }, [getOrdemDeServico, id]);

  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth fullScreen>
      <Tabs value={activeIndex} onChange={(e, v) => setActiveIndex(v)} variant="fullWidth" indicatorColor="primary">
        <Tab label="Peças" wrapped />
        <Tab label="Ordem de serviço" wrapped />
        <Tab label="Serviços" wrapped />
      </Tabs>
      <SwipeableViews style={{ height: "calc(100% - 64px)", }} containerStyle={{ height: "calc(100% )", }} enableMouseEvents index={activeIndex} onChangeIndex={(e) => setActiveIndex(e)} resistance animateTransitions >
        <FrameItensDePeca />
        <FormOrdemDeServico />
        <FrameItensDeServico />
      </SwipeableViews>
    </Dialog>
  );
}

export default memo(DialogAlterarOrdemDeServico);