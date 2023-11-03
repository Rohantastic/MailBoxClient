import React, { useState } from 'react';
import "./MailBox.css";
import EmailComposeModal from '../Modals/EmailComposeModal';

function MailBox() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <div className="div">
                <EmailComposeModal isOpen={modal} toggle={toggleModal} />
            </div>
            <div className="gmail-homepage">
                <header>
                    <div className="logo">
                        <img src="gmail-logo.png" alt="Gmail Logo" />
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search mail" />
                    </div>
                    <div className="user-info">
                        <button> Log out</button>
                        <span>John Doe</span>
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
                <main>
                    {/* Email list and content will go here */}
                </main>
            </div>

        </>
    );
}

export default MailBox;
