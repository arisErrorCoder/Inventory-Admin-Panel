import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
export const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
  // Define the state you want to share globally
  const [productName, setProductName] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [categories, setCategories] = useState([
    { name: "Battery", products: 0 },
    { name: "Coil", products: 0 },
    { name: "Detox", products: 0 },
    { name: "Disposable Vape", products: 0 },
    { name: "Hookah Machine", products: 0 },
    { name: "Miscellaneous", products: 0 },
    { name: "MOD KIT", products: 0 },
    { name: "POD", products: 0 },
    { name: "RAW Keychain", products: 0 },
    { name: "Tank", products: 0 },
    { name: "Tobacco", products: 0 },
    { name: "Vape Accessory", products: 0 },
    { name: "Vape Juice", products: 0 }
]);
const [brands, setBrands] = useState([
  { name: 'AFZAL', description: 'High-quality tobacco brand', products: 10 },
  { name: 'Airistech', description: 'Vape accessories', products: 15 },
  { name: 'AirPops', description: 'Premium e-cigarette brand', products: 12 },
  { name: 'AL FHAKER', description: 'Quality shisha tobacco', products: 20 },
  { name: 'aleda', description: 'Natural rolling papers', products: 8 },
  { name: 'Allo', description: 'Disposable vape pens', products: 5 },
  { name: 'alt', description: 'Vape pod system', products: 7 },
  { name: 'Ammo', description: 'Vape and e-liquid brand', products: 9 },
  { name: 'Aspire 3K', description: 'High-performance vape devices', products: 10 },
  { name: 'Augvape', description: 'Innovative vape hardware', products: 14 },
  { name: 'aws', description: 'Vaping accessories', products: 6 },
  { name: 'BadShah', description: 'Premium tobacco brand', products: 13 },
  { name: 'Bic', description: 'Lighters and accessories', products: 11 },
  { name: 'Big Time', description: 'Quality tobacco brand', products: 18 },
  { name: 'Bliss', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'BMOR', description: 'Disposable vape pens', products: 19 },
  { name: 'Botany Bay Bottling Co.', description: 'Vape juice and e-liquid', products: 12 },
  { name: 'Bulls Eye', description: 'Tobacco and accessories', products: 7 },
  { name: 'Cali Salt', description: 'Nicotine salt e-liquid', products: 15 },
  { name: 'Calliburn', description: 'Vape pod system', products: 9 },
  { name: 'charbella', description: 'High-quality tobacco brand', products: 10 },
  { name: 'Charlies', description: 'Vape and e-liquid brand', products: 8 },
  { name: 'Chosen', description: 'Premium e-liquid brand', products: 11 },
  { name: 'Clipper', description: 'Lighters and accessories', products: 14 },
  { name: 'Cloudys', description: 'Vape and e-liquid brand', products: 6 },
  { name: 'Coastal Cloud', description: 'Vape juice and e-liquid', products: 13 },
  { name: 'Cotton Bacon', description: 'Vape cotton wicks', products: 7 },
  { name: 'Cream Team', description: 'Premium e-liquid brand', products: 15 },
  { name: 'Creamio', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'Cushman', description: 'Mango-flavored e-liquid', products: 5 },
  { name: 'Custard Monster', description: 'Creamy e-liquid flavors', products: 12 },
  { name: 'Daze', description: 'Premium e-liquid brand', products: 8 },
  { name: 'DotMod', description: 'High-end vape devices', products: 14 },
  { name: 'Dr. Plumb', description: 'Tobacco pipes and accessories', products: 10 },
  { name: 'Dragbar ICZ', description: 'Disposable vape pens', products: 9 },
  { name: 'Dynavap', description: 'Mechanical vape devices', products: 13 },
  { name: 'Easy Grip', description: 'Vape accessories', products: 11 },
  { name: 'Ecigoz', description: 'Vape devices and accessories', products: 10 },
  { name: 'Efest', description: 'Battery chargers and accessories', products: 12 },
  { name: 'EZ Test', description: 'Drug testing kits', products: 8 },
  { name: 'fantasia', description: 'Hookah and shisha flavors', products: 14 },
  { name: 'Fika', description: 'Vape and e-liquid brand', products: 7 },
  { name: 'Flowermate', description: 'Dry herb vaporizers', products: 9 },
  { name: 'Flux', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'Formula 420', description: 'Cleaning products for glass', products: 15 },
  { name: 'Freemax', description: 'Vape tanks and coils', products: 11 },
  { name: 'freeton', description: 'Disposable vape pens', products: 13 },
  { name: 'Fresh whip', description: 'Whipped cream chargers', products: 10 },
  { name: 'Frozen Chosen', description: 'E-liquid with cooling effect', products: 8 },
  { name: 'Fruit Bomb', description: 'Fruity e-liquid flavors', products: 14 },
  { name: 'Fruit monster', description: 'Fruity e-liquid brand', products: 10 },
  { name: 'Fruitia', description: 'Premium e-liquid brand', products: 11 },
  { name: 'Geekvape', description: 'High-performance vape devices', products: 14 },
  { name: 'Glass', description: 'Glass smoking accessories', products: 9 },
  { name: 'Go2', description: 'Vape and e-liquid brand', products: 12 },
  { name: 'GunnPod', description: 'Disposable vape pens', products: 8 },
  { name: 'H Upmann', description: 'Premium cigars', products: 15 },
  { name: 'HERBAL CLEAN', description: 'Detox products', products: 11 },
  { name: 'Hunting Cloudz', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'IGET', description: 'Disposable vape pens', products: 13 },
  { name: 'IGO', description: 'Vape devices and accessories', products: 14 },
  { name: 'IJOY', description: 'Vape devices and accessories', products: 9 },
  { name: 'IMREN', description: 'Battery chargers and accessories', products: 11 },
  { name: 'Inmood', description: 'Vape and e-liquid brand', products: 7 },
  { name: 'Innokin', description: 'Vape devices and tanks', products: 13 },
  { name: 'iPuffs', description: 'Disposable vape pens', products: 12 },
  { name: 'IVG', description: 'Premium e-liquid brand', products: 10 },
  { name: 'JERK', description: 'Vape and e-liquid brand', products: 8 },
  { name: 'Jose L Piedra', description: 'Cuban cigars', products: 14 },
  { name: 'Juicy Jays', description: 'Flavored rolling papers', products: 7 },
  { name: 'Kingtons', description: 'Vape devices and accessories', products: 12 },
  { name: 'Kiwi Catering', description: 'Vape and e-liquid brand', products: 9 },
  { name: 'Kush', description: 'Herbal smoking products', products: 15 },
  { name: 'Lemonade Monster', description: 'Lemonade-flavored e-liquid', products: 10 },
  { name: 'LG', description: 'Batteries and chargers', products: 14 },
  { name: 'Lighta', description: 'Lighters and accessories', products: 11 },
  { name: 'Lim Puro', description: 'Premium tobacco brand', products: 10 },
  { name: 'Lion Labs', description: 'Vape and e-liquid brand', products: 13 },
  { name: 'Loewe', description: 'Luxury leather goods', products: 8 },
  { name: 'Magical Butter', description: 'Herbal extraction devices', products: 9 },
  { name: 'Masterdam', description: 'Grinders and accessories', products: 12 },
  { name: 'Mevol', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'Mini-Marine Yanhu', description: 'Vape and e-liquid brand', products: 6 },
  { name: 'Misc', description: 'Miscellaneous items', products: 5 },
  { name: 'Molicel', description: 'Batteries and chargers', products: 11 },
  { name: 'Montecristo', description: 'Premium cigars', products: 14 },
  { name: 'mosa', description: 'Cream chargers', products: 8 },
  { name: 'Mr Wicky Salts', description: 'Nicotine salt e-liquid', products: 13 },
  { name: 'Nasty', description: 'Premium e-liquid brand', products: 12 },
  { name: 'Nitecore', description: 'Battery chargers and accessories', products: 14 },
  { name: 'NOS', description: 'Cream chargers', products: 9 },
  { name: 'OSMALL', description: 'Vape pod system', products: 10 },
  { name: 'Pachamama', description: 'Fruity e-liquid flavors', products: 7 },
  { name: 'PAX', description: 'Portable vaporizers', products: 11 },
  { name: 'PEER', description: 'Vape and e-liquid brand', products: 13 },
  { name: 'Perfetti', description: 'Candy and confectionery', products: 12 },
  { name: 'PHIX', description: 'Vape pod system', products: 10 },
  { name: 'Pineapple Express', description: 'Cannabis strain products', products: 8 },
  { name: 'Pioneers4You', description: 'Vape devices and accessories', products: 14 },
  { name: 'POD Juice', description: 'Nicotine salt e-liquid', products: 12 },
  { name: 'POD KING', description: 'Disposable vape pens', products: 11 },
  { name: 'PUFFMI', description: 'Disposable vape pens', products: 13 },
  { name: 'Pure By Sifiso', description: 'Vape and e-liquid brand', products: 8 },
  { name: 'Pyro', description: 'Vape and e-liquid brand', products: 14 },
  { name: 'RAW', description: 'Rolling papers and accessories', products: 15 },
  { name: 'Ruthless', description: 'Premium e-liquid brand', products: 13 },
  { name: 'Samsung', description: 'Batteries and chargers', products: 11 },
  { name: 'Savoy', description: 'Cigarette and tobacco products', products: 12 },
  { name: 'Silicone', description: 'Vape and e-liquid brand', products: 9 },
  { name: 'Smart Cart', description: 'Vape cartridges and pens', products: 10 },
  { name: 'SMOK', description: 'Vape devices and tanks', products: 14 },
  { name: 'SNAPS', description: 'Vape and e-liquid brand', products: 8 },
  { name: 'Snowwolf', description: 'Vape devices and accessories', products: 13 },
  { name: 'Sonoff', description: 'Smart home devices', products: 12 },
  { name: 'Sonic', description: 'Vape and e-liquid brand', products: 11 },
  { name: 'Sorbet', description: 'Fruity e-liquid flavors', products: 10 },
  { name: 'STAX', description: 'Vape and e-liquid brand', products: 9 },
  { name: 'STLTH', description: 'Vape pod system', products: 10 },
  { name: 'Supreme', description: 'Streetwear and accessories', products: 8 },
  { name: 'SWFT', description: 'Disposable vape pens', products: 14 },
  { name: 'Syn', description: 'Synthetic nicotine products', products: 11 },
  { name: 'T&C Elite', description: 'Premium cigars', products: 15 },
  { name: 'Taifun', description: 'High-end vape devices', products: 13 },
  { name: 'Tasty Puff', description: 'Flavored rolling papers', products: 12 },
  { name: 'Uto', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'Vapetasia', description: 'Premium e-liquid brand', products: 9 },
  { name: 'Vaper Empire', description: 'Vape devices and accessories', products: 12 },
  { name: 'Vaporesso', description: 'Vape devices and tanks', products: 14 },
  { name: 'Vapoureyes', description: 'Vape and e-liquid brand', products: 10 },
  { name: 'VCVRY', description: 'Vape and e-liquid brand', products: 9 },
  { name: 'Veppo', description: 'Vape devices and accessories', products: 11 },
  { name: 'VFLASK', description: 'Vape and e-liquid brand', products: 8 },
  { name: 'Voopoo', description: 'Vape devices and tanks', products: 13 },
  { name: 'Vuse', description: 'Vape pod system', products: 12 },
  { name: 'Waterfall', description: 'Glass smoking accessories', products: 10 },
  { name: 'Wick N Vape', description: 'Vape cotton wicks', products: 7 },
  { name: 'Wick N Wire', description: 'Vape wire and coils', products: 9 },
  { name: 'Wotofo', description: 'Vape devices and accessories', products: 13 },
  { name: 'XMAX', description: 'Dry herb vaporizers', products: 12 },
  { name: 'Xtra', description: 'Disposable vape pens', products: 14 },
  { name: 'Yami Vapor', description: 'Premium e-liquid brand', products: 11 },
  { name: 'Yocan', description: 'Vape devices and accessories', products: 13 },
  { name: 'Zig-Zag', description: 'Rolling papers and accessories', products: 9 },
  { name: 'Zippo', description: 'Lighters and accessories', products: 15 },
  { name: 'ZPods', description: 'Vape pod system', products: 10 },
]);
// const [suppliers, setSuppliers] = useState([
//   { name: "ALL IZ WELL", code: "", price: "", products: 0 },
//   { name: "AVS", code: "", price: "", products: 0 },
//   { name: "BAT", code: "", price: "", products: 0 },
//   { name: "Bliss", code: "", price: "", products: 0 },
//   { name: "charbella", code: "", price: "", products: 0 },
//   { name: "Chess Group Ltd", code: "", price: "", products: 0 },
//   { name: "COTD", code: "", price: "", products: 0 },
//   { name: "DHIMAHI TRADING LIMITED", code: "", price: "", products: 0 },
//   { name: "DT Vape", code: "", price: "", products: 0 },
//   { name: "Kiwi Catering", code: "", price: "", products: 0 },
//   { name: "KPL", code: "", price: "", products: 0 },
//   { name: "Lion Lab", code: "", price: "", products: 0 },
//   { name: "Magical Butter", code: "", price: "", products: 0 },
//   { name: "Mevol", code: "", price: "", products: 0 },
//   { name: "mission", code: "", price: "", products: 0 },
//   { name: "NZTG", code: "", price: "", products: 0 },
//   { name: "Phillip Morris", code: "", price: "", products: 0 },
//   { name: "QSSL", code: "", price: "", products: 0 },
//   { name: "SunTree", code: "", price: "", products: 0 },
//   { name: "Titex Group", code: "", price: "", products: 0 },
//   { name: "Top Trade International Ltd", code: "", price: "", products: 0 },
//   { name: "Vape HQ", code: "", price: "", products: 0 },
//   { name: "Vape Traders New Zealand", code: "", price: "", products: 0 },
//   { name: "Vapeyes", code: "", price: "", products: 0 },
//   { name: "Vapeys Wholesale", code: "", price: "", products: 0 },
//   { name: "Vapo", code: "", price: "", products: 0 }
// ]);



  const [showBrandDetails, setShowBrandDetails] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [sellInStore, setSellInStore] = useState(false);
  const [suppliers, setSuppliers] = useState([{ name: '', code: '', price: '' }]);



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


  

  // Provide the state and state updaters to children components
  return (
    <StoreContext.Provider
      value={{
        productName,
        setProductName,
        selectedSupplier,
        setSelectedSupplier,
        suppliers,productData, setProductData,
        setSuppliers,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        showSupplierDetails,
        setShowSupplierDetails,
        showCategoryDetails,
        setShowCategoryDetails,
        showBrandDetails,
        setShowBrandDetails,
        description,
        setDescription,
        tags,
        setTags,
        images,
        setImages,
        sellInStore,suppliers, setSuppliers,
        setSellInStore,
        categories, setCategories,brands, setBrands,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Create a custom hook to use the Store context
export const useStore = () => {
  return useContext(StoreContext);
};
