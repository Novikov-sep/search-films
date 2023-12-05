import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { closeModalHeader, openModalHeader } from "../../redux/modal/slice";
import TabsHeader from "../TabsHeader/TabsHeader";
import style from "./HeaderModal.module.scss";

const HeaderModal: FC = () => {
  const modalHeader = useAppSelector((state) => state.modal.modalHeader);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalSecRef = useRef<HTMLDivElement>(null);

  const handleClickOutModal = (e: any) => {
    if (
      modalRef.current &&
      modalSecRef.current &&
      !modalRef.current.contains(e.target) &&
      !modalSecRef.current.contains(e.target)
    ) {
      dispatch(closeModalHeader());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutModal);
    return () => {
      document.removeEventListener("click", handleClickOutModal);
    };
  }, []);

  const handleClickModal = () => {
    dispatch(openModalHeader());
  };

  return (
    <div
      className={modalHeader ? style.body + " " + style._active : style.body}
    >
      <div ref={modalRef} className={style.title} onClick={handleClickModal}>
        Войти
      </div>
      <div ref={modalSecRef} className={style.modal}>
        <TabsHeader />
      </div>
      <div className={style.cover}></div>
    </div>
  );
};

export default HeaderModal;
