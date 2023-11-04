import React, { useEffect, useState } from 'react';
import "./MailBox.css";
import EmailComposeModal from '../Modals/EmailComposeModal';
import { Link, useNavigate } from 'react-router-dom';

function MailBox() {
    const [modal, setModal] = useState(false);
    const [mails, setMails] = useState([]);
    const [inboxSentMessageToggle, setInboxSentMessageToggle] = useState(false); // Added state for showing sent mails
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
    }, [inboxSentMessageToggle]); // Add inboxSentMessageToggle as a dependency

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
                    var filteredMails = [];
                    if (inboxSentMessageToggle) {
                        filteredMails = mailsArray.filter((mail) => mail.sender === loggedInUserEmail); // Filter sent mails
                    } else {
                        filteredMails = mailsArray.filter((mail) => mail.receiver === loggedInUserEmail); // Filter received mails
                    }

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

    const sentMailHandler = () => {
        setInboxSentMessageToggle(!inboxSentMessageToggle);
    }


    // setInterval(()=>{
    //     fetchMails();
    // },2000);


    return (
        <>
            <div className="div">
                <EmailComposeModal isOpen={modal} toggle={toggleModal} />
            </div>
            <div className="gmail-homepage">
                <header>
                    <div className="logo">
                        <img className="logo-img" src="/email.png" alt="Email App" />
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Search mail" />
                    </div>
                    <div className="user-info">
                        <button className="mailbox-logout" onClick={logout}> Log out</button>
                        <span className='user-info-userName'>{userName}</span>
                    </div>
                </header>
                <nav>
                    <ul>
                        <li onClick={sentMailHandler}>Inbox</li>
                        <li onClick={sentMailHandler}>Sent Mail</li>
                        <li onClick={toggleModal}>Send Mail</li>
                        <button className="email-reload" onClick={fetchMails}>↻</button>
                    </ul>
                </nav>
                <main className='mailbox-homepage-main'>
                    <ul className='mailbox-homepage-main-ul'>
                        {mails.slice().reverse().map((mail) => (
                            <li className={`mailbox-homepage-main-ul ${mail.unread ? 'unread-mail' : ''}`} key={mail.id}>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'>
                                    <div className="email-sender">{mail.sender}</div>
                                </Link>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'>
                                    <div className="email-subject">
                                        {mail.unread === true ? "[unread] " : null}
                                        {mail.emailContent}
                                    </div>
                                </Link>
                                <Link to={`/mail/${mail.id}`} className='mail-box-homepage-link'>
                                    <div className="email-date">{mail.time}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>

            </div>
        </>
    );
}

export default MailBox;
