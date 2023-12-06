import { FC, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { incrementRandom, restPage } from "../../redux/filter/slice";
import { logOut } from "../../redux/users/slice";
import HeaderInput from "../HeaderInput/HeaderInput";
import HeaderModal from "../HeaderModal/HeaderModal";
import style from "./Header.module.scss";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const modal = useAppSelector((state) => state.modal.modalState);
  const favorites = useAppSelector(
    (state) => state.users.currentUser.favorites.length
  );

  useEffect(() => {
    if (modal) {
      document.body.classList.add("_lock");
    } else {
      document.body.classList.remove("_lock");
    }
  }, [modal]);

  function handleRandomClick() {
    dispatch(incrementRandom());
    dispatch(restPage());
  }
  return (
    <header>
      <div className="container">
        <div className={style.body}>
          <Link to="/search-films/" className={style.logo}>
            <img
              src="search-films/img/header/Logo.png"
              alt="Logo"
              className={style.logo__img}
            />
          </Link>
          <nav>
            <ul className={style.list}>
              <li>
                <NavLink to="/search-films/" className={style.link}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/random"
                  className={style.link}
                  onClick={handleRandomClick}
                >
                  Мне повезёт
                </NavLink>
              </li>
              {isAuth && (
                <li>
                  <NavLink
                    to="/favorites"
                    className={style.link}
                    onClick={() => dispatch(restPage())}
                  >
                    Избранное
                    <span>{favorites | 0}</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <HeaderInput />
          {isAuth ? (
            <div className={style.button} onClick={() => dispatch(logOut())}>
              Выйти
            </div>
          ) : (
            <HeaderModal />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
