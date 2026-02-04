import { useState, useEffect } from 'react'
import WasteListing from '../components/WasteListing'
import WasteListings from '../components/WasteListings'

export default function Dashboard({ user, socket, onLogout }) {
    const [tab, setTab] = useState('listings')
    const [listings, setListings] = useState([])

    useEffect(() => {
        if (socket) {
            socket.on('waste:created', (listing) => {
                setListings(prev => [listing, ...prev])
            })
            socket.on('waste:updated', (listing) => {
                setListings(prev => prev.map(l => l.id === listing.id ? listing : l))
            })
            return () => {
                socket.off('waste:created')
                socket.off('waste:updated')
            }
        }
    }, [socket])

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-600">Waste-to-Value</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Welcome, <strong>{user.email}</strong> ({user.role})</span>
                        <button
                            onClick={onLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setTab('listings')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${tab === 'listings'
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Browse Listings
                    </button>
                    {user.role === 'generator' && (
                        <button
                            onClick={() => setTab('create')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${tab === 'create'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Create Listing
                        </button>
                    )}
                </div>

                {tab === 'create' && user.role === 'generator' && (
                    <WasteListing socket={socket} />
                )}
                {tab === 'listings' && (
                    <WasteListings user={user} socket={socket} listings={listings} />
                )}
            </div>
        </div>
    )
}
