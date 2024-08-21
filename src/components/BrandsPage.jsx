import React, { useContext, useState } from 'react';
import './BrandsPage.css';
import { StoreContext } from './Store';

const BrandsPage = () => {
    const { brands, setBrands } = useContext(StoreContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBrandIndex, setCurrentBrandIndex] = useState(null);
    const [newBrand, setNewBrand] = useState({ name: '', description: '', products: 0 });

    const handleAddOrUpdateBrand = () => {
        if (newBrand.name.trim() && newBrand.description.trim()) {
            if (isEditing) {
                const updatedBrands = [...brands];
                updatedBrands[currentBrandIndex] = newBrand;
                setBrands(updatedBrands);
            } else {
                setBrands([...brands, newBrand]);
            }
            setNewBrand({ name: '', description: '', products: 0 });
            setIsModalOpen(false);
            setIsEditing(false);
        } else {
            alert('Please fill out both the name and description fields.');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewBrand({ name: '', description: '', products: 0 }); // Reset form fields
    };

    const handleEditBrand = (index) => {
        setIsEditing(true);
        setCurrentBrandIndex(index);
        setNewBrand(brands[index]);
        setIsModalOpen(true); // Open modal for editing
    };

    const handleDeleteBrand = (index) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            const updatedBrands = brands.filter((_, i) => i !== index);
            setBrands(updatedBrands);
        }
    };

    return (
        <div className="brands-page">
            <div className="brands-header">
                <div className="brands-title">
                    <h1>Brands</h1>
                    <p>A list of all of your brands. Need help?</p>
                </div>
                <button className="add-brand-btn" onClick={handleOpenModal}>Add Brand</button>
            </div>

            <table className="brands-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Number of products</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand, index) => (
                        <tr key={index}>
                            <td>{brand.name}</td>
                            <td>{brand.description}</td>
                            <td>{brand.products}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditBrand(index)}>
                                    <i className="fa-solid fa-pencil edit-icon"></i>
                                </button>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteBrand(index)}>
                                    <i className="fa-solid fa-trash delete-icon"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleCloseModal}>&times;</span>
                        <h2>{isEditing ? 'Edit Brand' : 'Add New Brand'}</h2>
                        <input
                            type="text"
                            placeholder="Brand Name"
                            value={newBrand.name}
                            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Brand Description"
                            value={newBrand.description}
                            onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                        />
                        <button className="add-brand-btnn" onClick={handleAddOrUpdateBrand}>
                            {isEditing ? 'Update Brand' : 'Add Brand'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandsPage;
