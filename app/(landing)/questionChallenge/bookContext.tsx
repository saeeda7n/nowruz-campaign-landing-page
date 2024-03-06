"use client";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWindowDimensions } from "@/lib/useScreenSize";

type BookContextProps = {
  page: number;
  canNext: boolean;
  singlePage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setCanNext: Dispatch<SetStateAction<boolean>>;
  setSinglePage: Dispatch<SetStateAction<boolean>>;
};
const bookContext = createContext<BookContextProps | null>(null);
export const useBook = () => useContext(bookContext) as BookContextProps;
const BookContext = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const [singlePage, setSinglePage] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 768) setSinglePage(true);
    else setSinglePage(false);
  }, []);
  return (
    <bookContext.Provider
      value={{ page, canNext, singlePage, setCanNext, setPage, setSinglePage }}
    >
      {children}
    </bookContext.Provider>
  );
};

export default BookContext;
