import React from "react";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<any>;
  setSearchLocation: (location: string) => void;
  searchLocation: string;
};

const LocationSearchForm = ({ handleSubmit, setSearchLocation, searchLocation }: Props) => {
  return (
    <div className="col-md-6 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Search for a location
          </label>
          <input
            type="text"
            value={searchLocation}
            name="location"
            className="form-control"
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default LocationSearchForm;
