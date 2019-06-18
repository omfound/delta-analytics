-- hit caption database, filtered topic and date, to get number of minutes
-- avg number of minutes per topic
-- percent of total time spent on each topics  
-- number of relevant sessions 
-- distinct number of locations / sites 

-- Parameters
-- Param1: Start Date (Datetime)
-- Param2: End Date (Datetime)
-- Param3: Topic Name (List of Strings)

-- Grab relevant sessions by date 
with relevant_sessions as (
	select 
		session_id,
		created_at 
	from sessions 
	where created_at between '{start_date}' and '{end_date}'
),

-- Grab relative topics by name
relevant_topics as (
	select 
		topic_id,
		topic_name 
	from topics
	where topic_name in ({topics})
),

-- gives us on a session x topic level the total minutes spent and 
-- factors non-filtered topics into an "other" category for viz purposes
session_topic_analytics as (
	select 
		sc.session_id,
		sc.topic_id as true_topic_id,
		rt.topic_name as true_topic_name,
		case 
			when rt.topic_name is null then 'other'
			else rt.topic_name 
		end as display_topic_name,
		sum(sc.duration) as duration 
	from session_captions sc 
	inner join relevant_topics rt on sc.topic_id = rt.topic_id
	group by 1, 2, 3, 4
)

-- gives us average number of minutes spent on a topic per session 
-- gives us total minutes spent on a topic in all sessions 
-- gives us number of distinct sessions that mentioned a particular topic
select 
	sta.true_topic_id,
	sta.display_topic_name,
	avg(sta.duration) as avg_minutes_per_topic,
	sum(sta.duration) as total_minutes_per_topic,
	count(distinct sta.session_id) as session_count
from session_topic_analytics sta
group by 1, 2;

