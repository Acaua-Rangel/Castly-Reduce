import Routes from "./routes";
import { AuthProvider } from "./Context/authContext";
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App