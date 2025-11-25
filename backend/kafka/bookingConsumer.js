const { consumer, TOPICS } = require('./kafkaConfig');
const db = require('../models/db');
const notificationService = require('../services/notificationService');

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
            const ownerId = properties[0].owner_id;
            console.log(`✅ Booking ${data.bookingId} created for property ${data.propertyId}`);
            console.log(`📧 Notify owner ${ownerId} about new booking request`);
            
            // Send real-time notification to owner
            notificationService.addNotification(ownerId, {
                type: 'NEW_BOOKING',
                title: '🎉 New Booking Request!',
                message: `You have a new booking request for your property`,
                bookingId: data.bookingId,
                propertyId: data.propertyId,
                propertyName: data.propertyName,
                travelerName: data.travelerName,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                totalPrice: data.totalPrice,
                action: 'review'
            });
        }
    } catch (error) {
        console.error('Error in handleBookingCreated:', error);
    }
};

// Handler: Booking Status Updated
const handleBookingStatusUpdated = async (data) => {
    console.log('🔄 Processing booking status update:', data);
    
    try {
        // Update booking status in database
        await db.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
            [data.status, data.bookingId]
        );
        
        console.log(`✅ Booking ${data.bookingId} status updated to: ${data.status} in database`);
        
        // Get traveler details for notification
        const [bookings] = await db.query(
            'SELECT traveler_id FROM bookings WHERE id = ?',
            [data.bookingId]
        );
        
        if (bookings.length > 0) {
            console.log(`📧 Notify traveler ${bookings[0].traveler_id} about status change`);
            // Here you could send email/notification to traveler
            // Example: sendEmail(bookings[0].traveler_id, 'Booking Status Update', data);
        }
    } catch (error) {
        console.error('Error in handleBookingStatusUpdated:', error);
    }
};

// Handler: Booking Cancelled
const handleBookingCancelled = async (data) => {
    console.log('❌ Processing booking cancellation:', data);
    
    try {
        // Update booking status in database
        await db.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
            ['cancelled', data.bookingId]
        );
        
        console.log(`✅ Booking ${data.bookingId} cancelled in database`);
        
        // Get booking details for notifications
        const [bookings] = await db.query(
            'SELECT traveler_id, property_id FROM bookings WHERE id = ?',
            [data.bookingId]
        );
        
        if (bookings.length > 0) {
            console.log(`📧 Notify traveler ${bookings[0].traveler_id} and owner about cancellation`);
            console.log(`   Cancelled by: ${data.cancelledBy || 'unknown'}`);
            // Here you could send email/notification to both parties
            // Example: sendCancellationEmail(bookings[0].traveler_id, data);
        }
    } catch (error) {
        console.error('Error in handleBookingCancelled:', error);
    }
};

module.exports = {
    startBookingConsumer
};
