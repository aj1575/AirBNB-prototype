-- Create property_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS property_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Clear any existing images first
DELETE FROM property_images;

-- Add images to existing properties
-- Property 2: Luxury Downtown
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(2, '/uploads/properties/1760481080102-367450083.jpeg', 1),
(2, '/uploads/properties/1760481096843-270141722.jpeg', 2);

-- Property 3: Cozy Beach House
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(3, '/uploads/properties/1760481108924-180376316.jpg', 1),
(3, '/uploads/properties/1760481122754-149273312.jpg', 2);

-- Property 4: Modern Studio Downtown
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(4, '/uploads/properties/1760481175494-399605326.webp', 1),
(4, '/uploads/properties/1760481190375-104177279.jpg', 2);

-- Property 5: Spacious Family Villa
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(5, '/uploads/properties/1760481080102-367450083.jpeg', 1),
(5, '/uploads/properties/1760481096843-270141722.jpeg', 2);

-- Property 6: Charming Garden Cottage
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(6, '/uploads/properties/1760481108924-180376316.jpg', 1),
(6, '/uploads/properties/1760481122754-149273312.jpg', 2);

-- Property 7: Penthouse with City Views
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(7, '/uploads/properties/1760481175494-399605326.webp', 1),
(7, '/uploads/properties/1760481190375-104177279.jpg', 2);

-- Verify images were added
SELECT p.id, p.name, COUNT(pi.id) as image_count 
FROM properties p 
LEFT JOIN property_images pi ON p.id = pi.property_id 
GROUP BY p.id, p.name
ORDER BY p.id;
