import React, { useState } from 'react';
import { Brain, Menu, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-neutral-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <Brain className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-neutral-900">MindConnect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-neutral-600">
                    Benvenuto, {user.firstName}
                  </span>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    aria-label="Esci"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/why-mindconnect')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-medium transition-colors"
                  >
                    Perché MindConnect?
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
                  >
                    Accedi
                  </button>
                  <button
                    onClick={() => navigate('/therapy-type-selection')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                  >
                    Inizia Ora
                  </button>
                </>
              )}
            </div>

            {/* Mobile Navigation - Right Side */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Perché MindConnect Button - Always visible on mobile */}
              {!user && (
                <button
                  onClick={() => navigate('/why-mindconnect')}
                  className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium transition-colors hover:bg-orange-600 whitespace-nowrap"
                >
                  Perché MindConnect?
                </button>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-lg z-40">
            <div className="px-4 py-4 space-y-4">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-neutral-600 capitalize">
                        {user.role === 'patient' ? 'Paziente' : 'Psicologo'}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigation('/dashboard')}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    
                    {user.role === 'patient' && (
                      <>
                        {user.hasCompletedQuestionnaire ? (
                          <button
                            onClick={() => handleNavigation('/matching-results')}
                            className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                          >
                            I Miei Match
                          </button>
                        ) : (
                          <button
                            onClick={() => handleNavigation('/therapy-type-selection')}
                            className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                          >
                            Completa Questionario
                          </button>
                        )}
                      </>
                    )}
                    
                    <button
                      onClick={() => handleNavigation('/appointments')}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Appuntamenti
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/messages')}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Messaggi
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Profilo
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-4 border-t border-neutral-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Esci
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Navigation */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      Accedi
                    </button>
                    <button
                      onClick={() => handleNavigation('/therapy-type-selection')}
                      className="w-full bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                    >
                      Inizia Ora
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Overlay per chiudere il menu quando si clicca fuori */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;