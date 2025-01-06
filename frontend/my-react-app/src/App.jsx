import "./App.css";

// function App() {
//   return (
//     <>
//       <div>Helloworld</div>
//     </>
//   );
// }

// export default App;

import React from "react";
import PasswordGenerator from "./components/PasswordGenerator";

const App = () => {
  return (
    <div>
      <PasswordGenerator />
    </div>
  );
};

export default App;
