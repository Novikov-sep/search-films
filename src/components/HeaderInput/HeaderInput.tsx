import { FC, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/debounce";
import { fetchSearch } from "../../utils/fetchSearch";
import { fetchTopTen } from "../../utils/fetchTopTen";
import style from "./HeaderInput.module.scss";
import { MeiliMovieEntity } from "@openmoviedb/kinopoiskdev_client";

const HeaderInput: FC = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [topData, setTopData] = useState([]);
  const debouncedSearchItem = useDebounce(search, 500);

  async function SearchItem() {
    await fetchSearch(search)
      .then((res: any) => {
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchTop() {
    await fetchTopTen()
      .then((res: any) => {
        if (res) {
          setTopData(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (search.length > 0) {
      setData([]);
      SearchItem();
    } else {
      setData(topData);
    }
  }, [search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    fetchTop();
    setData(topData);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleClick(e: any) {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setActive(false);
      setSearch("");
    }
  }

  function handleLinkClick() {
    setActive(false);
    setSearch("");
  }

  return (
    <div
      ref={searchRef}
      className={
        active ? style.search__body + " " + style._active : style.search__body
      }
    >
      <input
        onClick={() => setActive(true)}
        onChange={handleChange}
        value={search}
        type="search"
        name=""
        className={style.search}
      />
      <div className={style.search__bottom}>
        {search.length > 0 ? (
          <div className={style.search__text}>Результат поиска:</div>
        ) : (
          <div className={style.search__text}>Входит в топ 10:</div>
        )}
        {data.length
          ? data.map((item: any, id: number) => (
              <div key={id} className={style.search__item}>
                {(item?.poster?.previewUrl && (
                  <Link
                    to={`/${item.id}`}
                    onClick={handleLinkClick}
                    className={style.search__img}
                  >
                    <img src={item.poster.previewUrl} alt="poster" />
                  </Link>
                )) ||
                  (typeof item?.poster === "string" && (
                    <Link
                      to={`/${item.id}`}
                      onClick={handleLinkClick}
                      className={style.search__img}
                    >
                      <img src={item.poster} alt="poster" />
                    </Link>
                  )) || <Skeleton width={45} className={style.search__img} />}
                <div className={style.search__right}>
                  {item?.name ? (
                    <Link
                      onClick={handleLinkClick}
                      to={`/${item.id}`}
                      className={style.search__title}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      onClick={handleLinkClick}
                      to={`/${item.id}`}
                      className={style.search__title}
                    >
                      {item.alternativeName}
                    </Link>
                  )}
                  <div className={style.search_right__bottom}>
                    {(item?.rating?.kp && (
                      <div className={style.search_right_bottom__rating}>
                        {item.rating.kp.toFixed(1)}
                      </div>
                    )) ||
                      (typeof item?.rating === "number" && (
                        <div className={style.search_right_bottom__rating}>
                          {item.rating.toFixed(1)}
                        </div>
                      ))}
                    {item?.year && (
                      <div className={style.search_right_bottom__year}>
                        {item.year}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          : Array(10)
              .fill(0)
              .map((_item, id) => (
                <div key={id} className={style.search__item}>
                  <Skeleton width={45} className={style.search__img} />
                  <div className={style.search__right}>
                    {<Skeleton className={style.search__title} width={180} />}
                    <div className={style.search_right__bottom}>
                      {
                        <Skeleton
                          className={style.search_right_bottom__rating}
                          width={20}
                          height={20}
                        />
                      }
                      {
                        <Skeleton
                          className={style.search_right_bottom__year}
                          width={45}
                        />
                      }
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default HeaderInput;
