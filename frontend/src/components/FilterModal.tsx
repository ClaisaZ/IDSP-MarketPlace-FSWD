import { useState } from "react";

type FilterValues = {
  location: string;
  date: string;
  minPrice: number;
  maxPrice: number;
};

type Props = {
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  initialValues: FilterValues;
};

export default function FilterModal({ onClose, onApply, initialValues }: Props) {
  const [location, setLocation] = useState(initialValues.location);
  const [date, setDate] = useState(initialValues.date);
  const [minPrice, setMinPrice] = useState(initialValues.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialValues.maxPrice);

  const handleApply = () => {
    onApply({ location, date, minPrice, maxPrice });
    onClose();
  };

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="filter-header">
          <h2 className="filter-title">Filter</h2>
          <button className="filter-close" onClick={onClose}>✕</button>
        </div>

        <div className="filter-field">
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Date</label>
          <input
            type="date"
            className="filter-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Price Range</label>
          <div className="filter-price-row">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="filter-range"
          />
          <input
            type="range"
            min={0}
            max={200}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="filter-range"
          />
        </div>

        <button className="primary-button" onClick={handleApply}>
          Apply
        </button>

      </div>
    </div>
  );
}