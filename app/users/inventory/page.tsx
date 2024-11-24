'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Drug {
  id: number;
  name: string;
  quantity: number;
}

export default function InventoryPage() {
  const [addDrugName, setAddDrugName] = useState('');
  const [addQuantity, setAddQuantity] = useState(0);
  const [addPrice, setAddPrice] = useState(0);

  const [removeDrugName, setRemoveDrugName] = useState('');
  const [removeQuantity, setRemoveQuantity] = useState(0);
  const [searchResults, setSearchResults] = useState<Drug[]>([]); // Specify type for search results
  const [message, setMessage] = useState('');

  // Fetch inventory data when the component mounts
  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      if (response.status === 200) {
        setSearchResults(response.data); // Assuming response data is an array of drugs
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setMessage('Failed to load inventory.');
    }
  };

  useEffect(() => {
    fetchInventory(); // Fetch inventory on mount
  }, []);

  // Handle add drug form submission
  const handleAddDrug = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/inventory/add', {
        name: addDrugName,
        quantity: addQuantity,
        price: addPrice,
      });

      if (response.status === 200) {
        setMessage('Drug added to inventory successfully!');
        // Clear the form fields after successful submission
        setAddDrugName('');
        setAddQuantity(0);
        setAddPrice(0);
        fetchInventory(); // Reload inventory
      }
    } catch (error) {
      console.error('Error adding drug:', error);
      setMessage('Failed to add drug to inventory.');
    }
  };

  // Handle remove drug form submission
  const handleRemoveDrug = async (drugId: number) => {
    if (removeQuantity <= 0) {
      setMessage('Please enter a valid quantity to remove.');
      return;
    }

    try {
      const response = await axios.post('/api/inventory/remove', {
        id: drugId,
        quantity: removeQuantity,
      });

      if (response.status === 200) {
        setMessage('Drug removed from inventory successfully!');
        setRemoveQuantity(0); // Clear quantity field after removal
        fetchInventory(); // Reload inventory
      }
    } catch (error) {
      console.error('Error removing drug:', error);
      setMessage('Failed to remove drug from inventory.');
    }
  };

  // Search function for the remove drug section
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setRemoveDrugName(query);

    if (query) {
      try {
        const response = await axios.get(`/api/inventory/search?name=${query}`);
        if (response.status === 200) {
          setSearchResults(response.data); // Update search results
        }
      } catch (error) {
        console.error('Error searching inventory:', error);
        setMessage('Failed to search inventory.');
      }
    } else {
      setSearchResults([]); // Clear search results when query is empty
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Inventory</h1>
      <p className="mt-2 text-gray-700">Manage your inventory and stock levels.</p>

      {/* Display any messages (success or error) */}
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-6">
        {/* Add Drug Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Drug to Inventory</h2>
          <form onSubmit={handleAddDrug} className="space-y-4">
            <div>
              <label htmlFor="addDrugName" className="block text-sm font-medium text-gray-700">
                Drug Name
              </label>
              <input
                type="text"
                id="addDrugName"
                value={addDrugName}
                onChange={(e) => setAddDrugName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="addQuantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="addQuantity"
                value={addQuantity}
                onChange={(e) => setAddQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="addPrice" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="addPrice"
                value={addPrice}
                onChange={(e) => setAddPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add Drug
            </button>
          </form>
        </div>

        {/* Remove Drug Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Remove Drug from Inventory</h2>
          <div>
            <label htmlFor="removeDrugName" className="block text-sm font-medium text-gray-700">
              Search Drug
            </label>
            <input
              type="text"
              id="removeDrugName"
              value={removeDrugName}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Display search results in a table */}
          {searchResults.length > 0 && (
            <table className="mt-4 w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Drug Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((drug) => (
                  <tr key={drug.id}>
                    <td className="px-4 py-2">{drug.name}</td>
                    <td className="px-4 py-2">{drug.quantity}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={removeQuantity}
                        onChange={(e) => setRemoveQuantity(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                        placeholder="Qty"
                      />
                      <button
                        onClick={() => handleRemoveDrug(drug.id)}
                        className="ml-2 py-1 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
