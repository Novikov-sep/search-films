import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Film, restItems } from "../../redux/films/slice";
import { restPage } from "../../redux/filter/slice";
import { addFavorite } from "../../redux/users/slice";
import style from "./Card.module.scss";

interface CardProps {
  item: Film;
  id: number;
}

export interface IFavorite {
  id: number;
  title: string;
  image: string;
}

const Card: FC<CardProps> = ({ item, id }: CardProps) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const [active, setActive] = useState<IFavorite[]>([]);
  const favorites = useAppSelector(
    (state) => state.users.currentUser.favorites
  );

  const favorite = {
    id: item.id,
    title: item.name,
    image: item.poster.previewUrl,
  };

  useEffect(() => {
    const favoritesId: any = () => {
      if (favorites.length > 0) {
        return favorites.find((film) => {
          return item.id === film.id;
        });
      }
    };
    setActive(favoritesId());
  }, [favorites]);

  const handleClickFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(addFavorite(favorite));
  };

  function handleClick() {
    dispatch(restPage());
    dispatch(restItems());
  }
  return (
    <div className={style.body}>
      <div className={style.body__top}>
        <div className={style.image}>
          <img src={item.poster.previewUrl} alt="" />
          <div className={style.additionally}>
            <Link
              to={`/${item.id}`}
              onClick={handleClick}
              className={style.additionally__title}
            >
              {item.name}
            </Link>
            <div className={style.movieLength}>
              <span>Продолжительность:</span> {item.movieLength} мин.
            </div>
            <div className={style.year}>
              <span>Год выпуска:</span> {item.year}
            </div>
            <div className={style.description_more}>{item.description}</div>
          </div>
        </div>
        <div className={style.age_rating}>{item.ageRating}</div>
        <div className={style.rating}>{item.rating.kp.toFixed(1)}</div>
        {isAuth && (
          <div
            className={
              active === undefined
                ? style.favorite
                : style.favorite + " " + style._active
            }
            onClick={(e) => handleClickFavorite(e)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
              stroke="inherit"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z"
                  fill="inherit"
                ></path>{" "}
              </g>
            </svg>
          </div>
        )}
      </div>
      <div className={style.body__bottom}>
        <Link to={`/${item.id}`} onClick={handleClick} className={style.title}>
          {item.name}
        </Link>
        <div className={style.description}>{item.shortDescription}</div>
      </div>
    </div>
  );
};

export default Card;
