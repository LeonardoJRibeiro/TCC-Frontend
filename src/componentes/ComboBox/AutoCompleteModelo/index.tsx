import React, { memo } from 'react';
import ComboBox from '../../Form/Fields/ComboBox';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Modelo from '../../../Types/Modelo';
import AutoCompleteProps from '../Types';

const AutoCompleteModelo: React.FC<AutoCompleteProps<Modelo>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Modelo>("modelos", "modelo", "descricao", listOptionsIn);

  return (
    <ComboBox
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current._id"
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(AutoCompleteModelo);