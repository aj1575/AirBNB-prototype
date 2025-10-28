-- Add sample completed bookings for demo (past dates)
-- Assuming traveler_id = 2 (Yuktaa)

INSERT INTO bookings (property_id, traveler_id, start_date, end_date, guests, total_price, status, created_at) VALUES
-- Completed booking 1
(2, 2, '2025-09-15', '2025-09-18', 2, 1050.00, 'accepted', '2025-09-01 10:00:00'),

-- Completed booking 2
(4, 2, '2025-08-20', '2025-08-23', 1, 375.00, 'accepted', '2025-08-05 14:30:00'),

-- Completed booking 3
(6, 2, '2025-07-10', '2025-07-14', 3, 720.00, 'accepted', '2025-06-25 09:15:00');
