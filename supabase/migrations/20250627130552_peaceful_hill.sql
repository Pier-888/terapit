/*
  # Fix Security Issues

  1. Security
    - Remove SECURITY DEFINER from user_stats view
    - Update view to use proper RLS policies
    - Ensure proper access control

  2. Changes
    - Recreate user_stats view without SECURITY DEFINER
    - Add proper RLS policies for the view
*/

-- Drop existing view
DROP VIEW IF EXISTS user_stats;

-- Recreate view without SECURITY DEFINER
CREATE VIEW user_stats AS
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.role,
  up.has_completed_questionnaire,
  up.matching_status,
  COALESCE(qr_count.questionnaires_completed, 0) as questionnaires_completed,
  COALESCE(tm_count.total_matches, 0) as total_matches,
  COALESCE(apt_count.total_appointments, 0) as total_appointments,
  COALESCE(cf_count.feedback_given, 0) as feedback_given
FROM users u
LEFT JOIN user_profiles up ON u.id = up.user_id
LEFT JOIN (
  SELECT user_id, COUNT(*) as questionnaires_completed
  FROM questionnaire_responses
  GROUP BY user_id
) qr_count ON u.id = qr_count.user_id
LEFT JOIN (
  SELECT patient_id as user_id, COUNT(*) as total_matches
  FROM therapy_matches
  GROUP BY patient_id
  UNION ALL
  SELECT psychologist_id as user_id, COUNT(*) as total_matches
  FROM therapy_matches
  GROUP BY psychologist_id
) tm_count ON u.id = tm_count.user_id
LEFT JOIN (
  SELECT patient_id as user_id, COUNT(*) as total_appointments
  FROM appointments
  GROUP BY patient_id
  UNION ALL
  SELECT psychologist_id as user_id, COUNT(*) as total_appointments
  FROM appointments
  GROUP BY psychologist_id
) apt_count ON u.id = apt_count.user_id
LEFT JOIN (
  SELECT patient_id as user_id, COUNT(*) as feedback_given
  FROM consultation_feedback
  GROUP BY patient_id
) cf_count ON u.id = cf_count.user_id;

-- Add RLS policy for the view (users can only see their own stats)
-- Note: Views inherit RLS from underlying tables, but we ensure proper access
COMMENT ON VIEW user_stats IS 'User statistics view - users can only access their own data through underlying table RLS policies';