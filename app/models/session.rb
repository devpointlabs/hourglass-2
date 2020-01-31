
def get_days_arr sessions, start_day
	arr = [ [], [], [], [], [], [], []]
	sessions.each do |s|
		if(s.start_time < start_day.advance(days:1))
			arr[0].push(s)
		elsif(s.start_time < start_day.advance(days:2))
			arr[1].push(s)
		elsif(s.start_time < start_day.advance(days:3))
			arr[2].push(s)
		elsif(s.start_time < start_day.advance(days:4))
			arr[3].push(s)
		elsif(s.start_time < start_day.advance(days:5))
			arr[4].push(s)
		elsif(s.start_time < start_day.advance(days:6))
			arr[5].push(s)
		elsif(s.start_time < start_day.advance(days:7))
			arr[6].push(s)
		end
	end
	arr.each do |a|
		sum = 0
		a.each do |b|
			sum += b.total_minutes
		end
		a.push({total: sum})
	end
	return arr
end

class Session < ApplicationRecord
  belongs_to :user
	belongs_to :task
	def task_name
		self.task.title
	end

	def project_name
		self.task.project.title
	end

	def self.get_week user_id, start_date
		end_date = start_date.advance(days: 7)
		start_day = start_date.beginning_of_day()
		arr = get_days_arr(Session.find_by_sql(['
			SELECT *
			FROM sessions AS s
			WHERE s.user_id = ? 
			AND s.start_time BETWEEN ? AND ?
			ORDER BY s.start_time
		',user_id,start_date,end_date]), start_day)
		
		return {
			monday: arr[0],
			tuesday: arr[1],
			wednesday: arr[2],
			thursday: arr[3],
			friday: arr[4],
			saturday: arr[5],
			sunday: arr[6]
		}
	end
end

