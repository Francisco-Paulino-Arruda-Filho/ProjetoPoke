import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Suspense } from "react";

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}/>
      </Suspense>
    </>
  )
};

export default App;
