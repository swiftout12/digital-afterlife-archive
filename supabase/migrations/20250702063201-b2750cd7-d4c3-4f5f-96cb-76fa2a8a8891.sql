
-- Create a function to get trending graves based on recent activity
CREATE OR REPLACE FUNCTION get_trending_graves(hours_back int DEFAULT 24)
RETURNS TABLE (
  id uuid,
  title text,
  shares int,
  category text,
  trend_score numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.title,
    COALESCE(g.shares, 0) as shares,
    g.category::text,
    -- Calculate trend score based on shares, views, likes, and recency
    (COALESCE(g.shares, 0) * 1.0 + COALESCE(g.views, 0) * 0.1 + COALESCE(g.likes, 0) * 0.5) * 
    (1.0 + 1.0 / GREATEST(1, EXTRACT(EPOCH FROM (NOW() - g.created_at)) / 3600.0)) as trend_score
  FROM graves g
  WHERE g.created_at >= NOW() - (hours_back || ' hours')::interval
  ORDER BY trend_score DESC
  LIMIT 10;
END;
$$;
