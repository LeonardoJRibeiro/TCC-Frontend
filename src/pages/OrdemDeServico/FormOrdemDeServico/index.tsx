import React, { useContext, memo, useEffect, useRef, useCallback, } from 'react';
import { Container, Grid, MenuItem, Button, makeStyles, CardHeader, Card, CardContent, CardActions } from '@material-ui/core';
import { Form, DateField, CampoDeTexto, MoneyField, CampoDeSelecao, } from '../../../componentes/Form';
import OrdemDeServicoContext from '../OrdemDeServicoContext';
import { FormProviderHandles } from '../../../componentes/Form/types';
import AutoCompleteVeiculo from '../../../componentes/AutoComplete/AutoCompleteVeiculo';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflowY: "auto",
  }
}))

const FormOrdemDeServico: React.FC = () => {
  const classes = useStyles();
  const { handleSubmit, valorTotalPecas, valorTotalServicos, ordemDeServico } = useContext(OrdemDeServicoContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);

  const calcularValorTotal = useCallback(() => {
    if (formRef.current) {
      const desconto = formRef.current.getFieldValue('desconto');
      formRef.current.setFieldValue(
        'valorTotal',
        valorTotalPecas() + valorTotalServicos() - Number(desconto)
      )
    }
  }, [valorTotalPecas, valorTotalServicos]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("valorTotalDasPecas", valorTotalPecas());
      calcularValorTotal();
    }
  }, [calcularValorTotal, valorTotalPecas]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("valorTotalDosServicos", valorTotalServicos());
      calcularValorTotal();
    }
  }, [calcularValorTotal, valorTotalServicos]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={ordemDeServico}>
        <Card>
          <CardHeader title="Inserir serviço" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AutoCompleteVeiculo disabled={ordemDeServico !== undefined} name="veiculo" label="Veículo" required listOptionsIn />
              </Grid>
              <Grid item xs={12} sm={4} md={4} >
                <DateField name="dataDeRegistro" label="Data de registro" disabled={ordemDeServico !== undefined} required fullWidth allowKeyboardControl />
              </Grid>
              <Grid item xs={12} sm={4} md={4} >
                <DateField name="dataDeInicio" label="Data de início" required fullWidth />
              </Grid>
              <Grid item xs={12} sm={4} md={4} >
                <DateField name="dataDeConclusao" label="Data de conclusão" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CampoDeTexto name="sintoma" label="Sintoma do veículo" required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={4} >
                <CampoDeSelecao name="categoria" label="Categoria da ordem de serviço" required fullWidth>
                  <MenuItem value="0">Predetiva</MenuItem>
                  <MenuItem value="1">Corretiva</MenuItem>
                  <MenuItem value="2">Preventiva</MenuItem>
                </CampoDeSelecao>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CampoDeSelecao name="status" label="Status da ordem de serviço" required fullWidth>
                  <MenuItem value="0">Em andamento</MenuItem>
                  <MenuItem value="1">Finalizada</MenuItem>
                </CampoDeSelecao>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CampoDeTexto name="andamento" type="number" label="Andamento (%)" required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MoneyField name="valorTotalDosServicos" label="Valor total dos serviços" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MoneyField name="valorTotalDasPecas" label="Valor total das peças" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MoneyField name="desconto" label="Desconto" fullWidth onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MoneyField name="valorTotal" label="Valor total da ordem de serviço" disabled fullWidth />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify="flex-end">
              <Grid item>
                <Button type="submit">{ordemDeServico ? "Alterar" : "Salvar"}</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </Container>
  );
}

export default memo(FormOrdemDeServico);