import React from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ContextProvider from "./context/Provider";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Meals />
    </ContextProvider>
  );
}

export default App;
