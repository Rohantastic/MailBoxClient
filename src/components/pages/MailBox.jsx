import React, { useEffect, useState } from 'react';
import "./MailBox.css";
import EmailComposeModal from '../Modals/EmailComposeModal';
import { Link, useNavigate } from 'react-router-dom';

function MailBox() {
    const [modal, setModal] = useState(false);
    const [mails, setMails] = useState([]);
    const userName = localStorage.getItem("mailboxloggedinUser");
    console.log("email of user:", userName);

    const navigate = useNavigate();

    const toggleModal = () => {
        setModal(!modal);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        fetchMails();
    }, []);


    const fetchMails = async () => {
        try {
            const response = await fetch("https://mailboxclient-e822e-default-rtdb.firebaseio.com/mailbox.json");
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    const mailsArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));


                    const loggedInUserEmail = localStorage.getItem("mailboxloggedinUser");
                    const filteredMails = mailsArray.filter((mail) => mail.receiver === loggedInUserEmail);

                    setMails(filteredMails);
                } else {
                    console.log("cannot get");
                    setMails([]);
                }
            } else {
                console.error("Error fetching mails from Firebase");
            }
        } catch (err) {
            console.error("An error occurred while fetching emails:", err);
        }
    }


    return (
        <>
            <div className="div">
                <EmailComposeModal isOpen={modal} toggle={toggleModal} />
            </div>
            <div className="gmail-homepage">
                <header>
                    <div className="logo">
                        <img src="" alt="Email App" />
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search mail" />
                    </div>
                    <div className="user-info">
                        <button onClick={logout}> Log out</button>
                        <button onClick={fetchMails}>↻</button>
                        <span>{userName}</span>
                    </div>
                </header>
                <nav>
                    <ul>
                        <li>Inbox</li>
                        <li>Sent Mail</li>
                        <li onClick={toggleModal}>Send Mail</li>
                        <li>More</li>
                    </ul>
                </nav>
                <main className='mailbox-homepage-main'>
                    <ul className='mailbox-homepage-main-ul'>
                        {mails.slice().reverse().map((mail) => (
                            <li className='mailbox-homepage-main-ul' key={mail.id}>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'><div className="email-sender">{mail.sender}</div></Link>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'>
                                    <div className="email-subject">
                                        {mail.unread === true ? "[unread] " : null}
                                        {mail.emailContent}
                                    </div>
                                </Link>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'><div className="email-date">{mail.time}</div></Link>
                            </li>
                        ))}
                    </ul>
                </main>


            </div>
        </>
    );
}

export default MailBox;