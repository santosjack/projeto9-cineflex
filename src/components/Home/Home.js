import axios from 'axios';
import {useState, useEffect } from 'react';
import "./style.css";
import loader from '../../assets/img/loader-icon.svg';
import { useNavigate } from 'react-router-dom';

export default function Home ({props}) {

    const {ticket, setTicket} = props;

    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const resp = axios.get('https://mock-api.driven.com.br/api/v7/cineflex/movies');

        resp.then( r => {
            setMovies(r.data);
        }
        ).catch(

        );
    },[ticket.isConfirmed]);


    function Movie (obj){
        return(
            <div className="movie" onClick={() => {
                setTicket({...ticket, movie: obj});
                navigate(`/filme/${obj.id}`);
            }}>
                <img src={obj.posterURL} alt={obj.title} />
            </div>
        );
    }

 
    return(
        <div className="home">
            <div>Selecione o filme</div>
            <div>
                {movies === null ? (
                    <img src={loader} alt="loading..." />
                ): (
                    movies.map(movie => 
                        
                        <Movie 
                             key={movie.id}
                             id={movie.id}
                             title={movie.title}
                             posterURL={movie.posterURL}
                             overview={movie.overview}
                             realeaseDate={movie.realeaseDate}
                         />
                    )
                )}
            </div>
        </div>
    )
}