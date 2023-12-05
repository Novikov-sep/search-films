import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import style from "./Favorites.module.scss";
import { IFavorite } from "../../components/Card/Card";

const Favorites: FC = () => {
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const favorites = useAppSelector(
    (state) => state.users.currentUser.favorites
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="container">
      <div className={style.body}>
        {favorites.map((item: IFavorite, id) => (
          <div key={id} className={style.item}>
            <Link to={`/${item.id}`} className={style.image}>
              <img src={item.image} alt="" />
            </Link>
            <Link to={`/${item.id}`} className={style.title}>
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
