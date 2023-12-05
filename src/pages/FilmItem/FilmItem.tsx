import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../hooks/hooks";
import { fetchItem } from "../../utils/fetchItem";
import { fetchRandom } from "../../utils/fetchRandom";
import style from "./FilmItem.module.scss";

interface IGenres {
  name: string;
}

const FilmItem: FC = () => {
  const navigate = useParams();
  const [data, setData] = useState<any | any>("");
  const random = useAppSelector((state) => state.filter.random);

  useEffect(() => {
    async function fetchItemById(params: number) {
      await fetchItem(params)
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function fetchRandomItem() {
      await fetchRandom()
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (navigate.id !== "random") {
      fetchItemById(Number(navigate.id));
    } else {
      setData("");
      fetchRandomItem();
    }
  }, [navigate.id, random]);

  return (
    <>
      {typeof data === "object" ? (
        <div className="container">
          <div className={style.body}>
            <div className={style.left}>
              {(data.poster?.url && (
                <div className={style.poster}>
                  <img src={data.poster?.url} alt="poster" />
                </div>
              )) ||
                (typeof data.poster === "string" && (
                  <div className={style.poster}>
                    <img src={data.poster} alt="poster" />
                  </div>
                ))}
              <div className={style.trailer}>
                <div className={style.trailer__title}>
                  {data.videos?.trailers[0]?.name}
                </div>
                <iframe
                  src={data.videos?.trailers[0]?.url}
                  allow="fullscreen"
                  width="100%"
                  style={{ aspectRatio: "16 / 9" }}
                ></iframe>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.name}>
                <h1>{data.name}</h1> ({data.year && data.year})
              </div>
              {!!data.ageRating && (
                <div className={style.rating}>{data.ageRating}+</div>
              )}
              {!!data.description && (
                <div className={style.description}>{data.description}</div>
              )}
              {!!data.watchability?.items && (
                <a
                  href={data?.watchability?.items[0]?.url}
                  target="_blank"
                  className={style.watch}
                >
                  Смотреть
                </a>
              )}
              <div className={style.about}>
                <p>О фильме</p>
                {data.year && (
                  <div className={style.text}>
                    <span>Год производства</span>
                    <span>{data.year}</span>
                  </div>
                )}
                {data.countries[0].name && (
                  <div className={style.text}>
                    <span>Страна</span>
                    {data.countries[0].name}
                  </div>
                )}
                {data.genres && (
                  <div className={style.genres}>
                    <span>Жанр</span>
                    {data.genres.map((item: IGenres, id: number) => (
                      <div key={id}>{item.name}</div>
                    ))}
                  </div>
                )}
                {data.slogan && (
                  <div className={style.text}>
                    <span>Слоган</span>
                    {data.slogan}
                  </div>
                )}
                {data.ageRating && (
                  <div className={style.text}>
                    <span>Возраст</span>
                    {data.ageRating}+
                  </div>
                )}
                {data.movieLength && (
                  <div className={style.text}>
                    <span>Время</span>
                    {data.movieLength}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FilmItem;
