import React, { useEffect, useState } from "react";

const ToTheTop = () => {
  const [toggleBtn, setToggleBtn] = useState<boolean>(true);

  const handleScroll = () => {
    const { scrollY } = window;
    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggleBtn ? (
    <button onClick={goToTop}>
      ↑
    </button>
  ) : null;
};

export default ToTheTop;
