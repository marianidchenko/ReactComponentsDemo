import './App.css';
import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { Search } from './components/search/Search';
import { UserList } from './components/user-section/UserList';



function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll()
    .then(users => setUsers(users));
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <section className="card users-container">

          <Search />
          <UserList users={users} />

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
