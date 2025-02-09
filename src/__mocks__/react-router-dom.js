// src/__mocks__/react-router-dom.js
import React from 'react';

const navigate = jest.fn();

export const useNavigate = () => navigate;
export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null
});
export const useParams = () => ({});
export const BrowserRouter = ({children}) => <div>{children}</div>;
export const Routes = ({children}) => <div>{children}</div>;
export const Route = ({element}) => element;
export const Link = ({to, children}) => <a href={to}>{children}</a>;
export const NavLink = ({to, children}) => <a href={to}>{children}</a>;

// Reset all mocks between tests
beforeEach(() => {
  navigate.mockClear();
});