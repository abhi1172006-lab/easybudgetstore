import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare,
  PackageCheck, Settings, LogOut, Menu, X, ArrowUpRight,
  Tags, Users, Layout, Image, PlusCircle
} from 'lucide-react';
import siteConfig from '../../config/siteConfig';
import Toast from '../../components/Toast';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navGroups = [
    {
      label: 'Store',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Bulk Leads', path: '/admin/quotes', icon: MessageSquare },
        { name: 'Customers', path: '/admin/customers', icon: Users },
      ]
    },
    {
      label: 'Catalog',
      items: [
        { name: 'Products', path: '/admin/products', icon: ShoppingBag },
        { name: 'Categories', path: '/admin/categories', icon: Tags },
        { name: 'Inventory', path: '/admin/inventory', icon: PackageCheck },
      ]
    },
    {
      label: 'Content',
      items: [
        { name: 'Media', path: '/admin/media', icon: Image },
        { name: 'Homepage', path: '/admin/homepage', icon: Layout },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-surface text-brand-text font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-brand-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-brand-border shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm uppercase tracking-widest text-brand-text font-editorial">
              {siteConfig.wordmark}
            </h2>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-brand-muted hover:text-brand-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-ultra text-brand-muted mb-2">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'bg-brand-dark text-white shadow-sm'
                          : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-brand-border shrink-0 space-y-2">
          <div className="px-3 py-3 bg-brand-surface rounded-md border border-brand-border mb-4">
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block mb-0.5">Admin Profile</span>
            <span className="text-xs font-bold text-brand-text block truncate">{user?.email || 'Store Owner'}</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between w-full px-3 py-2.5 text-brand-muted hover:text-brand-text hover:bg-brand-surface rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>Live Storefront</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        {/* Top Header */}
        <header className="h-16 border-b border-brand-border bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-subtle shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-brand-muted hover:text-brand-text rounded-md hover:bg-brand-surface"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-brand-text font-editorial hidden sm:block">
              Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/admin/products/new"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-brand-dark text-white rounded text-[10px] font-bold tracking-wider uppercase hover:bg-black transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
            <div className="w-px h-6 bg-brand-border hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text font-bold text-xs">
                A
              </div>
              <span className="text-xs font-bold text-brand-text hidden md:block">Abhi Gupta</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8 max-w-7xl mx-auto h-full">
             <Outlet />
          </div>
        </main>
        <Toast />
      </div>
    </div>
  );
}
