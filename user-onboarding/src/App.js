import React from 'react';
import ReactDOM from 'react-dom';
import FormikUserForm from './Form';
import './App.css';
import './Form';

function App() {
  return (
    <div className="App">
      <FormikUserForm />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
