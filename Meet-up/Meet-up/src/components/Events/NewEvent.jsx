import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; //To send the post request manually or only when we want use useQuery.
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../utill/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import {queryClient} from '../../utill/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  //This function is called whenever any send request manually whne this component is run.
  const {mutate, isPending, isError, error} = useMutation({

    mutationFn: createNewEvent,
    onSuccess: () => { //This function will be executed once the mutation is suceeded.
      queryClient.invalidateQueries({queryKey: ['events'], exact: true}); //This will tell react that data fetched by some queries are outdated now.
      //for above code it will invalidate all the data with the key events. 

      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({event: formData}); 
    // navigate('/events'); //we can use navigate too to go on the events main page but if we use that and mutation failed though we cannot see it because navigate will directly send user to events page.
  }


  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        )}
        
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info ?.message || 'Failed to create event. Please check your input and try again laler'} />}
    </Modal>
  );
}
