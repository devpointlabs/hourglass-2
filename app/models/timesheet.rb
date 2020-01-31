def time_str total_minutes
	hours = (total_minutes / 60).truncate
	minutes = total_minutes % 60
	m_str = minutes.to_s
	if minutes < 10
		m_str = "0"+m_str
	end
	hours.to_s + ":" + m_str
end

class Timesheet < ApplicationRecord
	belongs_to :user
	
	# Be able to add multiple sessions for a single day
	# Search for sessions that belong to users that fall in between start_date and a week after

	def get_sessions
		sessions = Session.get_week(self.user_id, self.start_date)
		get_nice_array(sessions)
	end

	def get_nice_array sessions
		nice_arr = []
		week_sum = 0
		sessions.each do |day, arr|
			obj = {day: day, sessions: []}
			arr.each do |a|
				if(a.class.method_defined?(:id)) 
					obj[:sessions].push(
						{
							id: a.id, 
							task: a.task_id,
							time: time_str(a.total_minutes)
						}
					)
				else
					week_sum += a[:total]
					obj[:sessions].push({total: time_str(a[:total])})
				end
			end
			nice_arr.push(obj)
		end
		nice_arr.push(time_str(week_sum))
		nice_arr
	end

end
