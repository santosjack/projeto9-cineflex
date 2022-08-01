import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Movie from './Movie/Movie';
import Session from './Session/Session';
import Success from './Success/Success';


export default function App () {

    const [ticket, setTicket] = useState({
        movie: null,
        session: null,
        seats: [],
        client: {name: null, cpf: null},
        isConfirmed: false
    });

    return(
        <>
            <div className="header">
                CINEFLEX
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home props={{ticket,setTicket}} />} />
                    <Route path='/filme/:idMovie' element={<><Movie props={{ticket,setTicket}} /> <Footer props={{ticket}} /></>} />
                    <Route path='/sessao/:idSession' element={<><Session props={{ticket,setTicket}} /> <Footer props={{ticket}} /></>} />
                    <Route path='/sucesso' element={<Success props={{ticket, setTicket}} />} />
                </Routes>
            </BrowserRouter>
        </>  
    );
}