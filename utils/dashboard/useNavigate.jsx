import React, { useState } from "react";

export default function useNavigate(pages) {
  const [currentNavigate, setcurrentNavigate] = useState(pages[0].name);

  function toPage(name) {
    setcurrentNavigate(name);
  }

  return {
    currentNavigate,
    page: pages.find((item) => item.name == currentNavigate),
    toPage,
  };
}
