import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../utill/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  // Differnece between isLoading and isPending is that isLoading will not be true if this query is disabled.

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],

    //Make sure to pass an object which is provided to http in the section.
    queryFn: ({signal}) => fetchEvents({signal,searchTerm}),

    //In react query if we don't want to send the request then only add enable option if it is true then request is sent and if false then it is not sent.
    enabled: searchTerm !== undefined //Only when user send something including the blank space then it will show the full display.

  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Failed to fetch"}
      />
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {/* <p>Please enter a search term and to find events.</p> */}
      {content}
    </section>
  );
}
