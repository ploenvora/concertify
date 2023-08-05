import { Fragment } from 'react';
import { getProviders, signIn } from "next-auth/react"

function Login({ providers }) {
  return (
    <Fragment>
      <h1>Login Page</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button 
            onClick={() => signIn(provider.id, { callbackUrl: "/"})}
            >Login with {provider.name}</button>
        </div>
      ))}
    </Fragment>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
}



