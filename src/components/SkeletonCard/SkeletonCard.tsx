import React, { FC } from "react";
import style from "./SkeletonCard.module.scss";
import Skeleton from "react-loading-skeleton";

const SkeletonCard: FC = () => {
  return (
    <div className={style.card_skeleton}>
      <div className={style.top}>
        <Skeleton style={{ borderRadius: "0" }} width={300} height={450} />
        <Skeleton
          width={31.7}
          style={{ position: "absolute", borderRadius: "0" }}
          className={style.squire}
        />
        <Skeleton
          width={49.22}
          style={{ position: "absolute", borderRadius: "50%" }}
          className={style.rating}
        />
      </div>
      <div className={style.bottom}>
        <Skeleton height={20} width={200} className={style.title} />
        <Skeleton count={2} height={12} className={style.description} />
      </div>
    </div>
  );
};

export default SkeletonCard;
