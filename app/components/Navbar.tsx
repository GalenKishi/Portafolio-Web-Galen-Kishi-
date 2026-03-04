import { estaAutenticado } from '@/lib/session';
import { logoutAction } from '../login/actions';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const isAuth = await estaAutenticado();

  return <NavbarClient isAuth={isAuth} logoutAction={logoutAction} />;
}