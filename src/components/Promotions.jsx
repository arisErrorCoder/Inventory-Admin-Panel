import React, { useState } from "react";
import "./Promotions.css";

const Promotions = () => {
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const toggleDetails = (index) => {
        setOpenRowIndex(openRowIndex === index ? null : index);
    };

    const promotions = [
        {
            startDate: "Sep 12, 2022, 12:00 AM",
            endDate: "No end date",
            recurring: "Current",
            name: "Buy Zippo Lighter Free Fluid",
            availableOn: "All outlets"
        },
        {
            startDate: "Feb 1, 2023, 12:00 AM",
            endDate: "No end date",
            recurring: "Current",
            name: "$25 Vape Juice",
            availableOn: "All outlets"
        },
        {
            startDate: "Mar 10, 2023, 12:00 AM",
            endDate: "No end date",
            recurring: "Current",
            name: "Buy two get $10 off",
            availableOn: "All outlets"
        }
    ];

    return (
        <div className="promo-container">
            <div className="promo-header">
                <h1 className="promo-title">Promotions</h1>
            </div>

            <div className="promo-tabs">
                <button className="promo-tab promo-active-tab">Current and upcoming</button>
                <button className="promo-tab">Past</button>
                <button className="promo-tab">All</button>
            </div>

            <div className="promo-actions">
                <p>Create and manage current and upcoming promotions. Need help?</p>
                <button className="promo-add-button">Add Promotion</button>
            </div>

            <div className="promo-search-bar">
                <input type="text" placeholder="Search for promotions" className="promo-search-input" />
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="promo-date-input" 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="promo-date-input" 
                />
                <button className="promo-search-button">Search</button>
            </div>

            <table className="promo-table">
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Recurring</th>
                        <th>Name</th>
                        <th>Available on</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion, index) => (
                        <React.Fragment key={index}>
                            <tr className="promo-main-row" onClick={() => toggleDetails(index)}>
                                <td className="promo-dropdown-arrow">{openRowIndex === index ? '▲' : '▼'}</td>
                                <td>{promotion.startDate}</td>
                                <td>{promotion.endDate}</td>
                                <td>{promotion.name}</td>
                                <td>{promotion.availableOn}</td>
                            </tr>
                            {openRowIndex === index && (
                                <tr className="promo-details-row">
                                    <td colSpan="6">
                                        <div className="promo-details-content">
                                            <span><strong>{promotion.name}</strong></span>
                                            <span>Available on: {promotion.availableOn}</span>
                                            <span className="promo-action-icons">
                                                <span className="promo-edit-icon">✏️</span>
                                                <span className="promo-delete-icon">🗑️</span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Promotions;
