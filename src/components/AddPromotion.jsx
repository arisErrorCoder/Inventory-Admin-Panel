import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPromotion.css";

const AddPromotion = ({ onCancel }) => {
    const [promotionType, setPromotionType] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [discountType, setDiscountType] = useState("%");
    const [productType, setProductType] = useState("all");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [noEndDate, setNoEndDate] = useState(true);
    const [isAllDay, setIsAllDay] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handlePromotionTypeChange = (e) => {
        setPromotionType(e.target.value);
    };

    const handleRecurringChange = (e) => {
        setIsRecurring(e.target.value === "recurring");
    };

    const handleNoEndDateChange = (e) => {
        setNoEndDate(e.target.checked);
        if (e.target.checked) {
            setEndDate(null); // Clear end date when "No end date" is checked
        }
    };

    const handleAllDayChange = (e) => {
        setIsAllDay(e.target.checked);
    };

    const handleProductTypeChange = (type) => {
        setProductType(type);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Filter products based on the search query
        // Example: const results = allProducts.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()));
        // setFilteredProducts(results);
    };

    return (
        <>
        <div className="add-promo-container">
            <h1 className="add-promo-title">New Promotion</h1>
            <div className="add-promo-intro">
                <p>Set special offers and discounts for your customers.</p>
                <button className="add-promo-cancel-button" onClick={onCancel}>Cancel</button>
                <button className="add-promo-save-button">Save</button>
            </div>
            <div className="add-promo-row">
                <div className="add-promo-left">
                    <div className="form-group">
                        <label htmlFor="promo-name">Promotion Name</label>
                        <input type="text" id="promo-name" placeholder="Enter promotion name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="promo-description">Description</label>
                        <textarea id="promo-description" placeholder="Enter promotion description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="promo-outlets">Outlets</label>
                        <select id="promo-outlets">
                            <option value="">Select outlets</option>
                            <option value="all">All outlets</option>
                            <option value="outlet1">Outlet 1</option>
                            <option value="outlet2">Outlet 2</option>
                        </select>
                    </div>

                    {/* Schedule Promotion Section */}
                    <div className="form-group">
                        <label>Schedule Promotion</label>
                        <select onChange={handleRecurringChange}>
                            <option value="one-time">One-time promotion</option>
                            <option value="recurring">Recurring promotion</option>
                        </select>
                    </div>



                    {/* Type of Promotion Section */}
                    <div className="form-group">
                        <label>Type of Promotion</label>
                        <select value={promotionType} onChange={handlePromotionTypeChange}>
                            <option value="basic">Basic: Offer customers a discount.</option>
                            <option value="advanced">
                                Advanced: Offer customers a discount or gift based on what they buy or how much they spend.
                            </option>
                        </select>
                    </div>


                </div>
                <div className="add-promo-right">
                    <h2>Preview</h2>
                    <p><strong>Promotion Name:</strong></p>
                    <p><strong>Description:</strong>The name and description will be shown to employees and customers to identify and explain the promotion.</p>
                    <p><strong>Schedule:</strong> {isRecurring ? "Recurring" : "One-time"}</p>
                    <p><strong>Type:</strong> {promotionType === "basic" ? "Basic" : "Advanced"}</p>
                    {isRecurring ? (
                        <div className="form-group schedule-promotion-container">
                            <label htmlFor="promo-repeat">Repeat</label>
                            <select id="promo-repeat">
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                            <div className="time-input-group">
                                <label>From:</label>
                                <input type="time" disabled={isAllDay} />
                                <label>To:</label>
                                <input type="time" disabled={isAllDay} />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isAllDay}
                                        onChange={handleAllDayChange}
                                    /> All Day
                                </label>
                            </div>
                            <div className="form-group">
                            <label>From Date:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Select start date"
                                dateFormat="MM/dd/yyyy"
                                className="date-picker"
                            />
                            <label>To Date:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="Select end date"
                                dateFormat="MM/dd/yyyy"
                                className="date-picker"
                                disabled={noEndDate}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={noEndDate}
                                    onChange={handleNoEndDateChange}
                                /> No end date
                            </label>
                        </div>
                        </div>
                    ) : (
                        <div className="form-group schedule-promotion-container">
                            <label>From Date:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Select start date"
                                dateFormat="MM/dd/yyyy"
                                className="date-picker"
                            />
                            <label>To Date:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="Select end date"
                                dateFormat="MM/dd/yyyy"
                                className="date-picker"
                                disabled={noEndDate}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={noEndDate}
                                    onChange={handleNoEndDateChange}
                                /> No end date
                            </label>
                        </div>
                    )}
                </div>
            </div>
                                {/* Discount Details for Basic Promotion */}
                                {promotionType === "basic" && (
                        <div className="discount-details">
                            <label>Get</label>
                            <div className="discount-options">
                                <div className="discount-group">
                                    <label>Discount</label>
                                    <div className="discount-type-buttons">
                                        <button
                                            className={discountType === "%" ? "selected" : ""}
                                            onClick={() => setDiscountType("%")}
                                        >
                                            %
                                        </button>
                                        <button
                                            className={discountType === "$" ? "selected" : ""}
                                            onClick={() => setDiscountType("$")}
                                        >
                                            $
                                        </button>
                                    </div>
                                </div>
                                <input type="number" placeholder="0.00" className="discount-input" />
                                <span>{discountType}</span>
                                <div className="product-group">
                                    <label>Product</label>
                                    <div className="product-type-buttons">
                                        <button
                                            className={productType === "all" ? "selected" : ""}
                                            onClick={() => handleProductTypeChange("all")}
                                        >
                                            All
                                        </button>
                                        <button
                                            className={productType === "specific" ? "selected" : ""}
                                            onClick={() => handleProductTypeChange("specific")}
                                        >
                                            Specific
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {productType === "specific" && (
                        <div className="product-search">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            {/* Optionally, display filtered products based on the search query */}
                            <div className="product-results">
                                {/* Example of displaying filtered products */}
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="product-item">
                                        {product.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
        </div>
        </>
    );
};

export default AddPromotion;
