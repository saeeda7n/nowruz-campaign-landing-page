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
import { useQuery } from "@tanstack/react-query";
import { getQuestionGameData, getUserStatus } from "@/server/actions/questions";

type QuestionProps = {
  id: string;
  order: string;
  questions: {
    id: string;
    question: string;
    correctOption?: string;
    answers: {
      id: string;
      answer: string;
    }[];
  }[];
};
type GameData =
  | {
      now: number;
      today: number;
      activeQuestionIds: string[];
      currentDayId: string;
      totalQuestions: number;
      allQuestionIds: string[];
    }
  | undefined;
type BookContextProps = {
  page: number;
  allowSwitch: boolean;
  singlePage: boolean;
  question: QuestionProps | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setAllowSwitch: Dispatch<SetStateAction<boolean>>;
  setSinglePage: Dispatch<SetStateAction<boolean>>;
  setQuestion: Dispatch<SetStateAction<QuestionProps | undefined>>;
  gameData: GameData;
  userState: any | undefined;
};
const bookContext = createContext<BookContextProps | null>(null);
export const useBook = () => useContext(bookContext) as BookContextProps;
const BookContext = ({
  children,
  gameData,
  userState,
}: PropsWithChildren & {
  gameData: GameData;
  userState: any;
}) => {
  const [timeout, setTimeoutId] = useState<any>();
  const [page, setPage] = useState(0);
  const [allowSwitch, setAllowSwitch] = useState(true);
  const [singlePage, setSinglePage] = useState(true);
  const [question, setQuestion] = useState<QuestionProps>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 848) setSinglePage(true);
    else setSinglePage(false);
  }, [width]);

  useEffect(() => {
    if (question) {
      clearTimeout(timeout);
      setPage(1);
    }
  }, [question]);

  useEffect(() => {
    clearTimeout(timeout);
    if (page <= 0 && question) {
      const id = setTimeout(() => {
        setQuestion(undefined);
      }, 2000);
      setTimeoutId(id);
    }
  }, [page]);
  return (
    <bookContext.Provider
      value={{
        page,
        allowSwitch,
        singlePage,
        question,
        setAllowSwitch,
        setPage,
        setSinglePage,
        setQuestion,
        gameData,
        userState,
      }}
    >
      {children}
    </bookContext.Provider>
  );
};

export default BookContext;
