import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";
import loader from './../../assets/img/loader-icon.svg';

export default function Movie ({props}) {

    

    const {ticket, setTicket} = props;

    console.log(ticket)

    const [sessions, setSessions] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const resp = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${ticket.movie.id}/showtimes`);

        resp.then( r => {
            setSessions(r.data.days);
            console.log(sessions);
        }
        ).catch(

        );
    },[]);

    function Session(obj){
        return(
            <div className='session'>
                <div>{obj.weekday} - {obj.date}</div>
                <div>
                    {obj.showtimes.map( item => 
                    <button onClick={() => {
                        setTicket({
                            ...ticket, 
                            session: {id: obj.id, 
                            weekday: obj.weekday, 
                            date: obj.date,
                            showtime: {id: item.id, time: item.name}
                        }});
                        navigate(`/sessao/${item.id}`);
                    }}>
                        {item.name}
                    </button>)}
                </div>
            </div>
        )
    }

    return(
        <div className="sessions">
            <div>Selecione o horário</div>
            <div>
                {sessions === null ? (
                    <img src={loader} alt="loading..." />
                ): (
                    sessions.map(session => 
                        
                      <Session 
                        key={session.id}
                        id={session.id}
                        weekday={session.weekday}
                        date={session.date}
                        showtimes={session.showtimes}
                      />
                    )
                )}
            </div>
        </div>
    )
}
