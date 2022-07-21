import './App.scss';
import AddData from './components/addData/AddData';
import Table from './components/table/Table';

const App = () => {
  return (
    <main className="app">
      <h1 className="app__header">Тестовое приложение для WelbeX</h1>
      <AddData />
      <Table />
    </main>
  );
}

export default App;
