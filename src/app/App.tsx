import React from "react";
import UserList from "../components/UserList";
import AddUserForm from "../components/AddUserForm";

function App() {
  return (
    <div className="App">
      <AddUserForm />
      <UserList />
    </div>
  );
}

export default App;
