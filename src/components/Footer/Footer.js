import './style.css';

export default function Footer ({props}) {
    const {ticket} = props;
    return(
        <div className="footer">
            <div>
                <img src={!!ticket.movie ? ticket.movie.posterURL : ""} alt="" />
            </div>
            <div>
                <div>{!!ticket.movie ? ticket.movie.title : ""}</div>
                <div>{!!ticket.session ? ticket.session.weekday+" - "+ticket.session.showtime.time : ""}</div>
            </div>
        </div>
    )
}