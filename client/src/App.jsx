import './App.scss';
import AddData from './components/addData/AddData';
import TableCard from './components/table/TableCard';

const App = () => {
  return (
    <main className="app">
      <h1 className="app__header">Тестовое приложение для WelbeX</h1>
      <AddData />
      <TableCard />
    </main>
  );
}

export default App;
