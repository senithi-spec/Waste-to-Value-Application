import { useState } from 'react'
import axios from 'axios'

export default function WasteListing({ socket }) {
    const [formData, setFormData] = useState({
        wasteType: '',
        quantity: '',
        unit: 'kg',
        location: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('/api/waste/create', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSuccess('Waste listing created successfully!')
            setFormData({ wasteType: '', quantity: '', unit: 'kg', location: '', description: '' })
            setTimeout(() => setSuccess(''), 3000)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Waste Listing</h2>

            {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                    <input
                        type="text"
                        name="wasteType"
                        value={formData.wasteType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Plastic, Metal, Paper"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="kg">kg</option>
                            <option value="ton">ton</option>
                            <option value="pcs">pieces</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="City, Address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="4"
                        placeholder="Details about the waste..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Listing'}
                </button>
            </form>
        </div>
    )
}
