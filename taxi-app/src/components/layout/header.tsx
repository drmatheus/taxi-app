import { Link } from 'react-router-dom';
import { FaTaxi } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-950 border-b-[8px] border-yellow-500 text-white p-4 py-8">
      <nav className="max-w-7xl w-auto mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Desktop */}
        <ul className="gap-4 hidden md:flex font-semibold text-blue-950">
          <li className="mr-auto">
            <Link
              to="/"
              className="rounded-lg bg-slate-50 flex items-center gap-2 px-4 py-2"
            >
              <span>Home </span>
              <FaTaxi className="bg-slate-50" size={20} />
            </Link>
          </li>
          <li>
            <Link
              to="/new-ride"
              className="rounded-lg bg-slate-50 flex items-center gap-2 px-4 py-2"
            >
              Nova Viagem
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="rounded-lg bg-slate-50 flex items-center gap-2 px-4 py-2"
            >
              Histórico
            </Link>
          </li>
        </ul>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/"
            className="rounded-lg font-semibold bg-slate-50 flex items-center gap-2 px-4 py-2 text-blue-950"
          >
            <span>Home </span>
            <FaTaxi size={20} />
          </Link>
          <button onClick={toggleMenu} className="text-white">
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-24 left-0 right-0 bg-blue-950 text-white py-4 px-6 md:hidden">
            <li onClick={toggleMenu}>
              <Link to="/new-ride" className="block py-2">
                Nova Viagem
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/history" className="block py-2">
                Histórico
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
