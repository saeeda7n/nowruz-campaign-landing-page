"use client";
import React, { useEffect } from "react";
import { useBook } from "@/app/(landing)/questionChallenge/bookContext";
import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "@/server/actions/questions";
import { Loader2 } from "lucide-react";
import { useUser } from "@/authProvider";

const StartGameButton = () => {
  const user = useUser();
  const { gameData, page, userState, allowSwitch, setQuestion } = useBook();
  const currentQuestion = useQuery({
    enabled: false,
    queryFn: () => getQuestion(userState.suggestedId),
    queryKey: ["qsQuestion"],
  });
  useEffect(() => {
    setQuestion(currentQuestion.data);
  }, [currentQuestion.data, currentQuestion.dataUpdatedAt]);
  return (
    <button
      disabled={page > 0 || !allowSwitch || !user}
      onClick={() => currentQuestion.refetch()}
      className="mx-5 flex h-12 flex-1 select-none items-center justify-center rounded-full bg-[#ff9100] font-bold text-gray-50 [box-shadow:0_4px_0_0_#99502F] disabled:bg-orange-300"
    >
      {currentQuestion.isFetching ? (
        <Loader2 className="animate-spin" />
      ) : (
        "شروع"
      )}
    </button>
  );
};

export default StartGameButton;
