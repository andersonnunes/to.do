import logoImg from '../logo.svg';
import '../styles/header.scss';

export function Header() {
  return (
    <header className="header">
      <div>
        <img src={logoImg} alt="to.do" role="img" />
      </div>
    </header>
  )
}
