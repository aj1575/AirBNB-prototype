-- Add images to existing properties
-- First, check what properties exist
SELECT id, name FROM properties;

-- Add images to property 1 (if exists)
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(1, '/uploads/properties/1760481080102-367450083.jpeg', 1),
(1, '/uploads/properties/1760481096843-270141722.jpeg', 2);

-- Add images to property 2 (if exists)
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(2, '/uploads/properties/1760481108924-180376316.jpg', 1),
(2, '/uploads/properties/1760481122754-149273312.jpg', 2);

-- Add images to property 3 (if exists)
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(3, '/uploads/properties/1760481175494-399605326.webp', 1),
(3, '/uploads/properties/1760481190375-104177279.jpg', 2);

-- Add images to property 4 (if exists)
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(4, '/uploads/properties/1760481080102-367450083.jpeg', 1),
(4, '/uploads/properties/1760481096843-270141722.jpeg', 2);

-- Add images to property 5 (if exists)
INSERT INTO property_images (property_id, image_path, display_order) VALUES
(5, '/uploads/properties/1760481108924-180376316.jpg', 1),
(5, '/uploads/properties/1760481122754-149273312.jpg', 2);

-- Verify images were added
SELECT p.id, p.name, COUNT(pi.id) as image_count 
FROM properties p 
LEFT JOIN property_images pi ON p.id = pi.property_id 
GROUP BY p.id;
