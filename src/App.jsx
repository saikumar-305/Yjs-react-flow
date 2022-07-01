import { useState } from "react";
import { RecoilRoot } from "recoil";
import YFlow from "./components/YFlow/YFlow";

function App() {
  return (
    <div>
      <RecoilRoot>
        <YFlow />
      </RecoilRoot>
    </div>
  );
}

export default App;
