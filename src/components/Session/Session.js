import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";
import loader from './../../assets/img/loader-icon.svg';

export default function Session ({props}) {

    const {ticket, setTicket} = props;

    const [seats, setSeats] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const resp = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${ticket.session.showtime.id}/seats`);

        resp.then( r => {
            setSeats(r.data.seats);
        }
        ).catch(

        );
    },[ticket.isConfirmed]);

    function Seat(obj){
        const [selected, setSelected] = useState(false);
        function select (e) {
            console.log(e.target)
            if(e.target.value.isAvailable){
                setSelected(!select);
                let newSeats = ticket.seats;
                if(ticket.seats.includes(obj)){
                    newSeats = ticket.seats.filter((item) => {
                        if(item.id !== obj.id){
                            return item;
                        }
                    });
                }else{
                    setTicket({...ticket, seats: newSeats});
                }
                
            }
        }
        return(
            <div 
            className={`seat ${obj.isAvailable ? (selected ? "green" : "gray"): "yellow"}`} 
            onClick={() => select}>
                {obj.name}
            </div>
        )
    }

    return(
        <div className="seats">
            <div>Selecione o(s) assento(s)</div>
            <div className="seats-container">
                {seats === null ? (
                    <img src={loader} alt="loading..." />
                ): (
                    seats.map(seat => 
                        
                      <Seat
                        key={seat.id}
                        id={seat.id}
                        name={seat.name}
                        isAvailable={seat.isAvailable}
                      />
                    )
                )}
            </div>
        </div>
    )
}