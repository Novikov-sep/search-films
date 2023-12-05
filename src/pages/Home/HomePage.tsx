import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItems, fetchFilms } from "../../redux/films/slice";
import { incrementPage } from "../../redux/filter/slice";
import {
  fetchFilmsAdd,
  fetchFilmsAddDocs,
  fetchFilmsAddParams,
} from "../../utils/fetchFilms";
import style from "./HomePage.module.scss";

const HomePage: FC = () => {
  const films = useAppSelector((state) => state.films);
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filter.page);
  const limit = useAppSelector((state) => state.filter.limit);

  const params = {
    page,
    limit,
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    async function addFilms(params: fetchFilmsAddParams) {
      if (page > 1) {
        await fetchFilmsAdd(params).then((res) => {
          if (res.data) {
            dispatch(addItems(res.data.docs));
          } else {
            throw new Error(res.error + res.message);
          }
        });
      }
    }
    addFilms(params);
  }, [page]);

  useEffect(() => {
    if (inView) {
      dispatch(incrementPage());
    }
  }, [inView, dispatch]);

  useEffect(() => {
    dispatch(fetchFilms());
  }, []);

  return (
    <div className="container">
      <div className={style.body}>
        <div className={style.cards}>
          {films.status === "loading" &&
            Array(9)
              .fill(0)
              .map((item, id) => <SkeletonCard key={id} />)}
          {films.status === "success" &&
            films.items.map((item, id) => (
              <Card key={item.id} item={item} id={id} />
            ))}
        </div>
        <Loader />
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default HomePage;
