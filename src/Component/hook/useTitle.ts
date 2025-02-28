import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Aradhya Core`;
    window.scrollTo(0, 0);
  }, [title]);
};
