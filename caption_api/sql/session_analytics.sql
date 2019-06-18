-- hit caption database, filtered topic and date, to get number of minutes
-- avg number of minutes per topic
-- percent of total time spent on each topics  
-- number of relevant sessions 
-- distinct number of locations / sites 

with relevant_sessions as (
	select 
		session_id,
		created_at 
	from sessions 
	where created_at::date between '{start_date}' and '{end_date}'
),

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
		t.topic_name as true_topic_name,
		case 
			when rt.topic_name is null then 'other'
			else rt.topic_name 
		end as display_topic_name,
		sum(sc.duration) as duration 
	from session_captions sc 
	left join topics t on sc.topic_id = t.topic_id 
	left join relevant_topics rt on t.topic_id = rt.topic_id 
	group by 1, 2, 3, 4
)

-- gives us average number of minutes spent on a topic per session 
-- gives us total minutes spent on a topic in all sessions 
-- gives us total minutes of conversation all sessions
select 
	sta.topic_id,
	sta.display_topic_name,
	avg(sta.duration) over (partition by sta.topic_id, sta.display_topic_name) as avg_minutes_per_topic,
	sum(sta.duration) over (partition by sta.topic_id, sta.display_topic_name) as total_minutes_per_topic,
	sum(sta.duration) over () as total_minutes,
	count(distinct sta.session_id) as session_count
from session_topic_analytics sta;

