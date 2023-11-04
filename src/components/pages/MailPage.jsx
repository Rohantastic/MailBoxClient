import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./MailPage.css";

const MailPage = () => {
    const navigate = useNavigate();
    const goBackToMailHomePage = () => {
        navigate("/home");
    }
    const idd = useParams();
    const { id } = idd; const mail_id = id; const [mail, setMail] = useState({});

    const userName = localStorage.getItem("mailboxloggedinUser");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    const fetchMail = async (mail_id) => {
        try {
            console.log("mailID before ", mail_id);
            const response = await fetch(`https://mailboxclient-e822e-default-rtdb.firebaseio.com/mailbox/${mail_id}.json`);
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setMail(data);
                    console.log("Mail data:", data);
                } else {
                    console.error("Mail data is missing or empty.");
                }
            } else {
                console.error(`Error fetching mail. Status: ${response.status}, Status Text: ${response.statusText}`);
            }
        } catch (err) {
            console.error("An error occurred while fetching mail:", err);
        }
    }

    const readUnreadHandler = async () => {
        try {
            const response = await fetch(`https://mailboxclient-e822e-default-rtdb.firebaseio.com/mailbox/${mail_id}.json`, {
                method: "PATCH",
                body: JSON.stringify({
                    unread: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                console.log("Email status updated successfully.");
            } else {
                console.error("Error updating email status.");
            }
        } catch (err) {
            console.error("An error occurred:", err);
        }
    }
    
    const deleteMail = async () => {
    try {
        const response = await fetch(`https://mailboxclient-e822e-default-rtdb.firebaseio.com/mailbox/${mail_id}.json`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("Mail has been deleted");
        } else {
            console.error("Error deleting the mail.");
        }
        
        navigate("/home");
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

    

    useEffect(() => {
        fetchMail(mail_id);
    }, [mail_id]);

    useEffect(() => {

    }, [mail]);

    useEffect(() => {
        readUnreadHandler();
    }, []);
    return (
        <>
            <div className="gmail-homepage">
                <header>
                <div className="logo">
                        <img className="logo-img" src="/email.png" alt="Email App" />
                </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search mail" />
                    </div>
                    <div className="user-info">
                        <button className="mailbox-logout"  onClick={logout}>Log out</button>
                        <span>{userName}</span>
                    </div>
                </header>
                <nav>
                    <ul>
                        <li>Inbox</li>
                        <li>Sent Mail</li>
                        <li>Send Mail</li>
                        <li>More</li>
                    </ul>
                </nav>
            </div>

            <main>
                {mail ? (
                    <div>
                        <h2>Mail Subject: {mail.subject} 
                        <button className="mailbox-logout" onClick={goBackToMailHomePage}>Go Back</button>
                        <button className="mailbox-logout" onClick={deleteMail}>Delete</button>
                        </h2>
                        <p>From: {mail.sender}</p>
                        <p>To: {mail.receiver}</p>
                        <p>Time: {mail.time}</p>
                        <p className='mailpage-content'>Content: {mail.emailContent}</p>
                    </div>
                ) : (
                    <p>Cannot load mail</p>
                )}
            </main>
        </>
    )
}

export default MailPage;
