import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import './EmailComposeModal.css';

function EmailComposeModal({ isOpen, toggle }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [emailContent, setEmailContent] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setEmailContent(newEditorState.getCurrentContent().getPlainText());
  };

  const currentTimeAndDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();


    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();


    const currentDateTime = `${hours}:${minutes}:${seconds} ${year}-${month}-${day}`;

    return currentDateTime ;

  }
  const sendEmail = async (e) => {
    e.preventDefault();

    console.log("Recipient Email:", recipientEmail);
    console.log("Email Content:", emailContent);

    try {
      const response = await fetch("https://mailboxclient-e822e-default-rtdb.firebaseio.com/mailbox.json", {
        method: "POST",
        body: JSON.stringify({
          emailContent: emailContent,
          sender: localStorage.getItem("mailboxloggedinUser") || "rohantastic22@gmail.com",
          receiver: recipientEmail,
          time: currentTimeAndDate()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert("mail sent !");
        console.log("Mail Sent ");

      } else {
        const errorData = await response.json();
        console.error("Error sending expense data to Firebase: " + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
    toggle();
  };

  return (
    <Modal className="compose-email-popup" size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <div className='modal-popup-modalheader'>
          <h4>Compose Mail</h4>
          <div className="custom-close-button" onClick={toggle}>
            X
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <Input className='recipient-input-box'
          type="email"
          placeholder="Recipient's Email Address"
          value={recipientEmail}
          required
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <Button color="primary" onClick={sendEmail}>Send Mail</Button>
      </ModalBody>
    </Modal>
  );
}

export default EmailComposeModal;
