import React, { useContext, useState } from 'react';
import { StoreContext } from './Store';
import './SuppliersPage.css';

const SuppliersPage = () => {
    const { suppliers, setSuppliers } = useContext(StoreContext);
    const [newSupplier, setNewSupplier] = useState({ name: '', products: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSupplierIndex, setCurrentSupplierIndex] = useState(null);

    const handleAddOrUpdateSupplier = () => {
        if (newSupplier.name.trim()) {
            if (isEditing) {
                const updatedSuppliers = [...suppliers];
                updatedSuppliers[currentSupplierIndex] = newSupplier;
                setSuppliers(updatedSuppliers);
            } else {
                setSuppliers([...suppliers, newSupplier]);
            }
            setNewSupplier({ name: '', products: 0 });
            setIsModalOpen(false);
            setIsEditing(false);
        } else {
            alert('Please fill out the name field.');
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setNewSupplier({ name: '', products: 0 });
    };

    const handleEditSupplier = (index) => {
        setIsEditing(true);
        setCurrentSupplierIndex(index);
        setNewSupplier(suppliers[index]);
        setIsModalOpen(true);
    };

    const handleDeleteSupplier = (index) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            const updatedSuppliers = suppliers.filter((_, i) => i !== index);
            setSuppliers(updatedSuppliers);
        }
    };

    return (
        <div className="suppliers-page">
            <div className="suppliers-header">
                <div className="suppliers-title">
                    <h1>Suppliers</h1>
                    <p>A list of all your suppliers. Need help?</p>
                </div>
                <button className="add-supplier-btn" onClick={handleOpenModal}>Add Supplier</button>
            </div>

            <table className="suppliers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of Products</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.name}</td>
                            <td>{supplier.products}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditSupplier(index)}>
                                    <i className="fa-solid fa-pencil edit-icon"></i>
                                </button>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteSupplier(index)}>
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
                        <h2>{isEditing ? 'Edit Supplier' : 'Add New Supplier'}</h2>
                        <input
                            type="text"
                            placeholder="Supplier Name"
                            value={newSupplier.name}
                            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                        />
                        <button className="add-supplier-btnn" onClick={handleAddOrUpdateSupplier}>
                            {isEditing ? 'Update Supplier' : 'Add Supplier'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuppliersPage;
