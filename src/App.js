import { useSelector } from "react-redux";
import "./App.css";
import UsersTable from "./components/UserTable/UsersTable";

function App() {
  const users = useSelector((state) => state.users);
  return (
    <div className='App'>
      <UsersTable></UsersTable>
    </div>
  );
}

export default App;
