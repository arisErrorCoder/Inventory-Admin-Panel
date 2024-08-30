import React, { useState } from 'react';
import './ProductTags.css';

const ProductTags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: '0mg', productCount: 0 },
    { id: 2, name: '1.3ML', productCount: 0 },
    { id: 3, name: '100ml', productCount: 13 },
    { id: 4, name: '10ml', productCount: 2 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState({ id: null, name: '' });
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => {
    setIsEditing(false);
    setCurrentTag({ id: null, name: '' });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    setCurrentTag({ ...currentTag, name: e.target.value });
  };

  const saveTag = () => {
    if (currentTag.name.trim() !== '') {
      if (isEditing) {
        setTags(
          tags.map((tag) =>
            tag.id === currentTag.id ? { ...tag, name: currentTag.name } : tag
          )
        );
      } else {
        const newTag = {
          id: tags.length + 1,
          name: currentTag.name,
          productCount: 0,
        };
        setTags([...tags, newTag]);
      }
      closeModal();
    }
  };

  const editTag = (tag) => {
    setIsEditing(true);
    setCurrentTag(tag);
    setModalVisible(true);
  };

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="product-tags-container">
      <h1 className="product-tags-title">Product tags</h1>
      <p className="product-tags-description">
        A list of all of your product tags. <a href="#">Need help?</a>
      </p>
      <button className="product-tags-add-btn" onClick={openModal}>
        Add tag
      </button>
      <table className="product-tags-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>{tag.productCount}</td>
              <td>
                <a href="#" className="product-tags-view-link">
                  View products
                </a>
                <span
                  className="product-tags-edit-icon"
                  onClick={() => editTag(tag)}
                >
                  &#9998;
                </span>
                <span
                  className="product-tags-delete-icon"
                  onClick={() => deleteTag(tag.id)}
                >
                  &#128465;
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="product-tags-modal" onClick={closeModal}>
          <div
            className="product-tags-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="product-tags-close-icon" onClick={closeModal}>
              &times;
            </span>
            <h2>{isEditing ? 'Edit' : 'Add'} product tag</h2>
            <input
              type="text"
              value={currentTag.name}
              onChange={handleInputChange}
              placeholder="Enter a tag name"
              className="product-tags-input"
            />
            <button className="product-tags-save-btn" onClick={saveTag}>
              {isEditing ? 'Update' : 'Add'} tag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTags;
