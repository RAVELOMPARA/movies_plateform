import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MiniDrawer from "../navbar/page.jsx";
import CardContenu from "../card/page.jsx"

function HomePage() {
  return(
  <>
    <MiniDrawer>
      <CardContenu></CardContenu>
    </MiniDrawer>
    ;
  </> 
  );

}

export default HomePage;
