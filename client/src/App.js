import './App.css';
import { useEffect, useState } from 'react';

import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { Search } from './components/Search/Search';
import { UserList } from './components/UserSection/UserList';

const baseUrl = 'http://localhost:3005/api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/users`)
    .then(res => res.json())
    .then(data => {
      setUsers(data.users);
    });
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
