import React, { useContext, useEffect, useState } from 'react';
import './AddProductPage.css';
import SupplierInfo from './SupplierInfo';
import { StoreContext} from './Store';

const AddProductPage = ({handleBackToProducts}) => {
  const {categories, setCategories,brands, setBrands,} = useContext(StoreContext)
  const [productName, setProductName] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showBrandDetails, setShowBrandDetails] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [sellInStore, setSellInStore] = useState(false);
  const [sellOnline, setSellOnline] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState();
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('Standard');
  const [skuCodeType, setSkuCodeType] = useState('custom');
  const [skuCode, setSkuCode] = useState('14529');
  const [generatedSkuCode, setGeneratedSkuCode] = useState(''); // Auto-generated SKU code
  const [supplyPrice, setSupplyPrice] = useState('0');
  const [markup, setMarkup] = useState('0');
  const [margin, setMargin] = useState('0');



  const updatedProductData = (key, value) => {
    setProductData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  

  // Handle Name Change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    updatedProductData('productName', value);
  };

  // Handle Name Change
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    updatedProductData('description', value);
  };
  const handlecategoryChange = (e) => {
    const value = e.target.value;
    setSelectedBrand(value);
    updatedProductData('selectedBrand', value);
  };



  const [productData, setProductData] = useState({
    productName: '',
            selectedCategory: '',
            selectedBrand: '',
            description: '',
            tags: [],
            images: [],
            sellInStore: false,
            sellOnline: false,
            skuCode: '',
            skuCodeType: 'custom',  
            markup: '',
            margin: '',
            tax: '',
            suppliers: [{ name: '', code: '', price: '' }],
  });

// Handle Save
const handleSave = () => {
  // Ensure all required fields are filled
  if (
    productName &&
    selectedCategory &&
    selectedBrand
  )
   {
    // Update the productData state with current form values
    const updatedProductData = {
      ...productData,
      productName,
      selectedCategory,
      selectedBrand,
      description,
      tags,
      images,
      sellInStore,
      sellOnline,
      skuCode,
      skuCodeType,
      markup,
      margin,
      tax,
      // suppliers: suppliers.map(supplier => ({
      //   ...supplier,
      //   name: supplier.name || '', // Ensure supplier name is not empty
      //   code: supplier.code || '', // Ensure supplier code is not empty
      //   price: supplier.price || '' // Ensure supplier price is not empty
      // }))
    };

    // Print the updated product data to console (for debugging)
    console.log('Product Data Saved:', updatedProductData);

    // You can send updatedProductData to your backend here
    // Example: axios.post('/api/products', updatedProductData);

    // Show success message
    alert(`Product Saved:\nName: ${productName}\nCategory: ${selectedCategory}\nBrand: ${selectedBrand}`);

    // Reset form fields and productData state
    setProductName('');
    setDescription('');
    setSelectedCategory('');
    setSelectedBrand('');
    setTags([]);
    setImages([]);
    setSellInStore(false);
    setSellOnline(false);
    setProductData({
      productName: '',
      selectedCategory: '',
      selectedBrand: '',
      description: '',
      tags: [],
      images: [],
      sellInStore: false,
      sellOnline: false,
      skuCode: '',
      skuCodeType: 'custom',
      markup: '',
      margin: '',
      tax: '',
      // suppliers: [{ name: '', code: '', price: '' }]
    });

  } else {
    alert('Please fill in all required fields.');
  }
};

useEffect(() => {
console.log(productData)
console.log(tags)
console.log(images)
console.log(selectedBrand)
console.log(selectedCategory)
console.log(searchTerm)
// console.log(updatedProductData)
}, [productData,tags,selectedBrand,selectedCategory,searchTerm])


  const [suppliers, setSuppliers] = useState([{ name: '', code: '', price: '' }]);
    // State for supply price, markup, margin, and tax
    const [tax, setTax] = useState('');

    // Parse input to remove leading zeros and handle empty values
    const parseInput = (value) => {
        if (value.trim() === '') return '';
        return parseFloat(value.replace(/^0+/, '') || '0');
    };

    // Calculate retail price including tax
 // Calculate Retail Price Including Tax
 const calculateRetailPrice = () => {
  const supply = parseFloat(supplyPrice) || 0;
  const markupPercent = parseFloat(markup) || 0;
  const marginPercent = parseFloat(margin) || 0;
  const taxPercent = parseFloat(tax) || 0;

  const markupAmount = (supply * markupPercent) / 100;
  const totalPriceWithMarkup = supply + markupAmount;
  const marginAmount = (totalPriceWithMarkup * marginPercent) / 100;
  const priceBeforeTax = totalPriceWithMarkup + marginAmount;
  const taxAmount = (priceBeforeTax * taxPercent) / 100;

  return (priceBeforeTax + taxAmount).toFixed(2);
};

// Handle Input Changes and Update Product Data
const handleSupplyPriceChange = (e) => {
  const value = e.target.value;
  setSupplyPrice(value);
  updatedProductData('supplyPrice', value);
};

const handleMarkupChange = (e) => {
  const value = e.target.value;
  setMarkup(value);
  updatedProductData('markup', value);
};

const handleMarginChange = (e) => {
  const value = e.target.value;
  setMargin(value);
  updatedProductData('margin', value);
};

const handleTaxChange = (e) => {
  const value = e.target.value;
  setTax(value);
  updatedProductData('tax', value);
};
  const handleSuppliersChange = (newSuppliers) => {
    setSuppliers(newSuppliers);
  };



  const toggleSupplierSection = () => setShowSupplierDetails(prev => !prev);
  const toggleCategorySection = () => setShowCategoryDetails(prev => !prev);
  const toggleBrandSection = () => setShowBrandDetails(prev => !prev);

  const selectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierDetails(false);
  };

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryDetails(false); // Close the category details dropdown after selection
    updatedProductData('selectedCategory', categoryName); // Send the selected category to parent component
  };

  const selectBrand = (brandName) => {
    setSelectedBrand(brandName);
    setShowBrandDetails(false); // Close the brand details dropdown after selection
    updatedProductData('selectedBrand', brandName); // Send the selected brand to parent component
  };

  const showAddPopup = (type) => setShowPopup(type);
  const closeAddPopup = () => setShowPopup(null);
  
  const filterItems = (type, e) => {
  const searchValue = e.target.value.toLowerCase();
  setSearchTerm(searchValue);
  
    if (type === 'supplier') {
      setFilteredSuppliers(
        suppliers.filter(supplier =>
          supplier.name.toLowerCase().includes(searchValue)
        )
      );
    } else if (type === 'category') {
      setFilteredCategories(
        categories.filter(category =>
          category.name.toLowerCase().includes(searchValue)
        )
      );
    } else if (type === 'brand') {
      setFilteredBrands(
        brands.filter(brand =>
          brand.name.toLowerCase().includes(searchValue)
        )
      );
    }
  };
  
  const addNewBrand = () => {
    if (newBrandName.trim()) {
      const updatedBrands = [...brands, { name: newBrandName, description: '', products: 0 }];
      setBrands(updatedBrands);
      setFilteredBrands(updatedBrands);
      setSelectedBrand(newBrandName);
      closeAddPopup();
      setNewBrandName('');
      setShowBrandDetails(false);
    } else {
      alert('Please enter a brand name.');
    }
  };
  
  const addNewCategory = () => {
    if (newCategoryName.trim()) {
      const updatedCategories = [...categories, { name: newCategoryName, products: 0 }];
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      setSelectedCategory(newCategoryName);
      closeAddPopup();
      setNewCategoryName('');
      setShowCategoryDetails(false);
    } else {
      alert('Please enter a category name.');
    }
  };
  
  
  const handleProductTypeChange = (type) => setSelectedProductType(type);
  const handleSkuCodeTypeChange = (e) => {
    const value = e.target.value;
    setSkuCodeType(value);
    if (value === 'auto') {
      generateSkuCode();
    } else {
      setSkuCode(''); // Clear SKU code when switching to custom
    }
    updatedProductData('skuCodeType', value); // Notify parent component
  };

  // Handle SKU code generation
  const generateSkuCode = () => {
    const newSkuCode = `${Math.floor(Math.random() * 10000)}`;
    setGeneratedSkuCode(newSkuCode);
    updatedProductData('skuCode', newSkuCode);
  };

  // const handleBrowse = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...newImages]);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const files = Array.from(e.dataTransfer.files);
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...newImages]);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleReorder = (e) => {
  //   e.preventDefault();
  //   const draggedImage = e.dataTransfer.getData('text/plain');
  //   const targetIndex = Number(e.currentTarget.dataset.index);
  //   setImages((prevImages) => {
  //     const reorderedImages = [...prevImages];
  //     const draggedIndex = prevImages.indexOf(draggedImage);
  //     reorderedImages.splice(draggedIndex, 1);
  //     reorderedImages.splice(targetIndex, 0, draggedImage);
  //     return reorderedImages;
  //   });
  // };

  // const handleRemoveImage = (indexToRemove) => {
  //   setImages((prevImages) =>
  //     prevImages.filter((_, index) => index !== indexToRemove)
  //   );
  // };
   // Handle file input change
   const handleBrowse = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
    updatedProductData('images', [...images, ...newImages]); // Send updated images to parent component
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
    updatedProductData('images', [...images, ...newImages]); // Send updated images to parent component
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    updatedProductData('images', updatedImages); // Send updated images to parent component
  };

  // Handle image reordering
  const handleReorder = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const targetIndex = parseInt(e.target.dataset.index, 10);

    if (draggedIndex !== targetIndex) {
      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, movedImage);

      setImages(updatedImages);
      updatedProductData('images', updatedImages); // Send updated images to parent component
    }
  };
  const addNewSupplier = () => {
    setFilteredSuppliers([...filteredSuppliers, newSupplierName]);
    setNewSupplierName('');
    closeAddPopup();
  };

  const handleSupplierChange = (index, field, value) => {
    const updatedSuppliers = suppliers.map((supplier, i) =>
      i === index ? { ...supplier, [field]: value } : supplier
    );
    setSuppliers(updatedSuppliers);
  };

  const addSupplierRow = () => {
    setSuppliers([...suppliers, { name: '', code: '', price: '' }]);
  };

  const deleteSupplierRow = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };





  // Tag handling
  // const handleTagKeyPress = (e) => {
  //   if (e.key === 'Enter' && e.target.value.trim() !== '') {
  //     e.preventDefault();
  //     addTag(e.target.value);
  //     e.target.value = '';
  //   }
  // };

  // const addTag = (value) => {
  //   if (!tags.includes(value)) {
  //     setTags([...tags, value]);
  //   }
  // };

  // const removeTag = (value) => {
  //   setTags(tags.filter(tag => tag !== value));
  // };

    // Tag handling
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      const tag = e.target.value.trim();
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        updatedProductData('tags', [...tags, tag]); // Send updated tags to parent component
      }
      e.target.value = ''; // Clear input box
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    updatedProductData('tags', updatedTags); // Send updated tags to parent component
  };

  // Handle checkbox changes
  const handleSellInStoreChange = (e) => {
    const value = e.target.checked;
    setSellInStore(value);
    updatedProductData('sellInStore', value); // Send updated data to parent component
  };

  const handleSellOnlineChange = (e) => {
    const value = e.target.checked;
    setSellOnline(value);
    updatedProductData('sellOnline', value); // Send updated data to parent component
  };



  const [attributes, setAttributes] = useState([]);
  const [currentAttribute, setCurrentAttribute] = useState("flavour");
  const [valueInput, setValueInput] = useState("");

  const handleValueKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = valueInput.trim();
      if (value) {
        addValueToCurrentAttribute(value);
        setValueInput("");
      }
    }
  };

  const addValueToCurrentAttribute = (value) => {
    setAttributes((prevAttributes) => {
      const attributeIndex = prevAttributes.findIndex(
        (attr) => attr.name === currentAttribute
      );

      if (attributeIndex === -1) {
        return [
          ...prevAttributes,
          { name: currentAttribute, values: [value] },
        ];
      }

      const updatedAttributes = [...prevAttributes];
      if (!updatedAttributes[attributeIndex].values.includes(value)) {
        updatedAttributes[attributeIndex].values.push(value);
      }

      return updatedAttributes;
    });
  };

  const handleDeleteTag = (attributeName, value) => {
    setAttributes((prevAttributes) => {
      const updatedAttributes = prevAttributes.map((attr) => {
        if (attr.name === attributeName) {
          return {
            ...attr,
            values: attr.values.filter((val) => val !== value),
          };
        }
        return attr;
      });

      return updatedAttributes.filter((attr) => attr.values.length > 0);
    });
  };

  const generateVariants = () => {
    if (attributes.length === 0) return [];

    const singleAttribute = attributes.length === 1;
    if (singleAttribute) {
      return attributes[0].values.map((value) => ({
        name: `${attributes[0].name}: ${value}`,
      }));
    } else {
      return cartesianProduct(attributes.map((attr) => attr.values)).map(
        (variant) => ({
          name: variant.join(" / "),
        })
      );
    }
  };

  const cartesianProduct = (arr) =>
    arr.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => [d, e].flat()))
    );

  const handleAddNewAttributeRow = () => {
    setAttributes((prevAttributes) => [
      ...prevAttributes,
      { name: "new", values: [] },
    ]);
  };

  useEffect(() => {
    // Update the variants table whenever attributes change
    generateVariants();
  }, [attributes]);





  return (
    <div className="add-product">
      <h1> <span className="arrow"><i class="fa-solid fa-arrow-left"></i></span> New Product</h1>
      <div className="subtitle">
          <span>Add, view, and edit your products all in one place. Need help?</span>
          <div className="button-group">
            <button className="cancel-button" onClick={handleBackToProducts}>Cancel</button>
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      <div className="row">
      <div className="form-group">
        <label htmlFor="product-name">Product Name:</label>
        <input
          id="product-name"
          type="text"
          value={productName}
          onChange={handleNameChange}
          placeholder="Enter product name"
        />
      </div>


      <div className="form-group">
        <label>Category:</label>
        <div className="category-container">
          <div className="category-summary" onClick={toggleCategorySection}>
            <p id="selected-category-text">{selectedCategory || 'Select Category'}</p>
            <button>{showCategoryDetails ? '▲' : '▼'}</button>
          </div>

          {showCategoryDetails && (
            <div id="category-details" className="category-details">
              <input
                type="text"
                placeholder="Search category..."
                className="search-category"
                onChange={(e) => filterItems('category', e)}
                value={searchTerm}
              />
              <ul id="category-list" className="category-list">
                {filteredCategories.map((category, index) => (
                  <li
                    key={index}
                    className="category-item"
                    onClick={() => selectCategory(category.name)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>

              {filteredCategories.length === 0 && searchTerm && (
                <button
                  id="add-new-category"
                  className="add-new-category"
                  onClick={() => showAddPopup('category')}
                >
                  + Add New Category
                </button>
              )}
            </div>
          )}

          {showPopup === 'category' && (
            <div id="add-category-popup" className="popup">
              <div className="popup-content">
                <span className="close-popup" onClick={closeAddPopup}>
                  &times;
                </span>
                <h3>Add New Category</h3>
                <input
                  type="text"
                  id="new-category-input"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={addNewCategory}>Add Category</button>
              </div>
            </div>
          )}
        </div>
      </div>



       <div className="form-group">
  <label>Brand:</label>
  <div className="brand-container">
    <div className="brand-summary" onClick={toggleBrandSection}>
      <p id="selected-brand-text">{selectedBrand || 'Select Brand'}</p>
      <button>{showBrandDetails ? '▲' : '▼'}</button>
    </div>

    {showBrandDetails && (
      <div id="brand-details" className="brand-details">
        <input
          type="text"
          placeholder="Search brand..."
          className="search-brand"
          onChange={(e) => filterItems('brand', e)}
          value={searchTerm}
        />
        <ul id="brand-list" className="brand-list">
          {filteredBrands.map((brand, index) => (
            <li
              key={index}
              className="brand-item"
              onClick={() => selectBrand(brand.name)}
            >
              {brand.name}
            </li>
          ))}
        </ul>

        {filteredBrands.length === 0 && searchTerm && (
          <button
            id="add-new-brand"
            className="add-new-brand"
            onClick={() => showAddPopup('brand')}
          >
            + Add New Brand
          </button>
        )}
      </div>
    )}

    {showPopup === 'brand' && (
      <div id="add-brand-popup" className="popup">
        <div className="popup-content">
          <span className="close-popup" onClick={closeAddPopup}>
            &times;
          </span>
          <h3>Add New Brand</h3>
          <input
            type="text"
            id="new-brand-input"
            placeholder="Enter brand name"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
          <button onClick={addNewBrand}>Add Brand</button>
        </div>
      </div>
    )}
  </div>
</div>

       </div>
      <div className="form-group">
       <label>Description:</label>
        <textarea
          value={description}
          // onChange={(e) => setDescription(e.target.value)}
          onChange={handleDescriptionChange}
          placeholder="Enter product description"
        />
      </div>
      
      <div className="form-group">
        <label>Tags:</label>
        <div className="input-container">
          <div className="input-wrapper" id="input-wrapper">
            <input
              type="text"
              id="input-box"
              placeholder="Type a tag and press Enter..."
              onKeyPress={handleTagKeyPress}
            />
            {tags.map((tag, index) => (
              <span key={index} className="chip">
                {tag}
                <span className="delete-chip" onClick={() => removeTag(tag)}>×</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Upload Images:</label>
        <div
          id="drop-area"
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag images here to upload</p>
          <p>Drag and drop to reorder</p>
          <p>Drag outside to delete</p>
          <input
            type="file"
            id="image-upload"
            className="image-upload-input"
            multiple
            accept="image/*"
            onChange={handleBrowse}
          />
          <label htmlFor="image-upload" className="choose-images-button">
            Choose images
          </label>
        </div>
        <div className="image-preview">
          {images.map((image, index) => (
            <div
              key={index}
              className="image-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', image)}
              onDrop={(e) => handleReorder(e)}
              data-index={index}
            >
              <img src={image} alt={`Preview ${index}`} />
              <button
                onClick={() => handleRemoveImage(index)}
                className="remove-image-button"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        </div>
      
        <div className="form-group">
      <div className="row image-preview">
        <label>
          <input
            type="checkbox"
            checked={sellInStore}
            onChange={handleSellInStoreChange}
          />
          Sell on point-of-sale
        </label>
        <label>
          <input
            type="checkbox"
            checked={sellOnline}
            onChange={handleSellOnlineChange}
          />
          Sell online
        </label>
      </div>
    </div>
      <div className="inventory-section">
        <h2>Inventory</h2>
        <div className="inventory-options">
          <div
            className={`inventory-option ${selectedProductType === 'Standard' ? 'selected' : ''}`}
            onClick={() => handleProductTypeChange('Standard')}
          >
            <h3 style={{textAlign:"center"}}>Standard Product</h3>
            {/* <p>This product is a single SKU with its own inventory.</p> */}
          </div>
          <div
            className={`inventory-option ${selectedProductType === 'Variant' ? 'selected' : ''}`}
            onClick={() => handleProductTypeChange('Variant')}
          >
            <h3 style={{textAlign:"center"}}>Variant Product</h3>
            {/* <p>This is a group of similar products with different attributes like size or color. Each variant is a unique SKU with its own inventory.</p> */}
          </div>
        </div>
      </div>

      {selectedProductType === 'Standard' && (
        <>
 <div className="sku-container">
      <h2>SKU CODES</h2>
      <div className="sku-inputs">
        <div className="sku-field">
          <label htmlFor="sku-code-type">SKU Code Type:</label>
          <select
            id="sku-code-type"
            value={skuCodeType}
            onChange={handleSkuCodeTypeChange}
          >
            <option value="custom">Custom</option>
            <option value="auto">Auto-Generated</option>
          </select>
        </div>
        <div className="sku-field">
          <label htmlFor="sku-code">SKU Code:</label>
          <input
            type="text"
            id="sku-code"
            value={skuCodeType === 'auto' ? generatedSkuCode : skuCode}
            onChange={(e) => setSkuCode(e.target.value)}
            placeholder="Enter SKU code"
            readOnly={skuCodeType === 'auto'}
          />
        </div>
      </div>
      <a href="#" className="add-code">+ Add another code</a>

      <div className="sku-preview">
        <div className="preview-image">
          {images.length > 0 && <img src={images[0]} alt="Preview" />}
        </div>
        <div className="preview-details">
          <p className="product-name">{productName || 'Product Name'}</p>
          <p className="sku-number">{skuCodeType === 'auto' ? generatedSkuCode : skuCode}</p>
          {/* <p className="sku-description">
            The first SKU code will be shown to staff and customers to help identify this product. When you have multiple codes all the barcodes will be scannable.
          </p> */}
        </div>
      </div>
    </div>
      <SupplierInfo suppliers={suppliers} onSuppliersChange={handleSuppliersChange} />
</>

      )}
            {selectedProductType === 'Variant' && (
           <>
      <SupplierInfo suppliers={suppliers} onSuppliersChange={handleSuppliersChange} />
      
      <div className="variants-container">
      {attributes.map((attribute, index) => (
        <div key={index} className="variant-row">
          <div className="attribute">
            <label htmlFor={`attribute-${index}`}>Attribute</label>
            <select
              id={`attribute-${index}`}
              value={attribute.name}
              onChange={(e) =>
                setAttributes((prevAttributes) => {
                  const updatedAttributes = [...prevAttributes];
                  updatedAttributes[index].name = e.target.value;
                  return updatedAttributes;
                })
              }
            >
              <option value="flavour">Flavour</option>
              <option value="quantity">Quantity</option>
              {/* Add more attribute options as needed */}
            </select>
          </div>

          <div className="value">
            <label htmlFor={`valueInput-${index}`}>Value</label>
            <div className="value-tags">
              {attribute.values.map((value, valueIndex) => (
                <span key={valueIndex} className="tag">
                  {value}{" "}
                  <i
                    className="fa fa-times"
                    onClick={() =>
                      handleDeleteTag(attribute.name, value)
                    }
                  ></i>
                </span>
              ))}
            </div>
            <input
              id={`valueInput-${index}`}
              type="text"
              placeholder="Add a value and press enter"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              onKeyPress={handleValueKeyPress}
            />
          </div>
        </div>
      ))}

      <button className="add-attribute" onClick={handleAddNewAttributeRow}>
        Add New Attribute
      </button>

      <table id="variantsTable">
        <thead>
          <tr>
            <th>Variant</th>
            <th>SKU</th>
            <th>Code</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {generateVariants().map((variant, index) => (
            <tr key={index}>
              <td>{variant.name}</td>
              <td>
                <input
                  type="text"
                  value={`SKU-${Math.random().toString(36).substr(2, 5)}`}
                />
              </td>
              <td>
                <input type="text" placeholder="Enter code" />
              </td>
              <td>
                <input type="number" defaultValue="0.00" />
              </td>
                </tr>

))}
      </tbody>
      </table>
      </div>


      
      <div class="tax-info">
    <h2>Tax Information</h2>

    <div class="form-group">
        <label for="tax">Tax</label>
        <select id="tax" class="form-control">
            <option>Default Sales Tax</option>
            <option>GST (+15%)</option>
            <option>No Tax (0%)</option>
        </select>
    </div>
      </div>


      <div className="price-section">
      <h2>Price</h2>
      <h3 className="section-title">PRICE</h3>

      <div className="price-table">
        <div className="price-row">
          <div className="price-header">Price point</div>
          <div className="price-header">Supply price</div>
          <div className="price-header">Markup</div>
          <div className="price-header">Margin</div>
          <div className="price-header">Tax</div>
          <div className="price-header">Retail price Including tax</div>
        </div>
        <div className="price-row">
          <div className="price-item">General Price Book (All Products)</div>
          <div className="price-item">
            <input
              type="text"
              value={supplyPrice}
              onChange={handleSupplyPriceChange}
              placeholder="$0.00"
            />
          </div>
          <div className="price-item">
            <div className="input-group">
              <input
                type="text"
                value={markup}
                onChange={handleMarkupChange}
                placeholder="0.00"
              />
              <span className="input-group-text">%</span>
            </div>
          </div>
          <div className="price-item">
            <div className="input-group">
              <input
                type="text"
                value={margin}
                onChange={handleMarginChange}
                placeholder="0.00"
              />
              <span className="input-group-text">%</span>
            </div>
          </div>
          <div className="price-item">
            <div className="input-group">
              <input
                type="text"
                value={tax}
                onChange={handleTaxChange}
                placeholder="0.00"
              />
              <span className="input-group-text">%</span>
            </div>
          </div>
          <div className="price-item">
            <p>0%</p>
          </div>
          <div className="price-item">
            <input
              type="text"
              value={`$${calculateRetailPrice()}`}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>



      <div className="buttons">
        <button className="btn-cancel">Cancel</button>
        <button onClick={handleSave} className="btn-save">Save</button>
      </div>
      </>
            )}
      </div> 
  );
};

export default AddProductPage;  