import React, { useContext, useState } from 'react';
import './ProductCategoriesPage.css';
import { StoreContext } from './Store';

const ProductCategoriesPage = () => {
    const { categories, setCategories } = useContext(StoreContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', products: 0 });

    const handleAddOrUpdateCategory = () => {
        if (newCategory.name.trim()) {
            if (isEditing) {
                const updatedCategories = [...categories];
                updatedCategories[currentCategoryIndex] = newCategory;
                setCategories(updatedCategories);
            } else {
                setCategories([...categories, newCategory]);
            }
            setNewCategory({ name: '', products: 0 });
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
        setNewCategory({ name: '', products: 0 }); // Reset form fields
    };

    const handleEditCategory = (index) => {
        setIsEditing(true);
        setCurrentCategoryIndex(index);
        setNewCategory(categories[index]);
        setIsModalOpen(true); // Open modal for editing
    };

    const handleDeleteCategory = (index) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            const updatedCategories = categories.filter((_, i) => i !== index);
            setCategories(updatedCategories);
        }
    };

    return (
        <div className="categories-page">
            <div className="categories-header">
                <div className="categories-title">
                    <h1>Product Categories</h1>
                    <p>A list of all your product categories. Need help?</p>
                </div>
                <button className="add-category-btn" onClick={handleOpenModal}>Add Category</button>
            </div>

            <table className="categories-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of Products</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td>{category.name}</td>
                            <td>{category.products}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditCategory(index)}>
                                    <i className="fa-solid fa-pencil edit-icon"></i>
                                </button>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteCategory(index)}>
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
                        <h2>{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <button className="add-category-btnn" onClick={handleAddOrUpdateCategory}>
                            {isEditing ? 'Update Category' : 'Add Category'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCategoriesPage;
