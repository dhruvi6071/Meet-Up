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
    queryFn: fetchEvents
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
