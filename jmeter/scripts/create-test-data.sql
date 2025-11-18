-- Script to create test data for JMeter performance testing

-- Create test travelers
INSERT INTO users (name, email, password, role) VALUES
('Test Traveler 1', 'traveler1@test.com', '$2b$10$YourHashedPasswordHere', 'traveler'),
('Test Traveler 2', 'traveler2@test.com', '$2b$10$YourHashedPasswordHere', 'traveler'),
('Test Traveler 3', 'traveler3@test.com', '$2b$10$YourHashedPasswordHere', 'traveler'),
('Test Traveler 4', 'traveler4@test.com', '$2b$10$YourHashedPasswordHere', 'traveler'),
('Test Traveler 5', 'traveler5@test.com', '$2b$10$YourHashedPasswordHere', 'traveler');

-- Create test owners
INSERT INTO users (name, email, password, role) VALUES
('Test Owner 1', 'owner1@test.com', '$2b$10$YourHashedPasswordHere', 'owner'),
('Test Owner 2', 'owner2@test.com', '$2b$10$YourHashedPasswordHere', 'owner'),
('Test Owner 3', 'owner3@test.com', '$2b$10$YourHashedPasswordHere', 'owner'),
('Test Owner 4', 'owner4@test.com', '$2b$10$YourHashedPasswordHere', 'owner'),
('Test Owner 5', 'owner5@test.com', '$2b$10$YourHashedPasswordHere', 'owner');

-- Note: Replace $2b$10$YourHashedPasswordHere with actual bcrypt hash of 'password123'
-- You can generate this by running: node -e "console.log(require('bcrypt').hashSync('password123', 10))"

-- Create test properties (assuming owner IDs 6-10 from above inserts)
INSERT INTO properties (owner_id, name, type, location, description, pricing, bedrooms, bathrooms, amenities, max_guests, available) VALUES
(6, 'Cozy Downtown Apartment', 'Apartment', 'New York', 'Beautiful apartment in the heart of the city', 150, 2, 1, 'WiFi,Kitchen,AC', 4, true),
(6, 'Luxury Beach House', 'House', 'Los Angeles', 'Stunning beachfront property', 350, 4, 3, 'WiFi,Pool,Kitchen,AC,Beach Access', 8, true),
(7, 'Modern City Condo', 'Condo', 'Chicago', 'Contemporary condo with city views', 120, 1, 1, 'WiFi,Gym,Kitchen', 2, true),
(7, 'Spacious Family Villa', 'Villa', 'Miami', 'Perfect for families, close to attractions', 280, 5, 4, 'WiFi,Pool,Kitchen,AC,Parking', 10, true),
(8, 'Charming Studio', 'Apartment', 'Seattle', 'Cozy studio in trendy neighborhood', 90, 1, 1, 'WiFi,Kitchen', 2, true),
(8, 'Mountain Retreat', 'House', 'Denver', 'Peaceful mountain getaway', 200, 3, 2, 'WiFi,Fireplace,Kitchen,Parking', 6, true),
(9, 'Urban Loft', 'Loft', 'San Francisco', 'Stylish loft in tech district', 180, 2, 2, 'WiFi,Kitchen,AC,Workspace', 4, true),
(9, 'Lakeside Cottage', 'House', 'Austin', 'Serene lakeside retreat', 160, 2, 1, 'WiFi,Kitchen,Lake Access,Boat', 4, true),
(10, 'Penthouse Suite', 'Apartment', 'Boston', 'Luxury penthouse with panoramic views', 400, 3, 3, 'WiFi,Kitchen,AC,Concierge,Gym', 6, true),
(10, 'Country Farmhouse', 'House', 'Portland', 'Rustic farmhouse with modern amenities', 220, 4, 2, 'WiFi,Kitchen,Garden,Parking', 8, true);
