import React, { useState } from 'react';
import firebase from '../firebase';
import { Link, withRouter } from 'react-router-dom';
import serviceRedirect from '../serviceRedirect';
import Input from '../components/Inputs/Input';
import PasswordInput from '../components/Inputs/PasswordInput';
import ServiceOpt from '../components/Inputs/ServiceOpt';
import SignButton from '../components/Buttons/SignButton';
import ErrorMessage from '../components/Errors/ErrorMessage';
import Logo from '../components/Logos/Logo';
import styled from 'styled-components';


const Root = styled.div`
  background-color: #0d0d0d;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const SignUp = styled.main`
  background-color: #fff;
  height: 780px;
  width: 80%;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #0D0D0D;
  font-size: 25px;
  font-weight: 900;
`;

const Paragraph = styled.p`
  color: #0D0D0D;
  font-size: 25px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const STyledLink = styled(Link)`
  color: #F28907;
`;


function Register(props) {
  const [err, setError] = useState(false);

  function signUp(e) {
    e.preventDefault();

    const name = e.currentTarget.name.value
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const service = e.currentTarget.service.value;

    if (email.match(/(.*@burgerqueen.com)/)) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            const user = firebase.auth().currentUser.uid;
            firebase.firestore().collection('employee').doc(user).set({
              name: name,
              service: service,
            })
          })
        .then(() => serviceRedirect(props))
        .catch();
    } else {
      setError(true);
    }
  }

  return (
    <Root>
      <SignUp>
        <Logo />
        <Form onSubmit={signUp}>
          <Input label="Nome" type="text" name="name" autoComplete="nome" />
          <Input label="E-mail" type="email" name="email" autoComplete="email" />
          <PasswordInput label="Senha" name="password" autoComplete="password" icon="icon-eye" />
          <ServiceOpt />
          {err ? <ErrorMessage text="Favor insira seu e-mail corporativo." /> : ''}
          <SignButton type="submit" text="Cadastrar" />
        </Form>
        <Paragraph>Já tem uma conta? <STyledLink to="/login">Faça login</STyledLink></Paragraph>
      </SignUp>
    </Root>
  );
}
const connectedWithRouter = withRouter(Register);
export default connectedWithRouter;