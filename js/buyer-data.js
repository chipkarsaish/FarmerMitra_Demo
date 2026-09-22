// buyer-data.js - Mock data store and state management for the Buyer Portal

const clearStorageAndSeed = () => {
    localStorage.removeItem('farmerListings');
    localStorage.removeItem('savedListings');
    localStorage.removeItem('buyerRequirements');
    localStorage.removeItem('buyerOffers');
    localStorage.removeItem('buyerOrders');
    localStorage.removeItem('buyerShipments');
    localStorage.removeItem('buyerTransactions');

    const MOCK_LISTINGS = [
        { id: 'L101', farmerName: 'Rajesh Patil', verified: true, rating: 4.7, completedSales: 124, responseTime: '2 hours', crop: 'Onion', quantity: 10000, unit: 'kg', grade: 'Grade A', price: 2600, priceUnit: 'quintal', location: 'Nashik', distance: 34, harvestDate: '2026-08-25', available: 'Immediately', description: 'Freshly harvested red onions. Excellent keeping quality.', images: [] },
        { id: 'L102', farmerName: 'Suresh Pawar', verified: true, rating: 4.5, completedSales: 89, responseTime: '1 hour', crop: 'Tomato', quantity: 4000, unit: 'kg', grade: 'Grade B', price: 2400, priceUnit: 'quintal', location: 'Pune', distance: 120, harvestDate: '2026-08-28', available: '2026-09-01', description: 'Firm, red tomatoes suitable for processing.', images: [] },
        { id: 'L103', farmerName: 'Anil Deshmukh', verified: false, rating: 4.2, completedSales: 12, responseTime: '1 day', crop: 'Potato', quantity: 5000, unit: 'kg', grade: 'Grade A', price: 1800, priceUnit: 'quintal', location: 'Satara', distance: 80, harvestDate: '2026-08-10', available: 'Immediately', description: 'Cold storage potatoes, large size.', images: [] },
        { id: 'L104', farmerName: 'Vijay Sharma', verified: true, rating: 4.9, completedSales: 310, responseTime: '30 mins', crop: 'Wheat', quantity: 20000, unit: 'kg', grade: 'Premium', price: 2200, priceUnit: 'quintal', location: 'Indore', distance: 350, harvestDate: '2026-04-15', available: 'Immediately', description: 'Sharbati wheat, sorted and cleaned.', images: [] },
        { id: 'L105', farmerName: 'Ganesh Kale', verified: true, rating: 4.6, completedSales: 45, responseTime: '5 hours', crop: 'Grapes', quantity: 2000, unit: 'kg', grade: 'Export Quality', price: 6500, priceUnit: 'quintal', location: 'Sangli', distance: 210, harvestDate: '2026-08-22', available: 'Immediately', description: 'Thompson seedless grapes.', images: [] },
        { id: 'L106', farmerName: 'Nitin Mane', verified: false, rating: 3.9, completedSales: 8, responseTime: '2 days', crop: 'Onion', quantity: 8000, unit: 'kg', grade: 'Grade B', price: 2300, priceUnit: 'quintal', location: 'Solapur', distance: 240, harvestDate: '2026-08-20', available: 'Immediately', description: 'Medium size onions.', images: [] }
    ];

    const MOCK_REQUIREMENTS = [
        { id: 'REQ-1024', crop: 'Onion', quantity: 10000, unit: 'kg', quality: 'Good', grade: 'Grade A', maxPrice: 2700, preferredLocation: 'Nashik', maxDistance: 75, requiredBy: '2026-08-30', deliveryLocation: 'Mumbai', notes: 'Need immediate delivery', status: 'ACTIVE', date: '2026-08-20', matchesCount: 2 }
    ];

    const MOCK_OFFERS = [
        { id: 'OF1021', type: 'sent', farmerName: 'Rajesh Patil', crop: 'Onion', quantity: 2000, farmerAsking: 2650, buyerOffer: 2550, status: 'Pending', date: '2026-08-25', history: [{sender: 'buyer', price: 2550, time: '2026-08-25T10:00:00Z'}] },
        { id: 'OF1088', type: 'received', farmerName: 'Suresh Pawar', crop: 'Tomato', quantity: 4000, farmerAsking: 2400, buyerOffer: null, status: 'Received', date: '2026-08-24', history: [{sender: 'farmer', price: 2400, time: '2026-08-24T14:30:00Z'}] },
        { id: 'OF1055', type: 'negotiation', farmerName: 'Vijay Sharma', crop: 'Wheat', quantity: 10000, farmerAsking: 2200, buyerOffer: 2100, status: 'Negotiating', date: '2026-08-23', history: [
            {sender: 'farmer', price: 2250, time: '2026-08-23T09:00:00Z'},
            {sender: 'buyer', price: 2100, time: '2026-08-23T11:00:00Z'},
            {sender: 'farmer', price: 2200, time: '2026-08-24T08:00:00Z'}
        ]}
    ];

    const MOCK_ORDERS = [
        { id: 'ORD2048', crop: 'Onion', quantity: 2000, price: 2600, cropValue: 52000, transportCost: 3000, otherCharges: 500, totalAmount: 55500, farmerName: 'Rajesh Patil', pickupLocation: 'Nashik', deliveryLocation: 'Mumbai', status: 'CONFIRMED', paymentStatus: 'PENDING', shipmentStatus: 'NOT DISPATCHED', date: '2026-08-24' }
    ];

    const MOCK_SHIPMENTS = [
        { id: 'SH2045', orderId: 'ORD2011', crop: 'Tomato', quantity: 3000, pickupLocation: 'Pune Farm', destination: 'Mumbai Warehouse', distance: 150, vehicle: '10-ton Truck', status: 'IN TRANSIT', expectedDelivery: '2026-08-26', timeline: [
            {status: 'Pickup Scheduled', completed: true},
            {status: 'Picked Up', completed: true},
            {status: 'In Transit', completed: true},
            {status: 'Delivered', completed: false}
        ]}
    ];

    const MOCK_TRANSACTIONS = [
        { id: 'TX2045', orderId: 'ORD1834', amount: 55500, method: 'UPI', date: '2026-08-15', status: 'COMPLETED' }
    ];

    localStorage.setItem('farmerListings', JSON.stringify(MOCK_LISTINGS));
    localStorage.setItem('savedListings', JSON.stringify([]));
    localStorage.setItem('buyerRequirements', JSON.stringify(MOCK_REQUIREMENTS));
    localStorage.setItem('buyerOffers', JSON.stringify(MOCK_OFFERS));
    localStorage.setItem('buyerOrders', JSON.stringify(MOCK_ORDERS));
    localStorage.setItem('buyerShipments', JSON.stringify(MOCK_SHIPMENTS));
    localStorage.setItem('buyerTransactions', JSON.stringify(MOCK_TRANSACTIONS));
};

// Only seed if db is entirely missing to allow persistence during demo
// Force reset for development prototype
clearStorageAndSeed();

const db = {
    // --- LISTINGS ---
    getListings: () => JSON.parse(localStorage.getItem('farmerListings')) || [],
    getListingById: (id) => db.getListings().find(l => l.id === id),
    
    // --- SAVED LISTINGS ---
    getSavedListings: () => JSON.parse(localStorage.getItem('savedListings')) || [],
    saveListing: (id) => {
        let saved = db.getSavedListings();
        if (!saved.includes(id)) saved.push(id);
        localStorage.setItem('savedListings', JSON.stringify(saved));
    },
    unsaveListing: (id) => {
        let saved = db.getSavedListings();
        saved = saved.filter(s => s !== id);
        localStorage.setItem('savedListings', JSON.stringify(saved));
    },

    // --- REQUIREMENTS ---
    getRequirements: () => JSON.parse(localStorage.getItem('buyerRequirements')) || [],
    addRequirement: (req) => {
        let reqs = db.getRequirements();
        req.id = 'REQ-' + (1000 + reqs.length * 27);
        req.status = 'ACTIVE';
        req.date = new Date().toISOString().split('T')[0];
        
        // Calculate matches
        const listings = db.getListings();
        let matches = listings.filter(l => l.crop.toLowerCase() === req.crop.toLowerCase());
        req.matchesCount = matches.length;
        
        reqs.unshift(req);
        localStorage.setItem('buyerRequirements', JSON.stringify(reqs));
        return req;
    },
    updateRequirementStatus: (id, status) => {
        let reqs = db.getRequirements();
        let r = reqs.find(x => x.id === id);
        if(r) r.status = status;
        localStorage.setItem('buyerRequirements', JSON.stringify(reqs));
    },

    // --- OFFERS & NEGOTIATIONS ---
    getOffers: () => JSON.parse(localStorage.getItem('buyerOffers')) || [],
    makeOffer: (listingId, amount) => {
        const listing = db.getListingById(listingId);
        let offers = db.getOffers();
        const newOffer = {
            id: 'OF' + Math.floor(Math.random() * 9000 + 1000),
            type: 'sent',
            farmerName: listing.farmerName,
            crop: listing.crop,
            quantity: listing.quantity,
            farmerAsking: listing.price,
            buyerOffer: amount,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            history: [{sender: 'buyer', price: amount, time: new Date().toISOString()}]
        };
        offers.unshift(newOffer);
        localStorage.setItem('buyerOffers', JSON.stringify(offers));
        return newOffer;
    },
    counterOffer: (offerId, amount) => {
        let offers = db.getOffers();
        let offer = offers.find(o => o.id === offerId);
        if(offer) {
            offer.history.push({sender: 'buyer', price: amount, time: new Date().toISOString()});
            offer.buyerOffer = amount;
            offer.status = 'Negotiating';
            offer.type = 'negotiation';
        }
        localStorage.setItem('buyerOffers', JSON.stringify(offers));
    },
    acceptOffer: (offerId) => {
        let offers = db.getOffers();
        let offer = offers.find(o => o.id === offerId);
        if(offer) {
            offer.status = 'Accepted';
            db.createOrder(offer);
        }
        localStorage.setItem('buyerOffers', JSON.stringify(offers));
    },

    // --- ORDERS ---
    getOrders: () => JSON.parse(localStorage.getItem('buyerOrders')) || [],
    createOrder: (offer) => {
        let orders = db.getOrders();
        let finalPrice = offer.history[offer.history.length-1].price;
        let qQuintals = offer.quantity / 100;
        let cropValue = finalPrice * qQuintals;
        
        const newOrder = {
            id: 'ORD' + Math.floor(Math.random() * 9000 + 1000),
            crop: offer.crop,
            quantity: offer.quantity,
            price: finalPrice,
            cropValue: cropValue,
            transportCost: 3000,
            otherCharges: 500,
            totalAmount: cropValue + 3500,
            farmerName: offer.farmerName,
            pickupLocation: 'Farm',
            deliveryLocation: 'Buyer Warehouse',
            status: 'CONFIRMED',
            paymentStatus: 'PENDING',
            shipmentStatus: 'NOT DISPATCHED',
            date: new Date().toISOString().split('T')[0]
        };
        orders.unshift(newOrder);
        localStorage.setItem('buyerOrders', JSON.stringify(orders));
        return newOrder;
    },

    // --- SHIPMENTS ---
    getShipments: () => JSON.parse(localStorage.getItem('buyerShipments')) || [],

    // --- PAYMENTS ---
    getTransactions: () => JSON.parse(localStorage.getItem('buyerTransactions')) || [],
    payOrder: (orderId, method) => {
        let orders = db.getOrders();
        let order = orders.find(o => o.id === orderId);
        if(order) {
            order.paymentStatus = 'PAID';
            localStorage.setItem('buyerOrders', JSON.stringify(orders));
            
            let txs = db.getTransactions();
            txs.unshift({
                id: 'TX' + Math.floor(Math.random() * 9000 + 1000),
                orderId: order.id,
                amount: order.totalAmount,
                method: method,
                date: new Date().toISOString().split('T')[0],
                status: 'COMPLETED'
            });
            localStorage.setItem('buyerTransactions', JSON.stringify(txs));
        }
    },
    
    // Developer tool to forcefully reset data
    resetAllData: () => clearStorageAndSeed()
};
