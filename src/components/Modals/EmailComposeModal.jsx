import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import './EmailComposeModal.css';

function EmailComposeModal({ isOpen, toggle }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [emailContent, setEmailContent] = useState('');

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setEmailContent(newEditorState.getCurrentContent().getPlainText());
  };

  const sendEmail = () => {
    console.log(emailContent);
    toggle();
  };

  return (
    <Modal className="compose-email-popup" size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <div className='modal-popup-modalheader'>
          <h4>Compose Mail</h4>
          <br/>
          <div className="custom-close-button" onClick={toggle}>
            X
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        {emailContent && (
          <Button color="primary" onClick={sendEmail}>Send Mail</Button>
        )}
      </ModalBody>
    </Modal>
  );
}

export default EmailComposeModal;
