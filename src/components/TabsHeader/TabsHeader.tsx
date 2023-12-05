import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { closeModalHeader } from "../../redux/modal/slice";
import { addUser, logIn } from "../../redux/users/slice";
import style from "./TabsHeader.module.scss";

const tabs = [
  {
    title: "Зарегистрироваться",
    body: {
      line1: "Логин",
      line2: "Пароль",
    },
    button: "Зарегистрироваться",
  },
  {
    title: "Войти",
    body: {
      line1: "Логин",
      line2: "Пароль",
    },
    button: "Войти",
  },
];

const TabsHeader: FC = () => {
  const [active, setActive] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const modal = useAppSelector((state) => state.modal.modalHeader);
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const dispatch = useAppDispatch();
  const form = {
    login,
    password,
    favorites: {},
  };

  useEffect(() => {
    clearForm();
  }, [modal]);

  const clearForm = () => {
    setLogin("");
    setPassword("");
    setErrorLogin("");
    setErrorPassword("");
  };

  const handleClickTitle = (id: number) => {
    setActive(id);
    clearForm();
  };

  const handleClickRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (login.length > 0 && password.length > 0) {
      dispatch(addUser(form));
      clearForm();
      dispatch(closeModalHeader());
    } else if (login.length === 0) {
      setErrorLogin("Заполните логин");
    }
    if (password.length === 0) {
      setErrorPassword("Заполните пароль");
    }
  };

  const handleClickLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (login.length > 0 && password.length > 0) {
      dispatch(logIn(form));
      clearForm();
      dispatch(closeModalHeader());
    } else if (login.length === 0) {
      setErrorLogin("Заполните логин");
    }
    if (password.length === 0) {
      setErrorPassword("Заполните пароль");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.top}>
        {tabs.map((item, id) => (
          <div
            key={id}
            onClick={() => handleClickTitle(id)}
            className={
              active === id ? style.title + " " + style._active : style.title
            }
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className={style.bottom}>
        {tabs.map((item, id) => (
          <form
            action=""
            key={id}
            className={
              active === id ? style.form + " " + style._active : style.form
            }
          >
            <div className={style.line}>
              <label className={style.label} htmlFor="login">
                {item.body?.line1}
              </label>
              <input
                type="text"
                name=""
                id="login"
                autoComplete="off"
                className={
                  errorLogin ? style.input + " " + style._error : style.input
                }
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                onClick={() => setErrorLogin("")}
                placeholder={errorLogin}
              />
            </div>
            <div className={style.line}>
              <label className={style.label} htmlFor="password">
                {item.body?.line2}
              </label>
              <input
                type="text"
                name=""
                id="password"
                autoComplete="off"
                className={
                  errorPassword ? style.input + " " + style._error : style.input
                }
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onClick={() => setErrorPassword("")}
                placeholder={errorPassword}
              />
            </div>
            <button
              className={style.button}
              onClick={
                active === 0
                  ? (e) => handleClickRegister(e)
                  : (e) => handleClickLogIn(e)
              }
            >
              {item.button}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default TabsHeader;
