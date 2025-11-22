const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'airbnb-app',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'airbnb-booking-group' });

// Topics
const TOPICS = {
    BOOKING_CREATED: 'booking-created',
    BOOKING_STATUS_UPDATED: 'booking-status-updated',
    BOOKING_CANCELLED: 'booking-cancelled'
};

// Initialize Kafka
const initKafka = async () => {
    try {
        await producer.connect();
        console.log('✅ Kafka Producer connected');
        
        await consumer.connect();
        console.log('✅ Kafka Consumer connected');
        
        // Subscribe to topics
        await consumer.subscribe({ 
            topics: [
                TOPICS.BOOKING_CREATED, 
                TOPICS.BOOKING_STATUS_UPDATED,
                TOPICS.BOOKING_CANCELLED
            ], 
            fromBeginning: false 
        });
        
        console.log('✅ Subscribed to Kafka topics');
    } catch (error) {
        console.error('❌ Kafka initialization error:', error);
        // Don't crash the app if Kafka is not available
        console.log('⚠️  Continuing without Kafka...');
    }
};

// Publish message to Kafka
const publishMessage = async (topic, message) => {
    try {
        await producer.send({
            topic,
            messages: [
                {
                    key: message.id ? message.id.toString() : null,
                    value: JSON.stringify(message),
                    timestamp: Date.now().toString()
                }
            ]
        });
        console.log(`📤 Published to ${topic}:`, message);
        return true;
    } catch (error) {
        console.error(`❌ Error publishing to ${topic}:`, error);
        return false;
    }
};

// Graceful shutdown
const disconnectKafka = async () => {
    try {
        await producer.disconnect();
        await consumer.disconnect();
        console.log('✅ Kafka disconnected');
    } catch (error) {
        console.error('❌ Error disconnecting Kafka:', error);
    }
};

module.exports = {
    kafka,
    producer,
    consumer,
    TOPICS,
    initKafka,
    publishMessage,
    disconnectKafka
};
