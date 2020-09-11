import React, { useContext, useCallback, memo } from 'react';
import Marca from '../../../Types/Marca';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';

interface ComboBoxMarcaProps {
  onChange?: (marca: Marca | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const ComboBoxMarca: React.FC<ComboBoxMarcaProps> = ({ onChange, label, name, required }) => {
  const { get } = useContext(ApiContext);

  const getOptions = useCallback(async () => {
    const resposta = await get(`/marca/?pagina=1&limite=100`, true) as any;
    return resposta.marcas as Marca[];
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    const resposta = await get(`/marca/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    return resposta.marcas as Marca[];
  }, [get]);

  const getDefaultValue = useCallback(async (value) => {
    const resposta = await get(`/marca/id?_id=${value}`,) as any;
    return resposta ? resposta : null;
  }, [get]);

  const getDefaultValueInOptions = useCallback((value, option) => {
    return value === option._id;
  }, []);


  return (
    <ComboBox
      getOptions={getOptions}
      getMoreOptions={getMoreOptions}
      getDefaultValue={getDefaultValue}
      getDefaultValueInOptions={getDefaultValueInOptions}
      name={name}
      label={label}
      path="current._id"
      fullWidth
      options={[]}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      openOnFocus
      required={required}
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(ComboBoxMarca);