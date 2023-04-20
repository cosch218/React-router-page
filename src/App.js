import logo from './logo.svg';
import './App.css';

import {Route, Routes} from 'react-router-dom'

import Layout from './page/Layout';
import Home from './page/Home';
import BoardList from './page/BoardList';
import Board from './page/Board';
import { DataProvider } from './context/DataContext';
import BoardWriteForm from './page/BoardWriteForm';
import BoardEditForm from './page/BoardEditForm';
import LoginForm from './page/LoginForm';
import ImagePage from './page/ImagePage';


function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>

            <Route path='/' element={<Home/>}/>

            <Route path='/boardlist' element={<BoardList/>}/>
            <Route path='/boardlist/:id' element={<Board/>}/>
            <Route path='/board-write-form' element={<BoardWriteForm/>}/>
            <Route path='/board-edit-form' element={<BoardEditForm/>}/>

            <Route path='/login-form' element={<LoginForm/>}/>
            
            <Route path='/image' element={<ImagePage/>}/>
          </Route>
        </Routes>
      </DataProvider>
      
    </div>
  );
}

export default App;
