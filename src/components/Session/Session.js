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

   function setSeat (seat) {
    seat.setSelected(!seat.selected);
    if(seat.obj.isAvailable){
        let newSeats = [];
   
        newSeats = ticket.seats.filter( item => item.id !== seat.obj.id );
        console.log("valor da new: "+newSeats);
        if(newSeats.length < ticket.seats.length){
            setTicket({...ticket, seats: newSeats});
        }else{
            setTicket({...ticket, seats: [...ticket.seats, seat.obj]});
        }
    
    }
    console.log(ticket.seats);
   }

    function Seat(obj){
        const [ selected, setSelected ] = useState(false);

        return(
            <div 
            className={`seat ${obj.isAvailable ? (selected ? "green" : "gray"): "yellow"}`} 
            onClick={() => setSeat({obj, setSelected, selected})}>
                {obj.name}
            </div>
        )
    }

    function Form () {
        const [name, setName ] = useState("");
        const [cpf, setCpf ] = useState("");

        function finish(e){
            e.preventDefault();
            if(ticket.seats.length === 0){
                alert("Selecione pelo menos 1 assento!");
            }else{
                console.log(name, cpf, ticket.seats.length);
                    let seats = ticket.seats.map(i => i.id);
                
                    const resp = axios.post(`https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`, {
                        ids: seats,
                        name: name,
                        cpf: cpf
                    });
            
                    resp.then( r => {
                        if(r.status === 200){
                            setTicket({...ticket, client: {name: name, cpf: cpf}});
                            navigate('/sucesso');
                        }else{
                            alert('Não foi possível reservar os assentos, tente novamente')
                        }
                    }
                    ).catch();
            
                
            }
            
        }

        return(
            <form onSubmit={finish}>
                <div>
                    <label htmlFor="name">Nome do comprador: </label>
                    <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} required placeholder='Digite seu nome...'/>
                </div>
                <div>
                    <label htmlFor="cpf">CPF do comprador: </label>
                    <input type="number" name="cpf" onChange={e => setCpf(e.target.value)} value={cpf} required placeholder='Digite seu CPF...'/>
                </div>
                <div>
                <input type="number" name="seats" defaultValue={ticket.seats.length} required hidden />
                </div>
                <div>
                    <button type="submit">Reservar assento(s)</button>
                </div>
            </form>
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
                <div className='caption'>
                    <div>
                        <div className='seat green'></div>
                        <p>Selecionado</p>
                    </div>
                    <div>
                        <div className='seat gray'></div>
                        <p>Disponível</p>
                    </div>
                    <div>
                        <div className='seat yellow'></div>
                        <p>Indisponível</p>
                    </div>
                </div>
            </div>
            <div className='form'>
                    <Form />
            </div>

        </div>
    )
}