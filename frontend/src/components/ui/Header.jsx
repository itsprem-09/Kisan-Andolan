import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Our Vision & Mission', path: '/our-vision-mission-page', icon: 'Target' },
    { label: 'About', path: '/about-page', icon: 'Users' },
    { label: 'Information Center', path: '/information-center-page', icon: 'Book' },
    { label: 'Timeline', path: '/andolan-timeline-page', icon: 'Clock' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMemberRegistration = () => {
    navigate('/member-registration-modal');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100 shadow-sm">
      <div className="container-custom mx-auto px-2">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sprout" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-primary leading-tight">
                AgriCommunity
              </h1>
              <p className="text-xs text-text-secondary font-caption -mt-1">
                Growing Together
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-2">
            <div className="flex items-center justify-center space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-1 px-2 py-1.5 text-sm rounded-md transition-smooth touch-target whitespace-nowrap ${
                    isActivePath(item.path) ? 'nav-link-active bg-background' : 'hover:bg-background'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTA and Admin */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={handleMemberRegistration}
              className="btn-primary text-xs px-3 py-2 rounded-md touch-target whitespace-nowrap"
            >
              Become a Member
            </button>
            <Link
              to="/admin-dashboard"
              className={`nav-link flex items-center space-x-1 px-2 py-1.5 text-sm rounded-md transition-smooth touch-target ${
                isActivePath('/admin-dashboard') ? 'nav-link-active bg-background' : 'hover:bg-background'
              }`}
            >
              <Icon name="Settings" size={16} />
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-background transition-smooth touch-target"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-surface border-t border-border z-90 animate-fade-in">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-md transition-smooth touch-target ${
                  isActivePath(item.path) ? 'nav-link-active bg-background' : 'hover:bg-background'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border mt-4 space-y-2">
              <button
                onClick={() => {
                  handleMemberRegistration();
                  closeMobileMenu();
                }}
                className="w-full btn-primary text-left px-4 py-3 touch-target"
              >
                Become a Member
              </button>
              
              <Link
                to="/admin-dashboard"
                onClick={closeMobileMenu}
                className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-md transition-smooth touch-target ${
                  isActivePath('/admin-dashboard') ? 'nav-link-active bg-background' : 'hover:bg-background'
                }`}
              >
                <Icon name="Settings" size={20} />
                <span className="font-medium">Admin Dashboard</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;