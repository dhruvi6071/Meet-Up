import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; //To send the post request manually or only when we want use useQuery.
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../utill/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  //This function is called whenever any send request manually whne this component is run.
  const {mutate} = useMutation({

    mutationFn: createNewEvent
  });

  function handleSubmit(formData) {
    mutate({event: formData}); 
  }


  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
}
