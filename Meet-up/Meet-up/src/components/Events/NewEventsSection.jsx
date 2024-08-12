import {useQuery} from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import {fetchEvents } from '../../utill/http.js';

export default function NewEventsSection() {
  //This hook behind the scenes sends http requests and get us this events data that we need in this section.
   const { data, isPending, isError, error, refetch } = useQuery({
    //queryKey is used to identify the unique data.
    queryKey: ['events'],
    queryFn: fetchEvents,

    //This controls after which time react query is send behind the scene request.
    staleTime: 5000, //Now it will take 5 seconds to send another request.
  
    //Garbage collection time. This controls how long the data in the cache can be kept around.
    gcTime: 30000
  
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message ||"Failed to fetch event"} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
