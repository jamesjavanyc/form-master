import "./App.css"
import Client from "pages/client/Client";
import ErrorBoundary from "component/error-boundary/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Client></Client>
      </div>
    </ErrorBoundary>
  );
}

export default App;
