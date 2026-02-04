import { useState, useEffect } from 'react'
import axios from 'axios'

export default function WasteListings({ user, socket, listings }) {
    const [allListings, setAllListings] = useState(listings)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchListings()
    }, [])

    const fetchListings = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/waste/listings', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAllListings(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRequest = async (listingId) => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`/api/waste/${listingId}/request`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Request sent successfully!')
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send request')
        }
    }

    if (loading) return <div className="text-center py-8">Loading listings...</div>

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Waste Listings</h2>

            {allListings.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-600">
                    No waste listings available yet.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allListings.map(listing => (
                        <div key={listing.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.wasteType}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Quantity:</strong> {listing.quantity} {listing.unit}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Location:</strong> {listing.location}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Status:</strong> <span className="text-green-600 font-medium">{listing.status}</span>
                            </p>
                            <p className="text-sm text-gray-700 mb-4">{listing.description}</p>

                            {user.role !== 'generator' && listing.status === 'available' && (
                                <button
                                    onClick={() => handleRequest(listing.id)}
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Request Waste
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
