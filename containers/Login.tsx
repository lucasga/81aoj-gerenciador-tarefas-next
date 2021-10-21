export const Login = () => {
  return (
    <div className="container-login">
      <img className="logo" src="/logo.svg" alt="Logo FIAP" />
      <form>
        <div>
          <img src="/mail.svg" alt="Informe seu email" />
          <input type="email" placeholder="Informe seu email" />
        </div>
        <div>
          <img src="/lock.svg" alt="Informe sua senha" />
          <input type="password" placeholder="Informe sua senha" />
        </div>
        <button type="button">Login</button>
      </form>
    </div>
  );
};
