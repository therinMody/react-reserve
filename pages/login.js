import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange() {
    const {name, value} = event.target;
    setUser(prevState => ({ ...prevState, [name]: value}));
  }

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      console.log(user);
      //make request to signup user
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message
      attached
      icon="privacy"
      header="Welcome Back!"
      content="Login in with email and password"
      color="blue"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message 
        error
        header="Oops!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button 
          icon="sign in"
          color="orange"
          type="submit"
          content="Login"
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
        <Icon name="help"/>
        New User? {" "}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link> {" "}instead.
      </Message>
  </>;
}

export default Login;

