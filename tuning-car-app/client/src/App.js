import React, { useState } from 'react';
import CarMake from './components/CarMake';
import CarModel from './components/CarModel';
import CarPart from './components/CarPart';
import PartOptions from './components/PartOptions';
import ScrollToTopButton from './components/ScrollToTopButton';
import Login from './components/Login';
import Register from './components/Register';
import Forum from './components/Forum';
import './App.css';

function App() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('parts');
  const [forumKey, setForumKey] = useState(0);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setCurrentPage('parts');
  };

  const handleRegister = (token) => {
    setIsLoggedIn(true);
    setCurrentPage('parts');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Dodaj ten wiersz
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'forum') {
      setForumKey(forumKey + 1);  // Reset forum key to re-render Forum component
    }
  };

  return (
    <div>
      <header>
        <h1>
          <span className="title-black">Dreams Go </span>
          <span className="title-red">Wroom</span>
        </h1>
        <nav>
          <button className="nav-button" onClick={() => handleNavigate('parts')}>Car Parts</button>
          <button className="nav-button" onClick={() => handleNavigate('forum')}>Forum</button>
          {isLoggedIn ? (
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="nav-button" onClick={() => handleNavigate('login')}>Login</button>
              <button className="nav-button" onClick={() => handleNavigate('register')}>Register</button>
            </>
          )}
        </nav>
      </header>
      <main className="container">
        {currentPage === 'login' && <Login onLogin={handleLogin} />}
        {currentPage === 'register' && <Register onRegister={handleRegister} />}
        {currentPage === 'forum' && <Forum key={forumKey} />}
        {currentPage === 'parts' && (
          <>
            <div className="select-container">
              <CarMake onMakeChange={setSelectedMake} />
              <CarModel make={selectedMake} onModelChange={(model, id) => { setSelectedModelId(id); }} />
              <CarPart modelId={selectedModelId} onPartChange={setSelectedPart} />
            </div>
            <PartOptions partId={selectedPart} />
          </>
        )}
      </main>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
