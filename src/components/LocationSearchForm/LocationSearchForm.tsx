import React from "react";
import styled from "styled-components";
import { RoundedButton } from "../RoundedButton/RoundedButton";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<any>;
  setSearchLocation: (location: string) => void;
  searchLocation: string;
};

const LocationSearchForm = ({
  handleSubmit,
  setSearchLocation,
  searchLocation,
}: Props) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <label htmlFor="location">Search for a location</label>
        <input
          type="text"
          value={searchLocation}
          name="location"
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </FormGroup>
      <RoundedButton type="submit" bgColor="green" color="white">
        Search
      </RoundedButton>
    </form>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LocationSearchForm;
