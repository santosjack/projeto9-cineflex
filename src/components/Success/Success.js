import { useNavigate } from "react-router-dom";

import './style.css';

export default function Success ({props}) {
   
    const {movie, session, seats, client } = props.ticket;

    const navigate = useNavigate();

    return(
        <div className="sucesso">
            <div>
                <p>Pedido feito com sucesso!</p>
            </div>
            <div>
                <div>
                    <h3>Filme e sessão</h3>
                    <div>
                        <div>{movie.title}</div>
                        <div>{session.date} {session.showtime.time}</div>
                    </div>
                </div>
                <div>
                    <h3>Ingressos</h3>
                    <div>
                        {seats.map(i => <div>Assento {i.name}</div>)}
                    </div>
                </div>
                <div>
                    <h3>Comprador</h3>
                    <div>
                        <div>Nome: {client.name}</div>
                        <div>CPF: {client.cpf}</div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={() => navigate('/')}>Voltar para Home</button>
            </div>
        </div>
    )
}