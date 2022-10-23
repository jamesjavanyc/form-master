import "./App.css"
import Client from "pages/client/Client";
import ErrorBoundary from "component/error-boundary/ErrorBoundary"
import Login from "pages/login/Login";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Client></Client>
        <Login></Login>
      </div>
    </ErrorBoundary>
  );
}

export default App;
