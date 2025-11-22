-- Add state column to users table (ignore error if exists)
ALTER TABLE users ADD COLUMN state VARCHAR(50) AFTER city;

-- Add address, city, state, country columns to properties table (ignore errors if exist)
ALTER TABLE properties ADD COLUMN address VARCHAR(255) AFTER location;
ALTER TABLE properties ADD COLUMN city VARCHAR(100) AFTER address;
ALTER TABLE properties ADD COLUMN state VARCHAR(50) AFTER city;
ALTER TABLE properties ADD COLUMN country VARCHAR(100) AFTER state;

-- Update existing properties to extract location data
-- This is a best-effort migration for existing data
UPDATE properties SET 
  city = SUBSTRING_INDEX(location, ',', 1),
  country = 'USA'
WHERE city IS NULL AND location IS NOT NULL;
