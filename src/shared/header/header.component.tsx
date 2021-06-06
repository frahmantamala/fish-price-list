import React from 'react';

// interface HeaderProps {
//   title: string;
// }

// const HeaderComponent: FC<HeaderProps> = ({ title }) => {
class HeaderComponent extends React.Component {
  // constructor(props: HeaderProps) {
  //   super(props);
  // }

  render() {
    return (
      <header className="header">
        {/* <div className="overlay"></div> */}
        <nav className="flex flex-jc-sb flex-ai-c">
          <a href="#" className="header-logo">
            <h1>FISHLIST.</h1>
          </a>

          <a id="btnHamburger" href="#" className="header-menu hide-for-desktop">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </nav>
      </header>
    );
  };
};

export default HeaderComponent;