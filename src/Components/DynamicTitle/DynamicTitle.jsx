import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title === null ? "All News" : title;
  }, [title]);
};

export default useTitle;