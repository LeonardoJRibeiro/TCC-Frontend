import React, { useCallback, useContext, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeSelecao } from '../../../componentes/Form';
import { Grid, MenuItem, Button, Card, CardContent, CardActions, Box, makeStyles, CardHeader } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import ItemDePeca from '../../../Types/ItemDePeca';
//import comparar from '../../../recursos/Comparar';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import AutoCompletePeca from '../../../componentes/AutoComplete/AutoCompletePeca';
import AutoCompleteFornecedor from '../../../componentes/AutoComplete/AutoCompleteFornecedor';
import NumberField from '../../../componentes/Form/Fields/NumberField';

const useStyles = makeStyles((theme) => ({
  form: {
    position: "relative",
  }
}));

const FormItensDePeca: React.FC = () => {
  const classes = useStyles();
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDePeca, itemDePecaSelecionado, setItemDePecaSelecionado, handleSubmitFormItemDePeca } = useContext(OrdemDeServicoContext);


  // const validar = useCallback((dados: ItemDePeca) => {
  //   let igual = false;
  //   itensDePeca.forEach(itemDePeca => {
  //     if (comparar(itemDePeca, dados)) {
  //       igual = true;
  //     }
  //   })
  //   return igual;
  // }, [itensDePeca]);


  const calcularValorTotal = useCallback(() => {
    if (formRef.current) {
      const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
      const quantidade = Number(formRef.current.getFieldValue('quantidade'));
      formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
    }
  }, []);

  const intialData = itemDePecaSelecionado !== undefined ? {
    ...itensDePeca[itemDePecaSelecionado],
    peca: itensDePeca[itemDePecaSelecionado].peca._id,
    fornecedor: itensDePeca[itemDePecaSelecionado].fornecedor._id,
  } : undefined;


  const handleReset = useCallback(() => {
    if (itemDePecaSelecionado !== undefined) {
      setItemDePecaSelecionado(undefined);
    }
  }, [itemDePecaSelecionado, setItemDePecaSelecionado]);

  console.log(intialData)

  return (
    <Box className={classes.form}>
      <Form onSubmit={handleSubmitFormItemDePeca} ref={formRef} clearOnSubmit initialData={intialData} >
        <Card>
          <CardHeader title="Inserir peça" />
          <CardContent>
            <Grid container spacing={2} justify="flex-end">
              <Grid item xs={12} md={6} lg={3}>
                <AutoCompletePeca label="Peça" name="peca" required listOptionsIn />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <AutoCompleteFornecedor label="Fornecedor" name="fornecedor" required listOptionsIn />
              </Grid>
              <Grid item xs={7} md={2} lg={1}>
                <NumberField name="garantia" min={0} fullWidth required label="Garantia" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={5} md={2} lg={1}>
                <CampoDeSelecao name="unidadeDeGarantia" label="Tipo" fullWidth required>
                  <MenuItem value="0">Km</MenuItem>
                  <MenuItem value="1">Dias</MenuItem>
                </CampoDeSelecao>
              </Grid>
              <Grid item xs={6} md={3} lg={2}>
                <MoneyField name="valorUnitario" fullWidth required label="Valor unitário" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={2} lg={2}>
                <NumberField name="quantidade" min={0} fullWidth required label="Quantidade" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={3} lg={2}>
                <MoneyField name="valorTotal" fullWidth required label="ValorTotal" disabled />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} justify="flex-end">
              <Grid item >
                <Button type="reset" onClick={handleReset} variant="outlined">{itemDePecaSelecionado !== undefined ? "Cancelar" : "Limpar"}</Button>
              </Grid>
              <Grid item >
                <Button type="submit" variant="outlined">{itemDePecaSelecionado !== undefined ? "Alterar" : "Adicionar"}</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </Box>
  );
}

export default memo(FormItensDePeca);