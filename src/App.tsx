import React, { Suspense } from 'react';
import './assets/styles/App.scss';

const PriceListComponent = React.lazy(() => import('./pages/price-list/price-list.component'));

const HeaderComponent = React.lazy(() => import('./shared/header/header.component'));

// function App() {
class App extends React.Component {

  render() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderComponent />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PriceListComponent />
        </Suspense>
      </div>
    );
  };
}

export default App;
