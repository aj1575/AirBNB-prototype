const { consumer, TOPICS } = require('./kafkaConfig');
const db = require('../models/db');

// Start consuming messages
const startBookingConsumer = async () => {
    try {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const data = JSON.parse(message.value.toString());
                console.log(`📥 Received message from ${topic}:`, data);

                try {
                    switch (topic) {
                        case TOPICS.BOOKING_CREATED:
                            await handleBookingCreated(data);
                            break;
                        
                        case TOPICS.BOOKING_STATUS_UPDATED:
                            await handleBookingStatusUpdated(data);
                            break;
                        
                        case TOPICS.BOOKING_CANCELLED:
                            await handleBookingCancelled(data);
                            break;
                        
                        default:
                            console.log(`⚠️  Unknown topic: ${topic}`);
                    }
                } catch (error) {
                    console.error(`❌ Error processing message from ${topic}:`, error);
                }
            }
        });
        
        console.log('✅ Booking consumer started');
    } catch (error) {
        console.error('❌ Error starting booking consumer:', error);
    }
};

// Handler: Booking Created
const handleBookingCreated = async (data) => {
    console.log('🔔 Processing new booking:', data);
    
    // Additional processing can be done here
    // For example: Send notification to owner, update analytics, etc.
    
    try {
        // Get property owner details
        const [properties] = await db.query(
            'SELECT owner_id FROM properties WHERE id = ?',
            [data.propertyId]
        );
        
        if (properties.length > 0) {
            console.log(`✅ Booking ${data.bookingId} created for property ${data.propertyId}`);
            console.log(`📧 Notify owner ${properties[0].owner_id} about new booking request`);
            // Here you could send email/notification to owner
        }
    } catch (error) {
        console.error('Error in handleBookingCreated:', error);
    }
};

// Handler: Booking Status Updated
const handleBookingStatusUpdated = async (data) => {
    console.log('🔄 Processing booking status update:', data);
    
    try {
        // Get traveler details
        const [bookings] = await db.query(
            'SELECT traveler_id FROM bookings WHERE id = ?',
            [data.bookingId]
        );
        
        if (bookings.length > 0) {
            console.log(`✅ Booking ${data.bookingId} status updated to: ${data.status}`);
            console.log(`📧 Notify traveler ${bookings[0].traveler_id} about status change`);
            // Here you could send email/notification to traveler
        }
    } catch (error) {
        console.error('Error in handleBookingStatusUpdated:', error);
    }
};

// Handler: Booking Cancelled
const handleBookingCancelled = async (data) => {
    console.log('❌ Processing booking cancellation:', data);
    
    try {
        console.log(`✅ Booking ${data.bookingId} cancelled`);
        console.log(`📧 Notify relevant parties about cancellation`);
        // Here you could send email/notification
    } catch (error) {
        console.error('Error in handleBookingCancelled:', error);
    }
};

module.exports = {
    startBookingConsumer
};
