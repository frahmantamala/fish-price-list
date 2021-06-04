import React, { Suspense } from 'react';
import './assets/styles/App.scss';

const HeaderComponent = React.lazy(() => import('./shared/header.component'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderComponent title="Fish Price List" />
      </Suspense>
    </div>
  );
}

export default App;
