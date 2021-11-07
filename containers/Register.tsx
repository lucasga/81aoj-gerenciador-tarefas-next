import { useEffect, useState } from "react";
import axios from "axios";
import { executeRequest } from "../services/api";
import { NextPage } from "next";
import { RegisterProps } from "../types/RegisterProps";

/* eslint-disable @next/next/no-img-element */
export const Register: NextPage<RegisterProps> = ({ setIsRegister }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setLoading] = useState(false);

  const doRegister = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email && !password && !name) {
        setError("Todos os campos são obrigatórios.");
        setLoading(false);
        return;
      }

      const body = {
        email,
        name,
        password,
      };

      const result = await executeRequest("user", "POST", body);
      if (result && result.data) {
        setSuccess("Registrado com sucesso, você será redirecionado.");
      } else {
        setError("Não foi possivel processar o registro, tente novamente");
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
      } else {
        setError("Não foi possivel processar o registro, tente novamente");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setIsRegister(false);
      }, 2000);
    }
  }, [success]);

  return (
    <div className="container-register">
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
      <form>
        <p className="success">{success}</p>
        <p className="error">{error}</p>
        <div className="input">
          <img src="/user.svg" alt="Informe seu nome" className="smallIcon" />
          <input
            type="text"
            placeholder="Informe seu nome"
            value={name}
            onChange={(evento) => setName(evento.target.value)}
          />
        </div>
        <div className="input">
          <img src="/mail.svg" alt="Informe seu email" />
          <input
            type="text"
            placeholder="Informe seu email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
        </div>
        <div className="input">
          <img src="/lock.svg" alt="Informe sua senha" />
          <input
            type="password"
            placeholder="Informe sua senha"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={doRegister}
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "...Carregando" : "Registrar"}
        </button>

        <div className="linkWrapper">
          <a className="link" onClick={() => setIsRegister(false)}>
            Retornar ao login
          </a>
        </div>
      </form>
    </div>
  );
};
