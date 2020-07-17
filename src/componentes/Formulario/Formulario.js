import React, { forwardRef, memo } from 'react';
import FormularioContexto, { FormularioProvedor } from '../../contexts/FormularioContexto';
import PropTypes from 'prop-types';

const Formulario = forwardRef(({dadosIniciais, aoEnviar, children }, formularioReferencia) => {
  return (
    <FormularioProvedor ref={formularioReferencia} aoEnviar={aoEnviar} dadosIniciais={dadosIniciais}>
      <FormularioContexto.Consumer>
        {({ manipularEnvio }) =>{
          const manipularTeclaPressionada = (evento)=>{
            if (evento.keyCode === 13) {
              evento.preventDefault();
              manipularEnvio();
            }
          }
          return(
          <form noValidate onSubmit={manipularEnvio}  onKeyPress={manipularTeclaPressionada}>
            {children}
          </form>
        )}}
      </FormularioContexto.Consumer>
    </FormularioProvedor>
  )
})

Formulario.PropTypes = {
  dadosIniciais: PropTypes.object,
  aoEnviar: PropTypes.func,
}

export default memo(Formulario);